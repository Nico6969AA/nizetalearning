import type { Orbital } from "./atomic";

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

/** Close-packed FCC sites: adjacent nucleons touch, even for heavy elements. */
export function packedNucleus(total: number) {
  const particleRadius = Math.min(0.23, 0.62 / Math.cbrt(total));
  const spacing = particleRadius * Math.SQRT2 * 0.98;
  const range = Math.ceil(Math.cbrt(total)) + 1;
  const sites: [number, number, number][] = [];
  for (let x = -range; x <= range; x++)
    for (let y = -range; y <= range; y++)
      for (let z = -range; z <= range; z++)
        if ((x + y + z) % 2 === 0) sites.push([x, y, z]);
  sites.sort((a, b) => a[0] ** 2 + a[1] ** 2 + a[2] ** 2 - b[0] ** 2 - b[1] ** 2 - b[2] ** 2);
  const selected = sites.slice(0, total);
  const center = [0, 1, 2].map((axis) => selected.reduce((sum, p) => sum + (p[axis] ?? 0), 0) / total);
  return { particleRadius, positions: selected.map((p) => p.map((v, axis) => (v - (center[axis] ?? 0)) * spacing)) };
}

export function orbitalExtent(level: number) { return 0.8 + 0.45 * level + 0.04 * level * level; }

function laguerre(k: number, alpha: number, x: number) {
  let prev = 1, current = 1 + alpha - x;
  if (k === 0) return prev;
  for (let i = 2; i <= k; i++) {
    const next = ((2 * i - 1 + alpha - x) * current - (i - 1 + alpha) * prev) / i;
    prev = current; current = next;
  }
  return current;
}

/** Hydrogen-like radial distribution with n-l-1 nodes; schematic scale for multi-electron atoms. */
export function orbitalPoints(orbital: Orbital, count = 14000) {
  const n = orbital.level, l = "spdf".indexOf(orbital.kind);
  const rng = seeded(n * 100 + l);
  const steps = 1600, maxRho = 4 * n + 24;
  const cdf: number[] = [];
  let sum = 0;
  for (let i = 0; i <= steps; i++) {
    const rho = i * maxRho / steps;
    sum += Math.exp(-rho) * rho ** (2 * l + 2) * laguerre(n - l - 1, 2 * l + 1, rho) ** 2;
    cdf.push(sum);
  }
  const cutoff = cdf.findIndex((v) => v >= sum * 0.995);
  const rhoExtent = cutoff * maxRho / steps;
  const coords = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const target = rng() * sum * 0.995;
    let low = 0, high = cutoff;
    while (low < high) { const mid = (low + high) >>> 1; if ((cdf[mid] ?? 0) < target) low = mid + 1; else high = mid; }
    const radius = ((low + rng()) * maxRho / steps) / rhoExtent * orbitalExtent(n);
    let x = 0, y = 0, z = 0, accept = false;
    while (!accept) {
      z = 2 * rng() - 1;
      const phi = rng() * Math.PI * 2, radial = Math.sqrt(1 - z * z);
      x = radial * Math.cos(phi); y = radial * Math.sin(phi);
      const angular = l === 0 ? 1 : l === 1 ? z * z : l === 2 ? (x * x - y * y) ** 2 : 27 * (x * y * z) ** 2;
      accept = rng() < angular;
    }
    coords.set([x * radius, y * radius, z * radius], i * 3);
  }
  return coords;
}