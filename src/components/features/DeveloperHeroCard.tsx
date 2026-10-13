import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DeveloperHeroCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');
  const [copied, setCopied] = useState(false);

  const codeString = `const engineer = {
  degree: "${isFrench ? 'BSc Ingénierie des Médias @ HEIG-VD' : 'BSc Media Engineering @ HEIG-VD'}",
  background: "${isFrench ? 'Hardware C (9 ans) → Web & UI/UX' : 'C Hardware (9 yrs) → Web & UI/UX'}",
  coreStack: ["React", "TypeScript", "Tailwind", "Figma", "C"],
  mandateScope: "${isFrench ? 'Mandat 14 semaines (0 CHF / NDA)' : '14-Week Capstone (CHF 0 / NDA)'}"
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5 rounded-none font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-200 bg-slate-50/70 select-none">
        <div className="flex items-center space-x-2">
          {/* macOS Window Controls: Red, Yellow, Green */}
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          </div>
          <span className="text-[11px] font-semibold text-slate-600 pl-1.5 flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-electric" />
            <span>developer.config.ts</span>
          </span>
        </div>

        {/* Live Status Indicator & Copy Action */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-emerald-700 font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>{isFrench ? 'Mandat 2027' : 'Mandate 2027'}</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="text-[10px] font-mono text-slate-500 hover:text-electric px-2 py-0.5 border border-slate-200 hover:border-slate-300 bg-white transition-colors cursor-pointer"
            title={isFrench ? 'Copier le code' : 'Copy code snippet'}
            aria-label="Copy code"
          >
            {copied ? (isFrench ? '✓ Copié' : '✓ Copied') : (isFrench ? 'Copier' : 'Copy')}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 space-y-3 bg-white text-slate-700 leading-relaxed overflow-x-auto">
        {/* Availability Code Comment */}
        <div className="text-slate-400 italic text-[11px]">
          {isFrench
            ? '// Disponible pour mandat de Bachelor (Printemps 2027) @ HEIG-VD'
            : '// Available for Bachelor Mandate (Spring 2027) @ HEIG-VD'}
        </div>

        {/* Clean Formatted Code Block */}
        <div className="space-y-1 text-slate-800 text-[12px] leading-5">
          <div>
            <span className="text-purple-600">const</span>{' '}
            <span className="text-blue-600 font-semibold">engineer</span> = &#123;
          </div>
          <div className="pl-4">
            <span className="text-slate-500">degree:</span>{' '}
            <span className="text-emerald-700">
              {isFrench ? '"BSc Ingénierie des Médias @ HEIG-VD"' : '"BSc Media Engineering @ HEIG-VD"'}
            </span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-500">background:</span>{' '}
            <span className="text-emerald-700">
              {isFrench ? '"Hardware C (9 ans) → Web & UI/UX"' : '"C Hardware (9 yrs) → Web & UI/UX"'}
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
              {isFrench ? '"Mandat 14 semaines (0 CHF / NDA)"' : '"14-Week Capstone (CHF 0 / NDA)"'}
            </span>
          </div>
          <div>&#125;;</div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperHeroCard;
