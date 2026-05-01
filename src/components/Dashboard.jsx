import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Trophy, Star, Target, Database, Activity, FlaskConical } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Dashboard() {
  const { level, xp, badges, dataLogs, progressPercent, nextLevelXp } = useUser();

  // Mock radar data based on level for visual appeal
  const masteryData = [
    { subject: 'Electrostatics', A: Math.min(100, level * 10 + 20) },
    { subject: 'Capacitance', A: Math.min(100, dataLogs.length * 20 + 10) },
    { subject: 'Circuits', A: Math.min(100, level * 5 + 15) },
    { subject: 'Energy', A: Math.min(100, xp / 50 + 5) },
    { subject: 'Field Theory', A: Math.min(100, level * 8 + 10) }
  ];

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Activity className="text-amber-500" /> Scientist Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Track your physics mastery, recorded experiment data, and achievements.</p>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex gap-8 items-center">
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="60" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="64" cy="64" r="60" fill="none" 
                stroke="#f59e0b" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="377" 
                strokeDashoffset={377 - (377 * progressPercent) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="text-center">
              <div className="text-xs font-black uppercase text-amber-500 tracking-widest">Level</div>
              <div className="text-4xl font-black text-white">{level}</div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">Keep Exploring!</h2>
            <p className="text-slate-400 text-sm mb-4">You need {nextLevelXp - xp} more XP to reach Level {level + 1}. Complete virtual labs and interact with the simulations to earn XP.</p>
            <div className="flex gap-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                  <Star size={14} className="text-amber-500" /> Total XP
                </div>
                <div className="text-2xl font-mono font-bold text-white">{xp}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                  <Trophy size={14} className="text-yellow-500" /> Badges
                </div>
                <div className="text-2xl font-mono font-bold text-white">{badges.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Target size={14} /> Physics Mastery
          </div>
          <div className="flex-1 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={masteryData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Mastery" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex-1">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
          <Database size={16} className="text-indigo-400" /> Recorded Lab Data
        </div>

        {dataLogs.length === 0 ? (
          <div className="text-center py-12">
            <FlaskConical size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-300">No Data Recorded Yet</h3>
            <p className="text-slate-500 mt-1">Go to any Virtual Lab and click "Record Current State" to save observations here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {dataLogs.map((log) => (
              <div key={log.id} className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                <div className="bg-indigo-900/20 px-4 py-2 border-b border-indigo-900/50">
                  <h4 className="font-bold text-indigo-400">{log.id}</h4>
                </div>
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-500 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-2 w-16">#</th>
                      {log.data && log.data.length > 0 && Object.keys(log.data[0]).map((k, i) => <th key={i} className="px-4 py-2">{k}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {log.data.map((row, i) => (
                      <tr key={i} className="border-b border-slate-800/50">
                        <td className="px-4 py-2 text-slate-500">{i + 1}</td>
                        {Object.values(row).map((v, j) => (
                          <td key={j} className="px-4 py-2 font-mono text-indigo-300">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
