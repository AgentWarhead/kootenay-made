'use client';

import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

/* ── Elevation color palette ─────────────────── */
const COLOR_VALLEY_DARK = new THREE.Color('#1A1D20');
const COLOR_VALLEY_BLUE = new THREE.Color('#2A4A54');
const COLOR_DEEP_FOREST = new THREE.Color('#1A3A2D');
const COLOR_FOREST = new THREE.Color('#2D6A4F');
const COLOR_COPPER = new THREE.Color('#C17817');
const COLOR_BRIGHT_COPPER = new THREE.Color('#E8A020');
const COLOR_SNOW = new THREE.Color('#F8F4F0');

/* ── Town data with real relative elevations ─── */
const towns = [
  {
    name: 'Castlegar',
    x: 0.0,
    z: 0.0,
    elevation: 495,
    pitch: 'Hub of the West Kootenays — we build for local services, dining & professional businesses',
  },
  {
    name: 'Trail',
    x: -1.4,
    z: 3.8,
    elevation: 400,
    pitch: 'Industrial heart — websites for trades, restaurants & retail that compete',
  },
  {
    name: 'Nelson',
    x: 4.8,
    z: -2.2,
    elevation: 532,
    pitch: 'Creative capital — beautiful sites for wellness, tourism & arts',
  },
  {
    name: 'Rossland',
    x: -3.2,
    z: 3.2,
    elevation: 1023,
    pitch: 'Mountain town — dynamic sites for adventure, hospitality & outdoor recreation',
  },
];

/* ── Pseudo-random hash for deterministic noise ── */
function hash(x: number, z: number): number {
  const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  // Smoothstep
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz);
  const b = hash(ix + 1, iz);
  const c = hash(ix, iz + 1);
  const d = hash(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

function fbm(x: number, z: number, octaves: number): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxVal = 0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * (smoothNoise(x * frequency, z * frequency) * 2 - 1);
    maxVal += amplitude;
    amplitude *= 0.5;
    frequency *= 2.1;
  }
  return value / maxVal;
}

/* ── Procedural terrain with town-aware elevation ── */
function generateTerrain(width: number, depth: number, segW: number, segD: number) {
  const geo = new THREE.PlaneGeometry(width, depth, segW, segD);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);

  // Town influence: raise/lower terrain around each town to match relative elevation
  // Normalize elevations: Trail=400 (lowest) -> 0, Rossland=1023 (highest) -> 1
  const minElev = 400;
  const maxElev = 1023;
  const townInfluences = towns.map((t) => ({
    x: t.x,
    z: t.z,
    // Map real elevation to terrain height offset
    targetHeight: ((t.elevation - minElev) / (maxElev - minElev)) * 5.0 - 1.0, // -1 to 4
    radius: t.name === 'Rossland' ? 4.5 : 3.5,
  }));

  const height = (x: number, z: number) => {
    let h = 0;

    // Large-scale mountain forms (dramatic)
    h += fbm(x * 0.12 + 1.5, z * 0.12 + 0.8, 6) * 6.0;

    // Sharp ridgelines
    h += Math.abs(Math.sin(x * 0.25 + z * 0.15)) * 2.5;
    h += Math.abs(Math.cos(x * 0.18 - z * 0.22 + 1.3)) * 2.0;

    // Additional mountain peaks
    h += Math.pow(Math.max(0, Math.sin(x * 0.35) * Math.cos(z * 0.28)), 2) * 4.0;
    h += Math.pow(Math.max(0, Math.cos(x * 0.22 + 1.5) * Math.sin(z * 0.32 - 0.5)), 2) * 3.5;

    // Fine detail/roughness
    h += fbm(x * 0.5 + 3.7, z * 0.5 + 2.1, 4) * 1.2;
    h += fbm(x * 1.2 + 0.3, z * 1.1 - 0.7, 3) * 0.4;

    // Valley carving — river path (Columbia River roughly N-S through center)
    const riverDist = Math.abs(x - Math.sin(z * 0.3) * 1.5 - 0.5);
    h -= Math.max(0, 2.5 - riverDist * 1.2) * 1.5;

    // Town elevation influence — attract terrain height toward correct elevation
    for (const ti of townInfluences) {
      const dx = x - ti.x;
      const dz = z - ti.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const influence = Math.max(0, 1 - dist / ti.radius);
      const smoothInfluence = influence * influence * (3 - 2 * influence); // smoothstep
      h = h * (1 - smoothInfluence * 0.7) + ti.targetHeight * (smoothInfluence * 0.7);
    }

    // Raise edges for dramatic mountain walls
    const edgeX = Math.abs(x) / (width / 2);
    const edgeZ = Math.abs(z) / (depth / 2);
    const edgeDist = Math.max(edgeX, edgeZ);
    h += Math.pow(Math.max(0, edgeDist - 0.4), 2) * 8.0;

    // Extra peaks around Rossland (mountain ski area)
    const dxR = x - (-3.2);
    const dzR = z - 3.2;
    const distR = Math.sqrt(dxR * dxR + dzR * dzR);
    if (distR > 2.0 && distR < 6.0) {
      h += Math.sin(distR * 1.5) * 2.5 * Math.max(0, 1 - Math.abs(distR - 4) / 2);
    }

    return h;
  };

  let minH = Infinity;
  let maxH = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = height(x, z);
    pos.setY(i, h);
    if (h < minH) minH = h;
    if (h > maxH) maxH = h;
  }

  // Color by elevation — green mountains with copper/snow peaks
  for (let i = 0; i < pos.count; i++) {
    const h = pos.getY(i);
    const t = (h - minH) / (maxH - minH);
    let color: THREE.Color;
    if (t < 0.20) {
      // Valley floor: dark slate with blue hints
      color = COLOR_VALLEY_DARK.clone().lerp(COLOR_VALLEY_BLUE, t / 0.20);
    } else if (t < 0.35) {
      // Lower slopes: deep forest green
      color = COLOR_VALLEY_BLUE.clone().lerp(COLOR_DEEP_FOREST, (t - 0.20) / 0.15);
    } else if (t < 0.55) {
      // Mid slopes: forest green
      color = COLOR_DEEP_FOREST.clone().lerp(COLOR_FOREST, (t - 0.35) / 0.20);
    } else if (t < 0.75) {
      // Upper slopes: green to copper transition
      color = COLOR_FOREST.clone().lerp(COLOR_COPPER, (t - 0.55) / 0.20);
    } else if (t < 0.90) {
      // Peaks: copper to bright copper
      color = COLOR_COPPER.clone().lerp(COLOR_BRIGHT_COPPER, (t - 0.75) / 0.15);
    } else {
      // Snow caps
      color = COLOR_BRIGHT_COPPER.clone().lerp(COLOR_SNOW, (t - 0.90) / 0.10);
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  // Flat shading via non-indexed
  const flatGeo = geo.toNonIndexed();
  flatGeo.computeVertexNormals();

  // Average face colors for flat shading
  const flatColors = flatGeo.attributes.color;
  for (let i = 0; i < flatColors.count; i += 3) {
    const r = (flatColors.getX(i) + flatColors.getX(i + 1) + flatColors.getX(i + 2)) / 3;
    const g = (flatColors.getY(i) + flatColors.getY(i + 1) + flatColors.getY(i + 2)) / 3;
    const b = (flatColors.getZ(i) + flatColors.getZ(i + 1) + flatColors.getZ(i + 2)) / 3;
    flatColors.setXYZ(i, r, g, b);
    flatColors.setXYZ(i + 1, r, g, b);
    flatColors.setXYZ(i + 2, r, g, b);
  }

  return { geometry: flatGeo, heightFn: height, minH, maxH };
}

/* ── Terrain Mesh ────────────────────────────── */
function Terrain({ segments }: { segments: number }) {
  const { geometry } = useMemo(
    () => generateTerrain(22, 18, segments, segments),
    [segments]
  );

  return (
    <group>
      {/* Solid low-poly terrain */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          vertexColors
          flatShading
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>
      {/* Wireframe overlay — copper topo lines */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          wireframe
          color="#C17817"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

/* ── River using TubeGeometry ────────────────── */
function RiverTube({ heightFn }: { heightFn: (x: number, z: number) => number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const z = -8 + t * 18;
      const x = Math.sin(z * 0.3) * 1.5 + 0.5;
      const y = heightFn(x, z) + 0.06;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 100, 0.08, 6, false);
  }, [heightFn]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#4A90A4"
        emissive="#4A90A4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.75}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

/* ── Light Beam Marker ───────────────────────── */
function LightBeam({ position, hovered }: { position: [number, number, number]; hovered: boolean }) {
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!beamRef.current) return;
    const mat = beamRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = (hovered ? 1.2 : 0.6) + Math.sin(clock.getElapsedTime() * 2) * 0.15;
  });

  const beamHeight = hovered ? 3.5 : 2.8;

  return (
    <mesh ref={beamRef} position={[position[0], position[1] + beamHeight / 2, position[2]]}>
      <cylinderGeometry args={[0.03, 0.06, beamHeight, 8]} />
      <meshStandardMaterial
        color="#C17817"
        emissive="#E8A020"
        emissiveIntensity={0.8}
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

/* ── Pulse Ring ──────────────────────────────── */
function PulseRing({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = (clock.getElapsedTime() % 2.5) / 2.5;
    const scale = 0.4 + t * 2.0;
    ringRef.current.scale.set(scale, scale, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - t);
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 0.42, 32]} />
      <meshBasicMaterial color="#C17817" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ── Second Pulse Ring (staggered) ───────────── */
function PulseRing2({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = ((clock.getElapsedTime() + 1.25) % 2.5) / 2.5;
    const scale = 0.4 + t * 2.0;
    ringRef.current.scale.set(scale, scale, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.35 * (1 - t);
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 0.42, 32]} />
      <meshBasicMaterial color="#E8A020" transparent opacity={0.35} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ── Town Marker ─────────────────────────────── */
function TownMarker({
  name,
  x,
  z,
  pitch,
  heightFn,
}: {
  name: string;
  x: number;
  z: number;
  pitch: string;
  heightFn: (x: number, z: number) => number;
}) {
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.PointLight>(null);

  const y = heightFn(x, z) + 0.15;

  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.intensity = THREE.MathUtils.lerp(
        glowRef.current.intensity,
        hovered ? 5 : 2.5,
        0.1
      );
    }
  });

  const onOver = useCallback(() => setHovered(true), []);
  const onOut = useCallback(() => setHovered(false), []);

  const beamTopY = y + (hovered ? 3.5 : 2.8);

  return (
    <group>
      {/* Clickable hit area */}
      <mesh
        position={[x, y + 1.4, z]}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <cylinderGeometry args={[0.5, 0.5, 3.0, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Light beam */}
      <LightBeam position={[x, y, z]} hovered={hovered} />

      {/* Point light glow */}
      <pointLight
        ref={glowRef}
        position={[x, y + 1.5, z]}
        color="#C17817"
        intensity={2.5}
        distance={6}
        decay={2}
      />

      {/* Pulse rings */}
      <PulseRing position={[x, y + 0.05, z]} />
      <PulseRing2 position={[x, y + 0.05, z]} />

      {/* Label — ABOVE the beam, always visible */}
      <Html
        position={[x, beamTopY + 0.8, z]}
        center
        style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        zIndexRange={[10, 0]}
      >
        <div
          className="font-[family-name:var(--font-satoshi)] text-sm font-bold tracking-widest drop-shadow-[0_2px_8px_rgba(193,120,23,0.6)] select-none"
          style={{ color: '#F8F4F0', fontSize: '14px', letterSpacing: '0.12em' }}
        >
          {name}
        </div>
      </Html>

      {/* Tooltip on hover — glassmorphism */}
      {hovered && (
        <Html
          position={[x, beamTopY + 2.0, z]}
          center
          style={{ pointerEvents: 'none' }}
          zIndexRange={[20, 0]}
        >
          <div
            className="rounded-xl px-5 py-3 text-center shadow-2xl shadow-black/50 border select-none"
            style={{
              background: 'rgba(26, 29, 32, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderColor: 'rgba(193, 120, 23, 0.35)',
              maxWidth: '280px',
              whiteSpace: 'normal',
            }}
          >
            <p
              className="font-[family-name:var(--font-satoshi)] font-bold"
              style={{ color: '#F8F4F0', fontSize: '16px', margin: 0 }}
            >
              {name}
            </p>
            <p
              style={{
                color: 'rgba(248, 244, 240, 0.7)',
                fontSize: '12px',
                marginTop: '6px',
                lineHeight: '1.4',
              }}
            >
              {pitch}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ── Fog Setup ───────────────────────────────── */
function FogSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#1A1D20', 0.045);
    scene.background = new THREE.Color('#1A1D20');
  }, [scene]);
  return null;
}

/* ── Scene ────────────────────────────────────── */
function Scene({ isMobile }: { isMobile: boolean }) {
  const segments = isMobile ? 64 : 128;
  const { heightFn } = useMemo(
    () => generateTerrain(22, 18, segments, segments),
    [segments]
  );

  return (
    <>
      {/* Fog */}
      <FogSetup />

      {/* Lighting — cinematic with dramatic shadows */}
      <ambientLight color="#F8F4F0" intensity={0.15} />

      {/* Main dramatic spotlight — warm copper from the side */}
      <directionalLight
        position={[-10, 14, -6]}
        color="#D4922A"
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Fill light — cool blue from opposite side */}
      <directionalLight
        position={[8, 6, 8]}
        color="#4A90A4"
        intensity={0.3}
      />

      {/* Hemisphere for ambient color variation */}
      <hemisphereLight
        color="#4A6A7A"
        groundColor="#1A3A2D"
        intensity={0.2}
      />

      {/* Copper spotlight hitting peaks */}
      <spotLight
        position={[-6, 16, 2]}
        angle={0.5}
        penumbra={0.8}
        color="#C17817"
        intensity={1.0}
        distance={40}
        castShadow={false}
      />

      {/* Terrain */}
      <Terrain segments={segments} />

      {/* Animated river */}
      <RiverTube heightFn={heightFn} />

      {/* Town markers */}
      {towns.map((town) => (
        <TownMarker
          key={town.name}
          name={town.name}
          x={town.x}
          z={town.z}
          pitch={town.pitch}
          heightFn={heightFn}
        />
      ))}

      {/* Atmospheric particles — copper embers */}
      <Sparkles
        count={isMobile ? 80 : 180}
        size={2.5}
        scale={[22, 10, 18]}
        position={[0, 5, 0]}
        color="#C17817"
        opacity={0.5}
        speed={0.25}
      />
      {/* Cream/white particles */}
      <Sparkles
        count={isMobile ? 30 : 60}
        size={1.2}
        scale={[22, 12, 18]}
        position={[0, 6, 0]}
        color="#F8F4F0"
        opacity={0.35}
        speed={0.15}
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={28}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate={!isMobile}
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

/* ── Exported Component ──────────────────────── */
export default function KootenayTerrain() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section>
      {/* 3D Terrain Canvas */}
      <div
        className="w-full relative"
        style={{ height: isMobile ? '450px' : '650px' }}
      >
        <Canvas
          camera={{
            position: [7, 11, 15],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          shadows
          style={{ background: '#1A1D20' }}
          dpr={[1, 1.5]}
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </div>

      {/* CTA Below the Map */}
      <div
        className="w-full py-16 px-6 text-center"
        style={{ background: '#1A1D20' }}
      >
        <h3
          className="font-[family-name:var(--font-satoshi)] text-2xl md:text-3xl font-bold mb-6"
          style={{ color: '#F8F4F0' }}
        >
          Your town. Your business. Let&apos;s make it shine.
        </h3>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 rounded-lg font-[family-name:var(--font-satoshi)] font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #C17817, #E8A020)',
            color: '#1A1D20',
            boxShadow: '0 4px 20px rgba(193, 120, 23, 0.3)',
          }}
        >
          Start Your Project →
        </Link>
        <p
          className="mt-5 text-sm"
          style={{ color: 'rgba(248, 244, 240, 0.45)' }}
        >
          We serve all of BC — but the Kootenays are home.
        </p>
      </div>
    </section>
  );
}
