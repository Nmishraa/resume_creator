import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';
import { generate10InterviewQuestions } from '../../utils/ai';

export default function InterviewPrep({ resumeData }) {
  const [targetJob, setTargetJob] = useState('');
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedMap, setCompletedMap] = useState({});

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const qList = generate10InterviewQuestions(resumeData, targetJob);
      setQuestions(qList);
      setLoading(false);
    }, 450);
  };

  const handleCopyAll = () => {
    if (!questions) return;
    const textToCopy = questions.map(item => `Q${item.id} (${item.category}): ${item.q}\nAnswer Strategy: ${item.answerKey}\n`).join('\n---\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleComplete = (id) => {
    setCompletedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HelpCircle size={22} color="#b45309" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>AI 10-Question Interview Generator</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Generate 10 custom interview questions & STAR answer strategies tailored to your target job.</span>
        </div>
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>Target Job Title (Optional):</label>
        <input
          type="text"
          value={targetJob}
          onChange={(e) => setTargetJob(e.target.value)}
          placeholder={resumeData?.personal?.role || 'Senior Full Stack Engineer'}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        <Sparkles size={18} color="#ffffff" />
        {loading ? 'Generating 10 Tailored Questions...' : 'Generate 10 Likely Interview Questions'}
      </button>

      {questions && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
              10 Custom Questions Prepared ({Object.values(completedMap).filter(Boolean).length}/10 Practiced)
            </span>
            <button
              onClick={handleCopyAll}
              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.78rem', fontWeight: 700, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              {copied ? <Check size={14} color="#166534" /> : <Copy size={14} />}
              {copied ? 'Copied 10 Qs!' : 'Copy All 10 Qs'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions.map((item) => {
              const isDone = Boolean(completedMap[item.id]);
              return (
                <div key={item.id} style={{ background: isDone ? '#f0fdf4' : '#f8fafc', border: isDone ? '1px solid #bbf7d0' : '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.72rem', background: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.65rem', borderRadius: '12px', fontWeight: 800 }}>
                      {item.category}
                    </span>
                    <button
                      onClick={() => toggleComplete(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: isDone ? '#166534' : '#64748b', fontWeight: 700 }}
                    >
                      <CheckCircle2 size={16} color={isDone ? '#166534' : '#94a3b8'} />
                      {isDone ? 'Practiced' : 'Mark Practiced'}
                    </button>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                    <span style={{ color: '#4f46e5', marginRight: '0.3rem' }}>Q{item.id}:</span> {item.q}
                  </h4>

                  <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem', color: '#334155', lineHeight: 1.55 }}>
                    <strong style={{ color: '#166534', display: 'block', marginBottom: '0.25rem' }}>💡 STAR Answer Strategy:</strong>
                    {item.answerKey}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
