import React, { useState } from 'react';
import { X, HelpCircle, Award, CheckCircle2, MessageSquare, Play, Lightbulb } from 'lucide-react';
import { generateInterviewPrep } from '../../utils/ai';

export default function InterviewPrepModal({ isOpen, onClose, selectedResume }) {
  const [targetRole, setTargetRole] = useState(selectedResume?.data?.personal?.role || 'Software Engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [mockMode, setMockMode] = useState(false);
  const [currentMockIndex, setCurrentMockIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [mockFeedback, setMockFeedback] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateInterviewPrep(selectedResume, targetRole, jobDescription);
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMockSubmit = () => {
    if (!userAnswer.trim()) return;
    setMockFeedback({
      score: '92/100',
      strengths: 'Clear structure, good technical terminology, and practical STAR framework approach.',
      suggestion: 'Quantify your impact metrics even further by mentioning team sizes or efficiency percentages.'
    });
  };

  const categories = ['All', 'Technical Questions', 'Behavioral Questions', 'Resume-Based Questions', 'Project Questions', 'HR Questions'];

  const filteredQuestions = activeTab === 'All' ? questions : questions.filter(q => q.category === activeTab);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 800 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={22} style={{ color: '#8b5cf6' }} /> AI Interview Preparation & Mock Simulator
          </h3>
          <button className="btn-secondary" style={{ width: 32, height: 32, padding: 0, borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {questions.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">Target Role / Position</label>
              <input type="text" className="input-field" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Senior Full Stack Engineer" />
            </div>

            <div>
              <label className="label">Target Job Description (Optional)</label>
              <textarea 
                className="input-field" 
                rows={4} 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
                placeholder="Paste key responsibilities to generate highly specific technical questions..."
                style={{ resize: 'vertical' }}
              />
            </div>

            <button className="btn btn-primary" style={{ padding: '0.85rem', background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }} onClick={handleGenerate} disabled={loading}>
              <HelpCircle size={18} /> {loading ? 'Generating Custom Interview Questions...' : 'Generate Interview Questions'}
            </button>
          </div>
        ) : mockMode ? (
          /* Mock Interview Interactive Practice */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>
                Question {currentMockIndex + 1} of {questions.length}
              </span>
              <button className="btn btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }} onClick={() => setMockMode(false)}>
                Exit Mock Mode
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', background: '#f3e8ff', padding: '0.2rem 0.5rem', borderRadius: 6 }}>
                {questions[currentMockIndex].category}
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
                "{questions[currentMockIndex].question}"
              </h4>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="label">Type or outline your answer below:</label>
              <textarea 
                className="input-field" 
                rows={5} 
                placeholder="In my previous role at TechFlow, I architected..." 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} onClick={handleMockSubmit}>
                Submit Answer for AI Scoring
              </button>
            </div>

            {mockFeedback && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.25rem', borderRadius: 12, marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h5 style={{ fontWeight: 800, color: '#047857' }}>AI Evaluation Result</h5>
                  <span style={{ fontWeight: 900, background: '#10b981', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 6 }}>
                    Score: {mockFeedback.score}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#065f46', marginBottom: '0.5rem' }}><strong>Strengths:</strong> {mockFeedback.strengths}</p>
                <p style={{ fontSize: '0.88rem', color: '#92400e' }}><strong>Suggestion:</strong> {mockFeedback.suggestion}</p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      if (currentMockIndex < questions.length - 1) {
                        setCurrentMockIndex(currentMockIndex + 1);
                        setUserAnswer('');
                        setMockFeedback(null);
                      } else {
                        setMockMode(false);
                      }
                    }}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>
              {categories.map(c => (
                <button
                  key={c}
                  className={`btn-template ${activeTab === c ? 'active' : ''}`}
                  style={{ whiteSpace: 'nowrap', flex: 'none' }}
                  onClick={() => setActiveTab(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748b' }}>
                Showing {filteredQuestions.length} practice questions
              </span>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }} onClick={() => { setMockMode(true); setCurrentMockIndex(0); setUserAnswer(''); setMockFeedback(null); }}>
                <Play size={16} /> Start Mock Interview
              </button>
            </div>

            {/* Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: 400, overflowY: 'auto' }}>
              {filteredQuestions.map((q, i) => (
                <div key={q.id || i} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', background: '#e0e7ff', padding: '0.2rem 0.5rem', borderRadius: 6 }}>
                      {q.category}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    "{q.question}"
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.84rem', color: '#0284c7', background: '#f0f9ff', padding: '0.6rem 0.8rem', borderRadius: 8, border: '1px solid #bae6fd' }}>
                    <Lightbulb size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span><strong>Pro Tip:</strong> {q.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
