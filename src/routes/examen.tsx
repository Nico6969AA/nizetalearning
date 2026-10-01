import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { PeriodicGrid } from "@/components/PeriodicGrid";
import { ELEMENTOS, type Elemento } from "@/data/elements";
import { MNEMOTECNIAS, mnemotecniaDe, trozos } from "@/data/mnemonics";

export const Route = createFileRoute("/examen")({
  head: () => ({
    meta: [
      { title: "Examen — Tabla periódica muda | Nizeta" },
      {
        name: "description",
        content:
          "Rellena la tabla periódica muda escribiendo cada símbolo y comprueba tus aciertos, fallos y sugerencias.",
      },
      { property: "og:title", content: "Examen — Tabla periódica muda | Nizeta" },
      {
        property: "og:description",
        content: "Pon a prueba tu memoria con la tabla periódica muda de Nizeta.",
      },
    ],
  }),
  component: Examen;
});

type Orden = "horizontal" | "vertical";

interface Fallo {
  elemento: Elemento;
  respuesta: string;
}

function ordenar(orden: Orden): Elemento[] {
  const copia = [...ELEMENTOS];
  copia.sort((a, b) =>
    orden === "horizontal"
      ? a.fila - b.fila || a.col - b.col
      : a.col - b.col || a.fila - b.fila,
  );
  return copia;
}

function limpiar(valor: string) {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ]/g, "").slice(0, 2);
}

function Examen() {
  const [orden, setOrden] = useState<Orden>("horizontal");
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [corregido, setCorregido] = useState(false);
  const refs = useRef<Record<number, HTMLInputElement | null>>({});

  const secuencia = useMemo(() => ordenar(orden), [orden]);

  const esCorrecta = (el: Elemento) =>
    (respuestas[el.z] ?? "").trim().toLowerCase() === el.simbolo.toLowerCase();

  const fallos: Fallo[] = corregido
    ? ELEMENTOS.filter((el) => !esCorrecta(el)).map((el) => ({
        elemento: el,
        respuesta: respuestas[el.z] ?? "",
      }))
    : [];

  const aciertos = ELEMENTOS.length - fallos.length;
  const porcentaje = Math.round((aciertos / ELEMENTOS.length) * 100);

  const reglasFlojas = useMemo(() => {
    if (!corregido) return [];
    const cuenta = new Map<string, number>();
    for (const f of fallos) {
      const m = mnemotecniaDe(f.elemento.simbolo);
      if (m) cuenta.set(m.id, (cuenta.get(m.id) ?? 0) + 1);
    }
    return [...cuenta.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, n]) => ({ regla: MNEMOTECNIAS.find((m) => m.id === id)!, n }));
  }, [corregido, fallos]);

  function siguiente(z: number) {
    const i = secuencia.findIndex((el) => el.z === z);
    const sig = secuencia[(i + 1) % secuencia.length];
    refs.current[sig.z]?.focus();
    refs.current[sig.z]?.select();
  }

  function reiniciar() {
    setRespuestas({});
    setCorregido(false);
  }

  return (
    <>
      <section className="glass rounded-2xl p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-base font-semibold">Tabla muda</h1>
          <div className="flex rounded-full bg-white/5 p-1">
            {(["horizontal", "vertical"] as Orden[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOrden(o)}
                className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  orden === o ? "bg-glow text-ink" : "text-mist"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-3 font-mono text-[10px] text-mist">
          Solo letras · máx. 2 caracteres · Intro salta al siguiente ({orden})
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <PeriodicGrid
            celda={(el) => {
              const valor = respuestas[el.z] ?? "";
              const ok = esCorrecta(el);
              const estado = !corregido
                ? "bg-white/5 ring-white/10 text-foreground"
                : ok
                  ? "bg-glow/15 ring-glow/50 text-glow"
                  : "bg-destructive/15 ring-destructive/50 text-destructive";
              return (
                <input
                  ref={(n) => {
                    refs.current[el.z] = n;
                  }}
                  value={valor}
                  onChange={(e) =>
                    setRespuestas((r) => ({ ...r, [el.z]: limpiar(e.target.value) }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      siguiente(el.z);
                    }
                  }}
                  onFocus={(e) => e.currentTarget.select()}
                  aria-label={`Elemento ${el.z}`}
                  inputMode="text"
                  enterKeyHint="next"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={2}
                  className={`aspect-square w-full rounded-[3px] text-center font-mono text-[11px] ring-1 outline-none focus:ring-glow ${estado}`}
                />
              );
            }}
          />
        </form>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setCorregido(true)}
            className="flex-1 rounded-full bg-glow py-3 text-sm font-semibold text-ink"
          >
            Comprobar
          </button>
          <button
            type="button"
            onClick={reiniciar}
            className="glass rounded-full px-4 py-3 text-sm font-medium text-foreground"
          >
            Reiniciar
          </button>
        </div>
      </section>

      {corregido && (
        <section className="glass mt-5 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-mist">Aciertos</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-glow transition-all"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-glow">
              {aciertos}/{ELEMENTOS.length} · {porcentaje}%
            </span>
          </div>

          {reglasFlojas.length > 0 && (
            <div className="mt-4 border-t border-border pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-mist">
                Sugerencias de repaso
              </p>
              <div className="mt-2 space-y-2">
                {reglasFlojas.map(({ regla, n }) => (
                  <div key={regla.id} className="rounded-xl bg-white/5 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-glow">
                      {regla.titulo} · {n} {n === 1 ? "fallo" : "fallos"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                      {trozos(regla.frases[0]).map((t, i) => (
                        <span
                          key={i}
                          className={t.resaltado ? "font-semibold text-glow" : undefined}
                        >
                          {t.texto}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-border pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist">
              Fallos ({fallos.length})
            </p>
            {fallos.length === 0 ? (
              <p className="mt-2 text-sm text-glow">¡Tabla periódica completa y perfecta!</p>
            ) : (
              <ul className="mt-2 max-h-80 space-y-1 overflow-y-auto pr-1">
                {fallos.map((f) => (
                  <li
                    key={f.elemento.z}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2"
                  >
                    <span className="font-mono text-[11px] text-mist">{f.elemento.z}</span>
                    <span className="flex-1 truncate text-sm">{f.elemento.nombre}</span>
                    <span className="font-mono text-[11px] text-destructive">
                      {f.respuesta ? f.respuesta : "—"}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-glow">
                      {f.elemento.simbolo}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </>
  );
}
