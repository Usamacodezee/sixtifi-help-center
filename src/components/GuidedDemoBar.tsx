import React, { useState } from 'react';
import { useDemoState, GUIDED_STEPS } from '../context/DemoStateContext';
import { Play, RotateCcw, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const GuidedDemoBar: React.FC = () => {
  const { currentGuidedStep, advanceGuidedStep, resetDemoData } = useDemoState();
  const [isExpanded, setIsExpanded] = useState(true);

  const step = GUIDED_STEPS[currentGuidedStep];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs md:text-sm">
        
        {/* Left: Step Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-blue-600/30 text-blue-300 px-2.5 py-1 rounded-full font-medium text-xs border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Demo Scenario: HD-10482 Flow
          </div>
          
          <div className="font-semibold text-slate-200">
            Step {currentGuidedStep + 1} of {GUIDED_STEPS.length}: <span className="text-white">{step.title}</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            title="Toggle Details"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Right: Interactive Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={advanceGuidedStep}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-4 py-1.5 rounded-lg shadow-sm border border-blue-400/30 transition-all cursor-pointer text-xs md:text-sm"
            id="guided-demo-next-btn"
          >
            <Play size={14} fill="currentColor" />
            <span>Next Step: <strong>{step.actionText}</strong></span>
          </button>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-xs"
            title="Reset Scenario to Start"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Expanded Step Timeline Drawer */}
      {isExpanded && (
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto pb-1 scrollbar-thin">
            {GUIDED_STEPS.map((s, idx) => {
              const isPast = idx < currentGuidedStep;
              const isCurrent = idx === currentGuidedStep;

              return (
                <div 
                  key={s.id} 
                  className={`flex items-center gap-2 min-w-max px-2.5 py-1 rounded-md text-xs transition-all ${
                    isCurrent 
                      ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 font-medium' 
                      : isPast 
                      ? 'text-slate-400' 
                      : 'text-slate-500 opacity-70'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  ) : (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isCurrent ? 'bg-blue-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                  )}
                  <span>{s.title}</span>
                </div>
              );
            })}
          </div>
          <p className="max-w-7xl mx-auto mt-1.5 text-xs text-slate-400">
            <strong>Current Goal:</strong> {step.description}
          </p>
        </div>
      )}
    </div>
  );
};
