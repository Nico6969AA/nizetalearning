import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PeriodicGrid } from "@/components/PeriodicGrid";
import { COLOR_CATEGORIA, Leyenda } from "@/components/ElementCell";
import { ELEMENTOS, type Elemento } from "@/data/elements";
import { mnemotecniaDe, trozos } from "@/data/mnemonics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nizeta — La tabla periódica interactiva" },
      {
        name: "description",
        content:
          "Explora los 118 elementos coloreados por familia y descubre la regla mnemotécnica de cada uno.",
      },
      { property: "og:title", content: "Nizeta — La tabla periódica interactiva" },
      {
        property: "og:description",
        content: "Explora los 118 elementos coloreados por familia y sus reglas mnemotécnicas.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [elegido, setElegido] = useState<Elemento>(ELEMENTOS[0] as Elemento);
  const regla = mnemotecniaDe(elegido.simbolo);

  return (
    <>
      <section className="glass rounded-2xl p-3">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-base font-semibold">Tabla periódica</h1>
          <span className="font-mono text-[10px] tracking-wider text-mist">118 elementos</span>
        </div>

        <Leyenda />

        <PeriodicGrid
          celda={(el) => {
            const c = COLOR_CATEGORIA[el.categoria];
            const activo = el.z === elegido.z;
            return (
              <button
                type="button"
                onClick={() => setElegido(el)}
                className={`flex aspect-square w-full flex-col items-center justify-center rounded-[3px] leading-none transition-transform hover:scale-110 ${c.fondo} ${
                  activo ? "ring-1 ring-glow" : ""
                }`}
              >
                <span className="font-mono text-[8px] opacity-55">{el.z}</span>
                <span className={`text-[13px] font-semibold ${c.texto}`}>{el.simbolo}</span>
              </button>
            );
          }}
        />
      </section>

      <section className="glass mt-5 rounded-2xl p-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-mist">
          Elemento {elegido.z}
        </p>
        <div className="mt-1 flex items-baseline gap-3">
          <span className={`text-3xl font-semibold ${COLOR_CATEGORIA[elegido.categoria].texto}`}>
            {elegido.simbolo}
          </span>
          <span className="text-lg font-medium">{elegido.nombre}</span>
        </div>
        <p className="mt-1 font-mono text-[11px] text-mist">
          Período {elegido.fila <= 7 ? elegido.fila : elegido.fila === 8 ? 6 : 7} · Grupo{" "}
          {elegido.fila <= 7 ? elegido.col : "bloque f"}
        </p>

        {regla ? (
          <div className="mt-4 border-t border-border pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-glow">
              {regla.titulo} · {regla.subtitulo}
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/90">
              {trozos(regla.frases[0] ?? "").map((t, i) => (
                <span key={i} className={t.resaltado ? "font-semibold text-glow" : undefined}>
                  {t.texto}
                </span>
              ))}
            </p>
          </div>
        ) : (
          <p className="mt-4 border-t border-border pt-3 text-sm text-mist">
            Este elemento no entra en las reglas mnemotécnicas de Nizeta.
          </p>
        )}
      </section>
    </>
  );
}
