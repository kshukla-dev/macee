import React, { useState } from 'react';
import { X, Tag, Calendar, Mail, CheckCircle2, Loader2, Plus, Minus } from 'lucide-react';
import { submitJobAlertForm } from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';

interface CreateJobalertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJobalertModal: React.FC<CreateJobalertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguage();
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [email, setEmail] = useState('');
  const [showMoreBranches, setShowMoreBranches] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const initialBranches = [
    'ICT',
    'Public sector',
    'Banking and insurance',
    'Advice / Consultancy / Interim',
    'Education',
  ];

  const extraBranches = [
    'High Tech',
    'Telecom',
    'Healthcare',
    'Oil & Gas',
    'Engineering & Utilities',
    'Finance & Risk',
  ];

  const contractOptions = [
    'Contracting',
    'Permanent / Contract to perm',
    'Freelance / SE',
  ];

  const languageOptions = [
    'Dutch',
    'English',
  ];

  const toggleSelection = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleReset = () => {
    setSelectedBranches([]);
    setSelectedContracts([]);
    setSelectedLanguages([]);
    setKeyword('');
    setFrequency('daily');
    setEmail('');
    setShowMoreBranches(false);
    setIsSubmitting(false);
    setIsSuccess(false);
    setStatusMessage('');
    setErrorMessage('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isOtysConfigured()) {
        const res = await submitJobAlertForm({
          email,
          frequency,
          keywords: keyword,
          branches: selectedBranches,
          contracts: selectedContracts,
          languages: selectedLanguages,
        });
        setStatusMessage(res.message);
      } else {
        setStatusMessage(
          `We have registered your Jobalert for ${email}. You will receive ${frequency} updates when new matches become available!`
        );
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to register Jobalert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-800 tracking-tight font-heading">
            {lang === 'NL' ? 'Job Alert Aanmaken' : 'Create Jobalert'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-bold font-display text-gray-900">
                {lang === 'NL' ? 'Job Alert Aangemaakt!' : 'Jobalert Created!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {statusMessage}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-8 py-2.5 rounded-md bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {lang === 'NL' ? 'Klaar' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
                
                {/* Column 1: Branche & Language */}
                <div className="space-y-6">
                  {/* Branche checkboxes */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {lang === 'NL' ? 'Sector / Branche' : 'Branche'}
                    </h4>
                    <div className="space-y-2">
                      {initialBranches.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBranches.includes(item)}
                            onChange={() => toggleSelection(item, selectedBranches, setSelectedBranches)}
                            className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                          />
                          <span>{item}</span>
                        </label>
                      ))}

                      {showMoreBranches &&
                        extraBranches.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 cursor-pointer select-none animate-fadeIn"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBranches.includes(item)}
                              onChange={() => toggleSelection(item, selectedBranches, setSelectedBranches)}
                              className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowMoreBranches(!showMoreBranches)}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer"
                    >
                      {showMoreBranches ? (
                        <>
                          <Minus className="w-3.5 h-3.5 text-gray-500" />
                          <span>{lang === 'NL' ? 'Minder tonen' : 'Show less'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-gray-500" />
                          <span>{lang === 'NL' ? 'Meer tonen' : 'Show more'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Language checkboxes */}
                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {lang === 'NL' ? 'Taal' : 'Language'}
                    </h4>
                    <div className="space-y-2">
                      {languageOptions.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(item)}
                            onChange={() => toggleSelection(item, selectedLanguages, setSelectedLanguages)}
                            className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Type of contract */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {lang === 'NL' ? 'Contractvorm' : 'Type of contract'}
                  </h4>
                  <div className="space-y-2">
                    {contractOptions.map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedContracts.includes(item)}
                          onChange={() => toggleSelection(item, selectedContracts, setSelectedContracts)}
                          className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Column 3: Keyword, Frequency, Email & Submit Button */}
                <div className="space-y-4">
                  {/* Keyword */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      {lang === 'NL' ? 'Trefwoord' : 'Keyword'}
                    </label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-red-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        placeholder={lang === 'NL' ? 'Zoek vacatures op trefwoord' : 'Search jobs by keyword'}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                      />
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      {lang === 'NL' ? 'Hoe vaak wilt u vacatures ontvangen?' : 'How often do you wish to receive vacancies?'}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-red-500 absolute left-3 top-3 pointer-events-none" />
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                      >
                        <option value="daily">{lang === 'NL' ? 'Dagelijks' : 'Daily'}</option>
                        <option value="weekly">{lang === 'NL' ? 'Wekelijks' : 'Weekly'}</option>
                        <option value="monthly">{lang === 'NL' ? 'Maandelijks' : 'Monthly'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                      {lang === 'NL' ? 'Wat is uw e-mailadres?' : 'What is your email address?'}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-red-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder={lang === 'NL' ? 'Uw zakelijk of privé e-mailadres' : 'E-mail address'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === 'NL' ? 'Job Alert opslaan...' : 'Creating Jobalert...'}</span>
                        </>
                      ) : (
                        <span>{lang === 'NL' ? 'Job Alert Aanmaken' : 'Create Jobalert'}</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
