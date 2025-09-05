/**
 * Recording utilities for audio and video capture
 */

export interface RecordingOptions {
  type: 'audio' | 'video' | 'both';
  quality?: 'low' | 'medium' | 'high';
  maxDuration?: number; // in seconds
}

export class RecordingManager {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private startTime: number = 0;
  private onDataAvailable?: (blob: Blob) => void;
  private onStop?: (blob: Blob) => void;
  private onError?: (error: Error) => void;

  /**
   * Start recording with specified options
   */
  async startRecording(options: RecordingOptions): Promise<void> {
    try {
      // Get media stream based on recording type
      this.stream = await this.getMediaStream(options);
      
      // Create MediaRecorder instance
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.getSupportedMimeType(options.type),
      });

      // Reset chunks array
      this.chunks = [];
      this.startTime = Date.now();

      // Set up event handlers
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
          this.onDataAvailable?.(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, {
          type: this.getSupportedMimeType(options.type),
        });
        this.onStop?.(blob);
        this.cleanup();
      };

      this.mediaRecorder.onerror = (event) => {
        const error = new Error(`Recording error: ${event}`);
        this.onError?.(error);
        this.cleanup();
      };

      // Start recording
      this.mediaRecorder.start(1000); // Collect data every second
    } catch (error) {
      this.cleanup();
      throw new Error(`Failed to start recording: ${error}`);
    }
  }

  /**
   * Stop recording and return the recorded blob
   */
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('No active recording to stop'));
        return;
      }

      this.onStop = (blob) => {
        resolve(blob);
      };

      this.onError = (error) => {
        reject(error);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Pause recording
   */
  pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  /**
   * Resume recording
   */
  resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  /**
   * Get current recording duration in seconds
   */
  getDuration(): number {
    if (this.startTime === 0) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /**
   * Check if currently recording
   */
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  /**
   * Check if recording is paused
   */
  isPaused(): boolean {
    return this.mediaRecorder?.state === 'paused';
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.chunks = [];
    this.startTime = 0;
  }

  /**
   * Get media stream based on recording type
   */
  private async getMediaStream(options: RecordingOptions): Promise<MediaStream> {
    const constraints: MediaStreamConstraints = {};

    if (options.type === 'audio' || options.type === 'both') {
      constraints.audio = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      };
    }

    if (options.type === 'video' || options.type === 'both') {
      constraints.video = {
        width: { ideal: this.getVideoWidth(options.quality) },
        height: { ideal: this.getVideoHeight(options.quality) },
        frameRate: { ideal: 30 },
        facingMode: 'user', // Front camera for mobile
      };
    }

    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      throw new Error(`Failed to get media stream: ${error}`);
    }
  }

  /**
   * Get supported MIME type for recording
   */
  private getSupportedMimeType(type: 'audio' | 'video' | 'both'): string {
    const mimeTypes = {
      audio: [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
      ],
      video: [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4',
      ],
    };

    const typesToCheck = type === 'both' ? mimeTypes.video : mimeTypes[type];

    for (const mimeType of typesToCheck) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        return mimeType;
      }
    }

    // Fallback
    return type === 'audio' ? 'audio/webm' : 'video/webm';
  }

  /**
   * Get video width based on quality
   */
  private getVideoWidth(quality?: string): number {
    switch (quality) {
      case 'low':
        return 640;
      case 'medium':
        return 1280;
      case 'high':
        return 1920;
      default:
        return 1280;
    }
  }

  /**
   * Get video height based on quality
   */
  private getVideoHeight(quality?: string): number {
    switch (quality) {
      case 'low':
        return 480;
      case 'medium':
        return 720;
      case 'high':
        return 1080;
      default:
        return 720;
    }
  }
}

/**
 * Convert blob to base64 string
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // Remove data:mime;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Create download link for recorded blob
 */
export const createDownloadLink = (blob: Blob, filename: string): string => {
  return URL.createObjectURL(blob);
};

/**
 * Format duration in MM:SS format
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Check if recording is supported in current browser
 */
export const isRecordingSupported = (): boolean => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
};

/**
 * Check recording permissions
 */
export const checkRecordingPermissions = async (type: 'audio' | 'video' | 'both'): Promise<boolean> => {
  if (!navigator.permissions) {
    return false;
  }

  try {
    const permissions = [];
    
    if (type === 'audio' || type === 'both') {
      permissions.push(navigator.permissions.query({ name: 'microphone' as PermissionName }));
    }
    
    if (type === 'video' || type === 'both') {
      permissions.push(navigator.permissions.query({ name: 'camera' as PermissionName }));
    }

    const results = await Promise.all(permissions);
    return results.every(result => result.state === 'granted');
  } catch (error) {
    return false;
  }
};
