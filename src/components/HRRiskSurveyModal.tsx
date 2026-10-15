import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { RISK_SURVEY_QUESTIONS } from '../data/content';

interface HRRiskSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestAudit: () => void;
}

export const HRRiskSurveyModal: React.FC<HRRiskSurveyModalProps> = ({
  isOpen,
  onClose,
  onRequestAudit
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(RISK_SURVEY_QUESTIONS.length).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentStep] = optionIndex;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentStep < RISK_SURVEY_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers(new Array(RISK_SURVEY_QUESTIONS.length).fill(-1));
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate compliance risk score
  const totalWeight = answers.reduce((acc, optIdx, qIdx) => {
    if (optIdx === -1) return acc;
    return acc + RISK_SURVEY_QUESTIONS[qIdx].options[optIdx].riskScore;
  }, 0);

  const maxPossibleWeight = RISK_SURVEY_QUESTIONS.length * 25;
  const rawRiskPercentage = Math.round((totalWeight / maxPossibleWeight) * 100);
  const normalizedRiskPercentage = Math.min(100, Math.max(12, rawRiskPercentage));

  const getRiskLevel = (score: number) => {
    if (score < 30) {
      return {
        level: 'Low Risk',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        summary: 'Your organisation has clear safeguards, though regular SNA audits remain essential.'
      };
    }
    if (score < 65) {
      return {
        level: 'Moderate Risk',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        summary: 'Potential DBA, chain liability, or visa gaps detected. Secondment with Macee eliminates these liabilities.'
      };
    }
    return {
      level: 'High Risk Exposure',
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
      summary: 'Critical liability identified under Dutch labour or tax laws (Wet DBA, WAADI, or non-certified intermediaries). Transitioning vulnerable engagements to Macee Secondment or Payroll is strongly advised.'
    };
  };

  const riskInfo = getRiskLevel(normalizedRiskPercentage);
  const currentQuestion = RISK_SURVEY_QUESTIONS[currentStep];

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="bg-[#111827] text-white p-5 sm:p-7 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close survey"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-4 h-4 text-[#E30613]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E30613]">
              Macee Compliance Audit
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Dutch & EU Contractor Compliance Check
          </h3>

          {!isCompleted && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2">
              <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#E30613] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / RISK_SURVEY_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-white/80">
                Question {currentStep + 1} of {RISK_SURVEY_QUESTIONS.length}
              </span>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div 
          data-lenis-prevent 
          className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {isCompleted ? (
            <div className="space-y-5">
              {/* Score summary banner */}
              <div className={`p-5 sm:p-6 rounded-2xl border ${riskInfo.bg} text-center space-y-3`}>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${riskInfo.badge}`}>
                  {riskInfo.level}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-gray-900">
                    {normalizedRiskPercentage}%
                  </span>
                  <span className="text-xs text-gray-500 text-left font-mono leading-tight">
                    ESTIMATED<br />COMPLIANCE RISK
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 max-w-lg mx-auto">
                  {riskInfo.summary}
                </p>
              </div>

              {/* Review of answered points */}
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Detailed Findings By Compliance Area:
                </h4>
                {RISK_SURVEY_QUESTIONS.map((q, idx) => {
                  const selIdx = answers[idx];
                  const selOpt = selIdx !== -1 ? q.options[selIdx] : null;
                  return (
                    <div key={q.id} className="p-3 bg-[#F8FAFB] rounded-lg border border-gray-100 text-xs">
                      <div className="font-semibold text-[#111827]">{q.category}</div>
                      <div className="text-gray-600 mt-1">{selOpt?.label}</div>
                      <div className="text-gray-500 italic mt-0.5">{selOpt?.feedback}</div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#111827] font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Survey</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestAudit();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <span>Request Macee Compliance Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                  {currentQuestion.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#111827] font-display mt-1">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = answers[currentStep] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${isSelected
                          ? 'border-[#E30613] bg-[#E30613]/5 text-[#111827] font-medium shadow-xs ring-1 ring-[#E30613]'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#E30613] bg-[#E30613]' : 'border-gray-400'
                        }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs sm:text-sm leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-3.5 py-2 rounded text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[currentStep] === -1}
                  className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <span>{currentStep === RISK_SURVEY_QUESTIONS.length - 1 ? 'View Compliance Report' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
