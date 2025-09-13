import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AdventurerModel } from './AdventurerModel';

interface TreasureMapProps {
  userProgress?: number;
  isInteractive?: boolean;
}

export const TreasureMap = ({ userProgress = 0.2, isInteractive = true }: TreasureMapProps) => {
  const mapRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, '/src/assets/models/stylized_map.glb');

  // Gentle rotation animation
  useFrame(() => {
    if (mapRef.current && !isInteractive) {
      mapRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      {/* Ambient lighting for the scene */}
      <ambientLight intensity={0.4} color="#F5F5DC" />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#FFD700"
        castShadow
      />
      
      {/* The treasure map */}
      <group 
        ref={mapRef}
        position={[0, -0.5, 0]}
        rotation={[-0.2, 0, 0]}
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={gltf.scene.clone()} />
      </group>
      
      {/* Adventurer character on the map */}
      <AdventurerModel 
        position={[0, 0.2, 0]}
        progress={userProgress}
        isWalking={false}
      />
      
      {/* Interactive controls */}
      {isInteractive && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      )}
      
      {/* Quest markers on the map */}
      <group>
        {/* Starter quest marker */}
        <mesh position={[-2, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color="#00C853" />
        </mesh>
        
        {/* Mid quest marker */}
        <mesh position={[0, 0.1, -1]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color={userProgress >= 0.5 ? "#00C853" : "#FFD700"} />
        </mesh>
        
        {/* End treasure marker */}
        <mesh position={[2.5, 0.1, 0.5]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4]} />
          <meshStandardMaterial color={userProgress >= 0.9 ? "#00C853" : "#FFD700"} />
        </mesh>
      </group>
      
      {/* Magical atmosphere particles */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              Math.random() * 3 + 1,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial 
              color="#FFD700" 
              transparent 
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};