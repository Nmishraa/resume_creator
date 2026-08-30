import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, ChevronDown, ChevronUp, Play, Award, Zap, Copy, Check } from 'lucide-react';
import { generate10InterviewQuestions } from '../utils/ai';

const SAMPLE_RESUME_DATA = {
  personal: { name: 'Alex Vance', role: 'Senior Full Stack Engineer' },
  skills: [{ name: 'React' }, { name: 'Node.js' }, { name: 'PostgreSQL' }, { name: 'System Design' }],
  experience: [{ company: 'CloudPulse Analytics', role: 'Senior Software Engineer' }],
  projects: [{ name: 'Real-Time Streaming Engine' }]
};

export default function InterviewPrepPage() {
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [questions, setQuestions] = useState(() => generate10InterviewQuestions(SAMPLE_RESUME_DATA, 'Senior Full Stack Engineer'));
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    const qList = generate10InterviewQuestions(SAMPLE_RESUME_DATA, targetRole);
    setQuestions(qList);
    setExpandedIndex(0);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <HelpCircle size={16} /> AI Interview Simulator & STAR Method Practice
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Master Technical & Behavioral Interviews
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Practice role-specific interview questions with step-by-step STAR framework (Situation, Task, Action, Result) answers tailored for your career goals.
        </p>
      </div>

      {/* Role Input Bar */}
      <form onSubmit={handleGenerateQuestions} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
            Target Interview Role:
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer, Product Manager, Data Scientist..."
            style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ padding: '0.75rem 1.6rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.2rem', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
        >
          <Sparkles size={16} /> Generate Tailored Questions
        </button>
      </form>

      {/* Questions Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {questions.map((item, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div key={item.id} style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
              {/* Question Header Bar */}
              <button
                onClick={() => setExpandedIndex(isOpen ? -1 : idx)}
                style={{ width: '100%', padding: '1.2rem 1.5rem', background: isOpen ? '#f8fafc' : '#ffffff', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: isOpen ? '#4f46e5' : '#f1f5f9', color: isOpen ? '#ffffff' : '#475569', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Q{idx + 1}
                  </span>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#4f46e5', letterSpacing: '0.5px' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
                      {item.q}
                    </h3>
                  </div>
                </div>

                {isOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
                  {/* High Scoring Answer Blueprint */}
                  <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bbf7d0', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#166534', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={16} /> Recommended STAR Answer Blueprint
                      </h4>
                      <button
                        onClick={() => handleCopy(item.answerKey, item.id)}
                        style={{ border: 'none', background: '#ffffff', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#15803d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                      >
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                        {copiedId === item.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#166534', lineHeight: 1.6, margin: 0 }}>
                      {item.answerKey}
                    </p>
                  </div>

                  {/* Practice Notes Area */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                      Your Practice Answer / Personal STAR Notes:
                    </label>
                    <textarea
                      rows={3}
                      value={userAnswers[item.id] || ''}
                      onChange={(e) => setUserAnswers({ ...userAnswers, [item.id]: e.target.value })}
                      placeholder="Draft your situation, action steps, and quantitative outcome here..."
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
