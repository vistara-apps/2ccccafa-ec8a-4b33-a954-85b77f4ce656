import { useState, useEffect, useCallback } from 'react';
import { LocationData, UseLocationReturn } from '@/types';
import { getCurrentLocation, checkLocationPermission } from '@/utils/location';
import { useAppActions } from '@/store/useAppStore';

export const useLocation = (): UseLocationReturn => {
  const [location, setLocationState] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLocation: setStoreLocation } = useAppActions();

  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if location permission is already granted
      const hasPermission = await checkLocationPermission();
      
      if (!hasPermission) {
        // Request permission by attempting to get location
        const locationData = await getCurrentLocation();
        setLocationState(locationData);
        setStoreLocation(locationData);
      } else {
        // Permission already granted, get location
        const locationData = await getCurrentLocation();
        setLocationState(locationData);
        setStoreLocation(locationData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      console.error('Location error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreLocation]);

  // Auto-request location on mount if not already available
  useEffect(() => {
    if (!location && !isLoading && !error) {
      requestLocation();
    }
  }, [location, isLoading, error, requestLocation]);

  return {
    location,
    isLoading,
    error,
    requestLocation,
  };
};
