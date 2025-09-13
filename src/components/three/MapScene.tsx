import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment, Effects, Html } from '@react-three/drei';

import { Vector3, CatmullRomCurve3, BufferGeometry, LineBasicMaterial, Line } from 'three';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import * as THREE from 'three';

// 3D Map Component
function Map() {
  const mapRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/low_poly_map.glb');
  
  useFrame((state) => {
    if (mapRef.current) {
      mapRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={mapRef} scale={[2, 2, 2]} position={[0, -1, 0]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Adventurer Character Component
function Adventurer({ progress }: { progress: number }) {
  const adventurerRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/low_poly_adventurer.glb');
  
  // Create path curve
  const pathCurve = useMemo(() => {
    const points = [
      new Vector3(-3, 0, 2),
      new Vector3(-1, 0.2, 1),
      new Vector3(1, 0.1, 0),
      new Vector3(2.5, 0.3, -1),
      new Vector3(3, 0.5, -2)
    ];
    return new CatmullRomCurve3(points);
  }, []);

  // Create path line
  const pathGeometry = useMemo(() => {
    const points = pathCurve.getPoints(50);
    const geometry = new BufferGeometry().setFromPoints(points);
    return geometry;
  }, [pathCurve]);

  useFrame((state) => {
    if (adventurerRef.current) {
      // Position along path
      const position = pathCurve.getPoint(progress);
      adventurerRef.current.position.copy(position);
      
      // Add floating animation
      adventurerRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Rotate to face direction
      if (progress < 1) {
        const tangent = pathCurve.getTangent(progress);
        adventurerRef.current.lookAt(
          adventurerRef.current.position.x + tangent.x,
          adventurerRef.current.position.y,
          adventurerRef.current.position.z + tangent.z
        );
      }
    }
  });

  return (
    <>
      {/* Path line */}
      <mesh>
        <bufferGeometry attach="geometry" {...pathGeometry} />
        <lineBasicMaterial attach="material" color="#FFD700" />
      </mesh>
      
      {/* Adventurer */}
      <group ref={adventurerRef} scale={[0.5, 0.5, 0.5]}>
        <primitive object={scene.clone()} />
        {/* Glow effect */}
        <pointLight intensity={0.5} color="#6D5EF9" distance={2} />
      </group>
    </>
  );
}

// Treasure Chest Component
function TreasureChest() {
  const chestRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/low_poly_treasure_chest.glb');
  
  useFrame((state) => {
    if (chestRef.current) {
      chestRef.current.rotation.y += 0.005;
      chestRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={chestRef} position={[3, 0.5, -2]} scale={[0.8, 0.8, 0.8]}>
        <primitive object={scene.clone()} />
        <pointLight intensity={1.5} color="#FFD700" distance={3} />
      </group>
    </Float>
  );
}

// Floating Particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particlePositions}
          count={100}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFD700" transparent opacity={0.6} />
    </points>
  );
}

// Loading Component
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 p-6 bg-card/90 backdrop-blur-sm rounded-lg border border-border">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        <p className="text-foreground font-sora">Loading adventure map...</p>
      </div>
    </Html>
  );
}

// Error Boundary Component
function ErrorFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 p-6 bg-card/90 backdrop-blur-sm rounded-lg border border-border">
        <div className="w-16 h-16 bg-gradient-parchment rounded-lg flex items-center justify-center">
          <span className="text-2xl">🗺️</span>
        </div>
        <p className="text-foreground font-sora">Adventure map loading...</p>
      </div>
    </Html>
  );
}

// Main MapScene Component
export function MapScene() {
  const mapProgress = useAppStore((state) => state.mapProgress);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 60 }}
        className="bg-gradient-hero"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#6D5EF9" />
          
          <Environment preset="night" />
          
          <Map />
          <Adventurer progress={mapProgress} />
          <TreasureChest />
          <Particles />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Simplified 2D fallback
export function MapSceneFallback() {
  const mapProgress = useAppStore((state) => state.mapProgress);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full bg-gradient-hero flex items-center justify-center p-8"
    >
      <div className="relative w-full max-w-md aspect-square bg-gradient-parchment rounded-xl border-4 border-gold/30 overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
        
        {/* Adventure Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <path
            d="M 50 350 Q 100 300 150 320 T 250 280 T 350 200"
            stroke="#FFD700"
            strokeWidth="6"
            strokeDasharray="12,6"
            fill="none"
            className="opacity-70"
          />
        </svg>
        
        {/* Adventurer Position */}
        <motion.div
          className="absolute w-12 h-12 bg-iris rounded-full border-4 border-gold shadow-glow flex items-center justify-center text-2xl"
          style={{ 
            left: `${15 + mapProgress * 70}%`, 
            top: `${85 - mapProgress * 40}%` 
          }}
          animate={{ 
            y: [0, -5, 0],
            boxShadow: [
              '0 4px 20px rgba(109, 94, 249, 0.3)', 
              '0 8px 25px rgba(109, 94, 249, 0.5)', 
              '0 4px 20px rgba(109, 94, 249, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🏃‍♂️
        </motion.div>
        
        {/* Treasure Chest */}
        <motion.div
          className="absolute w-10 h-10 bg-gold rounded-lg border-4 border-gold-glow shadow-treasure flex items-center justify-center text-xl"
          style={{ left: '80%', top: '25%' }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          📦
        </motion.div>
      </div>
    </motion.div>
  );
}

// Preload models
useGLTF.preload('/models/low_poly_map.glb');
useGLTF.preload('/models/low_poly_adventurer.glb');
useGLTF.preload('/models/low_poly_treasure_chest.glb');