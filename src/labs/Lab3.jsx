import React, { useState } from 'react';
import { Layers, Zap } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

export default function Lab3() {
  const { isTargetActive } = useTutorial();
  const [insertion, setInsertion] = useState(0); // 0 to 100%
  const [materialType, setMaterialType] = useState('dielectric'); // 'dielectric' or 'conducting'
  const [dielectricConstant, setDielectricConstant] = useState(5.0); // K (kappa)

  const e0 = 8.854e-12;
  const A = 1.0;
  const d = 0.01;
  const V0 = 12;

  // Free space capacitance
  const C0 = (e0 * A) / d;
  const E0 = V0 / d;
  
  // When battery remains connected, V is constant.
  // C = C0 * [ 1 + (K - 1) * insertion_ratio ] for dielectric.
  // For conducting slab, K -> infinity
  const insertRatio = insertion / 100;
  
  let K_eff = materialType === 'conducting' ? 999999 : dielectricConstant;
  
  // Capacitance with partially inserted slab (assuming parallel configuration if inserted side-by-side)
  // Actually, partial insertion is usually modeled as two capacitors in parallel:
  // C_eq = C_air + C_slab = e0*(A*(1-x))/d + K*e0*(A*x)/d = C0 * (1 - x + K*x) = C0 * (1 + x(K-1))
  const C = C0 * (1 + insertRatio * (K_eff - 1));
  const Q = C * V0;
  const U = 0.5 * C * V0 * V0;

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Layers className="text-purple-500" /> Dielectrics & Polarization
        </h1>
        <p className="text-slate-400 mt-1">
          Insert a dielectric or conducting slab into the capacitor. Observe molecular polarization and its effect on Capacitance.
        </p>
      </header>
      
      <div className="flex gap-6 h-[600px]">
        {/* Main Simulation */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl relative flex flex-col items-center justify-center overflow-hidden">
          
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button 
              id="btn-dielectric"
              onClick={() => setMaterialType('dielectric')} 
              className={`px-3 py-1 rounded text-xs font-bold transition-all duration-300 ${materialType === 'dielectric' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'} ${isTargetActive('btn-dielectric') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
            >
              Dielectric Slab
            </button>
            <button 
              id="btn-conducting"
              onClick={() => setMaterialType('conducting')} 
              className={`px-3 py-1 rounded text-xs font-bold transition-all duration-300 ${materialType === 'conducting' ? 'bg-slate-300 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'} ${isTargetActive('btn-conducting') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
            >
              Conducting Slab
            </button>
          </div>

          <div className="relative w-[400px] h-[250px] border-4 border-slate-700 rounded flex flex-col justify-between">
            {/* Top Plate (+) */}
            <div className="w-full h-4 bg-red-500 shadow-[0_5px_15px_rgba(239,68,68,0.4)] flex justify-evenly items-center overflow-hidden">
               {Array.from({ length: 40 }).map((_, i) => <span key={i} className="text-white text-[8px]">+</span>)}
            </div>
            
            {/* Field and Slab Container */}
            <div className="flex-1 relative flex">
              {/* E0 Field Lines (Background) */}
              <div className="absolute inset-0 flex justify-evenly pointer-events-none opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                   <div key={i} className="h-full w-px bg-slate-400"></div>
                ))}
              </div>

              {/* The Slab */}
              <div 
                className={`h-full absolute left-0 bottom-0 top-0 transition-all duration-100 ease-linear flex flex-wrap content-start overflow-hidden ${
                  materialType === 'dielectric' ? 'bg-purple-500/40 border-r border-purple-400 backdrop-blur-sm' : 'bg-slate-400 border-r border-slate-200'
                }`}
                style={{ width: `${insertion}%` }}
              >
                {/* Dipoles inside dielectric */}
                {materialType === 'dielectric' && Array.from({ length: Math.floor((insertion/100) * 80) }).map((_, i) => (
                  <div key={i} className="w-8 h-4 m-1 rounded-full border border-purple-300/50 flex text-[8px] font-bold overflow-hidden items-center opacity-80 transform -rotate-12 transition-transform duration-700" style={{ transform: `rotate(${Math.random() * 5}deg)`}}>
                    <div className="flex-1 bg-blue-500/50 text-center">-</div>
                    <div className="flex-1 bg-red-500/50 text-center">+</div>
                  </div>
                ))}

                {/* Free charges inside conductor */}
                {materialType === 'conducting' && (
                  <div className="absolute inset-0 flex flex-col justify-between p-1">
                    <div className="flex justify-evenly text-blue-900 text-xs font-black">
                      {Array.from({ length: Math.floor(insertion/10) }).map((_, i) => <span key={i}>-</span>)}
                    </div>
                    <div className="flex justify-evenly text-red-900 text-xs font-black">
                      {Array.from({ length: Math.floor(insertion/10) }).map((_, i) => <span key={i}>+</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Plate (-) */}
            <div className="w-full h-4 bg-blue-500 shadow-[0_-5px_15px_rgba(59,130,246,0.4)] flex justify-evenly items-center overflow-hidden">
               {Array.from({ length: 40 }).map((_, i) => <span key={i} className="text-white text-[8px]">-</span>)}
            </div>
          </div>

          {/* E-Field explanation */}
          <div className="absolute bottom-4 left-4 bg-slate-950/80 p-3 rounded-lg backdrop-blur text-xs font-mono text-slate-300 border border-slate-800">
            {materialType === 'dielectric' 
              ? "Dielectric Polarization creates an internal electric field opposing E₀."
              : "Conducting slab has free electrons that completely cancel out E₀ inside."}
          </div>
        </div>

        {/* Controls */}
        <div className="w-[350px] flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">Slab Controls</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Insertion Ratio</label>
                  <span className="font-mono text-white">{insertion.toFixed(0)} %</span>
                </div>
                <input id="slider-insertion" type="range" min="0" max="100" step="1" value={insertion} onChange={(e)=>setInsertion(Number(e.target.value))} 
                  className={`w-full accent-purple-500 transition-all duration-300 ${isTargetActive('slider-insertion') ? 'ring-4 ring-emerald-500 rounded animate-pulse' : ''}`} />
              </div>
              
              {materialType === 'dielectric' && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <label>Dielectric Constant (K)</label>
                    <span className="font-mono text-white">{dielectricConstant.toFixed(1)}</span>
                  </div>
                  <input type="range" min="1.1" max="10.0" step="0.1" value={dielectricConstant} onChange={(e)=>setDielectricConstant(Number(e.target.value))} className="w-full accent-purple-500" />
                  <div className="text-[10px] text-slate-500 mt-2">Also known as Relative Permittivity (epsilon_r). Air = 1, Water ≈ 80.</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2"><Zap size={16}/> Effects (Battery Connected)</h3>
            
            <div className="space-y-4">
              <div 
                id="metric-capacitance"
                className={`bg-slate-950 p-3 rounded-lg border transition-all duration-300 ${isTargetActive('metric-capacitance') ? 'border-emerald-500 ring-4 ring-emerald-500/50 animate-pulse bg-emerald-950/30' : 'border-slate-800'}`}
              >
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Equivalent Capacitance (C)</div>
                <div className="text-xl font-mono font-bold text-blue-400">
                  {(C * 1e12).toFixed(2)} <span className="text-sm font-sans text-slate-600">pF</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total Charge (Q)</div>
                <div className="text-xl font-mono font-bold text-red-400">
                  {(Q * 1e9).toFixed(2)} <span className="text-sm font-sans text-slate-600">nC</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed mt-4 p-2 bg-slate-950/50 rounded">
                <strong>Physics Insight:</strong> 
                {materialType === 'dielectric' 
                  ? " Inserting a dielectric increases Capacitance because polarization reduces the net electric field, allowing the battery to push more charge onto the plates to maintain V." 
                  : " A conducting slab acts like a perfect dielectric (K → infinity). The electric field inside is exactly zero."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
