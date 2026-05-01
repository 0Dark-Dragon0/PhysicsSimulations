import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { questionBank } from '../data/questionBank';
import { GraduationCap, Brain, CheckCircle2, XCircle, ArrowRight, X } from 'lucide-react';

export default function QuizEngine({ isOpen, onClose }) {
  const { level, awardXP } = useUser();
  const [currentDifficulty, setCurrentDifficulty] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize quiz with 5 questions matching current difficulty
  useEffect(() => {
    if (isOpen) {
      // Start difficulty near user's level (capped at 3 for now)
      const startDiff = Math.min(3, Math.max(1, Math.floor(level / 2)));
      setCurrentDifficulty(startDiff);
      
      // Shuffle and pick 5 questions
      const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 5));
      setCurrentQIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
    }
  }, [isOpen, level]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctAnswerIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      // Adaptive logic: answer right -> increase difficulty internally (simulated by XP boost)
      awardXP(20 * currentQ.difficulty, "Correct Answer! 🎯");
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      awardXP(score * 50, "Quiz Completed! 🎓");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="bg-indigo-950 px-6 py-4 flex justify-between items-center border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <Brain className="text-indigo-400" size={24} />
            <h2 className="text-lg font-black text-white tracking-widest uppercase">Adaptive Quiz</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div 
            className="bg-indigo-500 h-1 transition-all duration-300"
            style={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Question {currentQIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-2">
              <span className="text-[10px] font-black uppercase bg-slate-800 text-indigo-400 px-2 py-1 rounded border border-slate-700">
                {currentQ.topic}
              </span>
              <span className="text-[10px] font-black uppercase bg-slate-800 text-amber-500 px-2 py-1 rounded border border-slate-700">
                Level {currentQ.difficulty}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-medium text-white mb-8 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQ.correctAnswerIndex;
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-300 text-sm font-medium ";
              
              if (!isAnswered) {
                btnClass += "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500";
              } else if (isCorrect) {
                btnClass += "bg-emerald-900/30 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
              } else if (isSelected && !isCorrect) {
                btnClass += "bg-red-900/30 border-red-500 text-red-400";
              } else {
                btnClass += "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
              }

              return (
                <button 
                  key={i} 
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 animate-slide-up">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Explanation</div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <div className="text-sm text-slate-500 font-bold">
            Current Score: <span className="text-white">{score}</span>
          </div>
          <button 
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
          >
            {currentQIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
