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
  setCurrentUser: (user) => localStorage.setItem('rc_current_user', JSON.stringify(user))
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
        return data;
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token')) throw err;
        
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

        // Ensure default resume exists for user
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
        return data;
      } catch (err) {
        if (err.message !== 'SERVER_OFFLINE' && !err.message.includes('Unexpected token')) throw err;
        
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
        return data;
      } catch (err) {
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

        // Add initial sample resume for guest
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
        return data.user;
      } catch (err) {
        // Static deployment fallback
        return storage.getCurrentUser() || { id: 'guest_user', email: 'guest@local', name: 'Guest User', isGuest: true };
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
        // Static deployment fallback
        let resumes = storage.getResumes();
        resumes = resumes.filter((r) => r.id !== id);
        storage.saveResumes(resumes);
        return { success: true, message: 'Resume deleted successfully' };
      }
    }
  }
};

