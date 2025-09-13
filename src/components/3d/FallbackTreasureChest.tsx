import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface FallbackTreasureChestProps {
  onClick?: () => void;
  isOpen?: boolean;
  position?: [number, number, number];
}

export const FallbackTreasureChest = ({ onClick, isOpen = false, position = [0, 0, 0] }: FallbackTreasureChestProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Simple box as fallback treasure chest */}
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
        scale={isOpen ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Chest lid */}
      <mesh position={[0, 0.3, 0]} rotation={isOpen ? [-Math.PI * 0.3, 0, 0] : [0, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      
      {/* Golden glow effect */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.8}
        color="#FFD700"
        distance={3}
      />
      
      {/* Sparkle particles */}
      <group>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 8) * Math.PI * 2) * 1.2,
              0.5 + Math.sin(i) * 0.3,
              Math.cos((i / 8) * Math.PI * 2) * 1.2
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
        ))}
      </group>
    </group>
  );
};