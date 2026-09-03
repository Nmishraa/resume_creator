import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category?: 'General' | 'ATS & Scoring' | 'AI & Templates' | 'Privacy';
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  hideHeader?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about ATS optimization, AI resume building, and data privacy.',
  hideHeader = false
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categorize items if not explicitly provided
  const processedItems = useMemo(() => {
    return items.map((item) => {
      if (item.category) return item;
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();
      if (q.includes('ats') || a.includes('ats') || q.includes('score')) {
        return { ...item, category: 'ATS & Scoring' as const };
      } else if (q.includes('ai') || q.includes('template') || q.includes('bullet') || q.includes('pdf')) {
        return { ...item, category: 'AI & Templates' as const };
      } else if (q.includes('privacy') || q.includes('data') || q.includes('stored') || q.includes('account')) {
        return { ...item, category: 'Privacy' as const };
      }
      return { ...item, category: 'General' as const };
    });
  }, [items]);

  const categories = ['All', 'General', 'ATS & Scoring', 'AI & Templates', 'Privacy'];

  const filteredItems = useMemo(() => {
    return processedItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [processedItems, activeCategory, searchQuery]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: processedItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      {!hideHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold shadow-2xs">
            <HelpCircle size={14} className="text-brand-600" />
            <span>Helpful Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs sm:text-base text-slate-600 leading-relaxed">{subtitle}</p>}
        </div>
      )}

      {/* Interactive Controls: Search & Category Tabs */}
      <div className="bg-slate-50 border border-slate-200/90 p-4 sm:p-5 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. ATS, PDF, Privacy)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <p className="text-xs font-bold text-slate-700">No questions match your search &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-xs text-brand-600 font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-brand-500 shadow-md ring-1 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-brand-600 transition-colors text-sm sm:text-base cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      isOpen ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Q{idx + 1}
                    </span>
                    <span className="leading-snug">{item.question}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.category && (
                      <span className="hidden md:inline text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {item.category}
                      </span>
                    )}
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-600' : ''}`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
