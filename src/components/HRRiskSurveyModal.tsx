import React, { useState } from 'react';
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

  // Calculate total score
  const totalScore = answers.reduce((acc, selectedIdx, questionIdx) => {
    if (selectedIdx === -1) return acc;
    return acc + RISK_SURVEY_QUESTIONS[questionIdx].options[selectedIdx].riskScore;
  }, 0);

  // Maximum risk score is 125
  const normalizedRiskPercentage = Math.min(100, Math.round((totalScore / 125) * 100));

  const getRiskLevel = (scorePct: number) => {
    if (scorePct <= 20) {
      return {
        level: 'Low Compliance Risk',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        summary: 'Your organisation has implemented robust contractor verification processes! Maintaining SNA standards and regular audits ensures ongoing safety.'
      };
    } else if (scorePct <= 55) {
      return {
        level: 'Moderate Compliance Exposure',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        summary: 'Several areas show potential exposure under the Wet DBA, chain liability, or international visa requirements. A structured secondment or payroll review is recommended.'
      };
    } else {
      return {
        level: 'High Risk Exposure',
        color: 'text-rose-600',
        bg: 'bg-rose-50 border-rose-200',
        badge: 'bg-rose-100 text-rose-800',
        summary: 'Critical liability identified under Dutch labour or tax laws (Wet DBA, WAADI, or non-certified intermediaries). Transitioning vulnerable engagements to Macee Secondment or Payroll is strongly advised.'
      };
    }
  };

  const riskInfo = getRiskLevel(normalizedRiskPercentage);
  const currentQuestion = RISK_SURVEY_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1D454C] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            aria-label="Close survey"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-4 h-4 text-[#E5B5D0]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E5B5D0]">
              Macee Compliance Audit
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Dutch & EU Contractor Compliance Check
          </h3>

          {!isCompleted && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#E5B5D0] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / RISK_SURVEY_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-white/80">
                Question {currentStep + 1} of {RISK_SURVEY_QUESTIONS.length}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isCompleted ? (
            <div className="space-y-6">
              {/* Score summary banner */}
              <div className={`p-6 rounded-2xl border ${riskInfo.bg} text-center space-y-3`}>
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
                <p className="text-sm text-gray-700 max-w-lg mx-auto">
                  {riskInfo.summary}
                </p>
              </div>

              {/* Review of answered points */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Detailed Findings By Compliance Area:
                </h4>
                {RISK_SURVEY_QUESTIONS.map((q, idx) => {
                  const selIdx = answers[idx];
                  const selOpt = selIdx !== -1 ? q.options[selIdx] : null;
                  return (
                    <div key={q.id} className="p-3 bg-[#F8FAFB] rounded-lg border border-gray-100 text-xs">
                      <div className="font-semibold text-[#1D454C]">{q.category}</div>
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
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#1D454C] font-semibold cursor-pointer"
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
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <span>Request Macee Compliance Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B0D43]">
                  {currentQuestion.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#1D454C] font-display mt-1">
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
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#1D454C] bg-[#1D454C]/5 text-[#1D454C] font-medium shadow-xs ring-1 ring-[#1D454C]'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#1D454C] bg-[#1D454C]' : 'border-gray-400'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm leading-snug">{opt.label}</span>
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
                  className="px-4 py-2 rounded text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[currentStep] === -1}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-[5px] bg-[#1D454C] hover:bg-[#153439] text-white text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
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
