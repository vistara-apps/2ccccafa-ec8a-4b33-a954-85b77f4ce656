'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ActionCardProps } from '@/lib/types';

export function ActionCard({
  title,
  description,
  icon,
  onClick,
  variant = 'default',
  disabled = false,
}: ActionCardProps) {
  const cardClasses = cn(
    'metric-card cursor-pointer group relative overflow-hidden',
    variant === 'compact' && 'p-4',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={disabled ? undefined : onClick}
      className={cardClasses}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              {icon}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-textPrimary mb-2 group-hover:text-white transition-colors duration-200">
              {title}
            </h3>
            <p className="text-textSecondary text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200">
              {description}
            </p>
          </div>
        </div>

        {/* Action Indicator */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-textSecondary group-hover:text-gray-200 transition-colors duration-200">
              Ready
            </span>
          </div>
          
          <motion.div
            className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ rotate: 90 }}
          >
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
