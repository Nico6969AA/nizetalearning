import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ElementoPersonalizado } from "@/data/custom-elements";

const CATEGORIAS = [
  "alcalino",
  "alcalinoterreo",
  "transicion",
  "otro",
  "nometal",
  "halogeno",
  "noble",
  "lantanido",
  "actinido",
] as const;

const numeroOpcional = z
  .number()
  .refine((v) => Number.isFinite(v), "Número no válido")
  .optional();

const elementoSchema = z.object({
  z: z.number().int().min(119).max(1000),
  simbolo: z.string().trim().regex(/^[A-Za-z]{1,3}$/),
  nombre: z.string().trim().min(1).max(60),
  categoria: z.enum(CATEGORIAS),
  masa: numeroOpcional,
  fusionC: numeroOpcional,
  ebullicionC: numeroOpcional,
  oxidacion: z
    .string()
    .trim()
    .max(40)
    .optional()
    .refine((v) => v === undefined || v.length > 0, "Estado de oxidación no válido"),
});

const listaSchema = z.object({
  lista: z.array(elementoSchema).max(500),
});

const esquemaUno = z.object({ elemento: elementoSchema });
const esquemaBorrado = z.object({ z: z.number().int().min(119).max(1000) });

function aFila(elemento: ElementoPersonalizado, userId: string) {
  return {
    user_id: userId,
    z: elemento.z,
    simbolo: elemento.simbolo,
    nombre: elemento.nombre,
    categoria: elemento.categoria,
    masa: elemento.masa ?? null,
    fusion_c: elemento.fusionC ?? null,
    ebullicion_c: elemento.ebullicionC ?? null,
    oxidacion: elemento.oxidacion?.trim() || null,
  };
}

function deFila(row: {
  z: number;
  simbolo: string;
  nombre: string;
  categoria: (typeof CATEGORIAS)[number];
  masa: number | null;
  fusion_c: number | null;
  ebullicion_c: number | null;
  oxidacion: string | null;
}): ElementoPersonalizado {
  return {
    z: row.z,
    simbolo: row.simbolo,
    nombre: row.nombre,
    categoria: row.categoria,
    masa: row.masa ?? undefined,
    fusionC: row.fusion_c ?? undefined,
    ebullicionC: row.ebullicion_c ?? undefined,
    oxidacion: row.oxidacion ?? undefined,
  };
}

export const listarElementos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("custom_elements")
      .select("z, simbolo, nombre, categoria, masa, fusion_c, ebullicion_c, oxidacion")
      .order("z");
    if (error) {
      console.error("listarElementos", error.message);
      throw new Error("No se han podido cargar tus elementos personalizados");
    }
    return (data ?? []).map(deFila);
  });

export const guardarElementos = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(listaSchema.parse)
  .handler(async ({ data, context }) => {
    if (!data.lista.length) return { ok: true as const };
    const filas = data.lista.map((e) => aFila(e, context.userId));
    const { error } = await context.supabase
      .from("custom_elements")
      .upsert(filas, { onConflict: "user_id,z" });
    if (error) {
      console.error("guardarElementos", error.message);
      throw new Error("No se han podido guardar tus elementos personalizados");
    }
    return { ok: true as const };
  });

export const guardarElemento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(esquemaUno.parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("custom_elements")
      .upsert(aFila(data.elemento, context.userId), { onConflict: "user_id,z" });
    if (error) {
      console.error("guardarElemento", error.message);
      throw new Error("No se ha podido guardar el elemento");
    }
    return { ok: true as const };
  });

export const borrarElemento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(esquemaBorrado.parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("custom_elements")
      .delete()
      .eq("user_id", context.userId)
      .eq("z", data.z);
    if (error) {
      console.error("borrarElemento", error.message);
      throw new Error("No se ha podido borrar el elemento");
    }
    return { ok: true as const };
  });
