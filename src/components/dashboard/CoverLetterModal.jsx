import React, { useState } from 'react';
import { X, Sparkles, Copy, Download, RefreshCw, Check } from 'lucide-react';
import { generateCoverLetter } from '../../utils/ai';

export default function CoverLetterModal({ isOpen, onClose, resumes = [] }) {
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || '');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const selectedResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];
      const text = await generateCoverLetter(selectedResume, company, jobTitle, jobDescription);
      setLetterText(text);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([letterText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${company || 'Cover'}_Letter_${jobTitle || 'Role'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 750 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} style={{ color: '#4f46e5' }} /> AI Cover Letter Generator
          </h3>
          <button className="btn-secondary" style={{ width: 32, height: 32, padding: 0, borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!letterText ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">Select Base Resume</label>
              <select className="input-field" value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)}>
                {resumes.map(r => (
                  <option key={r.id} value={r.id}>{r.title || 'Untitled Resume'}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="label">Company Name</label>
                <input type="text" className="input-field" placeholder="e.g. OpenAI" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div>
                <label className="label">Job Title</label>
                <input type="text" className="input-field" placeholder="e.g. Senior AI Engineer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Job Description (Optional)</label>
              <textarea 
                className="input-field" 
                rows={4} 
                placeholder="Paste key responsibilities or requirements to tailor the cover letter..." 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button className="btn btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem' }} onClick={handleGenerate} disabled={generating}>
              <Sparkles size={18} /> {generating ? 'Generating Personalized Cover Letter...' : 'Generate Cover Letter'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Generated Cover Letter Preview:</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleGenerate} disabled={generating}>
                  <RefreshCw size={14} /> Regenerate
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleCopy}>
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleDownload}>
                  <Download size={14} /> Download
                </button>
              </div>
            </div>

            <textarea
              className="input-field"
              rows={14}
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              style={{ fontFamily: 'var(--font-primary)', fontSize: '0.95rem', lineHeight: 1.6, padding: '1.25rem', resize: 'vertical' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setLetterText('')}>
                Back to Edit Inputs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
