import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export const DeveloperHeroCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isMinimized && !isRunning) {
        setIsMinimized(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMinimized, isRunning]);

  // When closed with red button: show only compact container with "developer.config.ts"
  if (isClosed) {
    return (
      <div className="w-full flex justify-center lg:justify-end">
        <button
          type="button"
          onClick={() => {
            setIsClosed(false);
            setIsMinimized(false);
          }}
          className="border border-slate-200 bg-white hover:border-electric shadow-sm rounded-none font-mono text-[11px] font-semibold text-slate-600 hover:text-electric transition-colors cursor-pointer select-none px-3.5 py-2 inline-flex items-center"
          title="developer.config.ts"
        >
          developer.config.ts
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5 rounded-none font-mono text-xs transition-all">
      {/* Terminal Title Bar */}
      <div
        onClick={() => {
          if (isMinimized) setIsMinimized(false);
        }}
        className={`flex items-center px-3.5 py-2.5 border-b border-slate-200 bg-slate-50/70 select-none ${
          isMinimized ? 'cursor-pointer hover:bg-slate-100/70 transition-colors' : ''
        }`}
      >
        <div className="flex items-center space-x-2">
          {/* macOS Window Controls: Red (Close), Yellow (Minimize), Green (Run/Toggle) */}
          <div className="flex space-x-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsClosed(true)}
              className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title="Close"
              aria-label="Close"
            />
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title="Minimize"
              aria-label="Minimize"
            />
            <button
              type="button"
              onClick={() => {
                setIsMinimized(false);
                setIsRunning((prev) => !prev);
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title="Execute"
              aria-label="Execute"
            />
          </div>

          <span className="text-[11px] font-semibold text-slate-600 pl-1.5 flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-electric" />
            <span>developer.config.ts</span>
            {isMinimized && (
              <span className="text-[10px] text-slate-400 font-normal pl-1">
                ({isFrench ? 'cliquer pour ouvrir' : 'tap to open'})
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Code Body / Execution Output */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {isRunning ? (
              /* Clean Terminal Console Output without emojis, email, or extraneous footers */
              <div className="p-4 sm:p-5 space-y-2 bg-[#0A0D14] text-slate-200 leading-relaxed overflow-x-auto text-[11px] sm:text-[12px]">
                <div className="text-emerald-400 flex items-center space-x-2 pb-1.5 border-b border-slate-800">
                  <span className="text-slate-500 font-mono">$</span>
                  <span className="font-semibold">ts-node developer.config.ts</span>
                </div>

                <div className="space-y-1 pt-1 text-slate-300 font-mono text-[11px]">
                  <p className="text-emerald-400">
                    [OK] {isFrench ? 'Profil Steve Benjamin chargé' : 'Steve Benjamin profile loaded'}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">-&gt;</span>{' '}
                    {isFrench
                      ? 'Education: BSc Ingénierie des Médias @ HEIG-VD'
                      : 'Education: BSc Media Engineering @ HEIG-VD'}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">-&gt;</span>{' '}
                    {isFrench
                      ? 'Background: 9 ans de code & hardware -> Web Architecture & UI/UX'
                      : 'Background: 9 yrs coding & hardware -> Web Architecture & UI/UX'}
                  </p>
                  <p className="text-emerald-400">
                    [OK]{' '}
                    {isFrench
                      ? 'Bachelor Mandate: Prêt (Avril - Août 2027)'
                      : 'Bachelor Mandate: Ready (Apr - Aug 2027)'}
                  </p>
                </div>
              </div>
            ) : (
              /* Clean Formatted TypeScript Source Code without extra footer */
              <div className="p-4 sm:p-5 space-y-3 bg-white text-slate-700 leading-relaxed overflow-x-auto">
                <div className="text-slate-400 italic text-[11px]">
                  {isFrench
                    ? '// Disponible pour mandat de Bachelor (Printemps 2027) @ HEIG-VD'
                    : '// Available for Bachelor Mandate (Spring 2027) @ HEIG-VD'}
                </div>

                <div className="space-y-1 text-slate-800 text-[12px] leading-5">
                  <div>
                    <span className="text-purple-600">const</span>{' '}
                    <span className="text-blue-600 font-semibold">engineer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">degree:</span>{' '}
                    <span className="text-emerald-700">
                      {isFrench
                        ? '"BSc Ingénierie des Médias @ HEIG-VD"'
                        : '"BSc Media Engineering @ HEIG-VD"'}
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">background:</span>{' '}
                    <span className="text-emerald-700">
                      {isFrench
                        ? '"Code & Hardware (9 ans) → Web & UI/UX"'
                        : '"Coding & Hardware (9 yrs) → Web & UI/UX"'}
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">coreStack:</span> [
                    <span className="text-amber-700">"React"</span>,{' '}
                    <span className="text-amber-700">"TypeScript"</span>,{' '}
                    <span className="text-amber-700">"Tailwind"</span>,{' '}
                    <span className="text-amber-700">"Figma"</span>,{' '}
                    <span className="text-amber-700">"C"</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">mandateScope:</span>{' '}
                    <span className="text-emerald-700">
                      {isFrench
                        ? '"Mandat 14 semaines (0 CHF / NDA)"'
                        : '"14-Week Capstone (CHF 0 / NDA)"'}
                    </span>
                  </div>
                  <div>&#125;;</div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeveloperHeroCard;
