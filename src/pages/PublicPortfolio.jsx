import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import LivePreview from '../components/editor/LivePreview';
import { Globe, Lock, Share2, Copy, Check, ArrowLeft } from 'lucide-react';

export default function PublicPortfolio() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        const doc = await api.resumes.getById(id);
        setResume(doc);
      } catch (err) {
        console.error('Public fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicResume();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#64748b' }}>
        Loading public portfolio...
      </div>
    );
  }

  if (!resume || !resume.data) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Portfolio Not Found</h2>
        <p style={{ color: '#64748b' }}>This public resume link is invalid or expired.</p>
        <Link to="/" style={{ color: '#4f46e5', fontWeight: 700 }}>Return Home</Link>
      </div>
    );
  }

  const resumeData = typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontWeight: 700, fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Resume & CV Craft
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '0.3rem 0.7rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Globe size={14} /> Public Shareable Portfolio
          </span>

          <button
            onClick={handleCopyLink}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {copied ? <Check size={16} color="#16a34a" /> : <Share2 size={16} />}
            {copied ? 'Link Copied!' : 'Share Portfolio Link'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LivePreview data={resumeData} template="modern" themeColor="theme-indigo" fontFamily="font-inter" />
      </div>
    </div>
  );
}
