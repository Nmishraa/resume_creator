// Express API Backend Service for Authentication & Resume Storage (neha_data)

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export interface User {
  id: string;
  email: string;
  name?: string;
  isGuest?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export function getStoredToken(): string | null {
  return localStorage.getItem('resumecraft_jwt_token');
}

export function setStoredToken(token: string) {
  localStorage.setItem('resumecraft_jwt_token', token);
}

export function removeStoredToken() {
  localStorage.removeItem('resumecraft_jwt_token');
}

export async function loginWithEmailApi(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  setStoredToken(data.token);
  return data;
}

export async function signupWithEmailApi(email: string, password: string, name?: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  setStoredToken(data.token);
  return data;
}

export async function loginAsGuestApi(): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/guest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Guest login failed');
  }
  setStoredToken(data.token);
  return data;
}

export async function getCurrentUserApi(): Promise<User | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      removeStoredToken();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch (e) {
    console.warn('API backend offline, check server status:', e);
    return null;
  }
}

export async function fetchUserResumesApi(): Promise<any[]> {
  const token = getStoredToken();
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/resumes`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) return [];
  return res.json();
}

export async function saveResumeApi(resumeData: any): Promise<any> {
  const token = getStoredToken();
  if (!token) return null;

  const endpoint = resumeData.id && !resumeData.id.startsWith('blank-')
    ? `${API_BASE_URL}/resumes/${resumeData.id}`
    : `${API_BASE_URL}/resumes`;

  const method = resumeData.id && !resumeData.id.startsWith('blank-') ? 'PUT' : 'POST';

  const res = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: resumeData.title || 'Untitled Resume',
      data: resumeData
    })
  });

  if (!res.ok) return null;
  return res.json();
}
