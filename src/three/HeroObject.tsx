import { useRef, useMemo } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type BarSpec = { x1: number; y1: number; x2: number; y2: number };

const THICKNESS = 0.24;
const DEPTH = 0.26;
const RADIUS = 0.1;

// "</>" built from five extruded rounded bars — two chevrons plus a slash —
// instead of literal text, so it renders crisply with no bundled font asset.
const BARS: BarSpec[] = [
  // "<"
  { x1: -1.75, y1: 0, x2: -1.15, y2: 0.62 },
  { x1: -1.75, y1: 0, x2: -1.15, y2: -0.62 },
  // "/"
  { x1: -0.28, y1: -0.62, x2: 0.28, y2: 0.62 },
  // ">"
  { x1: 1.15, y1: 0.62, x2: 1.75, y2: 0 },
  { x1: 1.15, y1: -0.62, x2: 1.75, y2: 0 },
];

function Bar({ x1, y1, x2, y2 }: BarSpec) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <RoundedBox
      args={[length + THICKNESS * 0.6, THICKNESS, DEPTH]}
      radius={RADIUS}
      smoothness={4}
      position={[midX, midY, 0]}
      rotation={[0, 0, angle]}
    >
      <meshStandardMaterial
        color="#3e7bfa"
        emissive="#3e7bfa"
        emissiveIntensity={0.85}
        roughness={0.3}
        metalness={0.55}
      />
    </RoundedBox>
  );
}

function CodeGlyph(props: ThreeElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.12;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.z += delta * 0.04;

    groupRef.current.rotation.x += (mouse.current.y * 0.25 - groupRef.current.rotation.x * 0.02) * 0.02;
    groupRef.current.rotation.y += (mouse.current.x * 0.25) * 0.02;
  });

  return (
    <group ref={groupRef} {...props} scale={0.8}>
      {BARS.map((bar, i) => (
        <Bar key={i} {...bar} />
      ))}
    </group>
  );
}

function Particles() {
  const points = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#22d3ee" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={1.6} color="#9b5cff" />
      <pointLight position={[-4, -3, -2]} intensity={1.3} color="#22d3ee" />
      <pointLight position={[0, 4, -4]} intensity={0.8} color="#3e7bfa" />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <CodeGlyph position={[0, 0, 0]} />
      </Float>
      <Particles />
    </Canvas>
  );
}
