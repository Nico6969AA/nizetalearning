/* Masas y configuraciones: Periodic-Table-JSON (Bowserinator), MIT. Neutrones estimados con la masa redondeada del isótopo representativo. */
export const ATOMIC_DATA: { mass: number; configuration: string }[] = [
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
