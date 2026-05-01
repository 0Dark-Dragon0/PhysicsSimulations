import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Star, Trophy } from 'lucide-react';

export default function UserStats() {
  const { level, xp, progressPercent } = useUser();

  return (
    <div className="bg-slate-950 p-4 border-b border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500/20 text-amber-500 p-1.5 rounded flex items-center justify-center">
            <Trophy size={14} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black leading-none">Scientist Level</div>
            <div className="text-white font-bold text-sm leading-tight">Level {level}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black leading-none">Total XP</div>
          <div className="text-amber-400 font-mono font-bold text-sm leading-tight flex items-center gap-1 justify-end">
            {xp} <Star size={10} />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
