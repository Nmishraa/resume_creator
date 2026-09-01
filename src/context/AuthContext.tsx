import React, { createContext, useContext, useState, useEffect } from 'react';
import { FirebaseUser } from '../types/resume';
import {
  subscribeToAuthChanges,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  loginAsGuest,
  logoutUser,
  getSavedFirebaseConfig,
  saveCustomFirebaseConfig,
  resetPassword,
  FirebaseConfig
} from '../services/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  isGuest: boolean;
  firebaseConfig: FirebaseConfig;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  updateFirebaseConfig: (config: FirebaseConfig) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showConfigModal: boolean;
  setShowConfigModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig>(getSavedFirebaseConfig());
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if guest user was stored
    const savedGuest = localStorage.getItem('resume_craft_guest_session');
    if (savedGuest) {
      try {
        setUser(JSON.parse(savedGuest));
      } catch {}
    }

    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.removeItem('resume_craft_guest_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) setUser(loggedUser);
      setShowAuthModal(false);
    } finally {
      setLoading(false);
    }
  };

  const signInEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const loggedUser = await loginWithEmail(email, pass);
      if (loggedUser) setUser(loggedUser);
      setShowAuthModal(false);
    } finally {
      setLoading(false);
    }
  };

  const signUpEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const loggedUser = await registerWithEmail(email, pass);
      if (loggedUser) setUser(loggedUser);
      setShowAuthModal(false);
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    await resetPassword(email);
  };

  const signInGuest = async () => {
    setLoading(true);
    try {
      const guest = await loginAsGuest();
      if (guest) {
        setUser(guest);
        localStorage.setItem('resume_craft_guest_session', JSON.stringify(guest));
      }
      setShowAuthModal(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await logoutUser();
      localStorage.removeItem('resume_craft_guest_session');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateFirebaseConfig = (newConfig: FirebaseConfig) => {
    saveCustomFirebaseConfig(newConfig);
    setFirebaseConfig(newConfig);
    setShowConfigModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest: !!user?.isAnonymous || user?.uid.startsWith('guest-') || false,
        firebaseConfig,
        signInGoogle,
        signInEmail,
        signUpEmail,
        sendPasswordReset,
        signInGuest,
        signOut,
        updateFirebaseConfig,
        showAuthModal,
        setShowAuthModal,
        showConfigModal,
        setShowConfigModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
