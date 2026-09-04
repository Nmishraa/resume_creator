import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);

    // Auto-reload seamlessly if browser fails to fetch dynamically imported module (due to fresh deployment)
    const isChunkLoadError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.message?.includes('dynamically imported module') ||
      error?.message?.includes('Importing a module script failed');

    const hasReloaded = sessionStorage.getItem('chunk_error_reloaded');
    if (isChunkLoadError && !hasReloaded) {
      sessionStorage.setItem('chunk_error_reloaded', 'true');
      window.location.reload();
      return;
    }

    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white">Something went wrong</h1>
              <p className="text-sm text-slate-300">
                An unhandled application error occurred. We can reset your session cache to restore the builder immediately.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 bg-slate-950/80 border border-slate-700/80 rounded-xl text-left font-mono text-xs text-rose-300 overflow-x-auto max-h-36">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs transition-colors"
              >
                Reset Cache &amp; Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
