import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GlossaryTermProps } from '../../types';

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const isVisible = isHovered || isPinned;

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

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      onClick={() => setIsPinned(!isPinned)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPinned(!isPinned);
        }
      }}
      aria-label={`${term}: ${definition}`}
    >
      {/* The interactive term text with blue select styling */}
      <span className="text-[#0052FF] cursor-help transition-colors hover:text-blue-700 underline decoration-dotted underline-offset-4 font-medium">
        {term}
      </span>

      {/* Clinical FinTech Dashboard Tooltip with Crisp Rectangular Aesthetics */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-80 max-w-[90vw] p-3.5 bg-white border border-slate-200 rounded-none shadow-2xl shadow-slate-900/15 z-50 text-left pointer-events-auto"
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
                {isPinned ? 'PINNED' : 'GLOSSARY'}
              </span>
            </div>

            {/* Definition Content (3-line structured explanation) */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {definition}
            </p>

            {/* Tooltip Arrow Caret */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GlossaryTerm;
