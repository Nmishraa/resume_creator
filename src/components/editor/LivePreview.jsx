import React from 'react';

export default function LivePreview({ data, template }) {
  const { personal, experience, education, skills } = data;

  const getTemplateClass = () => {
    switch (template) {
      case 'minimalist': return 'template-minimalist';
      case 'creative': return 'template-creative';
      case 'executive': return 'template-executive';
      case 'tech': return 'template-tech';
      case 'modern': default: return 'template-modern';
    }
  };

  if (template === 'executive') {
    return (
      <div className={`resume-document ${getTemplateClass()}`} id="resume-preview">
        <div className="sidebar">
          <h1>{personal.name || 'Your Name'}</h1>
          {personal.role && <div style={{ fontSize: '1rem', color: '#d4af37', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase' }}>{personal.role}</div>}
          
          <div className="contact-info">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>

          {skills.length > 0 && (
            <section style={{ marginTop: '3rem', padding: 0 }}>
              <h2 style={{ color: '#d4af37', fontSize: '0.9rem' }}>Skills</h2>
              <div className="skills-grid">
                {skills.map(skill => (
                  <div key={skill.id}>{skill.name}</div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="main-content">
          {personal.summary && (
            <section>
              <h2>Executive Profile</h2>
              <p style={{ lineHeight: 1.6 }}>{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2>Professional Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="item">
                  <div className="item-title">{exp.role}</div>
                  <div className="item-subtitle">{exp.company}</div>
                  <div className="item-date">{exp.startDate} - {exp.endDate}</div>
                  <ul style={{ marginTop: '0.75rem' }}>
                    {exp.description && exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="item">
                  <div className="item-title">{edu.degree}</div>
                  <div className="item-subtitle">{edu.school}</div>
                  <div className="item-date">{edu.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`resume-document ${getTemplateClass()}`} id="resume-preview">
      <header>
        <h1>{personal.name || 'Your Name'}</h1>
        {personal.role && <div style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 500 }}>{personal.role}</div>}
        <div className="contact-info">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </header>

      {personal.summary && (
        <section>
          <h2>{template === 'tech' ? '> Terminal/Profile' : 'Professional Summary'}</h2>
          <p>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h2>{template === 'tech' ? '> Experience' : 'Experience'}</h2>
          {experience.map(exp => (
            <div key={exp.id} className="item">
              <div className="item-header">
                <div className="item-title">{exp.role}</div>
                <div className="item-date">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="item-subtitle">{exp.company}</div>
              <ul>
                {exp.description && exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2>{template === 'tech' ? '> Education' : 'Education'}</h2>
          {education.map(edu => (
            <div key={edu.id} className="item">
              <div className="item-header">
                <div className="item-title">{edu.degree}</div>
                <div className="item-date">{edu.year}</div>
              </div>
              <div className="item-subtitle">{edu.school}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2>{template === 'tech' ? '> Stack' : 'Skills'}</h2>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.id}>{template === 'tech' ? `[${skill.name}]` : `• ${skill.name}`}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
