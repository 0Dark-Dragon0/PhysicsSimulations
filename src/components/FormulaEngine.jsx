import React, { useState } from 'react';
import { BookOpen, Search, X, Sigma } from 'lucide-react';
import { physicsFormulas } from '../data/formulas';

export default function FormulaEngine({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = physicsFormulas.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-indigo-500/50 shadow-2xl z-50 flex flex-col animate-slide-left">
      <div className="bg-indigo-950 px-6 py-4 flex justify-between items-center border-b border-indigo-900">
        <div className="flex items-center gap-3 text-indigo-400">
          <Sigma size={24} />
          <h2 className="font-black text-lg tracking-wider uppercase">Formula Engine</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 border-b border-slate-800 bg-slate-950">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search formulas or topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {filteredFormulas.length === 0 ? (
          <div className="text-center text-slate-500 mt-10">No formulas found.</div>
        ) : (
          filteredFormulas.map(f => (
            <div key={f.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-800/30 px-4 py-2 flex justify-between items-center border-b border-slate-800">
                <h3 className="font-bold text-white text-sm">{f.title}</h3>
                <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">{f.category}</span>
              </div>
              
              <div className="p-4">
                <div className="bg-slate-900 border border-indigo-900/50 rounded-lg p-3 mb-4 flex items-center justify-center">
                  <code className="text-lg font-mono text-indigo-300 font-bold">{f.equation}</code>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Variables</div>
                    <ul className="text-xs space-y-1">
                      {f.symbols.map((sym, i) => (
                        <li key={i} className="flex gap-2 text-slate-300">
                          <span className="font-mono text-indigo-400 w-8">{sym.sym}</span> 
                          <span className="text-slate-400">- {sym.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Derivation / Origin</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.derivation}</p>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Real-world Use Case</div>
                    <p className="text-xs text-emerald-400 leading-relaxed bg-emerald-950/30 p-2 rounded border border-emerald-900/30">{f.useCase}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
