'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full text-center space-y-6 border border-white/20">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong
          </h2>
          <p className="text-blue-200">
            We encountered an error while loading your rights information. 
            This might be a temporary issue.
          </p>
        </div>

        {error.message && (
          <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
            <p className="text-sm text-red-300 font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
        </div>

        <div className="text-xs text-blue-300">
          If this problem persists, please contact support or try accessing 
          your rights information through alternative means.
        </div>
      </div>
    </div>
  );
}
