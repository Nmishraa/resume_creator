import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  Compass,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';

export const ResumeExamplesHubPage: React.FC = () => {
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engineering & Technology', 'Data & Analytics', 'Business & Operations', 'Management & Operations', 'Healthcare', 'Education', 'Students & Entry-Level'];

  const filteredExamples = RESUME_EXAMPLES.filter((ex) => {
    const matchesSearch =
      ex.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.targetKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.atsKeywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleUsePreset = (presetData: any) => {
    if (presetData) {
      updateResume(presetData);
      navigate('/builder');
    }
  };

  const hubFaqs = [
    {
      question: 'Are these resume examples ATS-compliant?',
      answer: 'Yes! Every resume example in our directory is crafted according to strict Applicant Tracking System (ATS) guidelines, utilizing clean single-column layouts, standard fonts, and Google X-Y-Z bullet point metrics.'
    },
    {
      question: 'How do I use a resume example in the builder?',
      answer: 'Click "Use in Builder" on any resume example card or detail page. The complete profile data, work history, skills, and summary will load immediately into the interactive editor for you to customize.'
    },
    {
      question: 'Can I check an example with the ATS score checker?',
      answer: 'Yes, once loaded into the editor, navigate to the ATS Resume Checker to compare the resume against any target job description.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Resume Examples & Professional Samples (ATS-Optimized) | Resume Craft"
        description="Browse ATS-tested resume examples by industry and role with real bullet points, Google X-Y-Z formulas, recommended skills, and 1-click editing."
        canonicalPath="/resume-examples"
      />

      <Breadcrumbs items={[{ name: 'Resume Examples', path: '/resume-examples' }]} />

      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Compass size={14} className="text-brand-600" />
          <span>ATS-Tested Career Directory • 12+ Specialized Roles</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Professional Resume Examples &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">ATS Samples</span>
        </h1>

        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Explore recruiter-approved resume samples packed with real achievement bullets, Google X-Y-Z formulas, top technical skills, and 1-click builder templates.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-3 max-w-xl mx-auto">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, skill, or keyword (e.g. AI Engineer, SQL, Nurse)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 shadow-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${selectedCategory === cat ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Examples Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map((ex) => (
          <div
            key={ex.slug}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-5 hover:border-brand-300 hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {ex.category}
                </span>
                <span className="text-[11px] font-semibold text-brand-600">
                  {ex.experienceLevel}
                </span>
              </div>

              <h2 className="text-lg font-black text-slate-950 group-hover:text-brand-600 transition-colors">
                <Link to={`/resume-examples/${ex.slug}`}>
                  {ex.roleTitle} Resume Example
                </Link>
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {ex.shortIntro}
              </p>

              {/* Keyword Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {ex.atsKeywords.slice(0, 4).map((kw, i) => (
                  <span key={i} className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                to={`/resume-examples/${ex.slug}`}
                className="text-xs font-bold text-slate-700 hover:text-brand-600 flex items-center gap-1 transition-colors"
              >
                <span>Read Full Guide</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={() => handleUsePreset(ex.presetData)}
                className="px-3.5 py-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Use in Builder
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <FaqAccordion items={hubFaqs} title="Resume Examples FAQ" />
    </div>
  );
};
