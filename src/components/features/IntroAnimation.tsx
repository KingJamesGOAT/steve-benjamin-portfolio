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

    // Crisp total duration: ~1.4 seconds before initiating smooth exit
    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('sb_intro_seen', 'true');
      } catch {
        // storage disabled fallback
      }
      if (onComplete) onComplete();
    }, 1400);

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
            y: -24,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <div className="flex flex-col items-center text-center px-6 max-w-lg space-y-3">
            {/* Minimalist Year & Scope Tag */}
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-slate-400"
            >
              PORTFOLIO // 2026
            </motion.span>

            {/* Kinetic Typographic Name Reveal */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.94, letterSpacing: '0.04em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em' }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-fintech-primary tracking-tight leading-none"
            >
              Steve Benjamin
            </motion.h1>

            {/* Expanding Electric Blue Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 72 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-electric"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-widest pt-1"
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
