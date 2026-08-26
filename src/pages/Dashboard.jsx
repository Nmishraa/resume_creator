import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const createNew = () => {
    navigate('/editor/new');
  };

  const deleteResume = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.resumes.delete(id);
        setResumes(prev => prev.filter(r => r.id !== id));
      } catch (error) {
        console.error("Error deleting resume:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>My Resumes</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Create, edit and manage your professional resumes.</p>
        </div>
        <button className="btn btn-primary" onClick={createNew}>
          <Plus size={20} /> Create New Resume
        </button>
      </div>

      <div className="resume-grid">
        <div className="resume-card new-card" onClick={createNew}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Plus size={32} />
            </div>
            <span style={{ fontWeight: 700 }}>New Resume</span>
          </div>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>Loading resumes...</div>
        ) : (
          resumes.map(resume => (
            <div key={resume.id} className="resume-card" onClick={() => navigate(`/editor/${resume.id}`)}>
               <div className="card-preview">
                  <FileText size={48} color="#cbd5e1" />
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 <div>
                   <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>{resume.title || 'Untitled Resume'}</h3>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                     Updated {formatDate(resume.updatedAt)}
                   </p>
                 </div>
                 <button 
                   className="btn-logout" 
                   style={{ width: 32, height: 32 }}
                   onClick={(e) => deleteResume(e, resume.id)}
                 >
                   <Trash2 size={14} />
                 </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
