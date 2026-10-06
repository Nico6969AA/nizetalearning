import { createFileRoute } from "@tanstack/react-router";
import { MNEMOTECNIAS, trozos, type Acento } from "@/data/mnemonics";

export const Route = createFileRoute("/aprender")({
  head: () => ({
    meta: [
      { title: "Aprender — Reglas mnemotécnicas | Nizeta" },
      {
        name: "description",
        content:
          "Reglas mnemotécnicas para memorizar cada grupo y período de la tabla periódica, con las letras de los símbolos resaltadas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Aprender — Reglas mnemotécnicas | Nizeta" },
      {
        property: "og:description",
        content: "Memoriza los grupos y períodos con frases y símbolos resaltados.",
      },
      { property: "og:url", content: "https://nizetalearning.lovable.app/aprender" },
    ],
    links: [{ rel: "canonical", href: "https://nizetalearning.lovable.app/aprender" }],
  }),
  component: Aprender,
});

const TEXTO: Record<Acento, string> = {
  glow: "text-glow",
  amber: "text-amber",
  sky: "text-sky",
  rose: "text-rose",
  lime: "text-lime",
  iris: "text-iris",
};

const CHIP: Record<Acento, string> = {
  glow: "bg-glow/15 text-glow",
  amber: "bg-amber/15 text-amber",
  sky: "bg-sky/15 text-sky",
  rose: "bg-rose/15 text-rose",
  lime: "bg-lime/15 text-lime",
  iris: "bg-iris/15 text-iris",
};

function Aprender() {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-base font-semibold">Mnemotecnias</h1>
        <span className="font-mono text-[10px] tracking-wider text-mist">
          {MNEMOTECNIAS.length} reglas
        </span>
      </div>

      <div className="space-y-2.5">
        {MNEMOTECNIAS.map((m) => (
          <article key={m.id} className="glass rounded-2xl p-3.5">
            <p
              className={`mb-1.5 font-mono text-[10px] uppercase tracking-wider ${TEXTO[m.acento]}`}
            >
              {m.titulo} · {m.subtitulo}
            </p>
            {m.frases.map((f, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-pretty text-foreground/90">
                {trozos(f).map((t, j) => (
                  <span
                    key={j}
                    className={t.resaltado ? `font-semibold ${TEXTO[m.acento]}` : undefined}
                  >
                    {t.texto}
                  </span>
                ))}
              </p>
            ))}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.simbolos.map((s) => (
                <span
                  key={s}
                  className={`rounded-md px-2 py-1 font-mono text-[11px] font-medium ${CHIP[m.acento]}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
