import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { analyzeJobMatch } from '../../utils/ai';

export default function JobMatchCard({ selectedResume, onOptimizeClick }) {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState({
    overallMatch: 78,
    skillsMatch: 85,
    experienceMatch: 72,
    educationMatch: 90,
    atsKeywordsMatch: 68,
    missingKeywords: ['LangChain', 'RAG', 'AWS', 'Vector Databases', 'Python', 'REST APIs']
  });

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    try {
      const data = await analyzeJobMatch(selectedResume?.data, jobDescription);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div>
          <h3 className="dash-card-title">
            <Sparkles size={22} style={{ color: '#4f46e5' }} /> AI Job Matcher
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Paste a target job description to analyze compatibility, keywords, and gaps.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <textarea
          className="input-field"
          rows={4}
          placeholder="Paste job description text here (e.g., We are looking for an AI Engineer with expertise in Python, LangChain, RAG, AWS...)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ resize: 'vertical' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
          <button className="btn btn-primary" onClick={handleAnalyze} disabled={analyzing}>
            <Sparkles size={18} /> {analyzing ? 'Analyzing Match...' : 'Analyze Job Match'}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ background: '#f8fafc', borderRadius: 16, padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          {/* Overall Match Circle / Score */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #cbd5e1' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Match Score</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>Overall Match: {result.overallMatch}%</h2>
            </div>
            <div style={{ background: '#e0e7ff', color: '#4338ca', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem' }}>
              {result.overallMatch}%
            </div>
          </div>

          {/* Breakdown Bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span>Skills Match</span>
                <span>{result.skillsMatch}%</span>
              </div>
              <ProgressBar value={result.skillsMatch} color="#10b981" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span>Experience Match</span>
                <span>{result.experienceMatch}%</span>
              </div>
              <ProgressBar value={result.experienceMatch} color="#3b82f6" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span>Education Match</span>
                <span>{result.educationMatch}%</span>
              </div>
              <ProgressBar value={result.educationMatch} color="#8b5cf6" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span>ATS Keywords Match</span>
                <span>{result.atsKeywordsMatch}%</span>
              </div>
              <ProgressBar value={result.atsKeywordsMatch} color="#f59e0b" />
            </div>
          </div>

          {/* Missing Keywords Chips */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} color="#e11d48" /> Missing Keywords
            </h4>
            <div className="keyword-chips-container">
              {result.missingKeywords.map((kw, i) => (
                <span key={i} className="chip-tag" style={{ background: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' }}>
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
            onClick={() => onOptimizeClick(result.missingKeywords)}
          >
            <Sparkles size={18} /> ✨ Optimize Resume for This Job
          </button>
        </div>
      )}
    </div>
  );
}
