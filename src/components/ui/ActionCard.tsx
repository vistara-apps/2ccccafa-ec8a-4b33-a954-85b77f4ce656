'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ActionCardVariant } from '@/types';

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: ActionCardVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  variant = 'default',
  onClick,
  disabled = false,
  className,
  children,
}) => {
  const baseClasses = 'rounded-lg border border-surface/20 transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]';
  
  const variantClasses = {
    default: 'bg-surface/50 p-6 shadow-card',
    compact: 'bg-surface/30 p-4 shadow-sm',
  };

  const interactiveClasses = onClick && !disabled
    ? 'cursor-pointer hover:bg-surface/70 hover:border-surface/40 hover:shadow-lg active:scale-[0.98]'
    : disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}
      onClick={onClick && !disabled ? onClick : undefined}
      whileTap={onClick && !disabled ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 text-primary">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-textPrimary mb-1">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-textSecondary leading-relaxed">
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
