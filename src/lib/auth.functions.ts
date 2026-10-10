import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  emailSintetico,
  MENSAJE_CONTRASENA_INVALIDA,
  normalizarUsername,
  USUARIO_REGEX,
} from "./auth-shared";

const MENSAJE_SERVIDOR = "No se ha podido completar la operación. Inténtalo de nuevo más tarde.";
const MENSAJE_USUARIO_OCUPADO = "Ese nombre de usuario ya está en uso.";
const MENSAJE_LIMITE_REGISTRO = "Demasiados intentos de registro. Espera un poco e inténtalo de nuevo.";
const MENSAJE_LIMITE_INICIO = "Demasiados intentos fallidos. Espera unos minutos antes de volver a probar.";

// Límites de protección frente a abusos
const REGISTROS_POR_HORA = 5;
const FALLOS_USUARIO_POR_15MIN = 8;
const FALLOS_IP_POR_15MIN = 30;
const VENTANA_REGISTRO_MS = 60 * 60 * 1000;
const VENTANA_INICIO_MS = 15 * 60 * 1000;

function ipDeLaPeticion(): string {
  try {
    const peticion = getRequest();
    const reenviada = peticion.headers.get("x-forwarded-for");
    if (reenviada) return reenviada.split(",")[0]!.trim().slice(0, 64);
    return (peticion.headers.get("x-real-ip") ?? "desconocida").slice(0, 64);
  } catch {
    return "desconocida";
  }
}

const esquemaRegistro = z.object({
  username: z.string().trim().max(64).regex(USUARIO_REGEX).transform(normalizarUsername),
  password: z
    .string()
    .max(128, MENSAJE_CONTRASENA_INVALIDA)
    .refine((valor) => valor.length >= 12, MENSAJE_CONTRASENA_INVALIDA),
});

export const registrarUsuario = createServerFn({ method: "POST" })
  .inputValidator(esquemaRegistro.parse)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip = ipDeLaPeticion();

    const { count: registrosRecientes } = await supabaseAdmin
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .eq("ok", false)
      .eq("kind", "register")
      .gt("at", new Date(Date.now() - VENTANA_REGISTRO_MS).toISOString());
    if ((registrosRecientes ?? 0) >= REGISTROS_POR_HORA) {
      return { ok: false as const, error: MENSAJE_LIMITE_REGISTRO };
    }

    // Insertar el perfil primero: el índice único resuelve carreras entre peticiones.
    const { error: errorPerfil } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: crypto.randomUUID(),
        username: data.username,
        username_normalized: data.username,
        provider: "password",
      });
    if (errorPerfil) {
      if (errorPerfil.code === "23505") return { ok: false as const, error: MENSAJE_USUARIO_OCUPADO };
      console.error("registrarUsuario: error creando perfil", errorPerfil.code);
      return { ok: false as const, error: MENSAJE_SERVIDOR };
    }

    const { error: errorUsuario } = await supabaseAdmin.auth.admin.createUser({
      email: emailSintetico(data.username),
      password: data.password,
      email_confirm: true,
    });

    if (errorUsuario) {
      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("username_normalized", data.username);
      await supabaseAdmin.from("login_attempts").insert({
        username_normalized: data.username,
        ip,
        ok: false,
        kind: "register",
      });
      console.error("registrarUsuario: error creando la cuenta", errorUsuario.status);
      return { ok: false as const, error: MENSAJE_SERVIDOR };
    }

    return { ok: true as const };
  });

const esquemaLimite = z.object({
  username: z.string().trim().max(64).transform(normalizarUsername),
});

export const verificarLimiteInicio = createServerFn({ method: "GET" })
  .inputValidator(esquemaLimite.parse)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip = ipDeLaPeticion();
    const desde = new Date(Date.now() - VENTANA_INICIO_MS).toISOString();

    const [porUsuario, porIp] = await Promise.all([
      supabaseAdmin
        .from("login_attempts")
        .select("id", { count: "exact", head: true })
        .eq("username_normalized", data.username)
        .eq("ok", false)
        .eq("kind", "login")
        .gt("at", desde),
      supabaseAdmin
        .from("login_attempts")
        .select("id", { count: "exact", head: true })
        .eq("ip", ip)
        .eq("ok", false)
        .eq("kind", "login")
        .gt("at", desde),
    ]);

    const bloqueado =
      (porUsuario.count ?? 0) >= FALLOS_USUARIO_POR_15MIN ||
      (porIp.count ?? 0) >= FALLOS_IP_POR_15MIN;
    return { bloqueado };
  });

const esquemaFallo = z.object({
  username: z.string().trim().max(64).transform(normalizarUsername),
});

export const registrarFalloInicio = createServerFn({ method: "POST" })
  .inputValidator(esquemaFallo.parse)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("login_attempts").insert({
      username_normalized: data.username,
      ip: ipDeLaPeticion(),
      ok: false,
      kind: "login",
    });
    return { ok: true };
  });

export const miPerfil = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: perfil } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();
    if (perfil?.username) return { nombre: perfil.username as string };

    // El perfil falta (por ejemplo, se eliminó después de un error): recrearlo con
    // un nombre derivado del correo. Para cuentas locales el correo es sintético
    // `<username>@nizeta.local`, así que la parte local es el propio nombre.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const correo = (context.claims as { email?: string } | undefined)?.email;
    const bruto = correo?.split("@")[0] ?? "usuario";
    const base = /^[A-Za-z0-9_]{3,20}$/.test(bruto)
      ? bruto
      : `usuario${userId.slice(0, 6)}`;
    for (let intento = 0; intento < 5; intento++) {
      const candidato = intento === 0 ? base : `${base}${intento + 1}`;
      const { data: creado, error } = await supabaseAdmin
        .from("profiles")
        .insert({
          id: userId,
          username: candidato,
          username_normalized: normalizarUsername(candidato),
        })
        .select("username")
        .single();
      if (!error && creado) return { nombre: creado.username as string };
    }
    console.error("miPerfil: no se ha podido recrear el perfil", userId);
    return { nombre: null };
  });
