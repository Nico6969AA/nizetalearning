import type { Categoria } from "@/data/elements";

export interface ElementoPersonalizado {
  z: number;
  simbolo: string;
  nombre: string;
  categoria: Categoria;
  masa?: number | undefined;
  fusionC?: number | undefined;
  ebullicionC?: number | undefined;
  oxidacion?: string | undefined;
}

const CLAVE = "nizeta-elementos-personalizados";

export function cargarPersonalizados(): ElementoPersonalizado[] {
  if (typeof window === "undefined") return [];
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos = JSON.parse(crudo) as ElementoPersonalizado[];
    return Array.isArray(datos) ? datos.filter((e) => e && e.z >= 119) : [];
  } catch {
    return [];
  }
}

export function guardarPersonalizados(lista: ElementoPersonalizado[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLAVE, JSON.stringify(lista));
}

/** Posición en la tabla extendida: período 8 en adelante, 18 columnas. */
export function posicionPersonalizada(z: number): { fila: number; col: number } {
  const indice = z - 119;
  return { fila: 10 + Math.floor(indice / 18), col: (indice % 18) + 1 };
}

export function validarElemento(
  e: ElementoPersonalizado,
  existentes: ElementoPersonalizado[],
): string | null {
  if (!Number.isInteger(e.z) || e.z < 119) return "El número atómico debe ser un entero mayor que 118.";
  if (existentes.some((x) => x.z === e.z)) return `Ya existe un elemento con el número ${e.z}.`;
  if (!/^[A-Za-z]{1,3}$/.test(e.simbolo)) return "El símbolo debe tener de 1 a 3 letras.";
  if (existentes.some((x) => x.simbolo.toLowerCase() === e.simbolo.toLowerCase()))
    return `Ya existe un elemento con el símbolo ${e.simbolo}.`;
  if (!e.nombre.trim()) return "El nombre es obligatorio.";
  return null;
}
