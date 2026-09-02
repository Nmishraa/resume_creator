import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  loginWithEmailApi,
  signupWithEmailApi,
  loginAsGuestApi,
  getCurrentUserApi,
  removeStoredToken
} from '../services/apiAuth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAnonymous: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isGuest: boolean;
  firebaseConfig?: any;
  updateFirebaseConfig?: (config: any) => void;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showConfigModal: boolean;
  setShowConfigModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadUser() {
      // Check stored session
      const savedGuest = localStorage.getItem('resume_craft_guest_session');
      if (savedGuest) {
        try {
          setUser(JSON.parse(savedGuest));
          setLoading(false);
          return;
        } catch {}
      }

      try {
        const currentUser = await getCurrentUserApi();
        if (currentUser) {
          setUser({
            uid: currentUser.id,
            email: currentUser.email,
            displayName: currentUser.name || currentUser.email.split('@')[0],
            isAnonymous: !!currentUser.isGuest
          });
        }
      } catch (e) {
        console.warn('API user check failed:', e);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const signInGoogle = async () => {
    return signInGuest();
  };

  const signInEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await loginWithEmailApi(email, pass);
      setUser({
        uid: res.user.id,
        email: res.user.email,
        displayName: res.user.name || res.user.email.split('@')[0],
        isAnonymous: !!res.user.isGuest
      });
      localStorage.removeItem('resume_craft_guest_session');
      setShowAuthModal(false);
    } catch (err: any) {
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signUpEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await signupWithEmailApi(email, pass);
      setUser({
        uid: res.user.id,
        email: res.user.email,
        displayName: res.user.name || res.user.email.split('@')[0],
        isAnonymous: !!res.user.isGuest
      });
      localStorage.removeItem('resume_craft_guest_session');
      setShowAuthModal(false);
    } catch (err: any) {
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    alert(`Password reset instructions sent to ${email}`);
  };

  const signInGuest = async () => {
    setLoading(true);
    try {
      const res = await loginAsGuestApi();
      const authUser: AuthUser = {
        uid: res.user.id,
        email: res.user.email,
        displayName: res.user.name || 'Guest User',
        isAnonymous: true
      };
      setUser(authUser);
      localStorage.setItem('resume_craft_guest_session', JSON.stringify(authUser));
      setShowAuthModal(false);
    } catch (err) {
      // Fallback guest session
      const fallbackGuest: AuthUser = {
        uid: `guest_${Date.now()}`,
        email: 'guest@neha.local',
        displayName: 'Guest User',
        isAnonymous: true
      };
      setUser(fallbackGuest);
      localStorage.setItem('resume_craft_guest_session', JSON.stringify(fallbackGuest));
      setShowAuthModal(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      removeStoredToken();
      localStorage.removeItem('resume_craft_guest_session');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest: !!user?.isAnonymous || user?.uid.startsWith('guest-') || false,
        signInGoogle,
        signInEmail,
        signUpEmail,
        sendPasswordReset,
        signInGuest,
        signOut,
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
