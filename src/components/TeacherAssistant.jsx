import React from 'react';
import { useTutorial } from '../contexts/TutorialContext';
import { ChevronRight, ChevronLeft, Lightbulb, GraduationCap, X } from 'lucide-react';

export default function TeacherAssistant() {
  const { 
    isGuidedMode, 
    toggleGuidedMode, 
    currentStepData, 
    currentStepIndex, 
    totalSteps, 
    nextStep, 
    prevStep 
  } = useTutorial();

  if (!isGuidedMode || !currentStepData) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-slate-900 border-2 border-emerald-500 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] z-50 flex flex-col overflow-hidden animate-slide-up">
      
      {/* Header */}
      <div className="bg-emerald-950/80 px-4 py-3 border-b border-emerald-900/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1.5 rounded-full text-slate-950">
            <GraduationCap size={18} />
          </div>
          <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Virtual Teacher</h3>
        </div>
        <button 
          onClick={toggleGuidedMode}
          className="text-slate-400 hover:text-white transition-colors"
          title="Exit Guided Mode"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Dialogue */}
        <p className="text-slate-200 text-sm leading-relaxed">
          "{currentStepData.dialogue}"
        </p>

        {/* Action Required */}
        {currentStepData.actionText && (
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-3 flex gap-3 items-start">
            <div className="mt-0.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold ring-1 ring-amber-500/50 animate-pulse">
                !
              </span>
            </div>
            <div>
              <div className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-1">Your Task</div>
              <div className="text-sm text-amber-200/90">{currentStepData.actionText}</div>
            </div>
          </div>
        )}

        {/* Physics Fact */}
        {currentStepData.physicsFact && (
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-3 flex gap-3 items-start">
            <Lightbulb size={16} className="text-blue-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">Physics Insight</div>
              <div className="text-xs text-blue-200/80 leading-relaxed">{currentStepData.physicsFact}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Controls */}
      <div className="bg-slate-950 p-3 px-5 border-t border-slate-800 flex justify-between items-center">
        <div className="text-xs font-mono text-slate-500">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevStep} 
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextStep} 
            disabled={currentStepIndex === totalSteps - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-bold shadow-lg shadow-emerald-900/50"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
