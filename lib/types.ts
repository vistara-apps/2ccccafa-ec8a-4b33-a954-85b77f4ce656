// User Types
export interface User {
  userId: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interaction Types
export interface Interaction {
  interactionId: string;
  userId: string;
  timestamp: Date;
  duration: number;
  location: {
    latitude: number;
    longitude: number;
    state: string;
    city: string;
  };
  notes: string;
  recordingUrl?: string;
  scriptUsed?: string;
  shareCardUrl?: string;
  createdAt: Date;
}

// Rights Guide Types
export interface RightsGuide {
  guideId: string;
  state: string;
  content: {
    title: string;
    summary: string;
    dosList: string[];
    dontsList: string[];
    scripts: {
      english: string[];
      spanish: string[];
    };
    emergencyContacts: string[];
  };
  languages: string[];
}

// Location Types
export interface LocationData {
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  accuracy: number;
}

// Recording Types
export interface RecordingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  isRecording: boolean;
  mediaType: 'audio' | 'video' | 'both';
}

// Share Card Types
export interface ShareCard {
  id: string;
  interactionId: string;
  title: string;
  summary: string;
  timestamp: Date;
  location: string;
  duration: string;
  notes: string;
  shareUrl: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component Props Types
export interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'compact';
  disabled?: boolean;
}

export interface QuickRecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export interface ScriptDisplayProps {
  scripts: string[];
  language: 'english' | 'spanish' | 'bilingual';
  variant?: 'english' | 'spanish' | 'bilingual';
}

export interface LocationAwareGuideProps {
  guide: RightsGuide;
  location: LocationData;
  variant?: 'full' | 'embedded';
}
