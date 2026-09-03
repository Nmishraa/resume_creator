import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import App from './App';
import './index.css';

// Unregister legacy service workers to prevent cached JS bundles
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  // Clear any SSG pre-rendered fallback HTML before mounting client React application
  rootElement.innerHTML = '';

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ErrorBoundary>
      <AuthProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
