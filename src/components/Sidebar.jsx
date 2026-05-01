import React from 'react';
import { Beaker, Zap, Layers, Network, Activity, ChevronRight, GraduationCap } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

const LABS = [
  {
    id: 'Lab1',
    title: 'The Potential Playground',
    icon: Activity,
    color: 'text-emerald-500',
    topics: [
      'Electrostatic Potential',
      'Potential Difference',
      'Electrostatic Potential Energy',
      'Conservative Forces',
      'Potential due to Point Charge',
      'System of Charges',
      'Electric Dipole Potential',
      'Equipotential Surface',
      'Relation between E and V'
    ]
  },
  {
    id: 'Lab2',
    title: 'Capacitance Fundamentals',
    icon: Beaker,
    color: 'text-blue-500',
    topics: [
      'Electrostatics of Conductors',
      'Electrical Capacitance',
      'Isolated Spherical Conductor',
      'Principles of Capacitor',
      'Parallel Plate Capacitors',
      'Energy Density'
    ]
  },
  {
    id: 'Lab3',
    title: 'Dielectrics & Polarization',
    icon: Layers,
    color: 'text-purple-500',
    topics: [
      'Polar & Non-polar Dielectrics',
      'Dielectric Polarization',
      'Relative Permittivity',
      'Capacitance with Conducting Slab',
      'Capacitance with Dielectric Slab'
    ]
  },
  {
    id: 'Lab4',
    title: 'Capacitor Circuits',
    icon: Network,
    color: 'text-amber-500',
    topics: [
      'Group of Capacitors',
      'Capacitors in Series',
      'Capacitors in Parallel',
      'Total Energy Stored in Combination'
    ]
  },
  {
    id: 'Lab5',
    title: 'Charge Sharing & Energy',
    icon: Zap,
    color: 'text-red-500',
    topics: [
      'Energy Stored in Capacitor',
      'Common Potential',
      'Loss of Energy on Sharing Charges'
    ]
  }
];

export default function Sidebar({ activeLab, setActiveLab }) {
  const { isGuidedMode, toggleGuidedMode, setActiveLabId } = useTutorial();

  const handleLabChange = (id) => {
    setActiveLab(id);
    setActiveLabId(id);
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl z-10 flex-shrink-0">
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Zap className="text-amber-400" /> 
          Physics Simulator
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Class 12 Electrostatics</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {LABS.map((lab) => {
          const isActive = activeLab === lab.id;
          const Icon = lab.icon;
          return (
            <div key={lab.id} className="mb-2">
              <button
                onClick={() => handleLabChange(lab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-800 border-slate-600 shadow-lg' 
                    : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={lab.color}><Icon size={18} /></span>
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {lab.title}
                  </span>
                </div>
                {isActive && <ChevronRight size={16} className="text-slate-500" />}
              </button>
              
              {/* Expand Topics if Active */}
              {isActive && (
                <div className="mt-1 mb-3 ml-11 border-l-2 border-slate-800 pl-3 py-1 space-y-2">
                  {lab.topics.map((topic, i) => (
                    <div key={i} className="text-xs text-slate-500 leading-tight">
                      • {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 flex flex-col gap-3">
        <button 
          onClick={toggleGuidedMode}
          className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg ${
            isGuidedMode 
              ? 'bg-emerald-600 text-white shadow-emerald-900/50 ring-2 ring-emerald-400' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <GraduationCap size={18} />
          {isGuidedMode ? 'Exit Teacher Mode' : 'Start Teacher Mode'}
        </button>
        <p className="text-[10px] text-slate-600 uppercase tracking-widest text-center mt-2">Antigravity Simulation Engine</p>
      </div>
    </aside>
  );
}
