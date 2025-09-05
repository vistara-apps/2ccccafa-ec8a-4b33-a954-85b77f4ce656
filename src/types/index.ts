// Core data model types based on specifications

export interface User {
  userId: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  interactionId: string;
  userId: string;
  timestamp: Date;
  duration: number; // in seconds
  location: {
    latitude: number;
    longitude: number;
    state: string;
    city?: string;
  };
  notes: string;
  recordingUrl?: string;
  scriptUsed?: string;
  shareCardUrl?: string;
  createdAt: Date;
}

export interface RightsGuide {
  guideId: string;
  state: string;
  content: {
    title: string;
    summary: string;
    dosList: string[];
    dontsList: string[];
    keyRights: string[];
    emergencyContacts: string[];
    legalReferences: string[];
  };
  languages: ('english' | 'spanish')[];
  lastUpdated: Date;
}

// UI Component Types
export interface LocationData {
  latitude: number;
  longitude: number;
  state: string;
  city?: string;
  accuracy?: number;
}

export interface RecordingState {
  isRecording: boolean;
  duration: number;
  recordingType: 'audio' | 'video' | 'both';
  recordingUrl?: string;
}

export interface ScriptData {
  id: string;
  title: string;
  content: string;
  language: 'english' | 'spanish';
  category: 'traffic-stop' | 'police-encounter' | 'arrest' | 'search' | 'general';
  state?: string;
}

export interface ShareCard {
  id: string;
  interactionId: string;
  title: string;
  summary: string;
  timestamp: Date;
  location: string;
  duration: string;
  keyPoints: string[];
  ipfsHash?: string;
  shareUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface MicroTransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

// Component Variant Types
export type AppShellVariant = 'default' | 'glass';
export type ActionCardVariant = 'default' | 'compact';
export type QuickRecordButtonVariant = 'primary' | 'secondary';
export type ScriptDisplayVariant = 'english' | 'spanish' | 'bilingual';
export type ShareButtonVariant = 'default' | 'withIcon';
export type LocationAwareGuideVariant = 'full' | 'embedded';

// State Management Types
export interface AppState {
  user: User | null;
  location: LocationData | null;
  currentGuide: RightsGuide | null;
  recording: RecordingState;
  interactions: Interaction[];
  isLoading: boolean;
  error: string | null;
}

// Hook Types
export interface UseLocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

export interface UseRecordingReturn {
  recording: RecordingState;
  startRecording: (type: 'audio' | 'video' | 'both') => Promise<void>;
  stopRecording: () => Promise<string | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
}

export interface UseScriptsReturn {
  scripts: ScriptData[];
  getScriptsByCategory: (category: string) => ScriptData[];
  getScriptsByLanguage: (language: 'english' | 'spanish') => ScriptData[];
  getScriptsByState: (state: string) => ScriptData[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export type ErrorCode = 
  | 'LOCATION_DENIED'
  | 'RECORDING_FAILED'
  | 'NETWORK_ERROR'
  | 'PAYMENT_FAILED'
  | 'AUTHENTICATION_FAILED'
  | 'STORAGE_FAILED';
