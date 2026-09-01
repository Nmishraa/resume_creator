import React from 'react';
import { Link } from 'react-router-dom';
import { CAREER_GUIDES } from '../data/guidesData';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const GuidesHubPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Career & ATS Resume Writing Guides | Resume Craft"
        description="Expert guides on beating ATS scanners, mastering the Google X-Y-Z formula, finding high-value keywords, and structuring modern resumes."
        canonicalPath="/guides"
      />

      <Breadcrumbs items={[{ name: 'Career Guides', path: '/guides' }]} />

      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <BookOpen size={14} className="text-brand-600" />
          <span>Actionable Career Knowledge Base</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Career &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">ATS Resume Writing</span> Guides
        </h1>

        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Master the proven strategies to pass automated ATS filters, write high-converting resume bullets, and land top-tier interviews.
        </p>
      </section>

      {/* Guides Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CAREER_GUIDES.map((guide) => (
          <div
            key={guide.slug}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-brand-300 hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock size={12} />
                  <span>{guide.readTime}</span>
                </span>
              </div>

              <h2 className="text-lg font-black text-slate-950 group-hover:text-brand-600 transition-colors">
                <Link to={`/guides/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/guides/${guide.slug}`}
                className="text-xs font-bold text-brand-600 group-hover:text-brand-700 flex items-center gap-1"
              >
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
