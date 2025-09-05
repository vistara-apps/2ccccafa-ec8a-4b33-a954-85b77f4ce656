import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  LocationData, 
  RightsGuide, 
  RecordingState, 
  Interaction, 
  ScriptData,
  AppState 
} from '@/types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setLocation: (location: LocationData | null) => void;
  setCurrentGuide: (guide: RightsGuide | null) => void;
  setRecording: (recording: Partial<RecordingState>) => void;
  addInteraction: (interaction: Interaction) => void;
  updateInteraction: (id: string, updates: Partial<Interaction>) => void;
  removeInteraction: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: AppState = {
  user: null,
  location: null,
  currentGuide: null,
  recording: {
    isRecording: false,
    duration: 0,
    recordingType: 'audio',
    recordingUrl: undefined,
  },
  interactions: [],
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // User actions
      setUser: (user) => set({ user }),

      // Location actions
      setLocation: (location) => set({ location }),

      // Rights guide actions
      setCurrentGuide: (guide) => set({ currentGuide: guide }),

      // Recording actions
      setRecording: (recordingUpdate) =>
        set((state) => ({
          recording: { ...state.recording, ...recordingUpdate },
        })),

      // Interaction actions
      addInteraction: (interaction) =>
        set((state) => ({
          interactions: [interaction, ...state.interactions],
        })),

      updateInteraction: (id, updates) =>
        set((state) => ({
          interactions: state.interactions.map((interaction) =>
            interaction.interactionId === id
              ? { ...interaction, ...updates }
              : interaction
          ),
        })),

      removeInteraction: (id) =>
        set((state) => ({
          interactions: state.interactions.filter(
            (interaction) => interaction.interactionId !== id
          ),
        })),

      // UI state actions
      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      // Reset all state
      reset: () => set(initialState),
    }),
    {
      name: 'rightnow-guides-store',
      partialize: (state) => ({
        user: state.user,
        interactions: state.interactions,
        // Don't persist location, recording state, or current guide for privacy
      }),
    }
  )
);

// Selectors for computed values
export const useUser = () => useAppStore((state) => state.user);
export const useLocation = () => useAppStore((state) => state.location);
export const useCurrentGuide = () => useAppStore((state) => state.currentGuide);
export const useRecording = () => useAppStore((state) => state.recording);
export const useInteractions = () => useAppStore((state) => state.interactions);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);

// Computed selectors
export const useRecentInteractions = (limit: number = 5) =>
  useAppStore((state) =>
    state.interactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  );

export const useInteractionsByLocation = (state: string) =>
  useAppStore((storeState) =>
    storeState.interactions.filter(
      (interaction) => interaction.location.state === state
    )
  );

export const useIsRecording = () =>
  useAppStore((state) => state.recording.isRecording);

export const useRecordingDuration = () =>
  useAppStore((state) => state.recording.duration);

// Action hooks for easier usage
export const useAppActions = () => {
  const store = useAppStore();
  return {
    setUser: store.setUser,
    setLocation: store.setLocation,
    setCurrentGuide: store.setCurrentGuide,
    setRecording: store.setRecording,
    addInteraction: store.addInteraction,
    updateInteraction: store.updateInteraction,
    removeInteraction: store.removeInteraction,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
    reset: store.reset,
  };
};
