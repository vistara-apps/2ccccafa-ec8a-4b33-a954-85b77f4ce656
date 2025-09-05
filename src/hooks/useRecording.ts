import { useState, useEffect, useCallback, useRef } from 'react';
import { UseRecordingReturn, RecordingState } from '@/types';
import { RecordingManager, RecordingOptions, isRecordingSupported } from '@/utils/recording';
import { useAppActions } from '@/store/useAppStore';
import toast from 'react-hot-toast';

export const useRecording = (): UseRecordingReturn => {
  const [recording, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    duration: 0,
    recordingType: 'audio',
    recordingUrl: undefined,
  });

  const { setRecording: setStoreRecording } = useAppActions();
  const recordingManagerRef = useRef<RecordingManager | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize recording manager
  useEffect(() => {
    if (isRecordingSupported()) {
      recordingManagerRef.current = new RecordingManager();
    } else {
      toast.error('Recording is not supported in this browser');
    }

    return () => {
      if (recordingManagerRef.current) {
        recordingManagerRef.current.cleanup();
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Update store when recording state changes
  useEffect(() => {
    setStoreRecording(recording);
  }, [recording, setStoreRecording]);

  const startRecording = useCallback(async (type: 'audio' | 'video' | 'both') => {
    if (!recordingManagerRef.current) {
      toast.error('Recording not supported');
      return;
    }

    if (recording.isRecording) {
      toast.error('Recording already in progress');
      return;
    }

    try {
      const options: RecordingOptions = {
        type,
        quality: 'medium',
        maxDuration: 3600, // 1 hour max
      };

      await recordingManagerRef.current.startRecording(options);

      setRecordingState({
        isRecording: true,
        duration: 0,
        recordingType: type,
        recordingUrl: undefined,
      });

      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        if (recordingManagerRef.current) {
          const duration = recordingManagerRef.current.getDuration();
          setRecordingState(prev => ({ ...prev, duration }));
        }
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Failed to start recording. Please check permissions.');
    }
  }, [recording.isRecording]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!recordingManagerRef.current || !recording.isRecording) {
      toast.error('No active recording to stop');
      return null;
    }

    try {
      const blob = await recordingManagerRef.current.stopRecording();
      const recordingUrl = URL.createObjectURL(blob);

      // Clear duration interval
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      setRecordingState(prev => ({
        ...prev,
        isRecording: false,
        recordingUrl,
      }));

      toast.success('Recording stopped');
      return recordingUrl;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      toast.error('Failed to stop recording');
      return null;
    }
  }, [recording.isRecording]);

  const pauseRecording = useCallback(() => {
    if (!recordingManagerRef.current || !recording.isRecording) {
      return;
    }

    recordingManagerRef.current.pauseRecording();
    
    // Pause duration counter
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    toast.success('Recording paused');
  }, [recording.isRecording]);

  const resumeRecording = useCallback(() => {
    if (!recordingManagerRef.current) {
      return;
    }

    recordingManagerRef.current.resumeRecording();

    // Resume duration counter
    durationIntervalRef.current = setInterval(() => {
      if (recordingManagerRef.current) {
        const duration = recordingManagerRef.current.getDuration();
        setRecordingState(prev => ({ ...prev, duration }));
      }
    }, 1000);

    toast.success('Recording resumed');
  }, []);

  return {
    recording,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
};
