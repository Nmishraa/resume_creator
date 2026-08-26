const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Storage Helpers for Static Hosting Fallback (Netlify / Vercel)
const storage = {
  getUsers: () => JSON.parse(localStorage.getItem('rc_users') || '[]'),
  saveUsers: (users) => localStorage.setItem('rc_users', JSON.stringify(users)),
  getResumes: () => JSON.parse(localStorage.getItem('rc_resumes') || '[]'),
  saveResumes: (resumes) => localStorage.setItem('rc_resumes', JSON.stringify(resumes)),
  getCurrentUser: () => JSON.parse(localStorage.getItem('rc_current_user') || 'null'),
  setCurrentUser: (user) => localStorage.setItem('rc_current_user', JSON.stringify(user)),
  getApplications: () => JSON.parse(localStorage.getItem('rc_applications') || '[]'),
  saveApplications: (apps) => localStorage.setItem('rc_applications', JSON.stringify(apps)),
  getCoverLetters: () => JSON.parse(localStorage.getItem('rc_cover_letters') || '[]'),
  saveCoverLetters: (letters) => localStorage.setItem('rc_cover_letters', JSON.stringify(letters)),
  getActivity: () => JSON.parse(localStorage.getItem('rc_activity') || '[]'),
  saveActivity: (activities) => localStorage.setItem('rc_activity', JSON.stringify(activities))
};

const DEFAULT_DEMO_RESUME = {
  id: 'demo-resume-1',
  userId: 'demo-user-id',
  title: "Jordan Alexander's Resume",
  data: {
    personal: {
      name: 'Jordan Alexander',
      role: 'Senior Full Stack Engineer',
      email: 'jordan.a@example.com',
      phone: '+1 (555) 012-3456',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/jordanalexander',
      summary: 'Innovative Full Stack Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure.'
    },
    experience: [
      {
        id: '1',
        company: 'TechFlow Solutions',
        role: 'Senior Software Engineer',
        location: 'Remote',
        startDate: '2021-03',
        endDate: 'Present',
        description: '• Architected and developed a real-time data visualization platform using React and D3.js.\n• Optimized database queries, resulting in a 40% reduction in page load times.'
      }
    ],
    education: [
      {
        id: 'e1',
        school: 'Stanford University',
        degree: 'B.S. in Computer Science',
        location: 'Stanford, CA',
        startDate: '2014-09',
        endDate: '2018-05',
        description: 'Specialization in Systems and Networks. GPA: 3.9/4.0'
      }
    ],
    skills: [
      { id: 's1', name: 'JavaScript (ES6+)', level: 'Expert' },
      { id: 's2', name: 'React & Next.js', level: 'Expert' },
      { id: 's3', name: 'Node.js & Express', level: 'Advanced' },
      { id: 's4', name: 'PostgreSQL & Prisma', level: 'Advanced' }
    ]
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    throw new Error('SERVER_OFFLINE');
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

export const api = {
  auth: {
    login: async (email, password) => {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await handleResponse(res);
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) storage.setCurrentUser(data.user);
        return data;
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        
        // Static deployment fallback
        const users = storage.getUsers();
        let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!user && (email.includes('demo') || email.includes('example.com') || email === 'alex.user99@example.com')) {
          user = { id: 'demo-user-id', email, name: email.split('@')[0], isGuest: false };
        }
        if (!user) {
          user = { id: `user_${Date.now()}`, email, name: email.split('@')[0], isGuest: false };
        }
        const token = `static_token_${user.id}`;
        localStorage.setItem('token', token);
        storage.setCurrentUser(user);

        const resumes = storage.getResumes();
        if (resumes.length === 0) {
          storage.saveResumes([{ ...DEFAULT_DEMO_RESUME, userId: user.id }]);
        }

        return { user, token };
      }
    },

    signup: async (email, password, name) => {
      try {
        const res = await fetch(`${API_BASE}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        });
        const data = await handleResponse(res);
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) storage.setCurrentUser(data.user);
        return data;
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        
        // Static deployment fallback
        const user = {
          id: `user_${Date.now()}`,
          email,
          name: name || email.split('@')[0],
          isGuest: false
        };
        const users = storage.getUsers();
        users.push(user);
        storage.saveUsers(users);

        const token = `static_token_${user.id}`;
        localStorage.setItem('token', token);
        storage.setCurrentUser(user);
        return { user, token };
      }
    },

    guest: async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/guest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await handleResponse(res);
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) storage.setCurrentUser(data.user);
        return data;
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        // Static deployment fallback
        const guestId = Date.now();
        const user = {
          id: `guest_${guestId}`,
          email: `guest_${guestId}@guest.local`,
          name: 'Guest User',
          isGuest: true
        };
        const token = `static_token_${user.id}`;
        localStorage.setItem('token', token);
        storage.setCurrentUser(user);

        const resumes = storage.getResumes();
        if (!resumes.some((r) => r.userId === user.id)) {
          resumes.push({
            ...DEFAULT_DEMO_RESUME,
            id: `resume_${guestId}`,
            userId: user.id
          });
          storage.saveResumes(resumes);
        }

        return { user, token };
      }
    },

    me: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: getHeaders()
        });
        if (!res.ok) throw new Error('Failed');
        const data = await handleResponse(res);
        if (data.user) storage.setCurrentUser(data.user);
        return data.user;
      } catch (err) {
        return storage.getCurrentUser();
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('rc_current_user');
    }
  },

  resumes: {
    getAll: async () => {
      try {
        const res = await fetch(`${API_BASE}/resumes`, {
          headers: getHeaders()
        });
        return await handleResponse(res);
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        // Static deployment fallback
        const user = storage.getCurrentUser();
        const userId = user ? user.id : 'demo-user-id';
        let resumes = storage.getResumes();
        let userResumes = resumes.filter((r) => r.userId === userId);
        if (userResumes.length === 0) {
          const sample = { ...DEFAULT_DEMO_RESUME, userId };
          resumes.push(sample);
          storage.saveResumes(resumes);
          userResumes = [sample];
        }
        return userResumes;
      }
    },

    getById: async (id) => {
      try {
        const res = await fetch(`${API_BASE}/resumes/${id}`, {
          headers: getHeaders()
        });
        return await handleResponse(res);
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        // Static deployment fallback
        const resumes = storage.getResumes();
        const resume = resumes.find((r) => r.id === id);
        if (!resume) throw new Error('Resume not found');
        return resume;
      }
    },

    create: async (resumeData) => {
      try {
        const res = await fetch(`${API_BASE}/resumes`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(resumeData)
        });
        return await handleResponse(res);
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        // Static deployment fallback
        const user = storage.getCurrentUser();
        const userId = user ? user.id : 'demo-user-id';
        const newResume = {
          id: `resume_${Date.now()}`,
          userId,
          title: resumeData.title || 'Untitled Resume',
          data: resumeData.data || {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const resumes = storage.getResumes();
        resumes.unshift(newResume);
        storage.saveResumes(resumes);
        return newResume;
      }
    },

    update: async (id, resumeData) => {
      try {
        const res = await fetch(`${API_BASE}/resumes/${id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(resumeData)
        });
        return await handleResponse(res);
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        // Static deployment fallback
        const resumes = storage.getResumes();
        const index = resumes.findIndex((r) => r.id === id);
        if (index === -1) throw new Error('Resume not found');
        resumes[index] = {
          ...resumes[index],
          title: resumeData.title || resumes[index].title,
          data: resumeData.data || resumes[index].data,
          updatedAt: new Date().toISOString()
        };
        storage.saveResumes(resumes);
        return resumes[index];
      }
    },

    delete: async (id) => {
      try {
        const res = await fetch(`${API_BASE}/resumes/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        return await handleResponse(res);
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
          throw err;
        }

        let resumes = storage.getResumes();
        resumes = resumes.filter((r) => r.id !== id);
        storage.saveResumes(resumes);
        return { success: true, message: 'Resume deleted successfully' };
      }
    },

    duplicate: async (id) => {
      const original = await api.resumes.getById(id);
      if (!original) throw new Error('Resume not found');
      const duplicatedData = {
        title: `${original.title || 'Untitled Resume'} (Copy)`,
        data: typeof original.data === 'string' ? JSON.parse(original.data) : original.data
      };
      return await api.resumes.create(duplicatedData);
    },

    rename: async (id, newTitle) => {
      return await api.resumes.update(id, { title: newTitle });
    }
  },

  applications: {
    getAll: async () => {
      let apps = storage.getApplications();
      if (apps.length === 0) {
        // Initial sample data
        apps = [
          {
            id: 'app-1',
            company: 'OpenAI',
            role: 'AI Engineer',
            appliedDate: '2026-08-24',
            resumeTitle: 'AI Engineer Resume',
            match: 88,
            status: 'Applied',
            notes: 'First round interview expected next week'
          },
          {
            id: 'app-2',
            company: 'Anthropic',
            role: 'Senior Machine Learning Engineer',
            appliedDate: '2026-08-20',
            resumeTitle: 'AI Engineer Resume',
            match: 94,
            status: 'Interview',
            notes: 'Technical screen scheduled for Thursday 2 PM'
          },
          {
            id: 'app-3',
            company: 'Stripe',
            role: 'Full Stack Engineer',
            appliedDate: '2026-08-18',
            resumeTitle: 'Software Engineer Resume',
            match: 82,
            status: 'Saved',
            notes: 'Need to tailor resume for API infrastructure focus'
          },
          {
            id: 'app-4',
            company: 'Google',
            role: 'Staff AI Architect',
            appliedDate: '2026-08-15',
            resumeTitle: 'Executive AI Resume',
            match: 91,
            status: 'Offer',
            notes: 'Received initial offer package'
          }
        ];
        storage.saveApplications(apps);
      }
      return apps;
    },

    save: async (apps) => {
      storage.saveApplications(apps);
      return apps;
    },

    add: async (appData) => {
      const apps = await api.applications.getAll();
      const newApp = {
        id: `app_${Date.now()}`,
        company: appData.company || 'Target Company',
        role: appData.role || 'Software Engineer',
        appliedDate: appData.appliedDate || new Date().toISOString().split('T')[0],
        resumeTitle: appData.resumeTitle || 'Primary Resume',
        match: appData.match || 85,
        status: appData.status || 'Saved',
        notes: appData.notes || ''
      };
      apps.unshift(newApp);
      storage.saveApplications(apps);
      return newApp;
    },

    updateStatus: async (id, newStatus) => {
      const apps = await api.applications.getAll();
      const index = apps.findIndex(a => a.id === id);
      if (index !== -1) {
        apps[index].status = newStatus;
        storage.saveApplications(apps);
      }
      return apps;
    }
  },

  activity: {
    getAll: async () => {
      let act = storage.getActivity();
      if (act.length === 0) {
        act = [
          { id: '1', title: 'AI Engineer Resume edited', timestamp: '2 hours ago', type: 'edit' },
          { id: '2', title: 'ATS scan completed (Score: 87/100)', timestamp: '4 hours ago', type: 'ats' },
          { id: '3', title: 'Resume downloaded as PDF', timestamp: 'Yesterday', type: 'download' },
          { id: '4', title: 'Job application added (OpenAI - AI Engineer)', timestamp: '2 days ago', type: 'app' },
          { id: '5', title: 'AI Cover Letter generated for Anthropic', timestamp: '3 days ago', type: 'cover' }
        ];
        storage.saveActivity(act);
      }
      return act;
    },

    add: async (title, type = 'edit') => {
      const act = await api.activity.getAll();
      act.unshift({
        id: `act_${Date.now()}`,
        title,
        timestamp: 'Just now',
        type
      });
      storage.saveActivity(act.slice(0, 10)); // Keep last 10
    }
  }
};



