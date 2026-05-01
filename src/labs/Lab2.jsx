import React, { useState } from 'react';
import { Beaker, Settings2, Zap } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

export default function Lab2() {
  const { isTargetActive } = useTutorial();
  const [area, setArea] = useState(1.0); // m^2 (0.1 to 5.0)
  const [distance, setDistance] = useState(0.01); // m (0.001 to 0.05)
  const [voltage, setVoltage] = useState(12); // V (0 to 100)

  const e0 = 8.854e-12; // Farads/m
  
  // Calculations
  const capacitance = (e0 * area) / distance; // Farads
  const charge = capacitance * voltage; // Coulombs
  const energy = 0.5 * capacitance * voltage * voltage; // Joules
  const electricField = voltage / distance; // V/m

  // Visual scaling
  const plateWidth = Math.sqrt(area) * 150; // Visual scaling factor
  const gap = distance * 2000; // Visual scaling factor
  
  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Beaker className="text-blue-500" /> Capacitance Fundamentals
        </h1>
        <p className="text-slate-400 mt-1">
          Explore the physics of the Parallel Plate Capacitor. Adjust physical dimensions to see real-time effects on Capacity, Charge, and Energy.
        </p>
      </header>
      
      <div className="flex gap-6 h-[600px]">
        {/* Main Simulation View */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl relative flex flex-col items-center justify-center overflow-hidden">
          
          <div className="absolute top-4 left-4 flex gap-2 z-10 bg-slate-950/80 p-2 rounded-lg backdrop-blur text-xs font-mono text-slate-400">
            C = (ε₀ · A) / d
          </div>

          {/* 2D Side View of Capacitor */}
          <div 
            id="capacitor-visual"
            className={`relative flex flex-col items-center justify-center h-full w-full rounded-xl transition-all duration-300 ${isTargetActive('capacitor-visual') ? 'ring-4 ring-emerald-500 animate-pulse bg-emerald-900/20' : ''}`}
          >
            
            {/* Top Plate (+) */}
            <div 
              className="bg-red-500/80 border-2 border-red-400 rounded-sm flex items-center justify-evenly overflow-hidden relative shadow-[0_10px_30px_rgba(239,68,68,0.3)] transition-all duration-300"
              style={{ width: `${plateWidth}px`, height: '15px', marginBottom: `${gap/2}px` }}
            >
               {Array.from({ length: Math.min(Math.floor(charge * 1e10), 50) }).map((_, i) => (
                 <span key={i} className="text-white text-[8px] font-bold">+</span>
               ))}
            </div>

            {/* Electric Field Lines */}
            <div 
              className="absolute flex justify-evenly w-full pointer-events-none opacity-50 transition-all duration-300"
              style={{ height: `${gap}px`, width: `${plateWidth - 10}px` }}
            >
              {Array.from({ length: Math.min(Math.floor(electricField / 100), 20) }).map((_, i) => (
                 <div key={i} className="h-full w-px bg-gradient-to-b from-red-500 to-blue-500 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-300"></div>
                 </div>
               ))}
            </div>

            {/* Bottom Plate (-) */}
            <div 
              className="bg-blue-500/80 border-2 border-blue-400 rounded-sm flex items-center justify-evenly overflow-hidden shadow-[0_-10px_30px_rgba(59,130,246,0.3)] transition-all duration-300"
              style={{ width: `${plateWidth}px`, height: '15px', marginTop: `${gap/2}px` }}
            >
               {Array.from({ length: Math.min(Math.floor(charge * 1e10), 50) }).map((_, i) => (
                 <span key={i} className="text-white text-[8px] font-bold">-</span>
               ))}
            </div>
            
            {/* Dimension Labels */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs flex flex-col items-center gap-1">
              <span>↑</span>
              <span>d = {(distance * 100).toFixed(1)} cm</span>
              <span>↓</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-slate-950/80 p-3 rounded-lg backdrop-blur text-xs font-mono text-slate-300 border border-slate-800">
             Uniform E-Field: Lines are parallel and equally spaced.
          </div>
        </div>

        {/* Controls & Metrics Side Panel */}
        <div className="w-[350px] flex flex-col gap-4">
          
          {/* Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2"><Settings2 size={16}/> Physical Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Plate Area (A)</label>
                  <span className="font-mono text-white">{area.toFixed(2)} m²</span>
                </div>
                <input id="slider-area" type="range" min="0.1" max="5.0" step="0.1" value={area} onChange={(e)=>setArea(Number(e.target.value))} 
                  className={`w-full accent-blue-500 transition-all duration-300 ${isTargetActive('slider-area') ? 'ring-4 ring-emerald-500 rounded animate-pulse' : ''}`} />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Separation (d)</label>
                  <span className="font-mono text-white">{(distance * 100).toFixed(1)} cm</span>
                </div>
                <input id="slider-dist" type="range" min="0.001" max="0.05" step="0.001" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} 
                  className={`w-full accent-blue-500 transition-all duration-300 ${isTargetActive('slider-dist') ? 'ring-4 ring-emerald-500 rounded animate-pulse' : ''}`} />
              </div>

              <div className="h-px bg-slate-800 w-full"></div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Applied Voltage (V)</label>
                  <span className="font-mono text-white">{voltage} V</span>
                </div>
                <input id="slider-voltage" type="range" min="0" max="100" step="1" value={voltage} onChange={(e)=>setVoltage(Number(e.target.value))} 
                  className={`w-full accent-amber-500 transition-all duration-300 ${isTargetActive('slider-voltage') ? 'ring-4 ring-emerald-500 rounded animate-pulse' : ''}`} />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2"><Zap size={16}/> Real-time Output</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Capacitance (C)</div>
                <div className="text-xl font-mono font-bold text-blue-400">
                  {(capacitance * 1e12).toFixed(2)} <span className="text-sm font-sans text-slate-600">pF</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Stored Charge (Q = CV)</div>
                <div className="text-xl font-mono font-bold text-red-400">
                  {(charge * 1e9).toFixed(2)} <span className="text-sm font-sans text-slate-600">nC</span>
                </div>
              </div>

              <div 
                id="metric-energy"
                className={`bg-slate-950 p-3 rounded-lg border transition-all duration-300 ${isTargetActive('metric-energy') ? 'border-emerald-500 ring-4 ring-emerald-500/50 animate-pulse bg-emerald-950/30' : 'border-slate-800'}`}
              >
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Stored Energy (U = ½CV²)</div>
                <div className="text-xl font-mono font-bold text-emerald-400">
                  {(energy * 1e9).toFixed(2)} <span className="text-sm font-sans text-slate-600">nJ</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Electric Field (E = V/d)</div>
                <div className="text-xl font-mono font-bold text-amber-400">
                  {(electricField / 1000).toFixed(2)} <span className="text-sm font-sans text-slate-600">kV/m</span>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 leading-relaxed mt-4 p-2 bg-slate-950/50 rounded">
                <strong>Principles of Capacitor:</strong> A capacitor stores energy in the electric field between its plates. The capacity increases with Area ($A$) and decreases with distance ($d$).
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
