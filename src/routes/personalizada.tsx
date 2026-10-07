import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLOR_CATEGORIA, Leyenda } from "@/components/ElementCell";
import type { Categoria } from "@/data/elements";
import {
  cargarPersonalizados,
  guardarPersonalizados,
  posicionPersonalizada,
  validarElemento,
  type ElementoPersonalizado,
} from "@/data/custom-elements";

export const Route = createFileRoute("/personalizada")({
  head: () => ({
    meta: [
      { title: "Tabla personalizada — Crea tus elementos | Nizeta" },
      {
        name: "description",
        content:
          "Construye tus propios elementos más allá del 118: elige nombre, símbolo, familia y propiedades, y colócalos en la tabla extendida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Tabla personalizada — Crea tus elementos | Nizeta" },
      {
        property: "og:description",
        content: "Inventa elementos nuevos más allá del 118 y colócalos en tu propia tabla.",
      },
      { property: "og:url", content: "https://nizetalearning.lovable.app/personalizada" },
    ],
    links: [{ rel: "canonical", href: "https://nizetalearning.lovable.app/personalizada" }],
  }),
  component: Personalizada,
});

const CATEGORIAS: { valor: Categoria; etiqueta: string }[] = [
  { valor: "alcalino", etiqueta: "Alcalino" },
  { valor: "alcalinoterreo", etiqueta: "Alcalinotérreo" },
  { valor: "transicion", etiqueta: "Transición" },
  { valor: "otro", etiqueta: "Otro metal" },
  { valor: "nometal", etiqueta: "No metal" },
  { valor: "halogeno", etiqueta: "Halógeno" },
  { valor: "noble", etiqueta: "Gas noble" },
  { valor: "lantanido", etiqueta: "Lantánido" },
  { valor: "actinido", etiqueta: "Actínido" },
];

const VACIO: ElementoPersonalizado = {
  z: 119,
  simbolo: "",
  nombre: "",
  categoria: "otro",
};

function Personalizada() {
  const [elementos, setElementos] = useState<ElementoPersonalizado[]>([]);
  const [form, setForm] = useState<ElementoPersonalizado>(VACIO);
  const [error, setError] = useState<string | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setElementos(cargarPersonalizados());
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) guardarPersonalizados(elementos);
  }, [elementos, cargado]);

  function actualizar(campo: keyof ElementoPersonalizado, valor: string) {
    setForm((f) => ({
      ...f,
      [campo]:
        campo === "z" || campo === "masa" || campo === "fusionC" || campo === "ebullicionC"
          ? valor === ""
            ? undefined
            : Number(valor)
          : valor,
    }));
  }

  function agregar() {
    const nuevo: ElementoPersonalizado = {
      ...form,
      simbolo: form.simbolo.trim(),
      nombre: form.nombre.trim(),
      oxidacion: form.oxidacion?.trim() || undefined,
    };
    const problema = validarElemento(nuevo, elementos);
    if (problema) {
      setError(problema);
      return;
    }
    setError(null);
    setElementos((lista) => [...lista, nuevo].sort((a, b) => a.z - b.z));
    setForm({ ...VACIO, z: nuevo.z + 1 });
  }

  function borrar(z: number) {
    setElementos((lista) => lista.filter((e) => e.z !== z));
  }

  const filas = elementos.length
    ? Math.max(...elementos.map((e) => posicionPersonalizada(e.z).fila)) - 9
    : 0;

  return (
    <>
      <section className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-base font-semibold">Crear elemento</h1>
          <span className="font-mono text-[10px] tracking-wider text-mist">
            {elementos.length} creados
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Número</span>
            <input
              type="number"
              min={119}
              value={form.z}
              onChange={(e) => actualizar("z", e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Símbolo</span>
            <input
              type="text"
              maxLength={3}
              value={form.simbolo}
              onChange={(e) => actualizar("simbolo", e.target.value.replace(/[^A-Za-z]/g, ""))}
              placeholder="Xx"
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Nombre</span>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => actualizar("nombre", e.target.value)}
              placeholder="Mi elemento"
              className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Familia</span>
            <select
              value={form.categoria}
              onChange={(e) => actualizar("categoria", e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-1 focus:ring-glow"
            >
              {CATEGORIAS.map((c) => (
                <option key={c.valor} value={c.valor}>
                  {c.etiqueta}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Masa</span>
            <input
              type="number"
              step="any"
              value={form.masa ?? ""}
              onChange={(e) => actualizar("masa", e.target.value)}
              placeholder="u"
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Fusión °C</span>
            <input
              type="number"
              step="any"
              value={form.fusionC ?? ""}
              onChange={(e) => actualizar("fusionC", e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
              Ebullición °C
            </span>
            <input
              type="number"
              step="any"
              value={form.ebullicionC ?? ""}
              onChange={(e) => actualizar("ebullicionC", e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
              Oxidación
            </span>
            <input
              type="text"
              value={form.oxidacion ?? ""}
              onChange={(e) => actualizar("oxidacion", e.target.value)}
              placeholder="+1, +2"
              className="rounded-lg border border-input bg-background px-2.5 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-glow"
            />
          </label>
        </div>

        {error && <p className="mt-2.5 text-sm text-rose">{error}</p>}

        <Button type="button" size="sm" className="mt-3" onClick={agregar}>
          <Plus className="size-4" /> Añadir a la tabla
        </Button>
      </section>

      <section className="glass mt-5 rounded-2xl p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Tu tabla extendida</h2>
          <span className="font-mono text-[10px] tracking-wider text-mist">Período 8+</span>
        </div>

        <Leyenda />

        {elementos.length === 0 ? (
          <p className="py-6 text-center text-sm text-mist">
            Aún no has creado ningún elemento. Usa el formulario de arriba para inventar el 119.
          </p>
        ) : (
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                gridTemplateRows: `repeat(${filas}, minmax(0, 1fr))`,
                minWidth: "680px",
              }}
            >
              {elementos.map((el) => {
                const c = COLOR_CATEGORIA[el.categoria];
                const pos = posicionPersonalizada(el.z);
                return (
                  <div
                    key={el.z}
                    style={{ gridColumn: pos.col, gridRow: pos.fila - 9 }}
                    className="group relative min-w-0"
                  >
                    <div
                      className={`flex aspect-square w-full flex-col items-center justify-center rounded-[3px] leading-none ${c.fondo}`}
                      title={`${el.nombre} (${el.simbolo})`}
                    >
                      <span className="font-mono text-[8px] opacity-55">{el.z}</span>
                      <span className={`text-[13px] font-semibold ${c.texto}`}>{el.simbolo}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => borrar(el.z)}
                      aria-label={`Borrar ${el.nombre}`}
                      className="absolute -top-1.5 -right-1.5 hidden size-4 place-items-center rounded-full bg-rose text-ink group-hover:grid"
                    >
                      <Trash2 className="size-2.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {elementos.length > 0 && (
          <div className="mt-4 space-y-2.5 border-t border-border pt-3">
            {elementos.map((el) => (
              <article key={el.z} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    <span className={`font-mono ${COLOR_CATEGORIA[el.categoria].texto}`}>
                      {el.simbolo}
                    </span>{" "}
                    {el.nombre}
                    <span className="ml-2 font-mono text-[10px] text-mist">Z = {el.z}</span>
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-mist">
                    {[
                      el.masa !== undefined && `Masa ${el.masa} u`,
                      el.fusionC !== undefined && `Fusión ${el.fusionC} °C`,
                      el.ebullicionC !== undefined && `Ebullición ${el.ebullicionC} °C`,
                      el.oxidacion && `Oxidación ${el.oxidacion}`,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "Sin propiedades definidas"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => borrar(el.z)}
                  aria-label={`Borrar ${el.nombre}`}
                  className="rounded-full p-1.5 text-mist transition-colors hover:bg-rose/15 hover:text-rose"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
