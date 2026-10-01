import type { ReactNode } from "react";
import { ELEMENTOS, type Elemento } from "@/data/elements";

interface Props {
  celda: (el: Elemento) => ReactNode;
  /** Ancho mínimo del tablero antes de permitir desplazamiento horizontal. */
  anchoMinimo?: number;
}

const FILAS_TEMPLATE = "repeat(7, minmax(0, 1fr)) 12px repeat(2, minmax(0, 1fr))";

function filaCss(fila: number) {
  return fila <= 7 ? fila : fila + 1;
}

export function PeriodicGrid({ celda, anchoMinimo = 680 }: Props) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gridTemplateRows: FILAS_TEMPLATE,
          minWidth: `${anchoMinimo}px`,
        }}
      >
        {ELEMENTOS.map((el) => (
          <div
            key={el.z}
            style={{ gridColumn: el.col, gridRow: filaCss(el.fila) }}
            className="min-w-0"
          >
            {celda(el)}
          </div>
        ))}
        <div
          style={{ gridColumn: 3, gridRow: 6 }}
          className="flex items-center justify-center rounded-[3px] bg-amber/15 font-mono text-[8px] text-amber"
        >
          57-71
        </div>
        <div
          style={{ gridColumn: 3, gridRow: 7 }}
          className="flex items-center justify-center rounded-[3px] bg-amber/15 font-mono text-[8px] text-amber"
        >
          89-103
        </div>
      </div>
    </div>
  );
}
