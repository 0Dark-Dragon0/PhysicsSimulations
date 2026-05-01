import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Microscope, Play, Save, CheckCircle2, X } from 'lucide-react';

export default function ExperimentWizard({ experiment, currentValues, onClose }) {
  const { awardXP, saveDataLog } = useUser();
  const [dataRows, setDataRows] = useState([]);
  const [completed, setCompleted] = useState(false);

  const recordData = () => {
    if (dataRows.length >= 6) return;
    setDataRows([...dataRows, currentValues]);
    awardXP(5, "Data Point Recorded! 📝");
  };

  const finishExperiment = () => {
    saveDataLog(experiment.id, dataRows);
    setCompleted(true);
    awardXP(150, "Experiment Completed! 🎉");
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/50 rounded-xl shadow-2xl flex flex-col w-96 h-full animate-slide-left z-20">
      {/* Header */}
      <div className="bg-indigo-950/80 px-4 py-3 border-b border-indigo-900/50 flex justify-between items-center rounded-t-xl">
        <div className="flex items-center gap-2">
          <Microscope size={18} className="text-indigo-400" />
          <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Virtual Lab</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {!completed ? (
          <>
            <div className="mb-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Aim</div>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-2 rounded border border-slate-800">
                {experiment.aim}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Procedure</div>
              <ol className="text-sm text-slate-300 space-y-2 list-decimal pl-5">
                {experiment.steps.map((step, i) => (
                  <li key={i} className="pl-1 leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Observation Table</div>
                <button 
                  onClick={recordData}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 shadow-lg shadow-indigo-900/50 transition-colors"
                >
                  <Save size={12} /> Record Current State
                </button>
              </div>
              
              <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-500 uppercase">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      {experiment.tableHeaders.map((h, i) => <th key={i} className="px-3 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.length === 0 ? (
                      <tr><td colSpan={3} className="px-3 py-4 text-center text-slate-600">No data recorded yet.</td></tr>
                    ) : (
                      dataRows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                          <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                          {experiment.expectedDataKeys.map((k, j) => (
                            <td key={j} className="px-3 py-2 font-mono text-indigo-300">{row[k]}</td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-emerald-500 animate-bounce">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-2xl font-black text-white">Experiment Complete!</h2>
            <p className="text-slate-400 text-sm">
              Data has been logged to your Scientist Dashboard. You earned +150 XP.
            </p>
            <button 
              onClick={onClose}
              className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              Return to Sandbox
            </button>
          </div>
        )}
      </div>

      {!completed && (
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <button 
            onClick={finishExperiment}
            disabled={dataRows.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-bold text-sm shadow-lg shadow-emerald-900/50 transition-all flex justify-center items-center gap-2"
          >
            <CheckCircle2 size={16} /> Complete Experiment
          </button>
        </div>
      )}
    </div>
  );
}
