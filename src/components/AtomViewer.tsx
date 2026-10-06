import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ATOMIC_DATA, orbitalsFor, type Orbital } from "@/data/atomic";
import { orbitalExtent, orbitalPoints, packedNucleus } from "@/data/atomic-view";
import type { Elemento } from "@/data/elements";

type Mode = "particulas" | "cuantico";
type Nucleon = "proton" | "neutron";
type Palette = { proton: string; neutron: string; electron: string; up: string; down: string; cloud: string; backdrop: string };

function Nucleus({ protons, neutrons, palette, onSelect }: { protons: number; neutrons: number; palette: Palette; onSelect: (part: Nucleon) => void }) {
  const total = protons + neutrons;
  const p = useRef<THREE.InstancedMesh>(null);
  const n = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const { particleRadius, positions } = packedNucleus(total);
    const dummy = new THREE.Object3D();
    let protonIndex = 0, neutronIndex = 0;
    for (let i = 0; i < total; i++) {
      const position = positions[i];
      if (!position) continue;
      dummy.position.set(position[0] ?? 0, position[1] ?? 0, position[2] ?? 0);
      dummy.scale.setScalar(particleRadius);
      dummy.updateMatrix();
      const isProton = Math.floor((i + 1) * protons / total) > Math.floor(i * protons / total);
      if (isProton) p.current?.setMatrixAt(protonIndex++, dummy.matrix);
      else n.current?.setMatrixAt(neutronIndex++, dummy.matrix);
    }
    if (p.current) p.current.instanceMatrix.needsUpdate = true;
    if (n.current) n.current.instanceMatrix.needsUpdate = true;
  }, [protons, neutrons, total]);
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
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(orbitalPoints(orbital), 3));
    return result;
  }, [orbital]);
  const sprite = useMemo(() => {
    const size = 32, pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const offset = (y * size + x) * 4;
      const r = Math.hypot((x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1);
      pixels.set([255, 255, 255, Math.round(Math.max(0, 1 - r) ** 1.6 * 255)], offset);
    }
    const texture = new THREE.DataTexture(pixels, size, size);
    texture.needsUpdate = true;
    return texture;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => sprite.dispose(), [sprite]);
  return <points geometry={geometry}>
    <pointsMaterial map={sprite} size={0.07 + orbital.level * 0.008} color={palette.cloud} transparent opacity={0.7} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
  </points>;
}

function SceneFraming({ radius }: { radius: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const distance = Math.max(6, radius * 1.25 / (Math.tan(24 * Math.PI / 180) * Math.min(aspect, 1)));
    camera.position.set(0, distance * 0.1, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, radius, size.width, size.height]);
  return null;
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
    <SceneFraming radius={detail ? 2 : mode === "cuantico" ? orbitalExtent(orbital.level) : 1.35 + shells.length * 0.39} />
    <ambientLight intensity={0.75} /><pointLight position={[5, 5, 7]} intensity={45} />
    <Environment><Lightformer intensity={2} position={[0, 5, 3]} scale={[10, 10, 1]} /></Environment>
    {detail ? <QuarkDetail part={detail} palette={palette} paused={paused} /> : <>
      <Nucleus protons={element.z} neutrons={Math.max(0, (data?.mass ?? element.z) - element.z)} palette={palette} onSelect={onSelect} />
      {mode === "particulas" ? shells.map((amount, i) => <ElectronShell key={i} shell={i + 1} amount={amount ?? 0} palette={palette} paused={paused} />) : <Cloud orbital={orbital} palette={palette} />}
    </>}
    <OrbitControls key={`${mode}-${orbital.level}-${detail}`} enablePan={false} minDistance={3} maxDistance={30} enableDamping />
  </>;
}

export function AtomViewer({ element, onClose }: { element: Elemento; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("particulas");
  const [detail, setDetail] = useState<Nucleon | null>(null);
  const [paused, setPaused] = useState(false);
  const [orbitalIndex, setOrbitalIndex] = useState(() => {
    const options = orbitalsFor(element.z);
    const level = Math.max(...options.map((o) => o.level));
    return options.findIndex((o) => o.level === level);
  });
  const [palette, setPalette] = useState<Palette | null>(null);
  const orbitals = useMemo(() => orbitalsFor(element.z), [element.z]);
  const levels = [...new Set(orbitals.map((o) => o.level))].sort((a, b) => a - b);
  const activeOrbital = orbitals[orbitalIndex] ?? orbitals[0];
  const mass = ATOMIC_DATA[element.z - 1]?.mass ?? element.z;
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setPalette({ proton: root.getPropertyValue("--atom-proton").trim(), neutron: root.getPropertyValue("--atom-neutron").trim(), electron: root.getPropertyValue("--atom-electron").trim(), up: root.getPropertyValue("--atom-up").trim(), down: root.getPropertyValue("--atom-down").trim(), cloud: root.getPropertyValue("--atom-cloud").trim(), backdrop: root.getPropertyValue("--atom-backdrop").trim() });
  }, []);
  useEffect(() => {
    setDetail(null);
    setOrbitalIndex(orbitals.findIndex((o) => o.level === Math.max(...orbitals.map((item) => item.level))));
  }, [orbitals]);
  return <section aria-label={`Átomo de ${element.nombre} en 3D`} className="mt-5 border-t border-border pt-5">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div><p className="font-mono text-[10px] uppercase text-glow">Explorador atómico / {String(element.z).padStart(3, "0")}</p><h2 className="text-xl font-semibold">{element.nombre} <span className="font-mono text-mist">{element.simbolo}</span></h2></div>
      <Button type="button" variant="ghost" size="icon" aria-label="Cerrar visualización" title="Cerrar visualización" onClick={onClose}><X className="size-4" /></Button>
    </div>
    <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Modo de visualización">
      <Button type="button" size="sm" variant={mode === "particulas" ? "default" : "outline"} onClick={() => { setMode("particulas"); setDetail(null); }}>Partículas</Button>
      <Button type="button" size="sm" variant={mode === "cuantico" ? "default" : "outline"} onClick={() => { setMode("cuantico"); setDetail(null); }}>Cuántico</Button>
    </div>
    {mode === "cuantico" && !detail && <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Niveles de energía">
      <span className="text-xs text-mist">Nivel principal</span>
      {levels.map((level) => <Button key={level} type="button" size="sm" variant={activeOrbital?.level === level ? "default" : "outline"} aria-pressed={activeOrbital?.level === level} onClick={() => setOrbitalIndex(orbitals.findIndex((o) => o.level === level))}>n = {level}</Button>)}
    </div>}
    <div className="relative h-[360px] w-full overflow-hidden rounded-md border border-border bg-card sm:h-[460px]">
      {activeOrbital && palette && <Canvas key={element.z} dpr={[1, 1.5]} camera={{ position: [0, 1.5, 11], fov: 48 }} gl={{ antialias: true }}>
        <AtomScene element={element} mode={mode} orbital={activeOrbital} detail={detail} palette={palette} paused={paused} onSelect={setDetail} />
      </Canvas>}
      {mode === "cuantico" && !detail && activeOrbital && <div className="pointer-events-none absolute left-3 top-3 bg-ink/85 px-3 py-2 font-mono text-xs"><span className="text-glow">{activeOrbital.label}</span> · n = {activeOrbital.level}<p className="mt-1 text-[10px] text-mist">{activeOrbital.level - "spdf".indexOf(activeOrbital.kind) - 1} nodos radiales</p></div>}
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
            {orbitals.map((o, i) => <option key={o.label} value={i}>{o.label} · n = {o.level} · {o.electrons} e⁻</option>)}
          </select>
          <span className="text-xs text-mist">{activeOrbital?.kind === "s" ? "Nube esférica" : activeOrbital?.kind === "p" ? "Nube bilobular" : activeOrbital?.kind === "d" ? "Nube tetralobular" : "Nube multilobular"}</span>
        </>}
        <Button type="button" variant="ghost" size="icon" className="ml-auto" aria-label={paused ? "Reanudar giro" : "Pausar giro"} title={paused ? "Reanudar giro" : "Pausar giro"} onClick={() => setPaused(!paused)}><RotateCcw className={`size-4 ${paused ? "opacity-40" : ""}`} /></Button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mist">{mode === "particulas" ? "Modelo esquemático: núcleo y electrones no están a escala. Las trayectorias muestran electrones por capa, no órbitas reales." : "Distribuciones hidrogenoides ilustrativas: n determina el nivel principal y aparecen n − l − 1 nodos radiales. Los niveles superiores se extienden más; la escala está comprimida y el encuadre se adapta. En átomos multielectrónicos la energía también depende del subnivel y del apantallamiento; no son cálculos exactos del elemento."}</p>
    </>}
  </section>;
}
