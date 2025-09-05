'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, AlertTriangle, Phone, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationAwareGuideProps } from '@/lib/types';
import { getCurrentLocation, getMockRightsGuide } from '@/lib/utils';

export function LocationAwareGuide({
  guide,
  location,
  variant = 'full',
}: LocationAwareGuideProps) {
  const [currentGuide, setCurrentGuide] = useState(guide);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      // Simulate fetching location-specific guide
      setTimeout(() => {
        setCurrentGuide(getMockRightsGuide(location.state));
        setIsLoading(false);
      }, 1000);
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 bg-opacity-20 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 bg-opacity-20 rounded"></div>
            <div className="h-4 bg-gray-200 bg-opacity-20 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 bg-opacity-20 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const containerClasses = cn(
    'space-y-6',
    variant === 'embedded' && 'space-y-4'
  );

  return (
    <div className={containerClasses}>
      {/* Location Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-textPrimary">
              {location.city}, {location.state}
            </h3>
            <p className="text-sm text-textSecondary">
              Location-specific rights information
            </p>
          </div>
        </div>
      </motion.div>

      {/* Guide Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          {currentGuide.content.title}
        </h2>
        <p className="text-textSecondary">
          {currentGuide.content.summary}
        </p>
      </motion.div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Do's */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary">
              What TO Do
            </h3>
          </div>
          
          <ul className="space-y-3">
            {currentGuide.content.dosList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-textSecondary text-sm leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Don'ts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary">
              What NOT To Do
            </h3>
          </div>
          
          <ul className="space-y-3">
            {currentGuide.content.dontsList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-textSecondary text-sm leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Emergency Contacts */}
      {variant === 'full' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary">
              Emergency Contacts
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {currentGuide.content.emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-surface p-3 rounded-lg hover:bg-opacity-20 transition-all duration-200 cursor-pointer"
              >
                <p className="text-textPrimary text-sm font-medium">
                  {contact}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Legal Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-4 border-l-4 border-yellow-500"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-textPrimary mb-1">
              Legal Disclaimer
            </h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              This information is for educational purposes only and does not constitute legal advice. 
              Laws vary by jurisdiction and situation. Consult with a qualified attorney for specific legal guidance.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
