'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuickRecordButtonProps } from '@/lib/types';
import { formatDuration } from '@/lib/utils';

export function QuickRecordButton({
  isRecording,
  onToggleRecording,
  variant = 'primary',
  size = 'md',
}: QuickRecordButtonProps) {
  const [duration, setDuration] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      setIsPulsing(true);
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      setIsPulsing(false);
      if (duration > 0) {
        // Reset duration after a delay to show final time
        setTimeout(() => setDuration(0), 2000);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, duration]);

  const buttonClasses = cn(
    'relative flex items-center justify-center rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl',
    // Size variants
    size === 'sm' && 'w-12 h-12',
    size === 'md' && 'w-16 h-16',
    size === 'lg' && 'w-20 h-20',
    // Color variants
    variant === 'primary' && !isRecording && 'bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-red-500',
    variant === 'primary' && isRecording && 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    variant === 'secondary' && 'glass-card hover:bg-opacity-20',
    // Pulsing animation when recording
    isPulsing && 'animate-pulse-slow'
  );

  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <div className="flex flex-col items-center space-y-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleRecording}
        className={buttonClasses}
      >
        {/* Pulse Ring Animation */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-red-500"
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <div className="relative z-10 text-white">
          {isRecording ? (
            <Square className={cn(iconSize, 'fill-current')} />
          ) : (
            <Mic className={iconSize} />
          )}
        </div>
      </motion.button>

      {/* Duration Display */}
      <AnimatePresence>
        {(isRecording || duration > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card px-3 py-1 rounded-full"
          >
            <div className="flex items-center space-x-2">
              {isRecording && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
              <span className="text-sm font-mono text-textPrimary">
                {formatDuration(duration)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Text */}
      <motion.p
        key={isRecording ? 'recording' : 'ready'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-textSecondary text-center"
      >
        {isRecording ? 'Recording in progress...' : 'Tap to start recording'}
      </motion.p>
    </div>
  );
}
