import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Edit3, X, AlertTriangle, Upload, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import ResumeImporter from '../components/editor/ResumeImporter';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showImporter, setShowImporter] = useState(false);

  const fetchResumes = async () => {
    try {
      const docs = await api.resumes.getAll();
      setResumes(docs || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchResumes();
  }, [user]);

  const createNew = async () => {
    setCreating(true);
    try {
      const created = await api.resumes.create({
        title: 'Untitled Resume',
        data: {
          personal: { name: '', role: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
          experience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: []
        }
      });
      navigate(`/editor/${created.id}`);
    } catch (error) {
      console.error("Failed to create resume:", error);
      navigate('/editor/new');
    } finally {
      setCreating(false);
    }
  };

  const handleImportToEditor = async (importedData) => {
    setCreating(true);
    try {
      const title = importedData.personal?.name ? `${importedData.personal.name}'s Resume` : 'Imported Resume';
      const created = await api.resumes.create({
        title,
        data: importedData
      });
      navigate(`/editor/${created.id}`);
    } catch (error) {
      console.error("Failed to save imported resume:", error);
      navigate('/editor/new', { state: { importedData } });
    } finally {
      setCreating(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.resumes.delete(deleteTarget.id);
      setResumes(prev => prev.filter(r => r.id !== deleteTarget.id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="dashboard" style={{ padding: '3rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2.5rem 2.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ zIndex: 2 }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.03em' }}>My Resumes</h2>
          <p style={{ color: '#cbd5e1', marginTop: '0.5rem', fontSize: '1.05rem', margin: '0.4rem 0 0 0' }}>Create, edit, import, and manage your professional resumes.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', zIndex: 2, flexWrap: 'wrap' }}>
          <button 
            type="button"
            className="btn btn-secondary" 
            onClick={() => setShowImporter(true)}
            style={{ padding: '0.85rem 1.4rem', fontWeight: 800, borderRadius: '12px', background: '#ffffff', color: '#0f172a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
          >
            <Upload size={18} color="#4f46e5" /> Upload Previous CV
          </button>
          
          <button 
            type="button"
            className="btn btn-primary" 
            onClick={createNew} 
            disabled={creating} 
            style={{ padding: '0.85rem 1.6rem', fontWeight: 800, borderRadius: '12px', background: '#4f46e5', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', boxShadow: '0 8px 24px rgba(79,70,229,0.4)' }}
          >
            <Plus size={20} color="#ffffff" /> {creating ? 'Creating...' : 'Create New Resume'}
          </button>
        </div>
      </div>

      <div className="resume-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Upload Existing Resume Card */}
        <div 
          className="resume-card new-card" 
          onClick={() => setShowImporter(true)}
          style={{ cursor: 'pointer', background: '#ffffff', border: '2px dashed #818cf8', borderRadius: '16px', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
        >
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', marginBottom: '1rem' }}>
            <Upload size={28} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.3rem' }}>
            Upload Previous CV / Resume
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
            Upload PDF, DOCX, or TXT to extract & edit
          </span>
        </div>

        {/* Create Blank Card */}
        <div 
          className="resume-card new-card" 
          onClick={createNew}
          style={{ cursor: 'pointer', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}
        >
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', marginBottom: '1rem' }}>
            <Plus size={30} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' }}>
            {creating ? 'Creating...' : '+ Start Blank Resume'}
          </span>
        </div>

        {loading ? (
          <div style={{ color: '#64748b', padding: '2rem' }}>Loading your resumes...</div>
        ) : (
          resumes.map(resume => (
            <div 
              key={resume.id} 
              className="resume-card" 
              style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={22} color="#4f46e5" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{resume.title || 'Untitled Resume'}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                        Updated {formatDate(resume.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <button 
                    className="btn-logout" 
                    style={{ width: 34, height: 34, border: 'none', background: '#fef2f2', borderRadius: '8px', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Delete resume"
                    title="Delete resume"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(resume);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  {resume.data?.personal?.role || 'Professional Resume Draft'}
                </p>
              </div>

              {/* Explicit Open Editor Button */}
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(`/editor/${resume.id}`)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#4f46e5', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                <Edit3 size={16} /> Open Editor
              </button>
            </div>
          ))
        )}
      </div>

      {/* Accessible Delete Confirmation Modal */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button
              onClick={() => setDeleteTarget(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close modal"
            >
              <X size={18} color="#64748b" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#dc2626' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Delete Resume?</h3>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.8rem' }}>
              Are you sure you want to delete <strong>"{deleteTarget.title || 'Untitled Resume'}"</strong>? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTarget(null)}
                style={{ padding: '0.65rem 1.2rem', borderRadius: '8px', fontWeight: 700 }}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
                style={{ padding: '0.65rem 1.2rem', borderRadius: '8px', fontWeight: 800, background: '#dc2626', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Importer Modal */}
      {showImporter && (
        <ResumeImporter 
          onImport={handleImportToEditor} 
          onClose={() => setShowImporter(false)} 
        />
      )}
    </div>
  );
}
