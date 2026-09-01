import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  Firestore,
  query,
  orderBy
} from 'firebase/firestore';
import { ResumeData, JobApplication, CoverLetterData, FirebaseUser } from '../types/resume';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const env = (import.meta as any).env || {};

// Default Firebase config for resume-craft-26214
const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyAkQVNgCcxK3HQRFZUXD2cvVjCewR5oIYg",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "resume-craft-26214.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "resume-craft-26214",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "resume-craft-26214.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "752753987544",
  appId: env.VITE_FIREBASE_APP_ID || "1:752753987544:web:3f50e8060694acb1f7acad"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function getSavedFirebaseConfig(): FirebaseConfig {
  const saved = localStorage.getItem('resume_craft_firebase_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && !parsed.apiKey.includes('DemoKey') && parsed.projectId === DEFAULT_FIREBASE_CONFIG.projectId) {
        return parsed;
      } else {
        localStorage.removeItem('resume_craft_firebase_config');
      }
    } catch {
      localStorage.removeItem('resume_craft_firebase_config');
    }
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveCustomFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem('resume_craft_firebase_config', JSON.stringify(config));
  // Reinitialize app
  initFirebase(config);
}

export function initFirebase(customConfig?: FirebaseConfig): { app: FirebaseApp | null; auth: Auth | null; db: Firestore | null } {
  try {
    const config = customConfig || getSavedFirebaseConfig();
    
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(config);
    }
    
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  } catch (error) {
    console.warn('Firebase initialization note (running in local offline mode):', error);
    return { app: null, auth: null, db: null };
  }
}

// Initialize on module load
initFirebase();

export async function loginWithGoogle(): Promise<FirebaseUser | null> {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not initialized');

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return mapFirebaseUser(result.user);
  } catch (error: any) {
    console.error('Google login error:', error);
    throw error;
  }
}

export async function loginWithEmail(email: string, pass: string): Promise<FirebaseUser | null> {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not initialized');

  const result = await signInWithEmailAndPassword(auth, email, pass);
  return mapFirebaseUser(result.user);
}

export async function registerWithEmail(email: string, pass: string): Promise<FirebaseUser | null> {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not initialized');

  const result = await createUserWithEmailAndPassword(auth, email, pass);
  return mapFirebaseUser(result.user);
}

export async function resetPassword(email: string): Promise<void> {
  if (!auth) initFirebase();
  if (!auth) throw new Error('Firebase Auth is not initialized');

  await sendPasswordResetEmail(auth, email);
}

export async function loginAsGuest(): Promise<FirebaseUser | null> {
  if (!auth) initFirebase();
  if (!auth) {
    // Return mock guest user if Firebase network is simulated
    const mockGuest: FirebaseUser = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: null,
      displayName: 'Guest Explorer',
      photoURL: null,
      isAnonymous: true
    };
    return mockGuest;
  }

  try {
    const result = await signInAnonymously(auth);
    return mapFirebaseUser(result.user);
  } catch {
    const mockGuest: FirebaseUser = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: null,
      displayName: 'Guest Explorer',
      photoURL: null,
      isAnonymous: true
    };
    return mockGuest;
  }
}

export async function logoutUser(): Promise<void> {
  if (auth) {
    await signOut(auth);
  }
}

export function subscribeToAuthChanges(callback: (user: FirebaseUser | null) => void): () => void {
  if (!auth) initFirebase();
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapFirebaseUser(user) : null);
  });
}

function mapFirebaseUser(user: User): FirebaseUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || (user.isAnonymous ? 'Guest User' : user.email?.split('@')[0] || 'User'),
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous
  };
}

// ----------------- FIRESTORE CLOUD SYNC -----------------

export async function saveResumeToFirestore(userId: string, resume: ResumeData): Promise<void> {
  if (!db) initFirebase();
  if (!db || userId.startsWith('guest-')) {
    // Save to LocalStorage fallback
    const list = getLocalResumes();
    const existingIndex = list.findIndex(r => r.id === resume.id);
    if (existingIndex >= 0) {
      list[existingIndex] = resume;
    } else {
      list.push(resume);
    }
    localStorage.setItem(`resumes_${userId}`, JSON.stringify(list));
    return;
  }

  try {
    const resumeRef = doc(db, `users/${userId}/resumes`, resume.id);
    await setDoc(resumeRef, { ...resume, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error saving to Firestore, caching locally:', error);
    localStorage.setItem(`resume_${resume.id}`, JSON.stringify(resume));
  }
}

export async function loadResumesFromFirestore(userId: string): Promise<ResumeData[]> {
  if (!db) initFirebase();
  if (!db || userId.startsWith('guest-')) {
    return getLocalResumes(userId);
  }

  try {
    const resumesRef = collection(db, `users/${userId}/resumes`);
    const q = query(resumesRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    const results: ResumeData[] = [];
    snapshot.forEach(docSnap => {
      results.push(docSnap.data() as ResumeData);
    });
    if (results.length === 0) {
      return getLocalResumes(userId);
    }
    return results;
  } catch (error) {
    console.warn('Firestore fetch failed, using local cache:', error);
    return getLocalResumes(userId);
  }
}

export async function deleteResumeFromFirestore(userId: string, resumeId: string): Promise<void> {
  if (!db) initFirebase();
  if (db && !userId.startsWith('guest-')) {
    try {
      await deleteDoc(doc(db, `users/${userId}/resumes`, resumeId));
    } catch (e) {
      console.warn(e);
    }
  }
  const list = getLocalResumes(userId).filter(r => r.id !== resumeId);
  localStorage.setItem(`resumes_${userId}`, JSON.stringify(list));
}

// ----------------- LOCAL STORAGE HELPERS -----------------
function getLocalResumes(userId?: string): ResumeData[] {
  const key = userId ? `resumes_${userId}` : 'resume_craft_resumes';
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

export async function saveJobApplications(userId: string, apps: JobApplication[]): Promise<void> {
  localStorage.setItem(`job_apps_${userId}`, JSON.stringify(apps));
  if (db && !userId.startsWith('guest-')) {
    try {
      const docRef = doc(db, `users/${userId}/data`, 'job_applications');
      await setDoc(docRef, { applications: apps, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.warn('Firestore job apps sync error:', err);
    }
  }
}

export async function loadJobApplications(userId: string): Promise<JobApplication[]> {
  const cached = localStorage.getItem(`job_apps_${userId}`);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }
  return [];
}
