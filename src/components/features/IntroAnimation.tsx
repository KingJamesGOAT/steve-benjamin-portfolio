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

    // Silky-smooth timing: 1.0s clean hold, followed by 600ms gradual dissolve
    const fadeTimer = setTimeout(() => {
      setStage('fading');
    }, 1000);

    const removeTimer = setTimeout(() => {
      setStage('gone');
      try {
        sessionStorage.setItem('sb_intro_seen', 'true');
      } catch {
        // storage disabled fallback
      }
      if (onComplete) onComplete();
    }, 1600);

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
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none cursor-pointer transition-opacity duration-600 ease-in-out ${
        stage === 'fading'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        willChange: 'opacity',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-4xl space-y-4 sm:space-y-6">
        {/* Main Title: Steve Benjamin */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-fintech-primary tracking-tight leading-none"
          style={{ fontSynthesis: 'none' }}
        >
          Steve Benjamin
        </h1>

        {/* Electric Blue Accent Line */}
        <div className="h-[3px] w-24 sm:w-32 bg-electric rounded-none" />

        {/* Subtitle Under Name: Media Engineer */}
        <p
          className="text-base sm:text-xl md:text-2xl font-mono text-slate-600 uppercase tracking-widest pt-1"
          style={{ fontSynthesis: 'none' }}
        >
          {isFrench ? 'Ingénieur des Médias' : 'Media Engineer'}
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
