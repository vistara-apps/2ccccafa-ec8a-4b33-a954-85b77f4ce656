import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-spin">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            Loading RightNow Guides
          </h2>
          <p className="text-blue-200">
            Preparing your legal rights information...
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
