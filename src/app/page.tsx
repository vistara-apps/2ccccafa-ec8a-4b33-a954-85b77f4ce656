'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { Shield, Mic, FileText, Share2, MapPin, Settings } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ActionCard } from '@/components/ui/ActionCard';
import { QuickRecordButton } from '@/components/ui/QuickRecordButton';
import { LocationAwareGuide } from '@/components/features/LocationAwareGuide';
import { useRecording } from '@/hooks/useRecording';
import { useLocation } from '@/hooks/useLocation';
import { useAppActions, useUser, useIsRecording, useRecordingDuration } from '@/store/useAppStore';
import toast from 'react-hot-toast';

export default function HomePage() {
  const { login, logout, authenticated, user: privyUser } = usePrivy();
  const user = useUser();
  const { setUser } = useAppActions();
  const [activeTab, setActiveTab] = useState<'guide' | 'record' | 'history'>('guide');
  
  // Recording functionality
  const { recording, startRecording, stopRecording, pauseRecording, resumeRecording } = useRecording();
  const isRecording = useIsRecording();
  const recordingDuration = useRecordingDuration();
  
  // Location functionality
  const { location } = useLocation();

  // Update user in store when Privy user changes
  useEffect(() => {
    if (authenticated && privyUser) {
      const userData = {
        userId: privyUser.id,
        walletAddress: privyUser.wallet?.address || '',
        createdAt: new Date(privyUser.createdAt),
        updatedAt: new Date(),
      };
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [authenticated, privyUser, setUser]);

  const handleStartRecording = async (type: 'audio' | 'video' | 'both') => {
    if (!authenticated) {
      toast.error('Please connect your wallet to start recording');
      return;
    }
    
    try {
      await startRecording(type);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const recordingUrl = await stopRecording();
      if (recordingUrl) {
        toast.success('Recording saved successfully');
        // Here you would typically save the interaction to the store
        // and potentially upload to IPFS via Pinata
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  // Authentication screen
  if (!authenticated) {
    return (
      <AppShell>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-display mb-4">RightNow Guides</h1>
              <p className="text-body">
                Instantly know your rights, every time. Get location-aware legal guidance and secure recording capabilities.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={login}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                Connect Wallet to Continue
              </button>
              
              <p className="text-caption">
                Secure authentication via Base Wallet or email
              </p>
            </div>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <header className="safe-top bg-surface/30 backdrop-blur-lg border-b border-surface/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-textPrimary">RightNow Guides</h1>
              {location && (
                <p className="text-xs text-textSecondary flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.state}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={logout}
            className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-textSecondary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Emergency Recording Button - Always Visible */}
        <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur-lg border-b border-surface/10 p-4">
          <div className="flex justify-center">
            <QuickRecordButton
              isRecording={isRecording}
              duration={recordingDuration}
              recordingType="both"
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onPauseRecording={pauseRecording}
              onResumeRecording={resumeRecording}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2">
          <div className="flex bg-surface/30 rounded-lg p-1">
            {[
              { id: 'guide', label: 'Rights Guide', icon: Shield },
              { id: 'record', label: 'Record', icon: Mic },
              { id: 'history', label: 'History', icon: FileText },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surface/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-safe-bottom">
          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <LocationAwareGuide variant="full" />
            </motion.div>
          )}

          {activeTab === 'record' && (
            <motion.div
              key="record"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 py-4"
            >
              <ActionCard
                title="Recording Options"
                description="Choose your recording type and start documenting your interaction"
                icon={<Mic className="w-6 h-6" />}
              >
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <button
                    onClick={() => handleStartRecording('audio')}
                    disabled={isRecording}
                    className="p-3 bg-surface/50 hover:bg-surface/70 rounded-lg text-center transition-colors disabled:opacity-50"
                  >
                    <Mic className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-textSecondary">Audio</div>
                  </button>
                  
                  <button
                    onClick={() => handleStartRecording('video')}
                    disabled={isRecording}
                    className="p-3 bg-surface/50 hover:bg-surface/70 rounded-lg text-center transition-colors disabled:opacity-50"
                  >
                    <Mic className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-textSecondary">Video</div>
                  </button>
                  
                  <button
                    onClick={() => handleStartRecording('both')}
                    disabled={isRecording}
                    className="p-3 bg-surface/50 hover:bg-surface/70 rounded-lg text-center transition-colors disabled:opacity-50"
                  >
                    <Mic className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-textSecondary">Both</div>
                  </button>
                </div>
              </ActionCard>

              <ActionCard
                title="Quick Scripts"
                description="Access pre-written scripts for common scenarios"
                icon={<FileText className="w-6 h-6" />}
              >
                <div className="space-y-2 mt-4">
                  {[
                    'Traffic Stop Script',
                    'Police Encounter Script',
                    'Search Refusal Script',
                  ].map((script, index) => (
                    <button
                      key={index}
                      className="w-full p-3 bg-surface/30 hover:bg-surface/50 rounded-lg text-left text-sm text-textSecondary transition-colors"
                    >
                      {script}
                    </button>
                  ))}
                </div>
              </ActionCard>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 py-4"
            >
              <ActionCard
                title="Interaction History"
                description="View and manage your recorded interactions"
                icon={<FileText className="w-6 h-6" />}
              >
                <div className="text-center py-8 text-textSecondary">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No interactions recorded yet</p>
                  <p className="text-sm mt-2">Start recording to build your history</p>
                </div>
              </ActionCard>

              <ActionCard
                title="Share & Export"
                description="Generate shareable summary cards for legal counsel"
                icon={<Share2 className="w-6 h-6" />}
              >
                <button className="w-full mt-4 btn-secondary py-3">
                  Generate Summary Card
                </button>
              </ActionCard>
            </motion.div>
          )}
        </div>
      </main>
    </AppShell>
  );
}
