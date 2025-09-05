'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Shield, Phone } from 'lucide-react';
import { cn } from '@/utils/cn';
import { LocationAwareGuideVariant, RightsGuide, LocationData } from '@/types';
import { ActionCard } from '@/components/ui/ActionCard';
import { useLocation } from '@/hooks/useLocation';
import { useAppActions } from '@/store/useAppStore';

interface LocationAwareGuideProps {
  variant?: LocationAwareGuideVariant;
  className?: string;
}

// Mock rights guide data - in production, this would come from an API
const getMockRightsGuide = (state: string): RightsGuide => ({
  guideId: `guide-${state.toLowerCase()}`,
  state,
  content: {
    title: `Your Rights in ${state}`,
    summary: `Know your constitutional rights during police encounters in ${state}. Stay calm, be respectful, and remember these key points.`,
    dosList: [
      'Remain calm and keep your hands visible',
      'Clearly state "I am exercising my right to remain silent"',
      'Ask "Am I free to leave?" if not under arrest',
      'Request a lawyer if arrested',
      'Remember badge numbers and patrol car numbers',
    ],
    dontsList: [
      "Don't resist, even if you believe the stop is unfair",
      "Don't argue or become confrontational",
      "Don't consent to searches without a warrant",
      "Don't lie or provide false information",
      "Don't reach for anything without permission",
    ],
    keyRights: [
      'Right to remain silent (5th Amendment)',
      'Right to refuse consent to search',
      'Right to ask if you are free to leave',
      'Right to an attorney',
      'Right to record the interaction (in most states)',
    ],
    emergencyContacts: [
      'Emergency: 911',
      'ACLU Legal Hotline: 1-877-6-PROFILE',
      'Local Legal Aid: Contact your local bar association',
    ],
    legalReferences: [
      'Terry v. Ohio (1968) - Stop and Frisk',
      'Miranda v. Arizona (1966) - Miranda Rights',
      'Fourth Amendment - Protection from unreasonable searches',
    ],
  },
  languages: ['english', 'spanish'],
  lastUpdated: new Date(),
});

export const LocationAwareGuide: React.FC<LocationAwareGuideProps> = ({
  variant = 'full',
  className,
}) => {
  const { location, isLoading, error, requestLocation } = useLocation();
  const { setCurrentGuide } = useAppActions();
  const [guide, setGuide] = useState<RightsGuide | null>(null);

  // Load rights guide when location changes
  useEffect(() => {
    if (location?.state) {
      const rightsGuide = getMockRightsGuide(location.state);
      setGuide(rightsGuide);
      setCurrentGuide(rightsGuide);
    }
  }, [location, setCurrentGuide]);

  const baseClasses = 'space-y-4';
  const variantClasses = {
    full: 'p-6',
    embedded: 'p-4',
  };

  if (isLoading) {
    return (
      <div className={cn(baseClasses, variantClasses[variant], className)}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-textSecondary">Getting your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(baseClasses, variantClasses[variant], className)}>
        <ActionCard
          title="Location Required"
          description={error}
          icon={<MapPin className="w-6 h-6" />}
          onClick={requestLocation}
          variant="compact"
        >
          <button
            onClick={requestLocation}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Enable Location
          </button>
        </ActionCard>
      </div>
    );
  }

  if (!location || !guide) {
    return (
      <div className={cn(baseClasses, variantClasses[variant], className)}>
        <ActionCard
          title="Location Access Needed"
          description="We need your location to provide state-specific legal rights information."
          icon={<MapPin className="w-6 h-6" />}
          onClick={requestLocation}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {/* Location Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-textPrimary">
            {guide.content.title}
          </h2>
          <p className="text-sm text-textSecondary">
            Current location: {location.state}
          </p>
        </div>
      </div>

      {/* Summary */}
      <ActionCard
        title="Quick Summary"
        description={guide.content.summary}
        icon={<Shield className="w-6 h-6" />}
        variant="compact"
      />

      {/* DO's Section */}
      <ActionCard
        title="What TO Do"
        icon={<Shield className="w-6 h-6 text-green-500" />}
        variant={variant === 'full' ? 'default' : 'compact'}
      >
        <ul className="space-y-2">
          {guide.content.dosList.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-textSecondary"
            >
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </ActionCard>

      {/* DON'T's Section */}
      <ActionCard
        title="What NOT To Do"
        icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
        variant={variant === 'full' ? 'default' : 'compact'}
      >
        <ul className="space-y-2">
          {guide.content.dontsList.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-textSecondary"
            >
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </ActionCard>

      {/* Key Rights */}
      {variant === 'full' && (
        <ActionCard
          title="Your Constitutional Rights"
          icon={<Shield className="w-6 h-6 text-primary" />}
        >
          <ul className="space-y-2">
            {guide.content.keyRights.map((right, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-textSecondary"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {right}
              </motion.li>
            ))}
          </ul>
        </ActionCard>
      )}

      {/* Emergency Contacts */}
      {variant === 'full' && (
        <ActionCard
          title="Emergency Contacts"
          icon={<Phone className="w-6 h-6 text-accent" />}
        >
          <div className="space-y-2">
            {guide.content.emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="text-sm text-textSecondary p-2 bg-surface/30 rounded"
              >
                {contact}
              </div>
            ))}
          </div>
        </ActionCard>
      )}
    </motion.div>
  );
};
