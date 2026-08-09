import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Sparkles } from 'lucide-react';
import { suggestSummary, suggestBulletPoint } from '../../utils/ai';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`dnd-item ${isDragging ? 'dragging' : ''}`}>
      <div className="section-block">
        <div className="section-header">
           <div className="drag-handle" {...attributes} {...listeners}>
              <GripVertical size={18} />
           </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function SectionForm({ activeTab, data, onChange }) {
  const [loadingAI, setLoadingAI] = useState(false);

  // Handle Drag & Drop for list items
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event, category) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data[category].findIndex(i => i.id === active.id);
      const newIndex = data[category].findIndex(i => i.id === over.id);
      
      const newArray = arrayMove(data[category], oldIndex, newIndex);
      onChange({ ...data, [category]: newArray });
    }
  };

  const handlePersonalChange = (e) => {
    onChange({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const handleGetSummary = async () => {
    setLoadingAI(true);
    const suggestion = await suggestSummary(data.personal.role);
    onChange({
      ...data,
      personal: { ...data.personal, summary: suggestion }
    });
    setLoadingAI(false);
  };

  // Generic List Handlers
  const addListItem = (category, emptyItem) => {
    onChange({
      ...data,
      [category]: [...data[category], { id: Date.now().toString(), ...emptyItem }]
    });
  };

  const updateListItem = (category, id, field, value) => {
    onChange({
      ...data,
      [category]: data[category].map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const removeListItem = (category, id) => {
    onChange({
      ...data,
      [category]: data[category].filter(item => item.id !== id)
    });
  };

  if (activeTab === 'personal') {
    return (
      <div className="editor-form">
        <div className="form-group">
          <label className="label">Full Name</label>
          <input className="input-field" name="name" value={data.personal.name} onChange={handlePersonalChange} placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Professional Title</span>
            <button 
              className="btn btn-secondary ai-mini-btn" 
              onClick={async () => {
                setLoadingAI(true);
                // Mock refinement
                const refined = "Principal Software Architect & Full-Stack Lead";
                onChange({ ...data, personal: { ...data.personal, role: refined } });
                setLoadingAI(false);
              }}
              disabled={loadingAI}
            >
              <Sparkles size={12} /> Refine
            </button>
          </label>
          <input className="input-field" name="role" value={data.personal.role} onChange={handlePersonalChange} placeholder="Senior Software Engineer" />
        </div>
        <div className="flex-row">
          <div className="form-group flex-1">
            <label className="label">Email</label>
            <input className="input-field" name="email" value={data.personal.email} onChange={handlePersonalChange} placeholder="john@example.com" />
          </div>
          <div className="form-group flex-1">
            <label className="label">Phone</label>
            <input className="input-field" name="phone" value={data.personal.phone} onChange={handlePersonalChange} placeholder="+1 234 567 890" />
          </div>
        </div>
        <div className="flex-row">
          <div className="form-group flex-1">
            <label className="label">Location</label>
            <input className="input-field" name="location" value={data.personal.location} onChange={handlePersonalChange} placeholder="New York, NY" />
          </div>
          <div className="form-group flex-1">
            <label className="label">LinkedIn / Website</label>
            <input className="input-field" name="linkedin" value={data.personal.linkedin} onChange={handlePersonalChange} placeholder="linkedin.com/in/johndoe" />
          </div>
        </div>
        
        <div className="form-group mt-2">
          <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Professional Summary</span>
            <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={handleGetSummary} disabled={loadingAI}>
              <Sparkles size={14} color="#ec4899" />
              {loadingAI ? 'Generating...' : 'AI Suggestion'}
            </button>
          </label>
          <textarea 
            className="input-field" 
            name="summary" 
            value={data.personal.summary} 
            onChange={handlePersonalChange} 
            rows="5"
            placeholder="Brief overview of your career..."
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'experience') {
    return (
      <div className="editor-form">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'experience')}>
          <SortableContext items={data.experience.map(i => i.id)} strategy={verticalListSortingStrategy}>
            {data.experience.map(exp => (
              <SortableItem key={exp.id} id={exp.id}>
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}>
                  <button className="btn" style={{ background: 'transparent', padding: '0.2rem' }} onClick={() => removeListItem('experience', exp.id)}>
                    <Trash2 size={16} color="var(--danger)" />
                  </button>
                </div>
                
                <div className="form-group">
                  <label className="label">Job Title</label>
                  <input className="input-field" value={exp.role} onChange={(e) => updateListItem('experience', exp.id, 'role', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Company</label>
                  <input className="input-field" value={exp.company} onChange={(e) => updateListItem('experience', exp.id, 'company', e.target.value)} />
                </div>
                <div className="flex-row">
                  <div className="form-group flex-1">
                    <label className="label">Start Date</label>
                    <input className="input-field" value={exp.startDate} onChange={(e) => updateListItem('experience', exp.id, 'startDate', e.target.value)} />
                  </div>
                  <div className="form-group flex-1">
                    <label className="label">End Date</label>
                    <input className="input-field" value={exp.endDate} onChange={(e) => updateListItem('experience', exp.id, 'endDate', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Description (Bullet points, separate by new line)</span>
                    <button 
                      className="btn btn-secondary ai-mini-btn" 
                      onClick={async () => {
                        setLoadingAI(true);
                        const suggested = await suggestBulletPoint(exp.role || data.personal.role);
                        updateListItem('experience', exp.id, 'description', suggested);
                        setLoadingAI(false);
                      }}
                      disabled={loadingAI}
                    >
                      <Sparkles size={12} /> Suggest
                    </button>
                  </label>
                  <textarea 
                    className="input-field" 
                    rows="4" 
                    value={exp.description} 
                    onChange={(e) => updateListItem('experience', exp.id, 'description', e.target.value)} 
                    placeholder="Describe your achievements..."
                  />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        
        <button 
          className="btn btn-secondary w-full" 
          onClick={() => addListItem('experience', { role: '', company: '', startDate: '', endDate: '', description: '' })}
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>
    );
  }

  if (activeTab === 'education') {
    return (
      <div className="editor-form">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'education')}>
          <SortableContext items={data.education.map(i => i.id)} strategy={verticalListSortingStrategy}>
             {data.education.map(edu => (
              <SortableItem key={edu.id} id={edu.id}>
                 <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}>
                  <button className="btn" style={{ background: 'transparent', padding: '0.2rem' }} onClick={() => removeListItem('education', edu.id)}>
                    <Trash2 size={16} color="var(--danger)" />
                  </button>
                </div>

                <div className="form-group">
                  <label className="label">School / University</label>
                  <input className="input-field" value={edu.school} onChange={(e) => updateListItem('education', edu.id, 'school', e.target.value)} />
                </div>
                <div className="flex-row">
                  <div className="form-group flex-1">
                    <label className="label">Degree</label>
                    <input className="input-field" value={edu.degree} onChange={(e) => updateListItem('education', edu.id, 'degree', e.target.value)} />
                  </div>
                  <div className="form-group flex-1">
                    <label className="label">Graduation Year</label>
                    <input className="input-field" value={edu.year} onChange={(e) => updateListItem('education', edu.id, 'year', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Relevant Coursework / Achievements</span>
                    <button 
                      className="btn btn-secondary ai-mini-btn" 
                      onClick={async () => {
                        setLoadingAI(true);
                        const suggested = "• Relevant Coursework: Data Structures, Algorithms, Software Engineering.\n• Dean's List for 4 consecutive semesters.\n• Led a team of 4 in a senior capstone project.";
                        updateListItem('education', edu.id, 'description', suggested);
                        setLoadingAI(false);
                      }}
                      disabled={loadingAI}
                    >
                      <Sparkles size={12} /> Suggest
                    </button>
                  </label>
                  <textarea 
                    className="input-field" 
                    rows="3" 
                    value={edu.description || ''} 
                    onChange={(e) => updateListItem('education', edu.id, 'description', e.target.value)} 
                    placeholder="e.g. Honours, specific courses, societies..."
                  />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>

        <button 
          className="btn btn-secondary w-full" 
          onClick={() => addListItem('education', { school: '', degree: '', year: '' })}
        >
          <Plus size={18} /> Add Education
        </button>
      </div>
    );
  }

  if (activeTab === 'skills') {
     return (
      <div className="editor-form">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'skills')}>
          <SortableContext items={data.skills.map(i => i.id)} strategy={verticalListSortingStrategy}>
            {data.skills.map(skill => (
               <SortableItem key={skill.id} id={skill.id}>
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}>
                  <button className="btn" style={{ background: 'transparent', padding: '0.2rem' }} onClick={() => removeListItem('skills', skill.id)}>
                    <Trash2 size={16} color="var(--danger)" />
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: 0, paddingRight: '2rem' }}>
                  <input className="input-field" value={skill.name} onChange={(e) => updateListItem('skills', skill.id, 'name', e.target.value)} placeholder="e.g. React.js, Project Management" />
                </div>
               </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        
        <div className="flex-row" style={{ gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-secondary flex-1" 
            onClick={() => addListItem('skills', { name: '' })}
          >
            <Plus size={18} /> Add Skill
          </button>
          <button 
            className="btn btn-secondary ai-mini-btn"
            style={{ padding: '0.5rem 1rem' }}
            onClick={async () => {
              setLoadingAI(true);
              const skills = ['React.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'System Design'];
              // Simple mock suggest: append a few random ones from list if not present
              const currentNames = data.skills.map(s => s.name.toLowerCase());
              const toAdd = skills.filter(s => !currentNames.includes(s.toLowerCase())).slice(0, 3);
              
              const newSkills = [...data.skills];
              toAdd.forEach(s => {
                newSkills.push({ id: Date.now() + Math.random().toString(), name: s });
              });
              
              onChange({ ...data, skills: newSkills });
              setLoadingAI(false);
            }}
            disabled={loadingAI}
          >
            <Sparkles size={14} /> AI Suggestions
          </button>
        </div>
      </div>
     )
  }

  return null;
}
