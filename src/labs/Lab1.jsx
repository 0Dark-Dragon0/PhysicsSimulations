import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, MinusCircle, RefreshCw, Layers, Move } from 'lucide-react';

const VISUAL_K = 1000;

function calculateV(charges, x, y) {
  let V = 0;
  for (const c of charges) {
    const r = Math.max(Math.sqrt((x - c.x) ** 2 + (y - c.y) ** 2), 0.1);
    V += (VISUAL_K * c.q) / r;
  }
  return V;
}

function calculateE(charges, x, y) {
  let Ex = 0, Ey = 0;
  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r2 = Math.max(dx * dx + dy * dy, 0.01);
    const r = Math.sqrt(r2);
    const E_mag = (VISUAL_K * c.q) / r2;
    Ex += E_mag * (dx / r);
    Ey += E_mag * (dy / r);
  }
  return { Ex, Ey, Emag: Math.sqrt(Ex * Ex + Ey * Ey) };
}

function toCanvas(px, py, width, height) {
  const scale = width / 20;
  return { cx: (px + 10) * scale, cy: height / 2 - py * scale };
}

function toPhysics(cx, cy, width, height) {
  const scale = width / 20;
  return { px: cx / scale - 10, py: (height / 2 - cy) / scale };
}

export default function Lab1() {
  const canvasRef = useRef(null);
  const stateRef = useRef({});

  const [charges, setCharges] = useState([
    { id: 1, x: -3, y: 0, q: 1 },
    { id: 2, x: 3, y: 0, q: -1 },
  ]);
  const [testCharge, setTestCharge] = useState({ x: 0, y: -4, q: 0.1 });
  const [viewMode, setViewMode] = useState('field');
  const draggingRef = useRef({ mode: 'none', id: null });

  // Keep ref in sync with state so canvas handler always has fresh data
  stateRef.current = { charges, testCharge, viewMode };

  // Canvas render — runs on every state change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const { charges: ch, testCharge: tc, viewMode: vm } = stateRef.current;

    ctx.clearRect(0, 0, width, height);

    // 1. Potential heatmap / equipotentials
    if (vm === 'potential' || vm === 'both') {
      const res = 10;
      for (let cx = 0; cx < width; cx += res) {
        for (let cy = 0; cy < height; cy += res) {
          const { px, py } = toPhysics(cx + res / 2, cy + res / 2, width, height);
          const V = calculateV(ch, px, py);
          const vAbs = Math.abs(V);
          if ((vAbs % 500) < 50) {
            ctx.fillStyle = V > 0 ? 'rgba(239,68,68,0.35)' : 'rgba(59,130,246,0.35)';
            ctx.fillRect(cx, cy, res, res);
          } else if (vm === 'potential') {
            const intensity = Math.min(vAbs / 5000, 0.7);
            ctx.fillStyle = V > 0
              ? `rgba(239,68,68,${intensity})`
              : `rgba(59,130,246,${intensity})`;
            ctx.fillRect(cx, cy, res, res);
          }
        }
      }
    }

    // 2. Vector field arrows
    if (vm === 'field' || vm === 'both') {
      const spacing = 32;
      for (let cx = spacing / 2; cx < width; cx += spacing) {
        for (let cy = spacing / 2; cy < height; cy += spacing) {
          const { px, py } = toPhysics(cx, cy, width, height);
          const { Ex, Ey, Emag } = calculateE(ch, px, py);
          if (Emag < 1) continue;
          const len = Math.min(Emag / 80, 18);
          const nx = (Ex / Emag) * len;
          const ny = -(Ey / Emag) * len;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + nx, cy + ny);
          ctx.strokeStyle = 'rgba(255,255,255,0.22)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(cx + nx, cy + ny, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.fill();
        }
      }
    }

    // 3. Source charges
    ch.forEach(c => {
      const { cx, cy } = toCanvas(c.x, c.y, width, height);
      const grd = ctx.createRadialGradient(cx, cy, 4, cx, cy, 28);
      const col = c.q > 0 ? '239,68,68' : '59,130,246';
      grd.addColorStop(0, `rgba(${col},0.55)`);
      grd.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = c.q > 0 ? '#ef4444' : '#3b82f6'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? '+' : '-', cx, cy);
    });

    // 4. Test charge
    const { cx: tx, cy: ty } = toCanvas(tc.x, tc.y, width, height);
    ctx.beginPath(); ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#10b981'; ctx.font = '10px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('Test q', tx, ty - 10);
  }, [charges, testCharge, viewMode]);

  // Pointer handlers — read fresh data from ref, no stale closures
  const handlePointerDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const { px, py } = toPhysics(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    const { charges: ch, testCharge: tc } = stateRef.current;
    const dTest = Math.hypot(px - tc.x, py - tc.y);
    if (dTest < 1.2) { draggingRef.current = { mode: 'test', id: null }; return; }
    for (const c of ch) {
      if (Math.hypot(px - c.x, py - c.y) < 1.5) {
        draggingRef.current = { mode: 'charge', id: c.id }; return;
      }
    }
  };

  const handlePointerMove = (e) => {
    const { mode, id } = draggingRef.current;
    if (mode === 'none') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { px, py } = toPhysics(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    if (mode === 'test') {
      setTestCharge(prev => ({ ...prev, x: px, y: py }));
    } else if (mode === 'charge') {
      setCharges(prev => prev.map(c => c.id === id ? { ...c, x: px, y: py } : c));
    }
  };

  const handlePointerUp = () => { draggingRef.current = { mode: 'none', id: null }; };

  const addCharge = (sign) => setCharges(prev => [
    ...prev,
    { id: Date.now(), x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 8, q: sign }
  ]);

  const currentV = calculateV(charges, testCharge.x, testCharge.y);
  const currentE = calculateE(charges, testCharge.x, testCharge.y);
  const currentU = testCharge.q * currentV;

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Layers className="text-emerald-500" /> The Potential Playground
        </h1>
        <p className="text-slate-400 mt-1">
          Explore Electrostatic Potential, Electric Field, and Potential Energy. Drag charges to see real-time equipotential surfaces.
        </p>
      </header>

      <div className="flex gap-6" style={{ height: '600px' }}>
        {/* Canvas */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">

          <div className="absolute top-3 left-3 flex gap-2 z-10 bg-slate-950/80 p-1.5 rounded-lg backdrop-blur-sm">
            {['field', 'potential', 'both'].map(m => (
              <button key={m} onClick={() => setViewMode(m)}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${viewMode === m ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                {m === 'field' ? 'Vector Field' : m === 'potential' ? 'Equipotentials' : 'Both'}
              </button>
            ))}
          </div>

          <div className="absolute top-3 right-3 flex gap-2 z-10 bg-slate-950/80 p-1.5 rounded-lg backdrop-blur-sm">
            <button onClick={() => addCharge(1)} title="Add +q"
              className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40">
              <PlusCircle size={18} />
            </button>
            <button onClick={() => addCharge(-1)} title="Add -q"
              className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40">
              <MinusCircle size={18} />
            </button>
            <div className="w-px bg-slate-700 mx-1" />
            <button onClick={() => setCharges([])} title="Clear"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800">
              <RefreshCw size={18} />
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={800} height={600}
            className="w-full h-full cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

          <div className="absolute bottom-3 left-3 bg-slate-950/80 p-2.5 rounded-lg backdrop-blur-sm text-xs font-mono text-slate-300 border border-slate-800">
            <div className="flex items-center gap-2 mb-1">
              <Move size={12} className="text-emerald-500" /> Drag any charge to interact
            </div>
            <div>Test q: ({testCharge.x.toFixed(1)}, {testCharge.y.toFixed(1)})</div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">
              Live Metrics at Test Charge
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Electrostatic Potential (V)</div>
                <div className={`text-2xl font-mono font-bold ${currentV > 0 ? 'text-red-400' : currentV < 0 ? 'text-blue-400' : 'text-white'}`}>
                  {currentV.toFixed(0)} <span className="text-sm font-sans text-slate-600">Volts</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Work done to bring a unit +ve charge from infinity.</p>
              </div>
              <div className="h-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Potential Energy (U = qV)</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {currentU.toFixed(1)} <span className="text-sm font-sans text-slate-600">Joules</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Energy stored with test charge placed here.</p>
              </div>
              <div className="h-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Electric Field (E)</div>
                <div className="text-2xl font-mono font-bold text-amber-400">
                  {currentE.Emag.toFixed(0)} <span className="text-sm font-sans text-slate-600">N/C</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">E = -grad(V). Points towards lower potential.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">Key Concepts</h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-white block">Conservative Forces</strong>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Move the test charge in a closed loop. U returns to the same value — proving electrostatic forces are conservative.
                </p>
              </div>
              <div>
                <strong className="text-white block">Equipotential Surfaces</strong>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Regions of constant V. Electric field lines are always perpendicular to them.
                </p>
              </div>
              <div>
                <strong className="text-white block">System of Charges</strong>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Total V = algebraic sum of individual potentials. Add + and - charges close together to create a dipole!
                </p>
              </div>
              <div>
                <strong className="text-white block">Electric Dipole</strong>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  A pair of equal and opposite charges. On the equatorial line, V = 0. On the axial line, V is maximum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
