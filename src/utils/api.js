const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

export const api = {
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await handleResponse(res);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    },
    signup: async (email, password, name) => {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await handleResponse(res);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    },
    guest: async () => {
      const res = await fetch(`${API_BASE}/auth/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await handleResponse(res);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    },
    me: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getHeaders()
      });
      if (!res.ok) {
        localStorage.removeItem('token');
        return null;
      }
      const data = await res.json();
      return data.user;
    },
    logout: () => {
      localStorage.removeItem('token');
    }
  },
  resumes: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/resumes`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/resumes/${id}`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    create: async (resumeData) => {
      const res = await fetch(`${API_BASE}/resumes`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(resumeData)
      });
      return handleResponse(res);
    },
    update: async (id, resumeData) => {
      const res = await fetch(`${API_BASE}/resumes/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(resumeData)
      });
      return handleResponse(res);
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/resumes/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  }
};
