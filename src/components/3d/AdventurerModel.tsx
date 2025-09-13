import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface AdventurerModelProps {
  position?: [number, number, number];
  isWalking?: boolean;
  progress?: number; // 0-1 value for position on the map path
}

export const AdventurerModel = ({ 
  position = [0, 0, 0], 
  isWalking = false,
  progress = 0 
}: AdventurerModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, '/src/assets/models/adventurer.glb');
  
  // Calculate position based on progress (simple path from left to right)
  const pathPosition: [number, number, number] = [
    -3 + (progress * 6), // Move from -3 to +3 on X axis
    position[1],
    position[2]
  ];

  // Walking animation
  useFrame((state) => {
    if (meshRef.current && isWalking) {
      // Simple walking bob animation
      meshRef.current.position.y = pathPosition[1] + Math.sin(state.clock.elapsedTime * 8) * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.1;
    }
  });

  // Smooth position transition
  const { animatedPosition } = useSpring({
    animatedPosition: pathPosition,
    config: { tension: 120, friction: 20 }
  });

  useEffect(() => {
    // Face the direction of movement
    if (meshRef.current) {
      meshRef.current.rotation.y = progress > 0.5 ? Math.PI : 0;
    }
  }, [progress]);

  return (
    <animated.group 
      ref={meshRef}
      position={animatedPosition}
      scale={[0.3, 0.3, 0.3]}
    >
      <primitive object={gltf.scene.clone()} />
      
      {/* Character highlight */}
      <pointLight
        position={[0, 2, 0]}
        intensity={0.5}
        color="#00C853"
        distance={2}
      />
      
      {/* Progress trail effect */}
      {isWalking && (
        <group>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              position={[-0.5 - i * 0.3, -0.8, 0]}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.02]} />
              <meshBasicMaterial 
                color="#00C853" 
                transparent 
                opacity={0.6 - i * 0.2} 
              />
            </mesh>
          ))}
        </group>
      )}
    </animated.group>
  );
};