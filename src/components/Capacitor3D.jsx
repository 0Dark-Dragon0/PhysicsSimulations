import React, { useMemo } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export default function Capacitor3D({ area, distance, voltage }) {
  const plateWidth = Math.sqrt(area) * 5;
  const plateThickness = 0.2;
  const gap = distance * 50; // Visual scaling

  // Animated field lines
  const lineCount = 10;
  const linePositions = useMemo(() => {
    const pos = [];
    const step = plateWidth / (lineCount - 1);
    for (let i = 0; i < lineCount; i++) {
      for (let j = 0; j < lineCount; j++) {
        pos.push([
          -plateWidth/2 + i * step,
          -plateWidth/2 + j * step
        ]);
      }
    }
    return pos;
  }, [plateWidth]);

  return (
    <group>
      {/* Top Plate (Positive) */}
      <Box 
        args={[plateWidth, plateWidth, plateThickness]} 
        position={[0, 0, gap / 2]}
      >
        <meshStandardMaterial 
          color="#ef4444" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#ef4444" 
          emissiveIntensity={voltage / 100} 
        />
      </Box>

      {/* Bottom Plate (Negative) */}
      <Box 
        args={[plateWidth, plateWidth, plateThickness]} 
        position={[0, 0, -gap / 2]}
      >
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#3b82f6" 
          emissiveIntensity={voltage / 100} 
        />
      </Box>

      {/* Dielectric visualization (if distance is small) */}
      {distance < 0.01 && (
        <Box args={[plateWidth, plateWidth, gap]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
        </Box>
      )}

      {/* Field Lines */}
      {voltage > 0 && linePositions.map((p, i) => (
        <Cylinder 
          key={i} 
          args={[0.02, 0.02, gap, 8]} 
          position={[p[0], p[1], 0]} 
          rotation={[Math.PI/2, 0, 0]}
        >
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Cylinder>
      ))}
      
      {/* Center axis indicator */}
      <GridHelper size={20} />
    </group>
  );
}

function GridHelper({ size }) {
  return <gridHelper args={[size, 20, '#334155', '#1e293b']} rotation={[Math.PI/2, 0, 0]} />;
}
