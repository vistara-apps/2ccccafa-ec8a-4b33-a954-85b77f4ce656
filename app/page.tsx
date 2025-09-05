'use client';

import { useState } from 'react';
import { Shield, MapPin, Mic, FileText, Play, Users } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'location',
      title: 'Location-Aware Rights',
      description: 'Get state-specific legal rights information based on your location.',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'guidance',
      title: 'Real-time Guidance',
      description: 'Bilingual scripts and prompts to guide you through interactions.',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'recording',
      title: 'One-Tap Recording',
      description: 'Quickly record interactions with a single tap for evidence.',
      icon: Mic,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'sharing',
      title: 'Evidence Sharing',
      description: 'Generate and share summary cards with legal counsel.',
      icon: Play,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header with Wallet Connection */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">RightNow Guides</h1>
                <p className="text-sm text-blue-200">Base Mini App</p>
              </div>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Instantly know your rights, every time.
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            A mobile-first application that provides instant, location-aware legal rights 
            information and real-time guidance during high-stress encounters.
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>12.5K+ Protected</span>
            </div>
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <div>94% Success Rate</div>
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <div>2.3s Avg Response</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeFeature === feature.id;
            
            return (
              <div
                key={feature.id}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 ${
                  isActive ? 'ring-2 ring-blue-400 bg-white/15' : ''
                }`}
                onClick={() => setActiveFeature(isActive ? null : feature.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-blue-200 text-sm">{feature.description}</p>
                    
                    {isActive && (
                      <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10">
                        <p className="text-blue-100 text-sm">
                          {feature.id === 'location' && "Access location-specific legal information tailored to your state's laws and regulations."}
                          {feature.id === 'guidance' && "Get step-by-step guidance with pre-written scripts in English and Spanish."}
                          {feature.id === 'recording' && "Start recording with one tap to capture evidence during interactions."}
                          {feature.id === 'sharing' && "Automatically generate shareable summary cards for legal counsel."}
                        </p>
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Try Feature
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Buttons */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Get My Rights Guide
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/20">
              Emergency Recording
            </button>
          </div>
          
          <p className="text-blue-300 text-sm mt-4">
            Connect your wallet to access premium features and save your data securely on Base.
          </p>
        </div>
      </div>
    </div>
  );
}
