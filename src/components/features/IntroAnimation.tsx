import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

interface IntroAnimationProps {
  onComplete?: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const { i18n } = useTranslation();

  // Detect language based on cookie, i18n, or browser settings
  const isFrench = (() => {
    try {
      const cookieLang = Cookies.get('i18next_lang');
      if (cookieLang) return cookieLang.toLowerCase().startsWith('fr');
      if (i18n.language) return i18n.language.toLowerCase().startsWith('fr');
      if (typeof navigator !== 'undefined' && navigator.language) {
        return navigator.language.toLowerCase().startsWith('fr');
      }
    } catch {
      // fallback
    }
    return false;
  })();

  const [stage, setStage] = useState<'visible' | 'fading' | 'gone'>(() => {
    try {
      if (sessionStorage.getItem('sb_intro_seen')) {
        return 'gone';
      }
    } catch {
      // fallback
    }
    return 'visible';
  });

  useEffect(() => {
    if (stage === 'gone') return;

    // Fast, lightweight timing: hold for ~1s, then smooth fade-out
    const fadeTimer = setTimeout(() => {
      setStage('fading');
    }, 1050);

    const removeTimer = setTimeout(() => {
      setStage('gone');
      try {
        sessionStorage.setItem('sb_intro_seen', 'true');
      } catch {
        // storage disabled fallback
      }
      if (onComplete) onComplete();
    }, 1450);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [stage, onComplete]);

  const handleDismiss = () => {
    setStage('gone');
    try {
      sessionStorage.setItem('sb_intro_seen', 'true');
    } catch {
      // storage disabled fallback
    }
    if (onComplete) onComplete();
  };

  if (stage === 'gone') return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-400 ease-out ${
        stage === 'fading'
          ? 'opacity-0 -translate-y-4 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-3xl space-y-3">
        {/* Main Title: Media Engineer */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-fintech-primary tracking-tight leading-none uppercase">
          {isFrench ? 'Ingénieur des Médias' : 'Media Engineer'}
        </h1>

        {/* Accent Bar & Monospace Subtitle: Software */}
        <div className="flex items-center space-x-2.5 pt-2">
          <span className="w-2.5 h-2.5 bg-electric rounded-none inline-block" />
          <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-slate-700 tracking-wider uppercase">
            {isFrench ? 'Logiciel' : 'Software'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
