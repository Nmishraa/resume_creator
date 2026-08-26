import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  if (loading) return null;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar user={user} logout={logout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/" />} />
            <Route path="/dashboard-what" element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/" />} />
            <Route path="/editor/:id" element={user ? <Editor user={user} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
