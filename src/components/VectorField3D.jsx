import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 12;
const GRID_STEP = 2;
const VISUAL_K = 1000;

function calculateE(charges, x, y, z) {
  let Ex = 0, Ey = 0, Ez = 0;
  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const dz = z - 0; // Charges are currently at Z=0
    const r2 = Math.max(dx * dx + dy * dy + dz * dz, 0.5);
    const r = Math.sqrt(r2);
    const E_mag = (VISUAL_K * c.q) / r2;
    Ex += E_mag * (dx / r);
    Ey += E_mag * (dy / r);
    Ez += E_mag * (dz / r);
  }
  return new THREE.Vector3(Ex, Ey, Ez);
}

export default function VectorField3D({ charges }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate grid positions
  const positions = useMemo(() => {
    const pos = [];
    for (let x = -GRID_SIZE; x <= GRID_SIZE; x += GRID_STEP) {
      for (let y = -GRID_SIZE; y <= GRID_SIZE; y += GRID_STEP) {
        for (let z = -GRID_SIZE/2; z <= GRID_SIZE/2; z += GRID_STEP) {
          pos.push(new THREE.Vector3(x, y, z));
        }
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    positions.forEach((p, i) => {
      const eField = calculateE(charges, p.x, p.y, p.z);
      const mag = eField.length();
      
      // Normalize and orient
      dummy.position.copy(p);
      
      if (mag > 0.1) {
        const target = p.clone().add(eField.normalize().multiplyScalar(0.8));
        dummy.lookAt(target);
        
        // Scale based on magnitude (capped)
        const s = Math.min(mag / 500, 1.5);
        dummy.scale.set(s, s, s * 2);
      } else {
        dummy.scale.set(0, 0, 0);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color mapping: strong field = bright white/yellow, weak = dim blue/purple
      const color = new THREE.Color();
      const hue = THREE.MathUtils.lerp(0.6, 0.1, Math.min(mag / 1000, 1));
      color.setHSL(hue, 0.8, 0.5);
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <coneGeometry args={[0.1, 0.4, 8]} />
      <meshStandardMaterial emissiveIntensity={2} toneMapped={false} />
    </instancedMesh>
  );
}
