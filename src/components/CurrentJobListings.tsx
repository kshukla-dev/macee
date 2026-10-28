import React, { useState, useEffect, useMemo } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { getJobsData } from '../data/content';
import { JobListing } from '../types';
import { getAllJobs } from '../lib/api';
import { ProjectAssignmentItem } from '../pages/ProjectsPage';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';

interface CurrentJobListingsProps {
  onSelectJob: (job: JobListing) => void;
  onExploreAllJobs: () => void;
}

export const CurrentJobListings: React.FC<CurrentJobListingsProps> = ({
  onSelectJob,
  onExploreAllJobs
}) => {
  const { lang, t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [jobs, setJobs] = useState<JobListing[]>(() => getJobsData(lang));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  // Load real vacancies from OTYS API with proper publishedLanguage
  useEffect(() => {
    let isMounted = true;

    async function loadApiJobs() {
      // Set localized fallback while loading
      setJobs(getJobsData(lang));

      if (!isOtysConfigured()) return;
      setIsLoading(true);

      try {
        const apiProjects: ProjectAssignmentItem[] = await getAllJobs({
          itemsPerPage: 20,
          publishedLanguage: lang === 'NL' ? 'nl' : 'en'
        });

        if (isMounted && Array.isArray(apiProjects) && apiProjects.length > 0) {
          // Sort to ensure the latest vacancies are prioritized at the top
          const sortedProjects = [...apiProjects].sort((a, b) => {
            const timeA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
            const timeB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
            if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
              return timeB - timeA;
            }
            const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
            const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
            return numB - numA;
          });

          const mappedListings: JobListing[] = sortedProjects.map((proj) => {
            const cleanDesc =
              proj.description ||
              (proj.shortDescriptionHtml ? proj.shortDescriptionHtml.replace(/<[^>]+>/g, '').trim() : '') ||
              (lang === 'NL'
                ? 'Bekijk deze interessante vacature bij Macee en toonaangevende opdrachtgevers.'
                : 'Explore this exciting vacancy at Macee and enterprise clients.');

            return {
              id: proj.id,
              title: proj.title,
              department: proj.branche || proj.category || (lang === 'NL' ? 'Consultancy & IT' : 'Consulting & Engineering'),
              location: proj.location || (lang === 'NL' ? 'Nederland' : 'Netherlands'),
              type: proj.contractType || proj.hours || (lang === 'NL' ? 'Vast / Fulltime' : 'Permanent / Fulltime'),
              experience: proj.experience || (lang === 'NL' ? 'Professional' : 'Professional'),
              description: cleanDesc,
              postedDate: proj.postedDate,
              requirements:
                proj.requirements && proj.requirements.length > 0
                  ? proj.requirements
                  : [
                    lang === 'NL' ? 'Relevante professionele werkervaring' : 'Relevant professional experience',
                    lang === 'NL' ? 'Sterke communicatieve vaardigheden' : 'Strong communication & collaboration skills',
                    lang === 'NL' ? 'Kwaliteitsgericht en resultaatgedreven' : 'High dedication to quality and enterprise standards',
                  ],
            };
          });

          setJobs(mappedListings);
          setIsLiveConnected(true);
        } else {
          setJobs(getJobsData(lang));
        }
      } catch (err) {
        console.warn('[CurrentJobListings] Could not load live OTYS vacancies, using fallback:', err);
        setJobs(getJobsData(lang));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadApiJobs();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  // Compute dynamic departments from available jobs
  const departments = useMemo(() => {
    const set = new Set<string>(['All']);
    jobs.forEach((j) => {
      if (j.department && j.department.trim()) {
        set.add(j.department.trim());
      }
    });
    return Array.from(set);
  }, [jobs]);

  // Filter jobs by department and display strictly the 4 latest vacancies
  const filteredJobs = useMemo(() => {
    const list =
      selectedDept === 'All'
        ? jobs
        : jobs.filter((j) => j.department?.toLowerCase() === selectedDept.toLowerCase());
    return list.slice(0, 4);
  }, [jobs, selectedDept]);

  return (
    <section
      id="jobs"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, intro, and jobs list */}
          <div className="lg:col-span-7 space-y-6 text-left jobs-content">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E30613]/10 text-[#E30613] text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{t('jobs.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
                {t('jobs.title')}
              </h2>
              <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mt-2 font-display">
                {lang === 'NL' ? 'Zet de volgende stap in uw carrière' : 'Take the next step in your professional career'}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#54595F] leading-relaxed">
              {t('jobs.subtitle')}
            </p>

            {/* Department filter tabs */}
            {departments.length > 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${selectedDept === dept
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-[#F8FAFB] text-[#54595F] hover:bg-gray-100'
                      }`}
                  >
                    {dept === 'All' ? t('jobs.all') : dept}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 py-4 text-xs text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin text-[#E30613]" />
                <span>
                  {lang === 'NL'
                    ? 'Vacatures synchroniseren vanuit OTYS wervingssysteem...'
                    : 'Syncing live vacancies from OTYS recruitment system...'}
                </span>
              </div>
            )}

            {/* Jobs List */}
            <div className="space-y-3 pt-2">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFB] hover:bg-white hover:border-[#111827]/30 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold font-display text-[#111827] group-hover:text-[#E30613] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#54595F]">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#111827]" />
                          {job.department}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#111827]" />
                          {job.location}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#111827]" />
                          {job.type}
                        </span>
                        {job.postedDate && (
                          <>
                            <span>·</span>
                            <span className="text-[11px] font-mono text-gray-400">
                              {job.postedDate}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-xs font-semibold text-[#E30613] group-hover:text-[#111827] shrink-0">
                      <span>{t('jobs.apply')}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreAllJobs}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t('jobs.viewAll')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Handshake Career Photo */}
          <div className="lg:col-span-5 relative jobs-image">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/careers-handshake.jpg"
                alt="Connecting Ambition with Opportunity at Macee"
                className="w-full h-auto object-cover max-h-[520px] aspect-[4/4] hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                  <CheckCircle2 className="w-4 h-4 text-[#111827]" />
                  <span>
                    {lang === 'NL'
                      ? 'Kunt u het project dat u zoekt niet vinden?'
                      : "Can't find the project you are looking for?"}
                  </span>
                </div>
                <p className="text-xs text-[#54595F] mt-1">
                  {lang === 'NL'
                    ? 'Maak een Jobalert aan of bekijk alle vacatures om automatisch bericht te ontvangen bij nieuwe projecten!'
                    : 'Create a Jobalert or browse all open vacancies to receive automated notifications when suitable projects open!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

