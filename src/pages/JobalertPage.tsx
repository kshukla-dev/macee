import React, { useState } from 'react';
import { Bell, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { BRANCHES_LIST } from '../data/maceeContent';

interface JobalertPageProps {
  onNavigate: (page: string) => void;
}

export const JobalertPage: React.FC<JobalertPageProps> = () => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['ICT']);
  const [selectedContracts, setSelectedContracts] = useState<string[]>(['Contracting']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [keyword, setKeyword] = useState('');
  const [frequency, setFrequency] = useState('Weekly');
  const [email, setEmail] = useState('');
  const [showAllBranches, setShowAllBranches] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contractOptions = [
    'Contracting',
    'Permanent / Contract to perm',
    'Freelance / SE'
  ];

  const languageOptions = ['Dutch', 'English'];
  const frequencyOptions = ['Daily', 'Weekly', 'Monthly'];

  const toggleBranch = (b: string) => {
    if (selectedBranches.includes(b)) {
      setSelectedBranches(selectedBranches.filter(item => item !== b));
    } else {
      setSelectedBranches([...selectedBranches, b]);
    }
  };

  const toggleContract = (c: string) => {
    if (selectedContracts.includes(c)) {
      setSelectedContracts(selectedContracts.filter(item => item !== c));
    } else {
      setSelectedContracts([...selectedContracts, c]);
    }
  };

  const toggleLanguage = (l: string) => {
    if (selectedLanguages.includes(l)) {
      setSelectedLanguages(selectedLanguages.filter(item => item !== l));
    } else {
      setSelectedLanguages([...selectedLanguages, l]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const visibleBranches = showAllBranches ? BRANCHES_LIST : BRANCHES_LIST.slice(0, 8);

  return (
    <div className="page_jobalert">
      {/* Header Banner */}
      <section className="bg-[#2a0209] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Create Jobalert
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Receive automated notifications when matching assignments are published
          </p>
        </div>
      </section>

      {/* Main Form Area */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
                  Jobalert Activated!
                </h2>
                <p className="text-base text-gray-700 max-w-md mx-auto leading-relaxed">
                  We have set up your jobalert for <span className="font-bold text-gray-900">{email}</span>. You will receive notifications ({frequency.toLowerCase()}) whenever new projects in your chosen criteria become available.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail('');
                    }}
                    className="is-btn text-sm"
                  >
                    Create another Jobalert
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Branche */}
                <fieldset className="space-y-3">
                  <legend className="text-base font-bold font-heading text-gray-900 mb-2">
                    Branche
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {visibleBranches.map((br) => {
                      const checked = selectedBranches.includes(br);
                      return (
                        <label
                          key={br}
                          className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                            checked
                              ? 'border-[#e8382e] bg-[#f8dada]/30 text-gray-900 font-bold'
                              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleBranch(br)}
                            className="rounded text-[#e8382e] focus:ring-[#e8382e]"
                          />
                          <span>{br}</span>
                        </label>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAllBranches(!showAllBranches)}
                    className="flex items-center gap-1 text-xs font-bold text-[#e8382e] hover:underline pt-2 cursor-pointer"
                  >
                    <span>{showAllBranches ? 'Show less' : 'Show more options'}</span>
                    {showAllBranches ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </fieldset>

                {/* 2. Type of contract */}
                <fieldset className="space-y-3 pt-4 border-t border-gray-100">
                  <legend className="text-base font-bold font-heading text-gray-900 mb-2">
                    Type of contract
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {contractOptions.map((ct) => {
                      const checked = selectedContracts.includes(ct);
                      return (
                        <label
                          key={ct}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                            checked
                              ? 'border-[#e8382e] bg-[#f8dada]/30 text-gray-900 font-bold'
                              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleContract(ct)}
                            className="rounded text-[#e8382e] focus:ring-[#e8382e]"
                          />
                          <span>{ct}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 3. Language */}
                <fieldset className="space-y-3 pt-4 border-t border-gray-100">
                  <legend className="text-base font-bold font-heading text-gray-900 mb-2">
                    Language
                  </legend>
                  <div className="flex gap-4">
                    {languageOptions.map((lang) => {
                      const checked = selectedLanguages.includes(lang);
                      return (
                        <label
                          key={lang}
                          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-all ${
                            checked
                              ? 'border-[#e8382e] bg-[#f8dada]/30 text-gray-900 font-bold'
                              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleLanguage(lang)}
                            className="rounded text-[#e8382e] focus:ring-[#e8382e]"
                          />
                          <span>{lang}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 4. Keyword */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-base font-bold font-heading text-gray-900 mb-2">
                    Keyword (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. .NET, Azure, Java, Data Engineer"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#e8382e]"
                  />
                </div>

                {/* 5. Frequency */}
                <fieldset className="space-y-3 pt-4 border-t border-gray-100">
                  <legend className="text-base font-bold font-heading text-gray-900 mb-2">
                    How often do you wish to receive vacancies?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {frequencyOptions.map((freq) => (
                      <label
                        key={freq}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-all ${
                          frequency === freq
                            ? 'border-[#e8382e] bg-[#e8382e] text-white font-bold'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={freq}
                          checked={frequency === freq}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="hidden"
                        />
                        <span>{freq}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* 6. Email */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-base font-bold font-heading text-gray-900 mb-2">
                    What is your email address? *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#e8382e]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="is-btn text-base px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2 shadow-md"
                  >
                    <Bell className="w-5 h-5" />
                    <span>Create Jobalert</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
