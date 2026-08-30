import React, { useState } from 'react';
import { Target, CheckCircle2, Sparkles, MessageSquare, Play, HelpCircle, Code, Briefcase, Award } from 'lucide-react';
import AuthorMetadata from '../components/AuthorMetadata';
import FaqSection from '../components/FaqSection';
import RelatedResources from '../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../utils/seoData';

const INTERVIEW_QUESTIONS = [
  {
    role: 'Software Engineer',
    question: 'Tell me about a time you had to resolve a high-severity production outage.',
    star: {
      situation: 'In Q3 at CloudPulse Analytics, our core API endpoint suffered a memory leak causing 500 errors for 15% of active users during peak hours.',
      task: 'I was assigned as Incident Lead to restore system stability and prevent data loss within a 30-minute SLA.',
      action: 'I analyzed server heap logs, isolated an unindexed PostgreSQL query in our Node.js microservice, deployed a hotfix script, and added Redis caching.',
      result: 'Restored 100% uptime within 18 minutes and reduced overall API latency by 45%.'
    }
  },
  {
    role: 'Product Manager',
    question: 'How do you prioritize competing feature requests from sales vs engineering?',
    star: {
      situation: 'At Finnovate Pay, enterprise sales requested custom reporting features while engineering urged refactoring legacy technical debt.',
      task: 'I needed to balance immediate ARR retention with long-term platform stability.',
      action: 'I developed an RICE prioritization matrix (Reach, Impact, Confidence, Effort), quantifying the financial value of technical debt refactoring.',
      result: 'Successfully delivered $1.2M in enterprise deals while reducing platform deployment bugs by 30%.'
    }
  }
];

export default function InterviewPrepPage() {
  const seoInfo = ROUTE_SEO_MAP['/interview-prep'];
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    const hasS = /situation|when|at|during/i.test(userAnswer);
    const hasT = /task|goal|assigned|responsible/i.test(userAnswer);
    const hasA = /action|built|architected|spearheaded|developed/i.test(userAnswer);
    const hasR = /result|boosted|reduced|improved|%/i.test(userAnswer);

    setFeedback({
      score: (hasS ? 25 : 10) + (hasT ? 25 : 10) + (hasA ? 25 : 10) + (hasR ? 25 : 10),
      hasS, hasT, hasA, hasR
    });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#dc2626', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Target size={16} /> AI STAR Interview Prep Simulator
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Practice technical and behavioral interview questions with high-scoring STAR framework answer blueprints.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AuthorMetadata />
      </div>

      {/* Simulator Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Practice Your Answer (STAR Method)</h2>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
            Question: "Tell me about a time you solved a complex technical problem."
          </label>
          <textarea
            rows={8}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Structure your answer: Situation -> Task -> Action -> Result..."
            style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'inherit' }}
          />
          <button
            onClick={handleEvaluate}
            style={{ width: '100%', marginTop: '1rem', padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#dc2626', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
          >
            Evaluate Answer STAR Score
          </button>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>STAR Answer Blueprint</h2>
          {INTERVIEW_QUESTIONS.map((q, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626' }}>{q.role}</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0.6rem 0' }}>"{q.question}"</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                <strong>Situation:</strong> {q.star.situation}<br/>
                <strong>Result:</strong> {q.star.result}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FaqSection faqs={seoInfo.faqs} title="Interview Prep FAQs" />
        <RelatedResources currentPath="/interview-prep" />
      </div>
    </div>
  );
}
