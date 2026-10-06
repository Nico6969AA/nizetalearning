import { ATOMIC_DATA } from "@/data/atomic";
import type { Elemento } from "@/data/elements";

const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 5 });
function temperature(kelvin: number | null | undefined) {
  return kelvin == null ? "No disponible" : `${number.format(Math.round((kelvin - 273.15) * 100) / 100)} °C · ${number.format(kelvin)} K`;
}

export function ElementProperties({ element }: { element: Elemento }) {
  const data = ATOMIC_DATA[element.z - 1];
  const sublimes = element.z === 6 || element.z === 33;
  const oxidation = data?.oxidationStates?.split(",").map((s) => {
    const value = Number(s.trim());
    return value > 0 ? `+${value}` : String(value);
  }).join(", ") || "No disponible";
  return <section aria-label={`Propiedades de ${element.nombre}`} className="mt-4 border-t border-border pt-4">
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {[
        { label: "Masa atómica", value: data?.atomicMass == null ? "No disponible" : `${number.format(data.atomicMass)} u` },
        { label: "Estados de oxidación", value: oxidation },
        { label: "Punto de fusión", value: sublimes ? "Sublima a esta presión" : element.z === 2 ? "No solidifica a esta presión" : temperature(data?.meltingK) },
        { label: "Punto de ebullición", value: sublimes ? "No aplicable a esta presión" : temperature(data?.boilingK) },
      ].map((item) => <div key={item.label}><dt className="text-xs text-mist">{item.label}</dt><dd className="mt-1 break-words font-mono text-sm">{item.value}</dd></div>)}
    </dl>
    <div className="mt-3 space-y-1 text-xs leading-relaxed text-mist">
      <p>Temperaturas de referencia a 1 atm (101,325 kPa); no son temperaturas a 25 °C. Fuente: <a className="text-glow underline underline-offset-2" href="https://pubchem.ncbi.nlm.nih.gov/periodic-table/" target="_blank" rel="noreferrer">PubChem</a>.</p>
      {sublimes && <p>{element.nombre} sublima a 1 atm; sus valores de fusión a presión elevada no se muestran.</p>}
      {element.z === 2 && <p>El helio necesita presión elevada para solidificarse.</p>}
      {element.z >= 84 && <p>Para elementos poco estudiados, las temperaturas disponibles pueden ser estimadas y los estados de oxidación, predichos.</p>}
      {element.z >= 104 && <p>No se muestran temperaturas sin mediciones confirmadas.</p>}
      <p>La masa atómica no es el número de nucleones: el modelo usa A = {data?.mass} para estimar neutrones. En elementos sin isótopos estables, la masa indicada corresponde a un isótopo de referencia. El estado 0 existe en la sustancia elemental; se listan los estados de la fuente.</p>
    </div>
  </section>;
}