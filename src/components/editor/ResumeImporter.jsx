import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';
import { parseResumeText } from '../../utils/ai';

export default function ResumeImporter({ onImport, onClose }) {
  const [pasteText, setPasteText] = useState('');
  const [parsedResult, setParsedResult] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const extracted = parseResumeText(text);
      setParsedResult(extracted);
      setLoading(false);
    };
    reader.onerror = () => {
      alert('Failed to read file.');
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handlePasteParse = () => {
    if (!pasteText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const extracted = parseResumeText(pasteText);
      setParsedResult(extracted);
      setLoading(false);
    }, 400);
  };

  const handleApplyImport = () => {
    if (parsedResult) {
      onImport(parsedResult);
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={20} color="#475569" />
        </button>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem' }}>
            <Sparkles size={14} /> Resume Importer
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Import Existing Resume</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.3rem' }}>
            Upload a PDF, DOCX, or Plain Text file or paste raw resume text below to auto-populate your editor.
          </p>
        </div>

        {!parsedResult ? (
          <div>
            {/* File Upload Drop Area */}
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '14px', padding: '2.5rem 1.5rem', textAlign: 'center', background: '#f8fafc', marginBottom: '1.5rem', position: 'relative' }}>
              <input
                type="file"
                accept=".txt,.pdf,.docx,.doc"
                onChange={handleFileUpload}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Upload size={24} />
              </div>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '0.3rem' }}>
                {fileName ? `Selected: ${fileName}` : 'Click or Drag & Drop Resume File'}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Supports TXT, PDF, and DOCX formats</p>
            </div>

            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, margin: '1rem 0' }}>
              — OR PASTE TEXT —
            </div>

            <textarea
              rows={5}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste your raw resume text here..."
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit', color: '#1e293b', outline: 'none', marginBottom: '1.2rem' }}
            />

            <button
              onClick={handlePasteParse}
              disabled={loading || !pasteText.trim()}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
            >
              {loading ? 'Extracting Data...' : 'Extract & Preview Data'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', color: '#166534', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} /> Data Extracted Successfully! Review & Correct below:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Name</label>
                  <input
                    type="text"
                    value={parsedResult.personal.name}
                    onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, name: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Target Role / Headline</label>
                  <input
                    type="text"
                    value={parsedResult.personal.role}
                    onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, role: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Email</label>
                  <input
                    type="text"
                    value={parsedResult.personal.email}
                    onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, email: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Phone</label>
                  <input
                    type="text"
                    value={parsedResult.personal.phone}
                    onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, phone: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Location</label>
                  <input
                    type="text"
                    value={parsedResult.personal.location}
                    onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, location: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Summary</label>
                <textarea
                  rows={3}
                  value={parsedResult.personal.summary}
                  onChange={(e) => setParsedResult({ ...parsedResult, personal: { ...parsedResult.personal, summary: e.target.value } })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                />
              </div>

              {/* Grouped Work Experience Review */}
              {parsedResult.experience && parsedResult.experience.length > 0 && (
                <div style={{ marginTop: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', display: 'block' }}>
                    Extracted Work Experience ({parsedResult.experience.length} grouped positions)
                  </label>
                  {parsedResult.experience.map((exp, idx) => (
                    <div key={exp.id || idx} style={{ marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: idx < parsedResult.experience.length - 1 ? '1px dashed #cbd5e1' : 'none' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <input
                          type="text"
                          placeholder="Job Title / Role"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...parsedResult.experience];
                            updated[idx].role = e.target.value;
                            setParsedResult({ ...parsedResult, experience: updated });
                          }}
                          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700 }}
                        />
                        <input
                          type="text"
                          placeholder="Company / Employer"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...parsedResult.experience];
                            updated[idx].company = e.target.value;
                            setParsedResult({ ...parsedResult, experience: updated });
                          }}
                          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Bullet Descriptions / Responsibilities"
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...parsedResult.experience];
                          updated[idx].description = e.target.value;
                          setParsedResult({ ...parsedResult, experience: updated });
                        }}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Grouped Education Review */}
              {parsedResult.education && parsedResult.education.length > 0 && (
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', display: 'block' }}>
                    Extracted Education ({parsedResult.education.length} records)
                  </label>
                  {parsedResult.education.map((edu, idx) => (
                    <div key={edu.id || idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...parsedResult.education];
                          updated[idx].degree = e.target.value;
                          setParsedResult({ ...parsedResult, education: updated });
                        }}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700 }}
                      />
                      <input
                        type="text"
                        placeholder="School / University"
                        value={edu.school}
                        onChange={(e) => {
                          const updated = [...parsedResult.education];
                          updated[idx].school = e.target.value;
                          setParsedResult({ ...parsedResult, education: updated });
                        }}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setParsedResult(null)}
                style={{ padding: '0.7rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Re-upload / Reset
              </button>
              <button
                onClick={handleApplyImport}
                style={{ padding: '0.7rem 1.4rem', borderRadius: '8px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}
              >
                Apply to Editor Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
