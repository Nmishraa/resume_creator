import React, { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle, Check, Target } from 'lucide-react';
import { matchJobDescription } from '../../utils/ai';

export default function AIMatch({ resumeData, onUpdate, currentTemplate, onSetTemplate }) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeJob = () => {
    if (!jobDescription.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const matchResult = matchJobDescription(resumeData, jobDescription);

      let suggestedTemplate = 'modern';
      const jd = jobDescription.toLowerCase();
      if (jd.includes('senior') || jd.includes('executive') || jd.includes('director') || jd.includes('vp')) {
        suggestedTemplate = 'executive';
      } else if (jd.includes('designer') || jd.includes('creative') || jd.includes('marketing')) {
        suggestedTemplate = 'creative';
      } else if (jd.includes('engineer') || jd.includes('developer') || jd.includes('tech')) {
        suggestedTemplate = 'tech';
      }

      setAnalysis({
        ...matchResult,
        suggestedTemplate
      });
      setLoading(false);
    }, 600);
  };

  const applyOptimization = () => {
    if (!analysis) return;

    onSetTemplate(analysis.suggestedTemplate);

    const newSkills = [...(resumeData.skills || [])];
    analysis.missingKeywords.slice(0, 5).forEach((kw) => {
      const formatted = kw.charAt(0).toUpperCase() + kw.slice(1);
      if (!newSkills.some(s => s.name.toLowerCase() === kw.toLowerCase())) {
        newSkills.push({ id: `sk_${Date.now()}_${Math.random()}`, name: formatted, level: 'Advanced' });
      }
    });

    onUpdate({
      ...resumeData,
      skills: newSkills
    });

    alert('Applied target keywords and layout template to your resume!');
  };

  return (
    <div className="ai-match-container" style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} color="#4f46e5" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Job Description Keyword Matcher</h2>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Align your resume with specific job requirements without inventing facts.</span>
        </div>
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
          Paste Target Job Description:
        </label>
        <textarea
          rows={6}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit', color: '#1e293b', outline: 'none', lineHeight: 1.5 }}
          placeholder="Paste the full job posting text here (e.g. We are looking for a Senior React Developer proficient in TypeScript, AWS, and REST APIs...)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontWeight: 800, background: '#4f46e5', color: '#ffffff', border: 'none', cursor: 'pointer' }}
        onClick={analyzeJob}
        disabled={loading || !jobDescription.trim()}
      >
        {loading ? 'Matching Keywords...' : 'Analyze & Match Resume to Job'}
      </button>

      {analysis && !loading && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          {/* Score Indicator */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>
              Target Job Match Score
            </span>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: analysis.matchPercentage >= 70 ? '#16a34a' : analysis.matchPercentage >= 50 ? '#d97706' : '#dc2626', margin: '0.2rem 0' }}>
              {analysis.matchPercentage}%
            </div>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>
              {analysis.matchPercentage >= 70 ? 'High Match! Your experience aligns strongly with this position.' : 'Moderate Match. Incorporating missing keywords below will boost ATS rank.'}
            </p>
          </div>

          {/* Matched Keywords */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} /> Matched Keywords ({analysis.matchedKeywords.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {analysis.matchedKeywords.length > 0 ? (
                analysis.matchedKeywords.map((kw) => (
                  <span key={kw} style={{ background: '#dcfce7', color: '#166534', fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                    ✓ {kw}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>No direct keyword matches found.</span>
              )}
            </div>
          </div>

          {/* Missing Keywords */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} /> Missing Key Terms ({analysis.missingKeywords.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {analysis.missingKeywords.length > 0 ? (
                analysis.missingKeywords.map((kw) => (
                  <span key={kw} style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                    + {kw}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>All top keywords covered!</span>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={15} color="#4f46e5" /> Strategic Recommendations
            </h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
              {analysis.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={applyOptimization}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            Apply Missing Keywords & Recommended Layout
          </button>
        </div>
      )}
    </div>
  );
}
