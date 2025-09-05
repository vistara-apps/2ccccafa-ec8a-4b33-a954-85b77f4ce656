'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Square, Pause, Play } from 'lucide-react';
import { cn } from '@/utils/cn';
import { QuickRecordButtonVariant } from '@/types';
import { formatDuration } from '@/utils/recording';

interface QuickRecordButtonProps {
  variant?: QuickRecordButtonVariant;
  isRecording?: boolean;
  isPaused?: boolean;
  duration?: number;
  recordingType?: 'audio' | 'video' | 'both';
  onStartRecording?: (type: 'audio' | 'video' | 'both') => void;
  onStopRecording?: () => void;
  onPauseRecording?: () => void;
  onResumeRecording?: () => void;
  disabled?: boolean;
  className?: string;
}

export const QuickRecordButton: React.FC<QuickRecordButtonProps> = ({
  variant = 'primary',
  isRecording = false,
  isPaused = false,
  duration = 0,
  recordingType = 'audio',
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  disabled = false,
  className,
}) => {
  const baseClasses = 'relative flex flex-col items-center justify-center rounded-full transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]';
  
  const variantClasses = {
    primary: 'w-20 h-20 bg-accent hover:bg-accent/90 shadow-lg',
    secondary: 'w-16 h-16 bg-surface hover:bg-surface/80 shadow-md',
  };

  const recordingClasses = isRecording
    ? 'bg-red-500 hover:bg-red-600 animate-pulse-slow'
    : '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer active:scale-95';

  const handleClick = () => {
    if (disabled) return;

    if (!isRecording) {
      onStartRecording?.(recordingType);
    } else if (isPaused) {
      onResumeRecording?.();
    } else {
      onPauseRecording?.();
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onStopRecording?.();
    }
  };

  const getIcon = () => {
    if (!isRecording) {
      return recordingType === 'video' || recordingType === 'both' ? (
        <Video className="w-8 h-8" />
      ) : (
        <Mic className="w-8 h-8" />
      );
    }

    if (isPaused) {
      return <Play className="w-8 h-8" />;
    }

    return <Pause className="w-8 h-8" />;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          baseClasses,
          variantClasses[variant],
          recordingClasses,
          disabledClasses,
          className
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        <div className="text-white">
          {getIcon()}
        </div>

        {/* Recording indicator ring */}
        {isRecording && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border-2 border-red-400"
          />
        )}
      </motion.button>

      {/* Stop button when recording */}
      {isRecording && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
          onClick={handleStop}
          disabled={disabled}
        >
          <Square className="w-6 h-6" />
        </motion.button>
      )}

      {/* Duration display */}
      {isRecording && duration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-mono text-textSecondary bg-surface/50 px-3 py-1 rounded-full"
        >
          {formatDuration(duration)}
        </motion.div>
      )}

      {/* Recording type indicator */}
      {!isRecording && (
        <div className="text-xs text-textSecondary capitalize">
          {recordingType === 'both' ? 'Audio + Video' : recordingType}
        </div>
      )}
    </div>
  );
};
