import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Loader2, LogIn, Sparkles } from "lucide-react";

import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import {
  registrarFalloInicio,
  registrarUsuario,
  verificarLimiteInicio,
} from "@/lib/auth.functions";
import {
  DESTINO_GUARDADO,
  emailSintetico,
  MENSAJE_CONTRASENA_INVALIDA,
  MENSAJE_USUARIO_INVALIDO,
  rutaDestinoSegura,
  USUARIO_REGEX,
  validarContrasena,
} from "@/lib/auth-shared";

export const Route = createFileRoute("/auth")({
  validateSearch: (busqueda: Record<string, unknown>) => ({
    redirect: typeof busqueda['redirect'] === 'string' ? busqueda['redirect'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Iniciar sesión | Nizeta" },
      {
        name: "description",
        content:
          "Crea tu cuenta o inicia sesión en Nizeta para guardar tu tabla periódica personalizada en todos tus dispositivos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Iniciar sesión | Nizeta" },
      {
        property: "og:description",
        content:
          "Crea tu cuenta o inicia sesión en Nizeta para guardar tu tabla periódica personalizada.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://nizetalearning.lovable.app/auth" }],
  }),
  component: PaginaAuth,
});

const MENSAJE_CREDENCIALES = "Nombre de usuario o contraseña incorrectos.";
const MENSAJE_SERVIDOR = "No se ha podido completar la operación. Inténtalo de nuevo más tarde.";
const MENSAJE_LIMITE = "Demasiados intentos fallidos. Espera unos minutos antes de volver a probar.";
const MENSAJE_GOOGLE = "No se ha podido iniciar sesión con Google. Inténtalo de nuevo.";

function PaginaAuth() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [modo, setModo] = useState<"entrar" | "crear">("entrar");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetir, setRepetir] = useState("");
  const [ver, setVer] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const destinoRef = useRef("/");

  useEffect(() => {
    let valor = rutaDestinoSegura(redirect);
    if (!redirect) {
      // El destino quedó guardado antes de un flujo de Google: consumirlo una sola vez.
      const guardado = sessionStorage.getItem(DESTINO_GUARDADO);
      sessionStorage.removeItem(DESTINO_GUARDADO);
      valor = rutaDestinoSegura(guardado) ?? "/";
    } else {
      // Preservar el destino a través del flujo de Google.
      sessionStorage.setItem(DESTINO_GUARDADO, valor);
    }
    destinoRef.current = valor;

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: destinoRef.current, replace: true });
    });
  }, [redirect, navigate]);

  async function terminarEntrada() {
    await navigate({ to: destinoRef.current, replace: true });
  }

  async function enviarEntrar(evento: React.FormEvent) {
    evento.preventDefault();
    if (cargando) return;
    setError(null);
    const nombre = usuario.trim();
    if (!USUARIO_REGEX.test(nombre)) {
      setError(MENSAJE_USUARIO_INVALIDO);
      return;
    }
    if (!contrasena) {
      setError("Escribe tu contraseña.");
      return;
    }
    setCargando(true);
    try {
      const limite = await verificarLimiteInicio({ data: { username: nombre } });
      if (limite?.bloqueado) {
        setError(MENSAJE_LIMITE);
        return;
      }
      const { error: errorAuth } = await supabase.auth.signInWithPassword({
        email: emailSintetico(nombre),
        password: contrasena,
      });
      if (errorAuth) {
        // Registrar el intento fallido para el límite por usuario y por IP.
        await registrarFalloInicio({ data: { username: nombre } }).catch(() => undefined);
        setError(MENSAJE_CREDENCIALES);
        return;
      }
      await terminarEntrada();
    } catch {
      setError(MENSAJE_SERVIDOR);
    } finally {
      setCargando(false);
    }
  }

  async function enviarCrear(evento: React.FormEvent) {
    evento.preventDefault();
    if (cargando) return;
    setError(null);
    setAviso(null);
    const nombre = usuario.trim();
    if (!USUARIO_REGEX.test(nombre)) {
      setError(MENSAJE_USUARIO_INVALIDO);
      return;
    }
    const falloContrasena = validarContrasena(contrasena);
    if (falloContrasena) {
      setError(falloContrasena ?? MENSAJE_CONTRASENA_INVALIDA);
      return;
    }
    if (contrasena !== repetir) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setCargando(true);
    try {
      const resultado = await registrarUsuario({ data: { username: nombre, password: contrasena } });
      if (resultado && !resultado.ok) {
        setError(resultado.error);
        return;
      }
      const { error: errorAuth } = await supabase.auth.signInWithPassword({
        email: emailSintetico(nombre),
        password: contrasena,
      });
      if (errorAuth) {
        setAviso("Cuenta creada. Inicia sesión con tu nombre y contraseña.");
        setModo("entrar");
        return;
      }
      await terminarEntrada();
    } catch {
      setError(MENSAJE_SERVIDOR);
    } finally {
      setCargando(false);
    }
  }

  async function iniciarConGoogle() {
    if (cargando) return;
    setError(null);
    setCargando(true);
    try {
      const resultado = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth`,
      });
      if (resultado.error) {
        setError(MENSAJE_GOOGLE);
        return;
      }
      if (resultado.redirected) return; // El navegador va a Google y vuelve a /auth
      await terminarEntrada();
    } catch {
      setError(MENSAJE_GOOGLE);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 py-6">
      <section className="glass rounded-3xl p-6">
        <div className="mb-5 flex gap-1 rounded-full p-1" role="tablist" aria-label="Modo de acceso">
          <button
            type="button"
            role="tab"
            aria-selected={modo === "entrar"}
            onClick={() => {
              setModo("entrar");
              setError(null);
              setAviso(null);
            }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              modo === "entrar" ? "bg-white/10 text-foreground" : "text-mist"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={modo === "crear"}
            onClick={() => {
              setModo("crear");
              setError(null);
              setAviso(null);
            }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              modo === "crear" ? "bg-white/10 text-foreground" : "text-mist"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form onSubmit={modo === "entrar" ? enviarEntrar : enviarCrear} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="usuario" className="text-sm font-medium text-foreground">
              Nombre de usuario
            </label>
            <input
              id="usuario"
              name="username"
              autoComplete="username"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="p. ej. FraternidadOnline"
              aria-invalid={error ? true : undefined}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            {modo === "crear" && (
              <p className="font-mono text-[11px] text-mist">3–20 caracteres: letras, números o _</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contrasena" className="text-sm font-medium text-foreground">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="contrasena"
                name={modo === "entrar" ? "current-password" : "new-password"}
                autoComplete={modo === "entrar" ? "current-password" : "new-password"}
                required
                type={ver ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                aria-invalid={error ? true : undefined}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 pr-11 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <button
                type="button"
                onClick={() => setVer((v) => !v)}
                aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-mist transition-colors hover:text-foreground"
              >
                {ver ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
              </button>
            </div>
            {modo === "crear" && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="repetir" className="text-sm font-medium text-foreground">
                    Repite la contraseña
                  </label>
                  <input
                    id="repetir"
                    name="new-password"
                    autoComplete="new-password"
                    required
                    type={ver ? "text" : "password"}
                    value={repetir}
                    onChange={(e) => setRepetir(e.target.value)}
                    aria-invalid={error ? true : undefined}
                    className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </div>
                <p className="font-mono text-[11px] text-mist">Mínimo 12 caracteres</p>
              </>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-rose/10 px-3 py-2 text-sm text-rose">
              {error}
            </p>
          )}
          {aviso && (
            <p role="status" className="rounded-xl bg-lime/10 px-3 py-2 text-sm text-lime">
              {aviso}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-glow px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-glow/90 disabled:opacity-60"
          >
            {cargando ? <Loader2 className="size-4 animate-spin" aria-hidden /> : modo === "entrar" ? <LogIn className="size-4" aria-hidden /> : <Sparkles className="size-4" aria-hidden />}
            {modo === "entrar" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-mist">
          <span className="h-px flex-1 bg-border" />
          o
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={iniciarConGoogle}
          disabled={cargando}
          className="flex w-full items-center justify-center gap-2.5 rounded-full border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-4">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.94.75 12 .75 7.5.75 3.66 3.33 1.86 7.13l3.66 2.84C6.42 7.13 9 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.25 12.26c0-.84-.08-1.64-.22-2.42H12v4.59h6.29c-.27 1.46-1.09 2.7-2.32 3.53l3.63 2.81c2.12-1.96 3.65-4.84 3.65-8.51z" />
            <path fill="#FBBC05" d="M5.52 14.18a6.9 6.9 0 0 1 0-4.21L1.86 7.13a11.26 11.26 0 0 0 0 9.9l3.66-2.85z" />
            <path fill="#34A853" d="M12 23.41c3.03 0 5.57-1 7.42-2.71l-3.63-2.81c-1 .68-2.28 1.08-3.79 1.08-3 0-5.58-2.09-6.48-4.79l-3.66 2.85c1.8 3.8 5.64 6.38 10.14 6.38z" />
          </svg>
          Continuar con Google
        </button>
      </section>

      <section className="glass rounded-3xl p-5 text-sm text-mist">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Si pierdes el acceso</h2>
        <p>
          Las cuentas con contraseña no guardan un correo, así que no existe recuperación por email:
          guarda tu contraseña en un lugar seguro.
        </p>
        <p className="mt-2">
          Si entras con Google, siempre puedes recuperar el acceso desde tu cuenta de Google.
        </p>
      </section>
    </main>
  );
}
