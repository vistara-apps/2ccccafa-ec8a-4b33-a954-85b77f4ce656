import { LocationData } from '@/types';

/**
 * Get user's current location using the Geolocation API
 */
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // Get state information from coordinates
          const state = await getStateFromCoordinates(latitude, longitude);
          
          resolve({
            latitude,
            longitude,
            state,
            accuracy,
          });
        } catch (error) {
          // Fallback to coordinates only if reverse geocoding fails
          resolve({
            latitude,
            longitude,
            state: 'Unknown',
            accuracy,
          });
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

/**
 * Get state information from coordinates using reverse geocoding
 */
export const getStateFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    // Using a free reverse geocoding service
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }
    
    const data = await response.json();
    return data.principalSubdivision || data.locality || 'Unknown';
  } catch (error) {
    console.error('Error getting state from coordinates:', error);
    throw error;
  }
};

/**
 * Calculate distance between two coordinates in miles
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Format location for display
 */
export const formatLocation = (location: LocationData): string => {
  if (location.city && location.state) {
    return `${location.city}, ${location.state}`;
  }
  if (location.state) {
    return location.state;
  }
  return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
};

/**
 * Check if location permission is granted
 */
export const checkLocationPermission = async (): Promise<boolean> => {
  if (!navigator.permissions) {
    return false;
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state === 'granted';
  } catch (error) {
    return false;
  }
};
