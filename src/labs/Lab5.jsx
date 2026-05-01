import React, { useState, useEffect, useRef } from 'react';
import { Zap, Link as LinkIcon, PowerOff, RotateCcw } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';

export default function Lab5() {
  const { isTargetActive } = useTutorial();
  const [c1, setC1] = useState(2);
  const [c2, setC2] = useState(4);
  const [v1Init, setV1Init] = useState(20);
  const [v2Init, setV2Init] = useState(0);
  const [connected, setConnected] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [displayV1, setDisplayV1] = useState(20);
  const [displayV2, setDisplayV2] = useState(0);
  const [displayQ1, setDisplayQ1] = useState(40);
  const [displayQ2, setDisplayQ2] = useState(0);
  const intervalRef = useRef(null);

  // Pre-calculate initial and final values
  const q1Init = c1 * v1Init;
  const q2Init = c2 * v2Init;
  const uInit = 0.5 * c1 * v1Init ** 2 + 0.5 * c2 * v2Init ** 2;
  const commonV = (q1Init + q2Init) / (c1 + c2);
  const q1Final = c1 * commonV;
  const q2Final = c2 * commonV;
  const uFinal = 0.5 * (c1 + c2) * commonV ** 2;
  const energyLoss = uInit - uFinal;

  // Sync display values when sliders change (circuit open)
  useEffect(() => {
    if (!connected) {
      setDisplayV1(v1Init);
      setDisplayV2(v2Init);
      setDisplayQ1(c1 * v1Init);
      setDisplayQ2(c2 * v2Init);
    }
  }, [v1Init, v2Init, c1, c2, connected]);

  const connectSwitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setConnected(true);
    setAnimating(true);
    const steps = 40;
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      const t = step / steps;
      setDisplayV1(v1Init + (commonV - v1Init) * t);
      setDisplayV2(v2Init + (commonV - v2Init) * t);
      setDisplayQ1(q1Init + (q1Final - q1Init) * t);
      setDisplayQ2(q2Init + (q2Final - q2Init) * t);
      if (step >= steps) {
        clearInterval(intervalRef.current);
        setAnimating(false);
      }
    }, 40);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setConnected(false);
    setAnimating(false);
    setDisplayV1(v1Init);
    setDisplayV2(v2Init);
    setDisplayQ1(c1 * v1Init);
    setDisplayQ2(c2 * v2Init);
  };

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Zap className="text-red-500" /> Charge Sharing &amp; Energy Loss
        </h1>
        <p className="text-slate-400 mt-1">
          When two charged capacitors connect, charge flows until potentials equalize. This always causes energy loss as heat or a spark.
        </p>
      </header>

      <div className="flex gap-6" style={{ height: '600px' }}>
        {/* Circuit Diagram */}
        <div 
          id="circuit-display"
          className={`flex-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl relative flex flex-col overflow-hidden transition-all duration-300 ${isTargetActive('circuit-display') ? 'ring-4 ring-emerald-500 animate-pulse bg-emerald-900/10' : ''}`}
        >

          <div className="flex-1 relative flex items-center justify-center">
            {/* Top wire */}
            <div className="absolute bg-slate-600" style={{ top: '33%', left: '25%', right: '25%', height: 3 }} />
            {/* Bottom wire */}
            <div className="absolute bg-slate-600" style={{ bottom: '33%', left: '25%', right: '25%', height: 3 }} />
            {/* Left vertical */}
            <div className="absolute bg-slate-600" style={{ top: '33%', bottom: '33%', left: '25%', width: 3 }} />
            {/* Right vertical */}
            <div className="absolute bg-slate-600" style={{ top: '33%', bottom: '33%', right: '25%', width: 3 }} />

            {/* Switch in middle of top wire */}
            <div className="absolute z-20 bg-slate-900 p-2 rounded-full" style={{ top: '33%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <button
                id="btn-switch"
                onClick={connected ? reset : connectSwitch}
                disabled={animating}
                title={connected ? 'Reset Circuit' : 'Close Switch'}
                className={`p-3 rounded-full border-2 transition-all duration-300 disabled:cursor-not-allowed ${
                  connected
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/40'
                } ${isTargetActive('btn-switch') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
              >
                {connected ? <PowerOff size={22} /> : <LinkIcon size={22} />}
              </button>
            </div>

            {/* Spark animation */}
            {animating && (
              <div className="absolute z-30 animate-bounce text-yellow-300" style={{ top: '28%', left: '50%', transform: 'translateX(-50%)' }}>
                <Zap size={36} fill="currentColor" />
              </div>
            )}

            {/* Capacitor 1 — Left */}
            <div className="absolute z-10" style={{ top: '50%', left: '25%', transform: 'translate(-50%, -50%)' }}>
              <div className="relative flex flex-col items-center">
                <div className="flex gap-2 items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-20 bg-red-500 rounded shadow-[0_0_14px_rgba(239,68,68,0.7)]" />
                    <div className="w-3 h-20 bg-blue-500 rounded shadow-[0_0_14px_rgba(59,130,246,0.7)]" />
                  </div>
                  <div className="ml-1">
                    <div className="text-xs font-bold text-slate-400 mb-1">C1 = {c1} µF</div>
                    <div className="text-sm font-mono text-blue-400">{displayV1.toFixed(1)} V</div>
                    <div className="text-sm font-mono text-red-400">{displayQ1.toFixed(1)} µC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacitor 2 — Right */}
            <div className="absolute z-10" style={{ top: '50%', right: '25%', transform: 'translate(50%, -50%)' }}>
              <div className="relative flex flex-col items-center">
                <div className="flex gap-2 items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="mr-1 text-right">
                    <div className="text-xs font-bold text-slate-400 mb-1">C2 = {c2} µF</div>
                    <div className="text-sm font-mono text-blue-400">{displayV2.toFixed(1)} V</div>
                    <div className="text-sm font-mono text-red-400">{displayQ2.toFixed(1)} µC</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-20 bg-red-500 rounded shadow-[0_0_14px_rgba(239,68,68,0.7)]" />
                    <div className="w-3 h-20 bg-blue-500 rounded shadow-[0_0_14px_rgba(59,130,246,0.7)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction */}
            <div className="absolute bottom-4 left-4 text-xs text-slate-500 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
              {connected
                ? animating ? 'Charge flowing...' : 'Equilibrium reached!'
                : 'Click the switch to connect capacitors'}
            </div>
          </div>

          {/* Metrics Footer */}
          <div 
            id="metrics-footer"
            className={`grid grid-cols-3 gap-0 bg-slate-950 border-t border-slate-800 transition-all duration-300 ${isTargetActive('metrics-footer') ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
          >
            <div className="p-5 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Total Charge Q</div>
              <div className="text-2xl font-mono font-bold text-red-400">
                {(displayQ1 + displayQ2).toFixed(1)} <span className="text-sm text-slate-600">µC</span>
              </div>
              <div className="text-[10px] text-emerald-600 mt-1 font-bold">CONSERVED</div>
            </div>
            <div className="p-5 text-center border-l border-r border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Common Potential V</div>
              <div className="text-2xl font-mono font-bold text-blue-400">
                {connected ? commonV.toFixed(1) : '—'} <span className="text-sm text-slate-600">{connected ? 'V' : ''}</span>
              </div>
              <div className="text-[10px] text-slate-600 mt-1">V = (Q1+Q2)/(C1+C2)</div>
            </div>
            <div className="p-5 text-center relative">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Energy Lost</div>
              <div className="text-2xl font-mono font-bold text-amber-400">
                {connected ? energyLoss.toFixed(1) : '0.0'} <span className="text-sm text-slate-600">µJ</span>
              </div>
              <div className="text-[10px] text-slate-600 mt-1">As heat / spark</div>
              {connected && !animating && energyLoss > 0.1 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Zap size={48} className="text-red-500 opacity-20" fill="currentColor" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">

            <div className={`p-3 rounded-lg border text-sm font-bold mb-5 ${
              connected
                ? 'bg-red-900/20 border-red-800/50 text-red-400'
                : 'bg-emerald-900/20 border-emerald-800/50 text-emerald-400'
            }`}>
              {connected ? 'Circuit Closed — Equilibrium reached' : 'Circuit Open — Set parameters below'}
            </div>

            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">Initial Setup</h3>

            <div 
              id="setup-panel"
              className={`space-y-5 transition-all duration-300 ${connected ? 'opacity-40 pointer-events-none' : ''} ${isTargetActive('setup-panel') ? 'ring-4 ring-emerald-500 rounded-xl p-2 animate-pulse bg-emerald-900/10' : ''}`}
            >
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Capacitor 1 (C1)</label>
                  <span className="font-mono text-white">{c1} µF</span>
                </div>
                <input type="range" min="1" max="10" step="1" value={c1}
                  onChange={e => setC1(Number(e.target.value))}
                  className="w-full accent-blue-500" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Initial Voltage 1 (V1)</label>
                  <span className="font-mono text-white">{v1Init} V</span>
                </div>
                <input type="range" min="0" max="50" step="1" value={v1Init}
                  onChange={e => setV1Init(Number(e.target.value))}
                  className="w-full accent-amber-500" />
              </div>

              <div className="h-px bg-slate-800" />

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Capacitor 2 (C2)</label>
                  <span className="font-mono text-white">{c2} µF</span>
                </div>
                <input type="range" min="1" max="10" step="1" value={c2}
                  onChange={e => setC2(Number(e.target.value))}
                  className="w-full accent-blue-500" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <label>Initial Voltage 2 (V2)</label>
                  <span className="font-mono text-white">{v2Init} V</span>
                </div>
                <input type="range" min="0" max="50" step="1" value={v2Init}
                  onChange={e => setV2Init(Number(e.target.value))}
                  className="w-full accent-amber-500" />
              </div>
            </div>

            {connected && (
              <button
                onClick={reset}
                className="mt-5 w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold transition-colors"
              >
                <RotateCcw size={14} /> Reset Circuit
              </button>
            )}

            <div 
              id="info-energy"
              className={`mt-5 p-3 rounded border text-xs leading-relaxed transition-all duration-300 ${isTargetActive('info-energy') ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400 ring-4 ring-emerald-500 animate-pulse' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}
            >
              <strong className="text-white block mb-2">Energy Loss Formula:</strong>
              <div className="font-mono text-blue-400 text-center py-2 bg-slate-950 rounded border border-slate-800">
                dU = (C1 × C2) / (2(C1+C2)) × (V1-V2)²
              </div>
              <p className="mt-2 text-inherit">Energy loss is always positive when V1 ≠ V2. This is an irreversible process — the energy is lost as heat or electromagnetic radiation from the spark.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
