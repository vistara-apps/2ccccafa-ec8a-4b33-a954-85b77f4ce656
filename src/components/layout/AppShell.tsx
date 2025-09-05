'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AppShellVariant } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
  variant?: AppShellVariant;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const baseClasses = 'min-h-screen w-full max-w-md mx-auto relative overflow-hidden';
  
  const variantClasses = {
    default: 'bg-bg',
    glass: 'bg-bg/80 backdrop-blur-lg',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </motion.div>
  );
};
