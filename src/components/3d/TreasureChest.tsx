import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface TreasureChestProps {
  onClick?: () => void;
  isOpen?: boolean;
  position?: [number, number, number];
}

export const TreasureChest = ({ onClick, isOpen = false, position = [0, 0, 0] }: TreasureChestProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load the 3D model
  const gltf = useLoader(GLTFLoader, '/models/treasure_chest.glb');
  
  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  // Animated scale for interaction
  const { scale } = useSpring({
    scale: isOpen ? 1.1 : 1,
    config: { tension: 200, friction: 25 }
  });

  return (
    <animated.group 
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <primitive 
        object={gltf.scene.clone()} 
        scale={[0.8, 0.8, 0.8]}
      />
      
      {/* Magical glow effect */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.8}
        color="#FFD700"
        distance={3}
      />
      
      {/* Particle sparkles around the chest */}
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
    </animated.group>
  );
};