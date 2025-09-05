'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Copy, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScriptDisplayProps } from '@/lib/types';

export function ScriptDisplay({
  scripts,
  language,
  variant = 'bilingual',
}: ScriptDisplayProps) {
  const [activeLanguage, setActiveLanguage] = useState<'english' | 'spanish'>('english');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const mockScripts = {
    english: [
      "Officer, I am exercising my right to remain silent.",
      "I do not consent to any searches.",
      "Am I free to leave?",
      "I would like to speak to a lawyer.",
      "I am not resisting arrest.",
    ],
    spanish: [
      "Oficial, estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ningún registro.",
      "¿Soy libre de irme?",
      "Me gustaría hablar con un abogado.",
      "No me estoy resistiendo al arresto.",
    ],
  };

  const currentScripts = language === 'bilingual' 
    ? mockScripts[activeLanguage] 
    : mockScripts[language as keyof typeof mockScripts] || scripts;

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleSpeak = (text: string, index: number) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = activeLanguage === 'spanish' ? 'es-ES' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onstart = () => setIsPlaying(index);
      utterance.onend = () => setIsPlaying(null);
      utterance.onerror = () => setIsPlaying(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      {variant === 'bilingual' && (
        <div className="flex items-center justify-center">
          <div className="glass-card p-1 rounded-full">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveLanguage('english')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeLanguage === 'english'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-textSecondary hover:text-textPrimary'
                )}
              >
                English
              </button>
              <button
                onClick={() => setActiveLanguage('spanish')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeLanguage === 'spanish'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-textSecondary hover:text-textPrimary'
                )}
              >
                Español
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scripts List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {currentScripts.map((script, index) => (
            <motion.div
              key={`${activeLanguage}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 group hover:bg-opacity-15 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-textPrimary leading-relaxed group-hover:text-white transition-colors duration-200">
                    {script}
                  </p>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {/* Speak Button */}
                  <button
                    onClick={() => handleSpeak(script, index)}
                    disabled={isPlaying === index}
                    className={cn(
                      'p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200',
                      isPlaying === index && 'bg-primary text-white'
                    )}
                  >
                    <Volume2 className={cn(
                      'w-4 h-4',
                      isPlaying === index && 'animate-pulse'
                    )} />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(script, index)}
                    className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Usage Tips */}
      <div className="glass-card p-4 border-l-4 border-accent">
        <div className="flex items-start space-x-3">
          <Globe className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-textPrimary mb-1">
              Usage Tips
            </h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Speak clearly and calmly. These phrases assert your constitutional rights. 
              Practice them beforehand so you can use them confidently when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
