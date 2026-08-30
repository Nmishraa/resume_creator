import React, { useState } from 'react';
import { Copy, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function TailorResumeModal({ resumeData, onClose }) {
  const navigate = useNavigate();
  const [targetTitle, setTargetTitle] = useState('AI Engineer');
  const [loading, setLoading] = useState(false);

  const handleTailor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tailoredData = {
        ...resumeData,
        personal: {
          ...resumeData.personal,
          role: targetTitle,
          summary: `Results-focused ${targetTitle} specializing in building scalable software systems, optimizing technical pipelines, and collaborating across engineering teams.`
        }
      };

      const newResume = await api.resumes.create({
        title: `${targetTitle} Resume (Tailored)`,
        data: tailoredData
      });

      onClose();
      navigate(`/editor/${newResume.id}`);
    } catch (err) {
      console.error('Tailor error:', err);
      alert('Failed to create tailored version.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} color="#64748b" />
        </button>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            <Copy size={14} /> Resume Tailoring Engine
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Create Tailored Version</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.3rem' }}>
            Duplicate your current resume into a target-role version without losing your original draft.
          </p>
        </div>

        <form onSubmit={handleTailor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
              Target Role Title
            </label>
            <input
              type="text"
              value={targetTitle}
              onChange={(e) => setTargetTitle(e.target.value)}
              placeholder="e.g. Data Scientist, Product Manager"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            {loading ? 'Creating Version...' : <>Create & Open Tailored Version <ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
