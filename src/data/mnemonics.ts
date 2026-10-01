// Reglas mnemotécnicas. Las letras entre *asteriscos* se resaltan.
export type Acento = "glow" | "amber" | "sky" | "rose" | "lime" | "iris";

export interface Mnemotecnia {
  id: string;
  titulo: string;
  subtitulo: string;
  acento: Acento;
  frases: string[];
  simbolos: string[];
}

export const MNEMOTECNIAS: Mnemotecnia[] = [
  {
    id: "g1",
    titulo: "Grupo 1",
    subtitulo: "Alcalinos",
    acento: "rose",
    frases: ["*H*ola, *Li**Na*, *K*e *R*e*b*eca se *C*a*s*a con *Fr*ancisco."],
    simbolos: ["H", "Li", "Na", "K", "Rb", "Cs", "Fr"],
  },
  {
    id: "g2",
    titulo: "Grupo 2",
    subtitulo: "Alcalinotérreos",
    acento: "amber",
    frases: [
      "*Be*a es *M*a*G*nifi*Ca* y el *Sr* *Ba**Ra*.",
      "*Be*r a un *M*a*G*o *Ca*gando *S*e*R*ia *Ba*stante *Ra*ro.",
    ],
    simbolos: ["Be", "Mg", "Ca", "Sr", "Ba", "Ra"],
  },
  {
    id: "p3",
    titulo: "Periodo 3",
    subtitulo: "Grupos 13 al 18",
    acento: "lime",
    frases: ["*B*uen *C*aballero *N*o *O*frece *F*lores *Ne*gras."],
    simbolos: ["B", "C", "N", "O", "F", "Ne"],
  },
  {
    id: "g13",
    titulo: "Grupo 13",
    subtitulo: "Térreos",
    acento: "lime",
    frases: ["*Al*a *Ga*nadería *In*dia de *T*arantu*l*as."],
    simbolos: ["B", "Al", "Ga", "In", "Tl"],
  },
  {
    id: "g14",
    titulo: "Grupo 14",
    subtitulo: "Carbonoideos",
    acento: "lime",
    frases: ["*C*omo *Si* la *Ge*nte *S*o*N*riera, *P*a*b*lo."],
    simbolos: ["C", "Si", "Ge", "Sn", "Pb"],
  },
  {
    id: "g15",
    titulo: "Grupo 15",
    subtitulo: "Nitrogenoideos",
    acento: "lime",
    frases: [
      "*N*inguna *P*rofesora *As*turiana *S*a*b*e de *Bi*ología.",
      "*N*o *P*as*A*s (*Sb*) *Bi*en.",
    ],
    simbolos: ["N", "P", "As", "Sb", "Bi"],
  },
  {
    id: "g16",
    titulo: "Grupo 16",
    subtitulo: "Anfígenos",
    acento: "lime",
    frases: ["*O**S*e*Te* *Po*lar."],
    simbolos: ["O", "S", "Se", "Te", "Po"],
  },
  {
    id: "g17",
    titulo: "Grupo 17",
    subtitulo: "Halógenos",
    acento: "glow",
    frases: ["*F*útbol *C*lub *B*a*r*celona *I* *At*leti."],
    simbolos: ["F", "Cl", "Br", "I", "At"],
  },
  {
    id: "g18",
    titulo: "Grupo 18",
    subtitulo: "Gases nobles",
    acento: "iris",
    frases: ["*He* *N*acido *e*n *Ar*agón *Kr*iando *Xe*rpientes y *R*a*n*as."],
    simbolos: ["He", "Ne", "Ar", "Kr", "Xe", "Rn"],
  },
  {
    id: "p4",
    titulo: "Período 4",
    subtitulo: "Transición",
    acento: "sky",
    frases: [
      "*E**Sc*ondete, *Ti*o, *V*ienen *Cr*iaturas *M*o*N*struosas y *Fe*as *Co*n *Ni*ños *Cu*biertos en *Z*i*N*c.",
    ],
    simbolos: ["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn"],
  },
  {
    id: "p5",
    titulo: "Período 5",
    subtitulo: "Transición",
    acento: "sky",
    frases: [
      "*Y*o *Z*umo Na*r*anjas, *N*aranjas *b*onitas, *Mo*jo *T*os*C*adas, *Ru*th *R*íe, *P*i*D*e *Ag*ua y *C*ome *D*átiles.",
    ],
    simbolos: ["Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd"],
  },
  {
    id: "p6",
    titulo: "Período 6",
    subtitulo: "Transición",
    acento: "sky",
    frases: [
      "*H*oy Tambié*f*n, *Ta*mbién *W*alter *Re*coge *Os*os, *Ir*ene *P*iensa *A*umentar *Hg*.",
    ],
    simbolos: ["Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg"],
  },
];

/** Devuelve la mnemotecnia que incluye un símbolo dado. */
export function mnemotecniaDe(simbolo: string): Mnemotecnia | undefined {
  return MNEMOTECNIAS.find((m) => m.simbolos.includes(simbolo));
}

export interface Trozo {
  texto: string;
  resaltado: boolean;
}

/** Convierte "*H*ola" en trozos resaltables. */
export function trozos(frase: string): Trozo[] {
  return frase
    .split("*")
    .filter((t) => t.length > 0)
    .map((texto, i) => ({ texto, resaltado: i % 2 === 1 }));
}
