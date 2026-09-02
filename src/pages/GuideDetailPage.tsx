import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CAREER_GUIDES } from '../data/guidesData';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { Clock, BookOpen, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = CAREER_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const guideSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Resume Craft Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resume Craft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resume.gnanamai.com/og-image.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://resume.gnanamai.com/guides/${guide.slug}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalPath={`/guides/${guide.slug}`}
        ogType="article"
        jsonLd={guideSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Career Guides', path: '/guides' },
          { name: guide.title, path: `/guides/${guide.slug}` }
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 pt-2 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock size={13} />
            <span>{guide.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {guide.h1}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          {guide.summary}
        </p>
      </header>

      {/* Article Body */}
      <article className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {guide.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {sec.heading}
            </h2>
            <p className="whitespace-pre-line text-slate-600">
              {sec.content}
            </p>

            {sec.bulletPoints && (
              <ul className="space-y-2 pt-2">
                {sec.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="text-brand-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.keyTakeaway && (
              <div className="mt-4 p-4 bg-brand-50/70 border border-brand-200 rounded-xl text-xs sm:text-sm text-brand-950 font-semibold flex items-start gap-2">
                <ShieldCheck size={16} className="text-brand-600 shrink-0 mt-0.5" />
                <span><strong>Key Takeaway:</strong> {sec.keyTakeaway}</span>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* FAQs */}
      <FaqAccordion items={guide.faqs} title="Frequently Asked Questions" />

      {/* Cross-Link CTA Card */}
      <section className="p-8 bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-2xl text-center space-y-4">
        <h3 className="text-2xl font-black">Put These Strategies to Work</h3>
        <p className="text-xs sm:text-sm text-brand-100 max-w-lg mx-auto">
          Create an ATS-compliant resume or test your current document score in real-time.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/builder"
            className="px-6 py-3 bg-white text-brand-950 font-bold rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow"
          >
            Open Free Resume Builder
          </Link>
          <Link
            to="/ats-checker"
            className="px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors border border-brand-700"
          >
            Check ATS Score
          </Link>
        </div>
      </section>
    </div>
  );
};
