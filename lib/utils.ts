import { type ClassValue, clsx } from 'clsx';
import { LocationData, RightsGuide } from './types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Location utilities
export function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // In a real app, you'd use a geocoding service
          const locationData: LocationData = {
            latitude,
            longitude,
            state: 'California', // Mock data
            city: 'San Francisco', // Mock data
            accuracy: accuracy || 0,
          };
          
          resolve(locationData);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

// Time formatting utilities
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Storage utilities
export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return null;
  }
}

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Mock data generators
export function getMockRightsGuide(state: string): RightsGuide {
  return {
    guideId: generateId(),
    state,
    content: {
      title: `Your Rights in ${state}`,
      summary: 'Know your constitutional rights during police encounters.',
      dosList: [
        'Remain calm and polite',
        'Keep your hands visible',
        'State clearly: "I am exercising my right to remain silent"',
        'Ask: "Am I free to leave?"',
        'Request a lawyer if arrested',
      ],
      dontsList: [
        "Don't resist, even if you believe the stop is unfair",
        "Don't argue or become confrontational",
        "Don't consent to searches",
        "Don't provide false information",
        "Don't run or make sudden movements",
      ],
      scripts: {
        english: [
          "Officer, I am exercising my right to remain silent.",
          "I do not consent to any searches.",
          "Am I free to leave?",
          "I would like to speak to a lawyer.",
        ],
        spanish: [
          "Oficial, estoy ejerciendo mi derecho a permanecer en silencio.",
          "No consiento a ningún registro.",
          "¿Soy libre de irme?",
          "Me gustaría hablar con un abogado.",
        ],
      },
      emergencyContacts: [
        'ACLU: 1-800-775-ACLU',
        'Local Legal Aid: 211',
        'Emergency: 911',
      ],
    },
    languages: ['english', 'spanish'],
  };
}


