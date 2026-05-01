import React, { useState } from 'react';
import { Network, Plus, Trash2, Zap } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

export default function Lab4() {
  const { isTargetActive } = useTutorial();
  const [config, setConfig] = useState('series');
  const [capacitors, setCapacitors] = useState([
    { id: 1, c: 2 },
    { id: 2, c: 3 },
  ]);
  const [voltage, setVoltage] = useState(12);

  const addCapacitor = () => {
    if (capacitors.length >= 4) return;
    setCapacitors([...capacitors, { id: Date.now(), c: 1 }]);
  };

  const removeCapacitor = (id) => {
    if (capacitors.length <= 1) return;
    setCapacitors(capacitors.filter(c => c.id !== id));
  };

  const updateC = (id, val) => {
    setCapacitors(capacitors.map(c => c.id === id ? { ...c, c: val } : c));
  };

  let Ceq = 0;
  if (config === 'series') {
    const invSum = capacitors.reduce((acc, curr) => acc + (1 / curr.c), 0);
    Ceq = 1 / invSum;
  } else {
    Ceq = capacitors.reduce((acc, curr) => acc + curr.c, 0);
  }

  const Q_total = Ceq * voltage;
  const U_total = 0.5 * Ceq * voltage * voltage;

  const stats = capacitors.map(cap => {
    let q, v;
    if (config === 'series') {
      q = Q_total;
      v = q / cap.c;
    } else {
      v = voltage;
      q = cap.c * v;
    }
    return { ...cap, q, v };
  });

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Network className="text-amber-500" /> Capacitor Circuits
        </h1>
        <p className="text-slate-400 mt-1">
          Explore Series and Parallel combinations. See how Equivalent Capacitance is calculated and how voltage and charge distribute.
        </p>
      </header>

      <div className="flex gap-6" style={{ height: '600px' }}>
        {/* Main Simulation */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl relative flex flex-col p-6 overflow-hidden">

          <div className="flex justify-center gap-4 mb-8 z-10">
            <button
              id="btn-series"
              onClick={() => setConfig('series')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${config === 'series' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'} ${isTargetActive('btn-series') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
            >
              Series Combination
            </button>
            <button
              id="btn-parallel"
              onClick={() => setConfig('parallel')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${config === 'parallel' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'} ${isTargetActive('btn-parallel') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
            >
              Parallel Combination
            </button>
          </div>

          {/* Circuit Diagram */}
          <div 
            id="circuit-display"
            className={`flex-1 flex items-center justify-center relative rounded-xl transition-all duration-300 ${isTargetActive('circuit-display') ? 'ring-4 ring-emerald-500 animate-pulse bg-emerald-900/10' : ''}`}
          >
            {config === 'series' ? (
              <div className="flex items-center relative z-10">
                <div className="w-16 h-1 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                {stats.map((c, i) => (
                  <div key={c.id} className="flex items-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">C{i + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-16 bg-red-500 rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                        <div className="w-3 h-16 bg-blue-500 rounded-sm shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                      </div>
                      <div className="text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-800 text-center">
                        <div className="text-white font-mono">{c.v.toFixed(1)} V</div>
                        <div className="text-emerald-400 font-mono">{c.q.toFixed(1)} µC</div>
                      </div>
                      <div className="text-[9px] text-slate-500">{c.c} µF</div>
                    </div>
                    <div className="w-16 h-1 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative" style={{ width: 280, height: stats.length * 90 }}>
                {/* Vertical bus bars */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />

                {stats.map((c, i) => (
                  <div key={c.id}
                    className="absolute flex items-center justify-between"
                    style={{ top: i * 90 + 20, left: 0, right: 0 }}
                  >
                    <div className="h-1 bg-amber-500" style={{ width: 80 }} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-500">C{i + 1} — {c.c} µF</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-12 bg-red-500 rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                        <div className="w-3 h-12 bg-blue-500 rounded-sm shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                      </div>
                      <div className="text-[10px] font-mono text-center">
                        <span className="text-white">{c.v.toFixed(1)} V</span>
                        <span className="text-slate-600 mx-1">|</span>
                        <span className="text-emerald-400">{c.q.toFixed(1)} µC</span>
                      </div>
                    </div>
                    <div className="h-1 bg-amber-500" style={{ width: 80 }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Bar */}
          <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase mb-1">Equivalent Ceq</div>
              <div className="text-xl font-bold text-blue-400 font-mono">{Ceq.toFixed(2)} µF</div>
            </div>
            <div className="border-l border-r border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase mb-1">Total Charge Q</div>
              <div className="text-xl font-bold text-red-400 font-mono">{Q_total.toFixed(2)} µC</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase mb-1">Total Energy U</div>
              <div className="text-xl font-bold text-emerald-400 font-mono">{U_total.toFixed(2)} µJ</div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest">Capacitors</h3>
              <button
                onClick={addCapacitor}
                disabled={capacitors.length >= 4}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="space-y-3">
              {capacitors.map((c, i) => (
                <div key={c.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 relative">
                  <button
                    onClick={() => removeCapacitor(c.id)}
                    disabled={capacitors.length <= 1}
                    className="absolute right-2 top-2 text-slate-500 hover:text-red-400 disabled:opacity-20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="text-xs text-slate-400 mb-2 font-bold">Capacitor C{i + 1}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range" min="1" max="20" step="1"
                      value={c.c}
                      onChange={(e) => updateC(c.id, Number(e.target.value))}
                      className="flex-1 accent-blue-500"
                    />
                    <span className="font-mono text-white text-sm w-14 text-right">{c.c} µF</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-800 w-full my-5" />

            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">Power Supply</h3>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <label>Battery Voltage</label>
                <span className="font-mono text-white">{voltage} V</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="text-xs text-slate-400 leading-relaxed mt-6 p-3 bg-slate-950/50 rounded border border-slate-800">
              {config === 'series' ? (
                <>
                  <strong className="text-white">Series:</strong> Charge Q is same for all. Voltage divides as V = Q/C.
                  Formula: <span className="text-blue-400 font-mono">1/Ceq = sum(1/Ci)</span>
                </>
              ) : (
                <>
                  <strong className="text-white">Parallel:</strong> Voltage V is same for all. Charge divides as Q = CV.
                  Formula: <span className="text-blue-400 font-mono">Ceq = sum(Ci)</span>
                </>
              )}
            </div>

            <div className="mt-4 p-3 bg-slate-950/50 rounded border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-amber-400" />
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Physics Rules</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• Series caps share the same charge Q</li>
                <li>• Parallel caps share the same voltage V</li>
                <li>• Energy stored: U = (1/2) × C × V²</li>
                <li>• Energy also = Q²/(2C) = QV/2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
