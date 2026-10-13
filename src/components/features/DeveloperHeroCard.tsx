import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export const DeveloperHeroCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // If window was closed with red button, show minimal relaunch trigger
  if (isClosed) {
    return (
      <div className="w-full max-w-lg flex justify-center lg:justify-end py-6 select-none font-mono">
        <button
          type="button"
          onClick={() => {
            setIsClosed(false);
            setIsMinimized(false);
          }}
          className="group px-4 py-2.5 border border-slate-200 bg-white hover:border-electric transition-all shadow-sm flex items-center space-x-2 text-xs cursor-pointer"
          title={isFrench ? 'Rouvrir la fenêtre' : 'Reopen terminal window'}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <Terminal className="w-3.5 h-3.5 text-electric group-hover:scale-110 transition-transform" />
          <span className="text-slate-700 group-hover:text-electric font-semibold transition-colors">
            {isFrench ? 'Relancer developer.config.ts' : 'Relaunch developer.config.ts'}
          </span>
          <span className="text-slate-400 group-hover:text-slate-600 text-[10px]">↵</span>
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
        className={`flex items-center justify-between px-3.5 py-2.5 border-b border-slate-200 bg-slate-50/70 select-none ${
          isMinimized ? 'cursor-pointer hover:bg-slate-100/70 transition-colors' : ''
        }`}
      >
        <div className="flex items-center space-x-2">
          {/* macOS Window Controls: Red (Close), Yellow (Minimize), Green (Run/Expand) */}
          <div className="flex space-x-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsClosed(true)}
              className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title={isFrench ? 'Fermer (Close)' : 'Close'}
              aria-label="Close"
            />
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title={isFrench ? 'Réduire (Minimize)' : 'Minimize'}
              aria-label="Minimize"
            />
            <button
              type="button"
              onClick={() => {
                setIsMinimized(false);
                setIsRunning((prev) => !prev);
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              title={isFrench ? 'Exécuter (Run script)' : 'Execute script'}
              aria-label="Execute"
            />
          </div>

          <span className="text-[11px] font-semibold text-slate-600 pl-1.5 flex items-center space-x-1.5">
            <Terminal className="w-3 h-3 text-electric" />
            <span>developer.config.ts</span>
            {isMinimized && (
              <span className="text-slate-400 text-[10px] italic font-normal">
                ({isFrench ? 'réduit' : 'minimized'})
              </span>
            )}
            {isRunning && !isMinimized && (
              <span className="text-emerald-600 text-[10px] font-semibold">
                ({isFrench ? 'exécution' : 'running'})
              </span>
            )}
          </span>
        </div>

        {/* Action Hint */}
        <div className="text-[10px] text-slate-400">
          {isMinimized ? (
            <span>{isFrench ? 'cliquer pour déplier' : 'click to expand'}</span>
          ) : isRunning ? (
            <button
              type="button"
              onClick={() => setIsRunning(false)}
              className="hover:text-electric transition-colors cursor-pointer"
            >
              {isFrench ? 'code source' : 'source code'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRunning(true)}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              {isFrench ? 'exécuter 🟢' : 'run 🟢'}
            </button>
          )}
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
              /* Simulated Terminal Console Execution Output */
              <div className="p-4 sm:p-5 space-y-2.5 bg-[#0A0D14] text-slate-200 leading-relaxed overflow-x-auto text-[11px] sm:text-[12px]">
                <div className="text-emerald-400 flex items-center space-x-2 pb-1.5 border-b border-slate-800">
                  <span className="text-slate-500 font-mono">$</span>
                  <span className="font-semibold">ts-node developer.config.ts</span>
                </div>

                <div className="space-y-1 pt-1 text-slate-300 font-mono text-[11px]">
                  <p className="text-emerald-400">
                    [✓] {isFrench ? 'Profil Steve Benjamin chargé' : 'Steve Benjamin profile loaded'}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">→</span>{' '}
                    {isFrench
                      ? 'Formation : BSc Ingénierie des Médias @ HEIG-VD (2027)'
                      : 'Education: BSc Media Engineering @ HEIG-VD (2027)'}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">→</span>{' '}
                    {isFrench
                      ? 'Parcours : 9 ans C & hardware → Web Architecture & UI/UX'
                      : 'Background: 9 yrs C & hardware → Web Architecture & UI/UX'}
                  </p>
                  <p className="text-emerald-400">
                    [✓]{' '}
                    {isFrench
                      ? 'Mandat Bachelor : Prêt (Avril – Août 2027 / CHF 0 / NDA)'
                      : 'Bachelor Mandate: Ready (Apr – Aug 2027 / CHF 0 / NDA)'}
                  </p>
                  <p className="text-blue-400">
                    [✓]{' '}
                    <a
                      href="mailto:sbstevebenjamin@gmail.com"
                      className="hover:underline"
                    >
                      sbstevebenjamin@gmail.com
                    </a>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                  <span>exit code 0 (0.04s)</span>
                  <button
                    type="button"
                    onClick={() => setIsRunning(false)}
                    className="text-electric hover:underline cursor-pointer"
                  >
                    {isFrench ? '← Revenir au code source' : '← Back to source code'}
                  </button>
                </div>
              </div>
            ) : (
              /* Clean Formatted TypeScript Source Code */
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
                        ? '"Hardware C (9 ans) → Web & UI/UX"'
                        : '"C Hardware (9 yrs) → Web & UI/UX"'}
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

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 select-none">
                  <span>{isFrench ? 'TypeScript 5.4' : 'TypeScript 5.4'}</span>
                  <span className="text-slate-400">
                    {isFrench ? 'Cliquer sur 🟢 pour tester' : 'Click 🟢 to execute'}
                  </span>
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
