import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete?: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Only play if not seen in the active browser session
    try {
      return !sessionStorage.getItem('sb_intro_seen');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) return;

    // Extended duration (+30%): ~1.85 seconds before initiating smooth exit
    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('sb_intro_seen', 'true');
      } catch {
        // storage disabled fallback
      }
      if (onComplete) onComplete();
    }, 1850);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('sb_intro_seen', 'true');
    } catch {
      // storage disabled fallback
    }
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -28,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <div className="flex flex-col items-center text-center px-6 max-w-4xl space-y-4 sm:space-y-6">
            {/* Kinetic Typographic Name Reveal (Oversized Hero Display) */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.94, letterSpacing: '0.04em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl md:text-9xl font-black text-fintech-primary tracking-tight leading-none"
            >
              Steve Benjamin
            </motion.h1>

            {/* Expanding Electric Blue Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 110 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="h-[3px] bg-electric rounded-full"
            />

            {/* Subtitle Under Name (Enlarged) */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="text-base sm:text-xl md:text-2xl font-mono text-slate-500 uppercase tracking-widest pt-1"
            >
              Software & Media Engineering
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
