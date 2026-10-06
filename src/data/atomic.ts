/* Masas y configuraciones: Periodic-Table-JSON (Bowserinator), MIT. Neutrones estimados con la masa redondeada del isótopo representativo. */
const CONFIGURATION_DATA: { mass: number; configuration: string }[] = [
  { mass: 1, configuration: "1s1" }, // H
  { mass: 4, configuration: "1s2" }, // He
  { mass: 7, configuration: "1s2 2s1" }, // Li
  { mass: 9, configuration: "1s2 2s2" }, // Be
  { mass: 11, configuration: "1s2 2s2 2p1" }, // B
  { mass: 12, configuration: "1s2 2s2 2p2" }, // C
  { mass: 14, configuration: "1s2 2s2 2p3" }, // N
  { mass: 16, configuration: "1s2 2s2 2p4" }, // O
  { mass: 19, configuration: "1s2 2s2 2p5" }, // F
  { mass: 20, configuration: "1s2 2s2 2p6" }, // Ne
  { mass: 23, configuration: "1s2 2s2 2p6 3s1" }, // Na
  { mass: 24, configuration: "1s2 2s2 2p6 3s2" }, // Mg
  { mass: 27, configuration: "1s2 2s2 2p6 3s2 3p1" }, // Al
  { mass: 28, configuration: "1s2 2s2 2p6 3s2 3p2" }, // Si
  { mass: 31, configuration: "1s2 2s2 2p6 3s2 3p3" }, // P
  { mass: 32, configuration: "1s2 2s2 2p6 3s2 3p4" }, // S
  { mass: 35, configuration: "1s2 2s2 2p6 3s2 3p5" }, // Cl
  { mass: 40, configuration: "1s2 2s2 2p6 3s2 3p6" }, // Ar
  { mass: 39, configuration: "1s2 2s2 2p6 3s2 3p6 4s1" }, // K
  { mass: 40, configuration: "1s2 2s2 2p6 3s2 3p6 4s2" }, // Ca
  { mass: 45, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d1" }, // Sc
  { mass: 48, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d2" }, // Ti
  { mass: 51, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d3" }, // V
  { mass: 52, configuration: "1s2 2s2 2p6 3s2 3p6 4s1 3d5" }, // Cr
  { mass: 55, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d5" }, // Mn
  { mass: 56, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d6" }, // Fe
  { mass: 59, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d7" }, // Co
  { mass: 59, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d8" }, // Ni
  { mass: 64, configuration: "1s2 2s2 2p6 3s2 3p6 4s1 3d10" }, // Cu
  { mass: 65, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10" }, // Zn
  { mass: 70, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1" }, // Ga
  { mass: 73, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2" }, // Ge
  { mass: 75, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3" }, // As
  { mass: 79, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4" }, // Se
  { mass: 80, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5" }, // Br
  { mass: 84, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6" }, // Kr
  { mass: 85, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1" }, // Rb
  { mass: 88, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2" }, // Sr
  { mass: 89, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d1" }, // Y
  { mass: 91, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d2" }, // Zr
  { mass: 93, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d4" }, // Nb
  { mass: 96, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d5" }, // Mo
  { mass: 98, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d5" }, // Tc
  { mass: 101, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d7" }, // Ru
  { mass: 103, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d8" }, // Rh
  { mass: 106, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10" }, // Pd
  { mass: 108, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d10" }, // Ag
  { mass: 112, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10" }, // Cd
  { mass: 115, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p1" }, // In
  { mass: 119, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p2" }, // Sn
  { mass: 122, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p3" }, // Sb
  { mass: 128, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p4" }, // Te
  { mass: 127, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5" }, // I
  { mass: 131, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6" }, // Xe
  { mass: 133, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1" }, // Cs
  { mass: 137, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2" }, // Ba
  { mass: 139, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1" }, // La
  { mass: 140, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1 4f1" }, // Ce
  { mass: 141, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f3" }, // Pr
  { mass: 144, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f4" }, // Nd
  { mass: 145, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f5" }, // Pm
  { mass: 150, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f6" }, // Sm
  { mass: 152, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7" }, // Eu
  { mass: 157, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7 5d1" }, // Gd
  { mass: 159, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f9" }, // Tb
  { mass: 163, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f10" }, // Dy
  { mass: 165, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f11" }, // Ho
  { mass: 167, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f12" }, // Er
  { mass: 169, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f13" }, // Tm
  { mass: 173, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14" }, // Yb
  { mass: 175, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d1" }, // Lu
  { mass: 178, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d2" }, // Hf
  { mass: 181, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d3" }, // Ta
  { mass: 184, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4" }, // W
  { mass: 186, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d5" }, // Re
  { mass: 190, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d6" }, // Os
  { mass: 192, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d7" }, // Ir
  { mass: 195, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d9" }, // Pt
  { mass: 197, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d10" }, // Au
  { mass: 201, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10" }, // Hg
  { mass: 204, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p1" }, // Tl
  { mass: 207, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p2" }, // Pb
  { mass: 209, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p3" }, // Bi
  { mass: 209, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p4" }, // Po
  { mass: 210, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p5" }, // At
  { mass: 222, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6" }, // Rn
  { mass: 223, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s1" }, // Fr
  { mass: 226, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2" }, // Ra
  { mass: 227, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d1" }, // Ac
  { mass: 232, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d2" }, // Th
  { mass: 231, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f2 6d1" }, // Pa
  { mass: 238, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1" }, // U
  { mass: 237, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f4 6d1" }, // Np
  { mass: 244, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f6" }, // Pu
  { mass: 243, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7" }, // Am
  { mass: 247, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7 6d1" }, // Cm
  { mass: 247, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f9" }, // Bk
  { mass: 251, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f10" }, // Cf
  { mass: 252, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f11" }, // Es
  { mass: 257, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f12" }, // Fm
  { mass: 258, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f13" }, // Md
  { mass: 259, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14" }, // No
  { mass: 266, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 7p1" }, // Lr
  { mass: 267, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d2" }, // Rf
  { mass: 268, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d3" }, // Db
  { mass: 269, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d4" }, // Sg
  { mass: 270, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d5" }, // Bh
  { mass: 269, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d6" }, // Hs
  { mass: 278, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d7" }, // Mt
  { mass: 281, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d8" }, // Ds
  { mass: 282, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d9" }, // Rg
  { mass: 285, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10" }, // Cn
  { mass: 286, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p1" }, // Nh
  { mass: 289, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p2" }, // Fl
  { mass: 289, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p3" }, // Mc
  { mass: 293, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p4" }, // Lv
  { mass: 294, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p5" }, // Ts
  { mass: 294, configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6" }, // Og
];

export type Orbital = { label: string; level: number; kind: "s" | "p" | "d" | "f"; electrons: number };
export function orbitalsFor(z: number): Orbital[] {
  const configuration = ATOMIC_DATA[z - 1]?.configuration ?? "1s1";
  return configuration.split(" ").map((part) => ({
    label: part.slice(0, 2),
    level: Number(part[0]),
    kind: part[1] as Orbital["kind"],
    electrons: Number(part.slice(2)),
  }));
}

export type ElementProperties = { atomicMass: number; meltingK: number | null; boilingK: number | null; oxidationStates: string };
/** PubChem Periodic Table, retrieved 2026-10-06. Missing measurements stay null. */
const ELEMENT_PROPERTIES: ElementProperties[] = [
  {
    "atomicMass": 1.008,
    "meltingK": 13.81,
    "boilingK": 20.28,
    "oxidationStates": "+1, -1"
  },
  {
    "atomicMass": 4.0026,
    "meltingK": null,
    "boilingK": 4.22,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 7.0,
    "meltingK": 453.65,
    "boilingK": 1615.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 9.012183,
    "meltingK": 1560.0,
    "boilingK": 2744.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 10.81,
    "meltingK": 2348.0,
    "boilingK": 4273.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 12.011,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+4, +2, -4"
  },
  {
    "atomicMass": 14.007,
    "meltingK": 63.15,
    "boilingK": 77.36,
    "oxidationStates": "+5, +4, +3, +2, +1, -1, -2, -3"
  },
  {
    "atomicMass": 15.999,
    "meltingK": 54.36,
    "boilingK": 90.2,
    "oxidationStates": "-2"
  },
  {
    "atomicMass": 18.99840316,
    "meltingK": 53.53,
    "boilingK": 85.03,
    "oxidationStates": "-1"
  },
  {
    "atomicMass": 20.18,
    "meltingK": 24.56,
    "boilingK": 27.07,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 22.9897693,
    "meltingK": 370.95,
    "boilingK": 1156.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 24.305,
    "meltingK": 923.0,
    "boilingK": 1363.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 26.981538,
    "meltingK": 933.437,
    "boilingK": 2792.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 28.085,
    "meltingK": 1687.0,
    "boilingK": 3538.0,
    "oxidationStates": "+4, +2, -4"
  },
  {
    "atomicMass": 30.973762,
    "meltingK": 317.3,
    "boilingK": 553.65,
    "oxidationStates": "+5, +3, -3"
  },
  {
    "atomicMass": 32.07,
    "meltingK": 388.36,
    "boilingK": 717.75,
    "oxidationStates": "+6, +4, -2"
  },
  {
    "atomicMass": 35.45,
    "meltingK": 171.65,
    "boilingK": 239.11,
    "oxidationStates": "+7, +5, +1, -1"
  },
  {
    "atomicMass": 39.9,
    "meltingK": 83.8,
    "boilingK": 87.3,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 39.0983,
    "meltingK": 336.53,
    "boilingK": 1032.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 40.08,
    "meltingK": 1115.0,
    "boilingK": 1757.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 44.95591,
    "meltingK": 1814.0,
    "boilingK": 3109.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 47.867,
    "meltingK": 1941.0,
    "boilingK": 3560.0,
    "oxidationStates": "+4, +3, +2"
  },
  {
    "atomicMass": 50.9415,
    "meltingK": 2183.0,
    "boilingK": 3680.0,
    "oxidationStates": "+5, +4, +3, +2"
  },
  {
    "atomicMass": 51.996,
    "meltingK": 2180.0,
    "boilingK": 2944.0,
    "oxidationStates": "+6, +3, +2"
  },
  {
    "atomicMass": 54.93804,
    "meltingK": 1519.0,
    "boilingK": 2334.0,
    "oxidationStates": "+7, +4, +3, +2"
  },
  {
    "atomicMass": 55.84,
    "meltingK": 1811.0,
    "boilingK": 3134.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 58.93319,
    "meltingK": 1768.0,
    "boilingK": 3200.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 58.693,
    "meltingK": 1728.0,
    "boilingK": 3186.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 63.55,
    "meltingK": 1357.77,
    "boilingK": 2835.0,
    "oxidationStates": "+2, +1"
  },
  {
    "atomicMass": 65.4,
    "meltingK": 692.68,
    "boilingK": 1180.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 69.723,
    "meltingK": 302.91,
    "boilingK": 2477.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 72.63,
    "meltingK": 1211.4,
    "boilingK": 3106.0,
    "oxidationStates": "+4, +2"
  },
  {
    "atomicMass": 74.92159,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+5, +3, -3"
  },
  {
    "atomicMass": 78.97,
    "meltingK": 493.65,
    "boilingK": 958.0,
    "oxidationStates": "+6, +4, -2"
  },
  {
    "atomicMass": 79.9,
    "meltingK": 265.95,
    "boilingK": 331.95,
    "oxidationStates": "+5, +1, -1"
  },
  {
    "atomicMass": 83.8,
    "meltingK": 115.79,
    "boilingK": 119.93,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 85.468,
    "meltingK": 312.46,
    "boilingK": 961.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 87.62,
    "meltingK": 1050.0,
    "boilingK": 1655.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 88.90584,
    "meltingK": 1795.0,
    "boilingK": 3618.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 91.22,
    "meltingK": 2128.0,
    "boilingK": 4682.0,
    "oxidationStates": "+4"
  },
  {
    "atomicMass": 92.90637,
    "meltingK": 2750.0,
    "boilingK": 5017.0,
    "oxidationStates": "+5, +3"
  },
  {
    "atomicMass": 95.95,
    "meltingK": 2896.0,
    "boilingK": 4912.0,
    "oxidationStates": "+6"
  },
  {
    "atomicMass": 96.90636,
    "meltingK": 2430.0,
    "boilingK": 4538.0,
    "oxidationStates": "+7, +6, +4"
  },
  {
    "atomicMass": 101.1,
    "meltingK": 2607.0,
    "boilingK": 4423.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 102.9055,
    "meltingK": 2237.0,
    "boilingK": 3968.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 106.42,
    "meltingK": 1828.05,
    "boilingK": 3236.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 107.868,
    "meltingK": 1234.93,
    "boilingK": 2435.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 112.41,
    "meltingK": 594.22,
    "boilingK": 1040.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 114.818,
    "meltingK": 429.75,
    "boilingK": 2345.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 118.71,
    "meltingK": 505.08,
    "boilingK": 2875.0,
    "oxidationStates": "+4, +2"
  },
  {
    "atomicMass": 121.76,
    "meltingK": 903.78,
    "boilingK": 1860.0,
    "oxidationStates": "+5, +3, -3"
  },
  {
    "atomicMass": 127.6,
    "meltingK": 722.66,
    "boilingK": 1261.0,
    "oxidationStates": "+6, +4, -2"
  },
  {
    "atomicMass": 126.9045,
    "meltingK": 386.85,
    "boilingK": 457.55,
    "oxidationStates": "+7, +5, +1, -1"
  },
  {
    "atomicMass": 131.29,
    "meltingK": 161.36,
    "boilingK": 165.03,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 132.905452,
    "meltingK": 301.59,
    "boilingK": 944.0,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 137.33,
    "meltingK": 1000.0,
    "boilingK": 2170.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 138.9055,
    "meltingK": 1191.0,
    "boilingK": 3737.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 140.116,
    "meltingK": 1071.0,
    "boilingK": 3697.0,
    "oxidationStates": "+4, +3"
  },
  {
    "atomicMass": 140.90766,
    "meltingK": 1204.0,
    "boilingK": 3793.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 144.24,
    "meltingK": 1294.0,
    "boilingK": 3347.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 144.91276,
    "meltingK": 1315.0,
    "boilingK": 3273.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 150.4,
    "meltingK": 1347.0,
    "boilingK": 2067.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 151.964,
    "meltingK": 1095.0,
    "boilingK": 1802.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 157.25,
    "meltingK": 1586.0,
    "boilingK": 3546.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 158.92535,
    "meltingK": 1629.0,
    "boilingK": 3503.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 162.5,
    "meltingK": 1685.0,
    "boilingK": 2840.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 164.93033,
    "meltingK": 1747.0,
    "boilingK": 2973.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 167.26,
    "meltingK": 1802.0,
    "boilingK": 3141.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 168.93422,
    "meltingK": 1818.0,
    "boilingK": 2223.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 173.05,
    "meltingK": 1092.0,
    "boilingK": 1469.0,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 174.9667,
    "meltingK": 1936.0,
    "boilingK": 3675.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 178.49,
    "meltingK": 2506.0,
    "boilingK": 4876.0,
    "oxidationStates": "+4"
  },
  {
    "atomicMass": 180.9479,
    "meltingK": 3290.0,
    "boilingK": 5731.0,
    "oxidationStates": "+5"
  },
  {
    "atomicMass": 183.84,
    "meltingK": 3695.0,
    "boilingK": 5828.0,
    "oxidationStates": "+6"
  },
  {
    "atomicMass": 186.207,
    "meltingK": 3459.0,
    "boilingK": 5869.0,
    "oxidationStates": "+7, +6, +4"
  },
  {
    "atomicMass": 190.2,
    "meltingK": 3306.0,
    "boilingK": 5285.0,
    "oxidationStates": "+4, +3"
  },
  {
    "atomicMass": 192.22,
    "meltingK": 2719.0,
    "boilingK": 4701.0,
    "oxidationStates": "+4, +3"
  },
  {
    "atomicMass": 195.08,
    "meltingK": 2041.55,
    "boilingK": 4098.0,
    "oxidationStates": "+4, +2"
  },
  {
    "atomicMass": 196.96657,
    "meltingK": 1337.33,
    "boilingK": 3129.0,
    "oxidationStates": "+3, +1"
  },
  {
    "atomicMass": 200.59,
    "meltingK": 234.32,
    "boilingK": 629.88,
    "oxidationStates": "+2, +1"
  },
  {
    "atomicMass": 204.383,
    "meltingK": 577.0,
    "boilingK": 1746.0,
    "oxidationStates": "+3, +1"
  },
  {
    "atomicMass": 207.0,
    "meltingK": 600.61,
    "boilingK": 2022.0,
    "oxidationStates": "+4, +2"
  },
  {
    "atomicMass": 208.9804,
    "meltingK": 544.55,
    "boilingK": 1837.0,
    "oxidationStates": "+5, +3"
  },
  {
    "atomicMass": 208.98243,
    "meltingK": 527.0,
    "boilingK": 1235.0,
    "oxidationStates": "+4, +2"
  },
  {
    "atomicMass": 209.98715,
    "meltingK": 575.0,
    "boilingK": null,
    "oxidationStates": "7, 5, 3, 1, -1"
  },
  {
    "atomicMass": 222.01758,
    "meltingK": 202.0,
    "boilingK": 211.45,
    "oxidationStates": "0"
  },
  {
    "atomicMass": 223.01973,
    "meltingK": 300.0,
    "boilingK": null,
    "oxidationStates": "+1"
  },
  {
    "atomicMass": 226.02541,
    "meltingK": 973.0,
    "boilingK": 1413.0,
    "oxidationStates": "+2"
  },
  {
    "atomicMass": 227.02775,
    "meltingK": 1324.0,
    "boilingK": 3471.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 232.038,
    "meltingK": 2023.0,
    "boilingK": 5061.0,
    "oxidationStates": "+4"
  },
  {
    "atomicMass": 231.03588,
    "meltingK": 1845.0,
    "boilingK": null,
    "oxidationStates": "+5, +4"
  },
  {
    "atomicMass": 238.0289,
    "meltingK": 1408.0,
    "boilingK": 4404.0,
    "oxidationStates": "+6, +5, +4, +3"
  },
  {
    "atomicMass": 237.048172,
    "meltingK": 917.0,
    "boilingK": 4175.0,
    "oxidationStates": "+6, +5, +4, +3"
  },
  {
    "atomicMass": 244.0642,
    "meltingK": 913.0,
    "boilingK": 3501.0,
    "oxidationStates": "+6, +5, +4, +3"
  },
  {
    "atomicMass": 243.06138,
    "meltingK": 1449.0,
    "boilingK": 2284.0,
    "oxidationStates": "+6, +5, +4, +3"
  },
  {
    "atomicMass": 247.07035,
    "meltingK": 1618.0,
    "boilingK": 3400.0,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 247.07031,
    "meltingK": 1323.0,
    "boilingK": null,
    "oxidationStates": "+4, +3"
  },
  {
    "atomicMass": 251.07959,
    "meltingK": 1173.0,
    "boilingK": null,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 252.083,
    "meltingK": 1133.0,
    "boilingK": null,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 257.09511,
    "meltingK": 1800.0,
    "boilingK": null,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 258.09843,
    "meltingK": 1100.0,
    "boilingK": null,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 259.101,
    "meltingK": 1100.0,
    "boilingK": null,
    "oxidationStates": "+3, +2"
  },
  {
    "atomicMass": 266.12,
    "meltingK": 1900.0,
    "boilingK": null,
    "oxidationStates": "+3"
  },
  {
    "atomicMass": 267.122,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+4"
  },
  {
    "atomicMass": 268.126,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "5, 4, 3"
  },
  {
    "atomicMass": 269.128,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "6, 5, 4, 3, 0"
  },
  {
    "atomicMass": 270.133,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "7, 5, 4, 3"
  },
  {
    "atomicMass": 269.1336,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "8, 6, 5, 4, 3, 2"
  },
  {
    "atomicMass": 277.154,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "9, 8, 6, 4, 3, 1"
  },
  {
    "atomicMass": 282.166,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "8, 6, 4, 2, 0"
  },
  {
    "atomicMass": 282.169,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "5, 3, 1, -1"
  },
  {
    "atomicMass": 286.179,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "2, 1, 0"
  },
  {
    "atomicMass": 286.182,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": ""
  },
  {
    "atomicMass": 290.192,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "6, 4,2, 1, 0"
  },
  {
    "atomicMass": 290.196,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "3, 1"
  },
  {
    "atomicMass": 293.205,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+4, +2, -2"
  },
  {
    "atomicMass": 294.211,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+5, +3, +1, -1"
  },
  {
    "atomicMass": 295.216,
    "meltingK": null,
    "boilingK": null,
    "oxidationStates": "+6, +4, +2, +1, 0, -1"
  }
];

export const ATOMIC_DATA = CONFIGURATION_DATA.map((data, index) => ({ ...data, ...ELEMENT_PROPERTIES[index] }));
