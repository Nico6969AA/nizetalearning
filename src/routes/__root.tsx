import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { ProveedorSesion, useSesion } from "@/hooks/use-auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o se ha movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver a la tabla
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no se ha cargado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo ha fallado. Puedes volver a intentarlo o regresar al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nizeta — Aprende la tabla periódica" },
      {
        name: "description",
        content:
          "Nizeta: aprende la tabla periódica con reglas mnemotécnicas y ponte a prueba con la tabla muda.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nizeta" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const PESTANAS = [
  { to: "/", label: "Tabla" },
  { to: "/aprender", label: "Aprender" },
  { to: "/examen", label: "Examen" },
  { to: "/personalizada", label: "Personalizada" },
] as const;

function AccionesHeader() {
  const { cargando, userId, nombre } = useSesion();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (cargando) return null;

  if (!userId) {
    return (
      <div className="flex gap-2">
        <Link
          to="/aprender"
          className="rounded-full bg-glow px-3.5 py-2 text-sm font-medium text-ink"
        >
          Aprender
        </Link>
        <Link
          to="/auth"
          className="glass rounded-full px-3.5 py-2 text-sm font-medium text-foreground"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="glass hidden max-w-[10rem] truncate rounded-full px-3 py-2 text-sm font-medium text-foreground sm:block">
        {nombre ?? "Cuenta"}
      </span>
      <button
        type="button"
        onClick={async () => {
          await queryClient.cancelQueries();
          queryClient.clear();
          await supabase.auth.signOut();
          await router.navigate({ to: "/", replace: true });
        }}
        className="glass rounded-full px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        Salir
      </button>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ProveedorSesion queryClient={queryClient}>
      <div className="relative min-h-screen overflow-hidden bg-ink font-display text-foreground">
        <div className="pointer-events-none absolute -top-24 -left-20 size-72 rounded-full bg-glow/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-24 size-80 rounded-full bg-sky/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 size-72 rounded-full bg-amber/10 blur-3xl" />

        <div className="relative mx-auto max-w-[960px] px-4 pb-16">
          <header className="flex items-center justify-between pt-6 pb-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-glow/15 ring-1 ring-glow/30">
                <span className="font-mono text-sm font-semibold text-glow">N</span>
              </span>
              <span className="leading-none">
                <span className="block text-lg font-semibold tracking-tight">Nizeta</span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  Tabla periódica
                </span>
              </span>
            </Link>
            <AccionesHeader />
          </header>

          <nav className="glass mb-5 flex gap-1 rounded-full p-1">
            {PESTANAS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                activeOptions={{ exact: p.to === "/" }}
                className="flex-1 rounded-full py-2 text-center text-sm font-medium text-mist transition-colors"
                activeProps={{ className: "bg-white/10 text-foreground" }}
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}
