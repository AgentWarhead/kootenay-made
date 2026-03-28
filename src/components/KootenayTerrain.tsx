'use client';

import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ── Elevation color palette ─────────────────── */
const COLOR_VALLEY = new THREE.Color('#1A1D20');
const COLOR_FOREST = new THREE.Color('#2D6A4F');
const COLOR_COPPER = new THREE.Color('#C17817');
const COLOR_SNOW = new THREE.Color('#F8F4F0');

/* ── Town data ───────────────────────────────── */
const towns = [
  { name: 'Castlegar', x: 0.0, z: 0.0, types: 'Local Services • Dining • Professional' },
  { name: 'Trail', x: -1.2, z: 3.5, types: 'Trades • Restaurants • Retail' },
  { name: 'Nelson', x: 4.5, z: -2.0, types: 'Wellness • Tourism • Arts' },
  { name: 'Rossland', x: -3.0, z: 3.0, types: 'Adventure • Hospitality • Outdoor Rec' },
];

/* ── Procedural low-poly terrain ─────────────── */
function generateTerrain(width: number, depth: number, segW: number, segD: number) {
  const geo = new THREE.PlaneGeometry(width, depth, segW, segD);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);

  // Seed-based deterministic noise (simple layered sin)
  const height = (x: number, z: number) => {
    let h = 0;
    // Large mountain forms
    h += Math.sin(x * 0.3 + 1.2) * Math.cos(z * 0.25 + 0.8) * 3.5;
    h += Math.sin(x * 0.15 - 0.5) * Math.sin(z * 0.18 + 2.1) * 2.8;
    // Medium ridges
    h += Math.sin(x * 0.6 + z * 0.4) * 1.2;
    h += Math.cos(x * 0.45 - z * 0.55 + 1.0) * 1.0;
    // Small detail
    h += Math.sin(x * 1.2 + 0.3) * Math.cos(z * 1.1 - 0.7) * 0.5;
    // Valley in center (for Castlegar)
    const distCenter = Math.sqrt(x * x + z * z);
    h -= Math.max(0, 2.0 - distCenter * 0.4) * 1.2;
    // Raise terrain around edges for drama
    const distEdge = Math.max(Math.abs(x) / (width / 2), Math.abs(z) / (depth / 2));
    h += Math.pow(distEdge, 2) * 2.5;
    return h;
  };

  let minH = Infinity, maxH = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = height(x, z);
    pos.setY(i, h);
    if (h < minH) minH = h;
    if (h > maxH) maxH = h;
  }

  // Color by elevation
  for (let i = 0; i < pos.count; i++) {
    const h = pos.getY(i);
    const t = (h - minH) / (maxH - minH); // 0-1
    let color: THREE.Color;
    if (t < 0.25) {
      color = COLOR_VALLEY.clone().lerp(COLOR_FOREST, t / 0.25);
    } else if (t < 0.55) {
      color = COLOR_FOREST.clone().lerp(COLOR_COPPER, (t - 0.25) / 0.3);
    } else if (t < 0.82) {
      color = COLOR_COPPER.clone().lerp(COLOR_SNOW, (t - 0.55) / 0.27);
    } else {
      color = COLOR_SNOW.clone();
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  // Flat shading needs face normals — we do this by making it non-indexed
  const flatGeo = geo.toNonIndexed();
  flatGeo.computeVertexNormals();

  // Propagate flat-face colors (average the 3 verts per triangle for uniform face color)
  const flatColors = flatGeo.attributes.color;
  for (let i = 0; i < flatColors.count; i += 3) {
    const r = (flatColors.getX(i) + flatColors.getX(i + 1) + flatColors.getX(i + 2)) / 3;
    const g = (flatColors.getY(i) + flatColors.getY(i + 1) + flatColors.getY(i + 2)) / 3;
    const b = (flatColors.getZ(i) + flatColors.getZ(i + 1) + flatColors.getZ(i + 2)) / 3;
    flatColors.setXYZ(i, r, g, b);
    flatColors.setXYZ(i + 1, r, g, b);
    flatColors.setXYZ(i + 2, r, g, b);
  }

  return { geometry: flatGeo, heightFn: height };
}

/* ── Terrain Mesh ────────────────────────────── */
function Terrain({ segments }: { segments: number }) {
  const { geometry } = useMemo(
    () => generateTerrain(20, 16, segments, segments),
    [segments]
  );

  return (
    <group>
      {/* Solid low-poly terrain */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          vertexColors
          flatShading
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          wireframe
          color="#C17817"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

/* ── Pulse Ring ──────────────────────────────── */
function PulseRing({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = (clock.getElapsedTime() % 2.5) / 2.5;
    const scale = 0.3 + t * 1.2;
    ringRef.current.scale.set(scale, scale, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - t);
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.25, 0.32, 24]} />
      <meshBasicMaterial color="#C17817" transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ── Town Marker ─────────────────────────────── */
function TownMarker({ name, x, z, types, heightFn }: {
  name: string; x: number; z: number; types: string;
  heightFn: (x: number, z: number) => number;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const y = heightFn(x, z) + 0.6;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const bob = Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
    meshRef.current.position.y = y + bob;
    const s = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    if (glowRef.current) {
      glowRef.current.position.y = y + bob;
      glowRef.current.intensity = hovered ? 3 : 1.5;
    }
  });

  const onOver = useCallback(() => setHovered(true), []);
  const onOut = useCallback(() => setHovered(false), []);

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[x, y, z]}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#C17817"
          emissive="#C17817"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <pointLight ref={glowRef} position={[x, y, z]} color="#C17817" intensity={1.5} distance={4} decay={2} />
      <PulseRing position={[x, y - 0.3, z]} />

      {/* Label (always visible) */}
      <Html
        position={[x, y + 0.55, z]}
        center
        style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        zIndexRange={[10, 0]}
      >
        <div className="font-[family-name:var(--font-satoshi)] text-cream text-xs font-bold tracking-wide drop-shadow-lg select-none">
          {name}
        </div>
      </Html>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[x, y + 1.1, z]}
          center
          style={{ pointerEvents: 'none' }}
          zIndexRange={[20, 0]}
        >
          <div className="bg-[#1A1D20]/95 backdrop-blur-sm border border-[#C17817]/30 rounded-lg px-4 py-2.5 text-center whitespace-nowrap shadow-xl shadow-black/40">
            <p className="font-[family-name:var(--font-satoshi)] text-[#F8F4F0] text-sm font-bold">{name}</p>
            <p className="text-[#F8F4F0]/60 text-xs mt-0.5">{types}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ── Scene ────────────────────────────────────── */
function Scene({ isMobile }: { isMobile: boolean }) {
  const segments = isMobile ? 48 : 80;
  const { heightFn } = useMemo(
    () => generateTerrain(20, 16, segments, segments),
    [segments]
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight color="#F8F4F0" intensity={0.3} />
      <directionalLight
        position={[-8, 12, -4]}
        color="#C17817"
        intensity={0.8}
        castShadow
      />
      <hemisphereLight
        color="#4A90A4"
        groundColor="#2D6A4F"
        intensity={0.25}
      />

      {/* Fog */}
      <fog attach="fog" args={['#1A1D20', 18, 45]} />

      {/* Terrain */}
      <Terrain segments={segments} />

      {/* Town markers */}
      {towns.map((town) => (
        <TownMarker
          key={town.name}
          name={town.name}
          x={town.x}
          z={town.z}
          types={town.types}
          heightFn={heightFn}
        />
      ))}

      {/* Atmospheric particles */}
      <Sparkles
        count={isMobile ? 40 : 100}
        size={1.5}
        scale={[20, 8, 16]}
        position={[0, 4, 0]}
        color="#C17817"
        opacity={0.3}
        speed={0.3}
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={12}
        maxDistance={30}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate={!isMobile}
        autoRotateSpeed={0.35}
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
    <div
      className="w-full relative"
      style={{ height: isMobile ? '400px' : '600px' }}
    >
      <Canvas
        camera={{
          position: [8, 10, 14],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#1A1D20' }}
        dpr={[1, 1.5]}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
