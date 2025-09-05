'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Mic, 
  FileText, 
  Play,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { ActionCard } from '@/components/ActionCard';
import { QuickRecordButton } from '@/components/QuickRecordButton';
import { ScriptDisplay } from '@/components/ScriptDisplay';
import { LocationAwareGuide } from '@/components/LocationAwareGuide';
import { ShareButton } from '@/components/ShareButton';
import { getCurrentLocation, getMockRightsGuide } from '@/lib/utils';
import { LocationData, RightsGuide } from '@/lib/types';

export default function HomePage() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [rightsGuide, setRightsGuide] = useState<RightsGuide | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showScripts, setShowScripts] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Get user location on mount
    getCurrentLocation()
      .then((loc) => {
        setLocation(loc);
        setRightsGuide(getMockRightsGuide(loc.state));
      })
      .catch((error) => {
        console.error('Failed to get location:', error);
        // Fallback to default location
        const defaultLocation: LocationData = {
          latitude: 37.7749,
          longitude: -122.4194,
          state: 'California',
          city: 'San Francisco',
          accuracy: 0,
        };
        setLocation(defaultLocation);
        setRightsGuide(getMockRightsGuide(defaultLocation.state));
      });
  }, []);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const mockShareData = {
    title: 'RightNow Guides Interaction Summary',
    summary: 'Legal rights guidance and interaction recording completed.',
    url: 'https://rightnow-guides.app/share/123',
  };

  return (
    <AppShell variant="glass">
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-textPrimary">
                RightNow Guides
              </h1>
              <p className="text-textSecondary">
                Instantly know your rights, every time.
              </p>
            </div>
          </div>

          {location && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-4 inline-flex items-center space-x-3"
            >
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-textPrimary">
                {location.city}, {location.state}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
            title="Get Your Guide"
            description="Access location-specific legal rights information"
            icon={<Shield className="w-6 h-6 text-white" />}
            onClick={() => setShowGuide(!showGuide)}
          />
          
          <ActionCard
            title="Quick Scripts"
            description="Ready-to-use phrases for interactions"
            icon={<FileText className="w-6 h-6 text-white" />}
            onClick={() => setShowScripts(!showScripts)}
          />
          
          <ActionCard
            title="Record Interaction"
            description="One-tap recording for evidence"
            icon={<Mic className="w-6 h-6 text-white" />}
            onClick={handleToggleRecording}
          />
          
          <ActionCard
            title="Share Evidence"
            description="Generate shareable summary cards"
            icon={<Play className="w-6 h-6 text-white" />}
            onClick={() => console.log('Share evidence')}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Primary Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recording Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-xl font-semibold text-textPrimary mb-6">
                Emergency Recording
              </h2>
              <QuickRecordButton
                isRecording={isRecording}
                onToggleRecording={handleToggleRecording}
                size="lg"
              />
              <div className="mt-6 flex items-center justify-center space-x-4">
                <ShareButton 
                  data={mockShareData}
                  variant="withIcon"
                />
              </div>
            </motion.div>

            {/* Scripts Section */}
            {showScripts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-textPrimary mb-6">
                  Ready-to-Use Scripts
                </h2>
                <ScriptDisplay
                  scripts={[]}
                  language="bilingual"
                  variant="bilingual"
                />
              </motion.div>
            )}

            {/* Rights Guide Section */}
            {showGuide && location && rightsGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card p-6"
              >
                <LocationAwareGuide
                  guide={rightsGuide}
                  location={location}
                  variant="full"
                />
              </motion.div>
            )}
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="metric-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-textSecondary">Success Rate</span>
                  </div>
                  <span className="text-2xl font-bold text-textPrimary">94%</span>
                </div>
                <p className="text-xs text-textSecondary">
                  Users report successful interactions
                </p>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-textSecondary">Active Users</span>
                  </div>
                  <span className="text-2xl font-bold text-textPrimary">12.5K</span>
                </div>
                <p className="text-xs text-textSecondary">
                  People protected this month
                </p>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-textSecondary">Avg Response</span>
                  </div>
                  <span className="text-2xl font-bold text-textPrimary">2.3s</span>
                </div>
                <p className="text-xs text-textSecondary">
                  Time to access rights info
                </p>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center mx-auto">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary">
                    Premium Access
                  </h3>
                  <p className="text-textSecondary text-sm">
                    Unlock advanced features and unlimited guides
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-textPrimary">
                    $2.99
                    <span className="text-sm text-textSecondary font-normal">/month</span>
                  </div>
                  <button className="btn-accent w-full">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-textPrimary mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-textSecondary">
                    Rights guide accessed
                  </span>
                  <span className="text-xs text-textSecondary ml-auto">
                    2m ago
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-textSecondary">
                    Location updated
                  </span>
                  <span className="text-xs text-textSecondary ml-auto">
                    5m ago
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-textSecondary">
                    Script practiced
                  </span>
                  <span className="text-xs text-textSecondary ml-auto">
                    1h ago
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
