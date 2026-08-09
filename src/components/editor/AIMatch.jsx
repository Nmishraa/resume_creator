import React, { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export default function AIMatch({ resumeData, onUpdate, onSetTemplate }) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeJob = () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    
    // Simulate AI Analysis Delay
    setTimeout(() => {
      const jd = jobDescription.toLowerCase();
      const results = {
        suggestedTemplate: 'modern',
        missingSkills: [],
        summarySuggestion: '',
        matchScore: 0
      };

      // 1. Template Suggestion
      if (jd.includes('senior') || jd.includes('lead') || jd.includes('manager') || jd.includes('director')) {
        results.suggestedTemplate = 'executive';
      } else if (jd.includes('marketing') || jd.includes('creative') || jd.includes('designer')) {
        results.suggestedTemplate = 'creative';
      } else if (jd.includes('software') || jd.includes('engineer') || jd.includes('tech') || jd.includes('developer')) {
        results.suggestedTemplate = 'tech';
      }

      // 2. Keyword Matching (Skills)
      const commonSkills = ['react', 'node', 'javascript', 'python', 'marketing', 'sales', 'management', 'leadership', 'design', 'seo', 'cloud', 'aws', 'sql'];
      const currentSkills = resumeData.skills.map(s => s.name.toLowerCase());
      
      commonSkills.forEach(skill => {
        if (jd.includes(skill) && !currentSkills.includes(skill)) {
          results.missingSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
        }
      });

      // 3. Summary Suggestion
      if (jd.includes('fast-paced') || jd.includes('startup')) {
        results.summarySuggestion = "Consider adding: 'Thrives in fast-paced, high-growth environment' to your summary.";
      } else if (jd.includes('enterprise') || jd.includes('corporate')) {
        results.summarySuggestion = "Focus on: 'Driving large-scale organizational impact and enterprise solutions.'";
      }

      // 4. Match Score (Mock)
      results.matchScore = Math.floor(Math.random() * 40) + 50; // 50-90%

      setAnalysis(results);
      setLoading(false);
    }, 1500);
  };

  const applyOptimization = () => {
    if (!analysis) return;
    
    // Apply template
    onSetTemplate(analysis.suggestedTemplate);
    
    // Add missing skills (optionally)
    const newSkills = [...resumeData.skills];
    analysis.missingSkills.forEach(skillName => {
      if (!newSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
        newSkills.push({ id: Date.now() + Math.random(), name: skillName, level: 'Advanced' });
      }
    });

    onUpdate({
      ...resumeData,
      skills: newSkills
    });

    alert('AI Optimization applied! Check your updated skills and template.');
  };

  return (
    <div className="ai-match-container">
      <div className="flex-row" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
        <Sparkles size={20} color="var(--primary-color)" />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Job Match Optimizer</h2>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Paste the job description below. Our AI will analyze the requirements and tune your resume for the best chance of success.
      </p>

      <textarea
        className="form-control"
        style={{ height: '200px', resize: 'vertical', fontSize: '0.85rem', lineHeight: '1.5' }}
        placeholder="e.g. We are looking for a Senior React Developer with experience in AWS and Node.js..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={analyzeJob}
        disabled={loading || !jobDescription}
      >
        {loading ? 'Analyzing with AI...' : 'Analyze Match'}
      </button>

      {analysis && !loading && (
        <div className="ai-results" style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>
               Compatibility Score
            </h4>
            <div className="ai-match-score">{analysis.matchScore}%</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.8 }}>
              {analysis.matchScore > 80 ? "Excellent Match! You're ready to apply." : "Good potential. A few tweaks will make you stand out."}
            </p>
          </div>

          <div className="flex-row" style={{ gap: '2rem', marginBottom: '2.5rem', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                 Suggested Design
              </h4>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                  {analysis.suggestedTemplate.charAt(0).toUpperCase() + analysis.suggestedTemplate.slice(1)}
                </span>
                <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Tailored for this role type</p>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                 Missing Keywords
              </h4>
              <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                {analysis.missingSkills.length > 0 ? analysis.missingSkills.map(skill => (
                  <div key={skill} className="ai-keyword-chip">
                    {skill}
                  </div>
                )) : <span style={{ fontSize: '0.85rem', color: '#10b981' }}>✓ All key skills covered</span>}
              </div>
            </div>
          </div>

          {analysis.summarySuggestion && (
            <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.03)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <CheckCircle size={14} /> Strategic Insight
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>{analysis.summarySuggestion}</p>
            </div>
          )}

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1.25rem', fontSize: '1rem', fontWeight: 700, borderRadius: '14px', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}
            onClick={applyOptimization}
          >
            Enhance Resume Now
          </button>
        </div>
      )}
    </div>
  );
}
