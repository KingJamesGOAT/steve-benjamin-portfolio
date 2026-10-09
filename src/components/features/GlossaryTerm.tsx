import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import type { GlossaryTermProps } from '../../types';

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${term}: ${definition}`}
    >
      {/* The interactive term text */}
      <span className="text-[#0052FF] cursor-help transition-colors hover:text-blue-800 underline decoration-dotted underline-offset-4 font-medium">
        {term}
      </span>

      {/* Clinical FinTech Dashboard Tooltip with Crisp Rectangular Aesthetics */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-white border border-slate-200 rounded-md shadow-xl shadow-slate-900/10 z-50 pointer-events-none text-left"
          >
            {/* Header / Term Label */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
              <div className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-[#0052FF]" />
                <span className="font-mono text-[11px] font-semibold text-fintech-primary uppercase tracking-wider">
                  {term}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Def
              </span>
            </div>

            {/* Definition Content */}
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {definition}
            </p>

            {/* Tooltip Arrow Caret */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GlossaryTerm;
