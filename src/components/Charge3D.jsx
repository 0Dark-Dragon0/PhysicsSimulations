import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Charge3D({ charge, onChange }) {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const { camera, gl, scene } = useThree();
  
  // Determine color based on polarity
  const isPositive = charge.q > 0;
  const color = isPositive ? '#ef4444' : '#3b82f6'; // red-500 : blue-500
  const emissiveColor = isPositive ? '#f87171' : '#60a5fa';

  // State for smooth floating animation when not dragging
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!isDragging && meshRef.current) {
      // Gentle floating effect
      meshRef.current.position.y = charge.y + Math.sin(state.clock.elapsedTime * 2 + floatOffset) * 0.2;
    }
  });

  // Drag logic
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    // Disable orbit controls while dragging
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    gl.domElement.style.cursor = 'auto';
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      e.stopPropagation();
      // Unproject pointer to a 3D point on the Z=0 plane
      const vector = new THREE.Vector3(e.pointer.x, e.pointer.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Call onChange to update the global React state (which will re-render this component)
      onChange(charge.id, pos.x, pos.y);
    }
  };

  return (
    <group 
      position={[charge.x, charge.y, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={() => { document.body.style.cursor = 'grab'; }}
      onPointerOut={() => { if (!isDragging) document.body.style.cursor = 'auto'; }}
    >
      {/* The visible sphere */}
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={emissiveColor}
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Glow / Light emitter */}
      <pointLight 
        color={emissiveColor} 
        intensity={2} 
        distance={15} 
        decay={2} 
      />

      {/* Charge Label (+) or (-) floating in front */}
      {/* We could use Text from drei, but keeping it simple for performance */}
    </group>
  );
}
