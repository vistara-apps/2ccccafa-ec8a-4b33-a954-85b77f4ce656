'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link, Download, Check, Twitter, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  data: {
    title: string;
    summary: string;
    url?: string;
  };
  variant?: 'default' | 'withIcon';
  onShare?: (platform: string) => void;
}

export function ShareButton({ 
  data, 
  variant = 'default',
  onShare 
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const shareUrl = data.url || window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: string) => {
    const shareUrl = data.url || window.location.href;
    const text = `${data.title} - ${data.summary}`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'farcaster':
        // This would integrate with Farcaster's sharing mechanism
        url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
    
    onShare?.(platform);
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.summary,
          url: data.url || window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className={cn(
          'btn-secondary flex items-center space-x-2',
          variant === 'withIcon' && 'px-4 py-2'
        )}
      >
        <Share2 className="w-4 h-4" />
        {variant === 'withIcon' && <span>Share</span>}
      </motion.button>

      {/* Custom Share Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute bottom-full right-0 mb-2 w-48 glass-card p-2 shadow-modal z-50"
          >
            <div className="space-y-1">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Link className="w-4 h-4" />
                )}
                <span className="text-sm text-textPrimary">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm text-textPrimary">Share on Twitter</span>
              </button>

              {/* Farcaster */}
              <button
                onClick={() => handleShare('farcaster')}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm text-textPrimary">Share on Farcaster</span>
              </button>

              {/* Download */}
              <button
                onClick={() => {
                  // This would trigger a download of the summary card
                  console.log('Download summary card');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm text-textPrimary">Download Card</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
