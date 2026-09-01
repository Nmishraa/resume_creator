import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetterText } from '../services/aiService';
import { downloadPdfFromElement } from '../services/pdfService';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, Download, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoverLetterPage: React.FC = () => {
  const { resume, coverLetter, updateCoverLetter } = useResume();
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCoverLetterText(
        resume,
        coverLetter.companyName || 'Apex Technologies',
        coverLetter.jobTitle || resume.personalInfo.jobTitle || 'Software Engineer',
        coverLetter.tone
      );
      updateCoverLetter({
        letterBody: generated,
        senderName: resume.personalInfo.fullName,
        senderEmail: resume.personalInfo.email,
        senderPhone: resume.personalInfo.phone,
        senderLocation: resume.personalInfo.location
      });
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 50 });
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter.letterBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    try {
      await downloadPdfFromElement('cover-letter-sheet', `${(coverLetter.companyName || 'Cover_Letter').replace(/\s+/g, '_')}_Cover_Letter.pdf`);
    } catch {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <SeoHead
        title="Free AI Cover Letter Generator – Tailored in Seconds | Resume Craft"
        description="Generate customized, role-tailored cover letters from your resume experience and target job title. Download as PDF or copy instantly."
        canonicalPath="/cover-letter-generator"
      />

      <Breadcrumbs items={[{ name: 'Cover Letter Generator', path: '/cover-letter-generator' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-1">
            <Sparkles size={13} className="text-purple-600" />
            <span>AI Cover Letter Tailor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Free AI Cover Letter Generator
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors flex items-center gap-1.5 shadow"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Target Position Details</span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles size={13} className={isGenerating ? 'animate-spin' : ''} />
              <span>{isGenerating ? 'Drafting...' : 'AI Generate Letter'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company Name</label>
              <input
                type="text"
                value={coverLetter.companyName}
                onChange={(e) => updateCoverLetter({ companyName: e.target.value })}
                placeholder="e.g. Apex Cloud Technologies"
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Job Title</label>
              <input
                type="text"
                value={coverLetter.jobTitle}
                onChange={(e) => updateCoverLetter({ jobTitle: e.target.value })}
                placeholder="e.g. Senior Software Engineer"
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Recipient Name</label>
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) => updateCoverLetter({ recipientName: e.target.value })}
                placeholder="Hiring Manager / Team"
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Recipient Title</label>
              <input
                type="text"
                value={coverLetter.recipientTitle}
                onChange={(e) => updateCoverLetter({ recipientTitle: e.target.value })}
                placeholder="Director of Engineering"
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Letter Body Content</label>
            <textarea
              rows={12}
              value={coverLetter.letterBody}
              onChange={(e) => updateCoverLetter({ letterBody: e.target.value })}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Right Preview Sheet (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[700px] bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 min-h-[750px] flex flex-col justify-between" id="cover-letter-sheet">
            
            {/* Letter Header */}
            <div>
              <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{coverLetter.senderName || resume.personalInfo.fullName}</h2>
                  <p className="text-xs text-brand-600 font-semibold">{resume.personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-xs text-slate-500 space-y-0.5">
                  <div>{coverLetter.senderEmail || resume.personalInfo.email}</div>
                  <div>{coverLetter.senderPhone || resume.personalInfo.phone}</div>
                  <div>{coverLetter.senderLocation || resume.personalInfo.location}</div>
                </div>
              </div>

              {/* Date & Recipient */}
              <div className="text-xs text-slate-600 space-y-1 mb-6">
                <div className="font-semibold text-slate-800">{coverLetter.date}</div>
                <div className="pt-1 font-bold text-slate-900">{coverLetter.recipientName}</div>
                <div>{coverLetter.recipientTitle}</div>
                <div className="font-semibold text-slate-700">{coverLetter.companyName}</div>
              </div>

              {/* Body */}
              <div className="text-xs text-slate-800 leading-relaxed space-y-3 whitespace-pre-line font-sans text-justify">
                {coverLetter.letterBody}
              </div>
            </div>

            {/* Sign-off */}
            <div className="pt-8 border-t border-slate-100 text-xs text-slate-500">
              Printed via Resume &amp; CV Craft Vector Standards
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
