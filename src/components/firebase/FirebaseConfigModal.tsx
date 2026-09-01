import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseConfig } from '../../services/firebase';
import { Database, X, Check, Key, ShieldCheck, RefreshCw } from 'lucide-react';

export const FirebaseConfigModal: React.FC = () => {
  const { showConfigModal, setShowConfigModal, firebaseConfig, updateFirebaseConfig } = useAuth();
  
  const [config, setConfig] = useState<FirebaseConfig>(firebaseConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!showConfigModal) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFirebaseConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowConfigModal(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400">
              <Database size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Firebase Cloud Settings</h3>
              <p className="text-xs text-slate-400">Connect your custom Firebase project</p>
            </div>
          </div>
          <button onClick={() => setShowConfigModal(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-3 max-h-[75vh] overflow-y-auto">
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
            <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <p>
              Resume Craft works out-of-the-box in local & guest mode. You can optionally connect your own Firebase project (Auth & Cloud Firestore) by providing the keys below.
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">API Key</label>
            <input
              type="text"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Auth Domain</label>
              <input
                type="text"
                value={config.authDomain}
                onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Project ID</label>
              <input
                type="text"
                value={config.projectId}
                onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Storage Bucket</label>
              <input
                type="text"
                value={config.storageBucket}
                onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">App ID</label>
              <input
                type="text"
                value={config.appId}
                onChange={(e) => setConfig({ ...config, appId: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              {savedSuccess ? <Check size={14} /> : <RefreshCw size={14} />}
              <span>{savedSuccess ? 'Saved!' : 'Save & Connect'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
