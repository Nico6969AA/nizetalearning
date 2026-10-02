import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ATOMIC_DATA, orbitalsFor, type Orbital } from "@/data/atomic";
import type { Elemento } from "@/data/elements";

type Mode = "particulas" | "cuantico";
type Nucleon = "proton" | "neutron";
type Palette = { proton: string; neutron: string; electron: string; up: string; down: string; cloud: string; backdrop: string };
const FALLBACK: Palette = { proton: "#e891a1", neutron: "#f2c981", electron: "#8ae0d0", up: "#8ae0d0", down: "#87b6ea", cloud: "#aab4f4", backdrop: "#192031" };

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function Points({ count, radius, color, onSelect }: { count: number; radius: number; color: string; onSelect: (part: Nucleon) => void }) {
  const protons = useRef<THREE.InstancedMesh>(null);
  const neutrons = useRef<THREE.InstancedMesh>(null);
  const neutronCount = Math.max(0, count - Math.floor(count / 2));
  const protonCount = count - neutronCount;
  useEffect(() => {
    const rng = seeded(count + 814);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt((i + 0.5) / count) * radius;
      const y = 1 - 2 * rng();
      const a = rng() * Math.PI * 2;
      const rr = Math.sqrt(1 - y * y);
      dummy.position.set(r * rr * Math.cos(a), r * y, r * rr * Math.sin(a));
      dummy.scale.setScalar(Math.min(0.26, 0.54 / Math.cbrt(count)));
      dummy.updateMatrix();
      const target = i < protonCount ? protons.current : neutrons.current;
      target?.setMatrixAt(i < protonCount ? i : i - protonCount, dummy.matrix);
    }
    if (protons.current) protons.current.instanceMatrix.needsUpdate = true;
    if (neutrons.current) neutrons.current.instanceMatrix.needsUpdate = true;
  }, [count, radius, protonCount]);
  return <>
    <instancedMesh ref={protons} args={[undefined, undefined, protonCount]} onClick={(e) => { e.stopPropagation(); onSelect("proton"); }}>
      <sphereGeometry args={[1, 10, 8]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.18} />
    </instancedMesh>
    <instancedMesh ref={neutrons} args={[undefined, undefined, neutronCount]} onClick={(e) => { e.stopPropagation(); onSelect("neutron"); }}>
      <sphereGeometry args={[1, 10, 8]} /><meshStandardMaterial color={FALLBACK.neutron} roughness={0.35} metalness={0.18} />
    </instancedMesh>
  </>;
}

function Nucleus({ protons, neutrons, palette, onSelect }: { protons: number; neutrons: number; palette: Palette; onSelect: (part: Nucleon) => void }) {
  const total = protons + neutrons;
  const radius = 0.38 + 0.13 * Math.cbrt(total);
  const p = useRef<THREE.InstancedMesh>(null);
  const n = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const rng = seeded(protons * 919 + neutrons);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < total; i++) {
      const r = Math.cbrt((i + 0.5) / total) * radius;
      const y = 1 - 2 * rng();
      const a = rng() * Math.PI * 2;
      const rr = Math.sqrt(1 - y * y);
      dummy.position.set(r * rr * Math.cos(a), r * y, r * rr * Math.sin(a));
      dummy.scale.setScalar(Math.min(0.23, 0.53 / Math.cbrt(total)));
      dummy.updateMatrix();
      const target = i < protons ? p.current : n.current;
      target?.setMatrixAt(i < protons ? i : i - protons, dummy.matrix);
    }
    if (p.current) p.current.instanceMatrix.needsUpdate = true;
    if (n.current) n.current.instanceMatrix.needsUpdate = true;
  }, [protons, neutrons, radius, total]);
  return <group>
    <instancedMesh ref={p} args={[undefined, undefined, protons]} onClick={(e) => { e.stopPropagation(); onSelect("proton"); }}>
      <sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color={palette.proton} metalness={0.1} roughness={0.4} />
    </instancedMesh>
    {neutrons > 0 && <instancedMesh ref={n} args={[undefined, undefined, neutrons]} onClick={(e) => { e.stopPropagation(); onSelect("neutron"); }}>
      <sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color={palette.neutron} metalness={0.1} roughness={0.4} />
    </instancedMesh>}
  </group>;
}

function ElectronShell({ shell, amount, palette, paused }: { shell: number; amount: number; palette: Palette; paused: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const radius = 1.35 + shell * 0.39;
  useFrame((_, delta) => { if (ref.current && !paused) ref.current.rotation.y += Math.min(delta, 0.05) * (0.2 + 0.05 / shell); });
  return <group ref={ref} rotation={[shell * 0.3, shell * 0.24, shell * 0.12]}>
    <mesh rotation-x={Math.PI / 2}>
      <torusGeometry args={[radius, 0.008, 4, 96]} /><meshBasicMaterial color={palette.electron} transparent opacity={0.26} />
    </mesh>
    {Array.from({ length: amount }, (_, i) => {
      const angle = 2 * Math.PI * i / amount;
      return <mesh key={i} position={[radius * Math.cos(angle), 0, radius * Math.sin(angle)]}>
        <sphereGeometry args={[0.055, 10, 8]} /><meshBasicMaterial color={palette.electron} />
      </mesh>;
    })}
  </group>;
}

function QuarkDetail({ part, palette, paused }: { part: Nucleon; palette: Palette; paused: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current && !paused) ref.current.rotation.y += Math.min(delta, 0.05) * 0.28; });
  const quarks = part === "proton" ? ["up", "up", "down"] as const : ["up", "down", "down"] as const;
  const base = part === "proton" ? palette.proton : palette.neutron;
  return <group ref={ref}>
    <mesh><sphereGeometry args={[1.75, 32, 24]} /><meshStandardMaterial color={base} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    {quarks.map((q, i) => {
      const angle = i * Math.PI * 2 / 3 + Math.PI / 2;
      return <group key={i} position={[Math.cos(angle) * 0.87, Math.sin(angle) * 0.75, i === 1 ? 0.4 : -0.2]}>
        <mesh><sphereGeometry args={[0.43, 24, 16]} /><meshStandardMaterial color={q === "up" ? palette.up : palette.down} emissive={q === "up" ? palette.up : palette.down} emissiveIntensity={0.18} /></mesh>
      </group>;
    })}
  </group>;
}

function Cloud({ orbital, palette }: { orbital: Orbital; palette: Palette }) {
  const geometry = useMemo(() => {
    const rng = seeded(orbital.level * 100 + orbital.kind.charCodeAt(0));
    const coords: number[] = [];
    const count = 2400;
    const radius = 1.2 + orbital.level * 0.38;
    while (coords.length < count * 3) {
      const x = (rng() * 2 - 1), y = (rng() * 2 - 1), z = (rng() * 2 - 1);
      const r = Math.hypot(x, y, z);
      if (r > 1 || r < 0.05) continue;
      const angular = orbital.kind === "s" ? 1 : orbital.kind === "p" ? (z * z / (r * r)) : orbital.kind === "d" ? Math.pow((x * x - y * y) / (r * r), 2) : Math.pow(x * y * z / (r * r * r) * 5, 2);
      const radial = Math.exp(-Math.pow((r - 0.56) * 3.3, 2));
      if (rng() < angular * radial) coords.push(x * radius, y * radius, z * radius);
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
    return result;
  }, [orbital]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <points geometry={geometry}>
    <pointsMaterial size={0.038} color={palette.cloud} transparent opacity={0.52} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
  </points>;
}

function AtomScene({ element, mode, orbital, detail, palette, paused, onSelect }: { element: Elemento; mode: Mode; orbital: Orbital; detail: Nucleon | null; palette: Palette; paused: boolean; onSelect: (part: Nucleon) => void }) {
  const data = ATOMIC_DATA[element.z - 1];
  const shells = useMemo(() => {
    const result: number[] = [];
    for (const o of orbitalsFor(element.z)) result[o.level - 1] = (result[o.level - 1] ?? 0) + o.electrons;
    return result;
  }, [element.z]);
  return <>
    <color attach="background" args={[palette.backdrop]} />
    <ambientLight intensity={0.75} /><pointLight position={[5, 5, 7]} intensity={45} />
    <Environment><Lightformer intensity={2} position={[0, 5, 3]} scale={[10, 10, 1]} /></Environment>
    {detail ? <QuarkDetail part={detail} palette={palette} paused={paused} /> : <>
      <Nucleus protons={element.z} neutrons={Math.max(0, (data?.mass ?? element.z) - element.z)} palette={palette} onSelect={onSelect} />
      {mode === "particulas" ? shells.map((amount, i) => <ElectronShell key={i} shell={i + 1} amount={amount ?? 0} palette={palette} paused={paused} />) : <Cloud orbital={orbital} palette={palette} />}
    </>}
    <OrbitControls enablePan={false} minDistance={4.5} maxDistance={18} enableDamping />
  </>;
}

export function AtomViewer({ element, onClose }: { element: Elemento; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("particulas");
  const [detail, setDetail] = useState<Nucleon | null>(null);
  const [paused, setPaused] = useState(false);
  const [orbitalIndex, setOrbitalIndex] = useState(0);
  const [palette, setPalette] = useState<Palette>(FALLBACK);
  const orbitals = useMemo(() => orbitalsFor(element.z), [element.z]);
  const activeOrbital = orbitals[orbitalIndex] ?? orbitals[0];
  const mass = ATOMIC_DATA[element.z - 1]?.mass ?? element.z;
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setPalette({ proton: root.getPropertyValue("--atom-proton").trim(), neutron: root.getPropertyValue("--atom-neutron").trim(), electron: root.getPropertyValue("--atom-electron").trim(), up: root.getPropertyValue("--atom-up").trim(), down: root.getPropertyValue("--atom-down").trim(), cloud: root.getPropertyValue("--atom-cloud").trim(), backdrop: root.getPropertyValue("--atom-backdrop").trim() });
  }, []);
  useEffect(() => { setDetail(null); setOrbitalIndex(0); }, [element.z]);
  return <section aria-label={`Átomo de ${element.nombre} en 3D`} className="mt-5 border-t border-border pt-5">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div><p className="font-mono text-[10px] uppercase text-glow">Explorador atómico / {String(element.z).padStart(3, "0")}</p><h2 className="text-xl font-semibold">{element.nombre} <span className="font-mono text-mist">{element.simbolo}</span></h2></div>
      <Button type="button" variant="ghost" size="icon" aria-label="Cerrar visualización" title="Cerrar visualización" onClick={onClose}><X className="size-4" /></Button>
    </div>
    <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Modo de visualización">
      <Button type="button" size="sm" variant={mode === "particulas" ? "default" : "outline"} onClick={() => { setMode("particulas"); setDetail(null); }}>Partículas</Button>
      <Button type="button" size="sm" variant={mode === "cuantico" ? "default" : "outline"} onClick={() => { setMode("cuantico"); setDetail(null); }}>Cuántico</Button>
    </div>
    <div className="relative h-[360px] w-full overflow-hidden rounded-md border border-border bg-card sm:h-[460px]">
      {activeOrbital && <Canvas key={element.z} dpr={[1, 1.5]} camera={{ position: [0, 1.5, 11], fov: 48 }} gl={{ antialias: true }}>
        <AtomScene element={element} mode={mode} orbital={activeOrbital} detail={detail} palette={palette} paused={paused} onSelect={setDetail} />
      </Canvas>}
      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
        {(detail ? [{ name: "Quark up", color: "bg-glow" }, { name: "Quark down", color: "bg-sky" }] : mode === "particulas" ? [{ name: "Protón", color: "bg-rose" }, { name: "Neutrón", color: "bg-amber" }, { name: "Electrón", color: "bg-glow" }] : [{ name: "Probabilidad", color: "bg-iris" }]).map((item) => <span key={item.name} className="flex items-center gap-1 bg-ink/85 px-2 py-1"><i className={`size-2 rounded-full ${item.color}`} />{item.name}</span>)}
      </div>
    </div>
    {detail ? <div className="mt-3 flex flex-wrap items-center gap-3">
      <Button type="button" variant="outline" size="sm" onClick={() => setDetail(null)}><ArrowLeft className="size-4" /> Volver al átomo</Button>
      <p className="text-sm text-mist">{detail === "proton" ? "Protón: 2 quarks up + 1 down · carga +1" : "Neutrón: 1 quark up + 2 down · carga 0"}</p>
    </div> : <>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {mode === "particulas" ? <><Button type="button" variant="outline" size="sm" onClick={() => setDetail("proton")}>Ver protón</Button><Button type="button" variant="outline" size="sm" onClick={() => setDetail("neutron")} disabled={mass === element.z}>Ver neutrón</Button><span className="font-mono text-xs text-mist">{element.z} p⁺ · {Math.max(0, mass - element.z)} n · {element.z} e⁻</span></> : <>
          <label htmlFor="orbital-select" className="text-sm text-mist">Orbital</label>
          <select id="orbital-select" value={orbitalIndex} onChange={(e) => setOrbitalIndex(Number(e.target.value))} className="rounded-md border border-border bg-card px-2 py-1.5 font-mono text-sm text-foreground">
            {orbitals.map((o, i) => <option key={o.label} value={i}>{o.label} · {o.electrons} e⁻</option>)}
          </select>
          <span className="text-xs text-mist">{activeOrbital?.kind === "s" ? "Nube esférica" : activeOrbital?.kind === "p" ? "Nube bilobular" : activeOrbital?.kind === "d" ? "Nube tetralobular" : "Nube multilobular"}</span>
        </>}
        <Button type="button" variant="ghost" size="icon" className="ml-auto" aria-label={paused ? "Reanudar giro" : "Pausar giro"} title={paused ? "Reanudar giro" : "Pausar giro"} onClick={() => setPaused(!paused)}><RotateCcw className={`size-4 ${paused ? "opacity-40" : ""}`} /></Button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mist">{mode === "particulas" ? "Modelo esquemático: las trayectorias muestran electrones por capa, no órbitas reales. Toca un protón o neutrón para explorar sus quarks." : "Las nubes representan zonas de probabilidad de un orbital, no la trayectoria de un electrón. Su forma es ilustrativa; los orbitales de igual tipo pueden tener distintas orientaciones."}</p>
    </>}
  </section>;
}
