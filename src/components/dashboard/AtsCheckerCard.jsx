import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { analyzeAtsScore } from '../../utils/ai';

export default function AtsCheckerCard({ resumeData, onImproveClick }) {
  const [atsData, setAtsData] = useState({
    overallScore: 82,
    breakdown: {
      formatting: 90,
      contactInfo: 100,
      skills: 80,
      workExperience: 85,
      education: 95,
      keywords: 78,
      readability: 85,
      sectionStructure: 92
    },
    recommendations: [
      "Add measurable metrics & quantifiable achievements (%, $, team size) to work experience bullets.",
      "Improve keyword coverage matching target job posting descriptions.",
      "Use strong action verbs at the start of each bullet point (e.g. Spearheaded, Engineered).",
      "Avoid complex graphics or multi-column nested tables to maintain 100% parser accuracy.",
      "Add missing technical and soft skills to the dedicated skills block.",
      "Enhance executive summary section to highlight key career milestones."
    ]
  });

  useEffect(() => {
    if (resumeData) {
      analyzeAtsScore(resumeData).then(res => setAtsData(res));
    }
  }, [resumeData]);

  const categories = [
    { key: 'formatting', name: 'Formatting', val: atsData.breakdown.formatting },
    { key: 'contactInfo', name: 'Contact Information', val: atsData.breakdown.contactInfo },
    { key: 'skills', name: 'Skills', val: atsData.breakdown.skills },
    { key: 'workExperience', name: 'Work Experience', val: atsData.breakdown.workExperience },
    { key: 'education', name: 'Education', val: atsData.breakdown.education },
    { key: 'keywords', name: 'Keywords', val: atsData.breakdown.keywords },
    { key: 'readability', name: 'Readability', val: atsData.breakdown.readability },
    { key: 'sectionStructure', name: 'Section Structure', val: atsData.breakdown.sectionStructure }
  ];

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div>
          <h3 className="dash-card-title">
            <ShieldCheck size={22} style={{ color: '#10b981' }} /> ATS Resume Checker
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Automated Applicant Tracking System compliance audit & scoring.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center', marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0' }}>
        {/* Score Circle */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110, borderRadius: '50%', background: 'conic-gradient(#10b981 0% 82%, #e2e8f0 82% 100%)' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>{atsData.overallScore}</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>/ 100</span>
            </div>
          </div>
          <div style={{ marginTop: '0.5rem', fontWeight: 800, color: '#047857', fontSize: '0.9rem' }}>Great ATS Readiness</div>
        </div>

        {/* Score breakdown list */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {categories.map((cat) => (
            <div key={cat.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                <span style={{ color: '#475569' }}>{cat.name}</span>
                <span style={{ color: '#0f172a' }}>{cat.val}%</span>
              </div>
              <ProgressBar value={cat.val} color={cat.val >= 85 ? '#10b981' : cat.val >= 70 ? '#f59e0b' : '#ef4444'} height={6} />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AlertTriangle size={18} color="#f59e0b" /> Actionable Recommendations
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {atsData.recommendations.map((rec, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: '#334155', background: '#ffffff', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={onImproveClick}>
        Improve My ATS Score <ArrowRight size={18} />
      </button>
    </div>
  );
}
