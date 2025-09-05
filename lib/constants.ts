// App Constants
export const APP_NAME = 'RightNow Guides';
export const APP_TAGLINE = 'Instantly know your rights, every time.';

// API Endpoints
export const API_ENDPOINTS = {
  OPENAI: '/api/openai',
  AIRSTACK: '/api/airstack',
  PINATA: '/api/pinata',
  PRIVY: '/api/privy',
  STRIPE: '/api/stripe',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'rightnow_user_profile',
  INTERACTIONS: 'rightnow_interactions',
  LOCATION_CACHE: 'rightnow_location_cache',
  PREFERENCES: 'rightnow_preferences',
} as const;

// Recording Settings
export const RECORDING_CONFIG = {
  MAX_DURATION: 3600, // 1 hour in seconds
  AUDIO_BITRATE: 128000,
  VIDEO_BITRATE: 2500000,
  SUPPORTED_FORMATS: ['webm', 'mp4', 'mov'],
} as const;

// Supported States (expandable)
export const SUPPORTED_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
] as const;

// Languages
export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'english',
  SPANISH: 'spanish',
} as const;

// Pricing (in cents for Stripe)
export const PRICING = {
  BASIC_GUIDE: 99, // $0.99
  PREMIUM_FEATURES: 299, // $2.99
  MONTHLY_SUBSCRIPTION: 999, // $9.99
  ANNUAL_SUBSCRIPTION: 9999, // $99.99
} as const;

// Emergency Contacts
export const EMERGENCY_CONTACTS = {
  ACLU: '1-800-775-2258',
  LEGAL_AID: '211',
  EMERGENCY: '911',
} as const;

// Design Tokens
export const DESIGN_TOKENS = {
  COLORS: {
    BG: 'hsl(230, 20%, 15%)',
    ACCENT: 'hsl(12, 90%, 55%)',
    PRIMARY: 'hsl(240, 80%, 50%)',
    SURFACE: 'hsl(230, 20%, 20%)',
    TEXT_PRIMARY: 'hsl(230, 20%, 90%)',
    TEXT_SECONDARY: 'hsl(230, 20%, 70%)',
  },
  RADIUS: {
    SM: '6px',
    MD: '10px',
    LG: '16px',
    FULL: '9999px',
  },
  SPACING: {
    SM: '8px',
    MD: '12px',
    LG: '20px',
    XL: '32px',
  },
  DURATION: {
    FAST: '150ms',
    BASE: '200ms',
    SLOW: '400ms',
  },
} as const;
