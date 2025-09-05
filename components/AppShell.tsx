'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Mic, 
  FileText, 
  Settings2, 
  Menu, 
  X,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

const sidebarItems = [
  { icon: Home, label: 'Home', id: 'home', active: true },
  { icon: MapPin, label: 'Location', id: 'location' },
  { icon: Shield, label: 'Rights Guide', id: 'rights' },
  { icon: Mic, label: 'Record', id: 'record' },
  { icon: FileText, label: 'History', id: 'history' },
  { icon: Clock, label: 'Recent', id: 'recent' },
  { icon: Users, label: 'Community', id: 'community' },
  { icon: Settings2, label: 'Settings', id: 'settings' },
];

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shellClasses = cn(
    'min-h-screen flex',
    variant === 'glass' && 'bg-opacity-95 backdrop-blur-xl'
  );

  return (
    <div className={shellClasses}>
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -280 } : false}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'w-70 glass-surface border-r border-white border-opacity-10',
              isMobile && 'fixed inset-y-0 left-0 z-50'
            )}
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-textPrimary">RightNow</h1>
                  <p className="text-sm text-textSecondary">Guides</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        'sidebar-item w-full',
                        activeItem === item.id && 'active'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white border-opacity-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">U</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-textPrimary">User</p>
                  <p className="text-xs text-textSecondary">Connected</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="glass-surface border-b border-white border-opacity-10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  {isSidebarOpen ? (
                    <X className="w-6 h-6 text-textPrimary" />
                  ) : (
                    <Menu className="w-6 h-6 text-textPrimary" />
                  )}
                </button>
              )}
              
              <div>
                <h2 className="text-xl font-bold text-textPrimary">
                  RightNow Guides
                </h2>
                <p className="text-sm text-textSecondary">
                  A UI component for how to source in RightNow guidance.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="btn-primary text-sm">
                Get Your Guide
              </button>
              <button className="btn-secondary text-sm">
                Save Guide
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
}
