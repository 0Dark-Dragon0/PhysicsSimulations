import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Grid, Environment } from '@react-three/drei';

export default function ThreeCanvas({ children, cameraPos = [0, 5, 20] }) {
  return (
    <div className="w-full h-full absolute inset-0 bg-slate-950">
      <Canvas camera={{ position: cameraPos, fov: 50 }}>
        <color attach="background" args={['#020617']} /> {/* slate-950 */}
        
        {/* Environment & Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        {/* Sci-Fi Grid Floor */}
        <Grid 
          infiniteGrid 
          fadeDistance={50} 
          sectionColor="#334155" 
          cellColor="#1e293b" 
          position={[0, -5, 0]} 
        />
        
        {/* Stars for a space laboratory vibe */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Controls */}
        <OrbitControls 
          makeDefault 
          maxDistance={50} 
          minDistance={5} 
          maxPolarAngle={Math.PI / 2 + 0.2} // Prevent looking completely from underneath
        />

        {/* The physics scene content */}
        {children}
      </Canvas>
    </div>
  );
}
