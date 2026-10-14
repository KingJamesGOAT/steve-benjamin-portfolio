import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { GlossaryTermProps } from '../../types';

interface PopupPosition {
  left: number;
  width: number;
  arrowLeft: number;
  isFlippedBelow: boolean;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, className = '' }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const [position, setPosition] = useState<PopupPosition>({
    left: 0,
    width: 320,
    arrowLeft: 160,
    isFlippedBelow: false,
  });

  const isVisible = isHovered || isPinned;

  // Dynamically calculate clamp so the popup NEVER touches the left or right edges of the page
  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // Minimum safe distance from the screen edge (20px prevents touching the screen corner)
    const safetyMargin = 20;
    const maxAllowedWidth = Math.max(240, viewportWidth - safetyMargin * 2);
    const targetWidth = 320;
    const tooltipWidth = Math.min(targetWidth, maxAllowedWidth);

    const wordCenter = rect.left + rect.width / 2;
    const idealLeft = wordCenter - tooltipWidth / 2;

    let clampedLeft = idealLeft;
    if (clampedLeft < safetyMargin) {
      clampedLeft = safetyMargin;
    } else if (clampedLeft + tooltipWidth > viewportWidth - safetyMargin) {
      clampedLeft = viewportWidth - safetyMargin - tooltipWidth;
    }

    // Convert clamped viewport left to local container offset
    const localLeft = clampedLeft - rect.left;

    // Arrow caret position relative to the tooltip box, clamped safely inside the box
    const arrowX = Math.max(16, Math.min(tooltipWidth - 16, wordCenter - clampedLeft));

    // If near the top of the viewport (less than 190px), flip below the word
    const isFlippedBelow = rect.top < 190;

    setPosition({
      left: localLeft,
      width: tooltipWidth,
      arrowLeft: arrowX,
      isFlippedBelow,
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('resize', handleScrollOrResize);
      window.addEventListener('scroll', handleScrollOrResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleScrollOrResize);
        window.removeEventListener('scroll', handleScrollOrResize);
      };
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsPinned(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPinned(false);
        setIsHovered(false);
      }
    };

    if (isPinned) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPinned]);

  const handleMouseEnter = () => {
    updatePosition();
    setIsHovered(true);
  };

  const handleTogglePin = () => {
    updatePosition();
    setIsPinned((prev) => !prev);
  };

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      onClick={handleTogglePin}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTogglePin();
        }
      }}
      aria-label={`${term}: ${definition}`}
    >
      {/* The interactive term text with blue select styling */}
      <span className="text-[#0052FF] cursor-help transition-colors hover:text-blue-700 underline decoration-dotted underline-offset-4 font-medium">
        {term}
      </span>

      {/* Clinical FinTech Dashboard Tooltip with Viewport Edge Clamping */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position.isFlippedBelow ? -6 : 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position.isFlippedBelow ? -4 : 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: `${position.left}px`,
              width: `${position.width}px`,
              bottom: !position.isFlippedBelow ? 'calc(100% + 8px)' : undefined,
              top: position.isFlippedBelow ? 'calc(100% + 8px)' : undefined,
              maxWidth: 'calc(100vw - 40px)',
            }}
            className="absolute p-3.5 bg-white border border-slate-200 rounded-none shadow-2xl shadow-slate-900/15 z-50 text-left pointer-events-auto normal-case tracking-normal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Term Label */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#0052FF] rounded-none inline-block" />
                <span className="font-mono text-[11px] font-bold text-fintech-primary uppercase tracking-wider">
                  {term}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-1 py-0.2">
                {isPinned ? t('glossary.pinned') : t('glossary.badge')}
              </span>
            </div>

            {/* Definition Content (3-line structured explanation) */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans normal-case tracking-normal">
              {definition}
            </p>

            {/* Tooltip Arrow Caret */}
            {position.isFlippedBelow ? (
              <div
                style={{ left: `${position.arrowLeft}px` }}
                className="absolute bottom-full -mb-[1px] -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-white filter drop-shadow-[0_-1px_1px_rgba(0,0,0,0.08)]"
              />
            ) : (
              <div
                style={{ left: `${position.arrowLeft}px` }}
                className="absolute top-full -mt-[1px] -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GlossaryTerm;
