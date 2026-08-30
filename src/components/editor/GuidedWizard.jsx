import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, User, Briefcase, GraduationCap, Code, Award, Eye, X } from 'lucide-react';

const WIZARD_STEPS = [
  { id: 'personal', title: 'Personal Details', icon: User },
  { id: 'summary', title: 'Executive Summary', icon: Sparkles },
  { id: 'experience', title: 'Work Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'skills', title: 'Skills & Tools', icon: Code },
  { id: 'projects', title: 'Projects & Certifications', icon: Award },
  { id: 'preview', title: 'Review & Finish', icon: Eye }
];

export default function GuidedWizard({ data, onChange, onClose, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = WIZARD_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const progressPct = Math.round(((currentStepIndex + 1) / WIZARD_STEPS.length) * 100);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 250, padding: '1.5rem' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={20} color="#475569" />
        </button>

        {/* Wizard Header Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#4f46e5', letterSpacing: '0.5px' }}>
              Step {currentStepIndex + 1} of {WIZARD_STEPS.length}: {currentStep.title}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569' }}>
              {progressPct}% Completed
            </span>
          </div>

          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
          {WIZARD_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(idx)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  border: isCurrent ? '1.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                  background: isCurrent ? '#e0e7ff' : isDone ? '#dcfce7' : '#ffffff',
                  color: isCurrent ? '#4338ca' : isDone ? '#15803d' : '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {isDone ? <Check size={14} /> : <IconComp size={14} />}
                {step.title}
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div style={{ minHeight: '280px', marginBottom: '2rem' }}>
          {currentStep.id === 'personal' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Full Name</label>
                <input
                  type="text"
                  value={data.personal.name}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, name: e.target.value } })}
                  placeholder="Alex Vance"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Target Job Title</label>
                <input
                  type="text"
                  value={data.personal.role}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, role: e.target.value } })}
                  placeholder="Senior Full Stack Engineer"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Email</label>
                  <input
                    type="email"
                    value={data.personal.email}
                    onChange={(e) => onChange({ ...data, personal: { ...data.personal, email: e.target.value } })}
                    placeholder="alex@example.com"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Phone</label>
                  <input
                    type="text"
                    value={data.personal.phone}
                    onChange={(e) => onChange({ ...data, personal: { ...data.personal, phone: e.target.value } })}
                    placeholder="+1 (555) 000-1122"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep.id === 'summary' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', display: 'block' }}>
                Professional Executive Summary (2-3 Sentences)
              </label>
              <textarea
                rows={6}
                value={data.personal.summary}
                onChange={(e) => onChange({ ...data, personal: { ...data.personal, summary: e.target.value } })}
                placeholder="High-impact overview of your experience, key technical capabilities, and major achievements..."
                style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.6 }}
              />
            </div>
          )}

          {currentStep.id === 'experience' && (
            <div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                Add your relevant work experiences starting from your current or most recent position.
              </p>
              {data.experience.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id || idx} style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{exp.role || 'Role Title'} — {exp.company || 'Company'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No work experience added yet. You can add entries in the main editor.</p>
              )}
            </div>
          )}

          {currentStep.id === 'preview' && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Wizard Setup Complete!</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto' }}>
                Your resume structure is configured. Click "Finish & Open Editor" to preview your design, fine-tune spacing, and export PDF.
              </p>
            </div>
          )}
        </div>

        {/* Wizard Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.2rem', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{ padding: '0.7rem 1.4rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer', opacity: currentStepIndex === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <button
            onClick={handleNext}
            style={{ padding: '0.7rem 1.6rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
          >
            {currentStepIndex === WIZARD_STEPS.length - 1 ? 'Finish & Open Editor' : <>Next Step <ArrowRight size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
