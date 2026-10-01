import type { Categoria } from "@/data/elements";

export const COLOR_CATEGORIA: Record<Categoria, { texto: string; fondo: string }> = {
  alcalino: { texto: "text-rose", fondo: "bg-rose/20" },
  alcalinoterreo: { texto: "text-amber", fondo: "bg-amber/20" },
  transicion: { texto: "text-sky", fondo: "bg-sky/20" },
  otro: { texto: "text-lime", fondo: "bg-lime/20" },
  nometal: { texto: "text-lime", fondo: "bg-lime/20" },
  halogeno: { texto: "text-glow", fondo: "bg-glow/20" },
  noble: { texto: "text-iris", fondo: "bg-iris/20" },
  lantanido: { texto: "text-amber", fondo: "bg-amber/25" },
  actinido: { texto: "text-amber", fondo: "bg-amber/25" },
};

export const LEYENDA: { etiqueta: string; punto: string }[] = [
  { etiqueta: "Alcalinos", punto: "bg-rose" },
  { etiqueta: "Alcalinoter.", punto: "bg-amber" },
  { etiqueta: "Transición", punto: "bg-sky" },
  { etiqueta: "Otros", punto: "bg-lime" },
  { etiqueta: "Halógenos", punto: "bg-glow" },
  { etiqueta: "Nobles", punto: "bg-iris" },
];

export function Leyenda() {
  return (
    <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
      {LEYENDA.map((l) => (
        <span key={l.etiqueta} className="flex items-center gap-1">
          <i className={`size-2 rounded-full ${l.punto}`} />
          <span className="font-mono text-[9px] text-mist">{l.etiqueta}</span>
        </span>
      ))}
    </div>
  );
}
