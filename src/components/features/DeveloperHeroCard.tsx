import React from 'react';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DeveloperHeroCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  return (
    <div className="w-full max-w-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5 rounded-none font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50/70 select-none">
        <div className="flex items-center space-x-2">
          {/* macOS Window Controls: Red, Yellow, Green */}
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          </div>
          <span className="text-[11px] font-semibold text-slate-600 pl-2 flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-electric" />
            <span>developer.config.ts</span>
          </span>
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
            <span className="text-slate-500">name:</span>{' '}
            <span className="text-emerald-700">"Steve Benjamin"</span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-500">degree:</span>{' '}
            <span className="text-emerald-700">"BSc Media Engineering @ HEIG-VD"</span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-500">background:</span>{' '}
            <span className="text-emerald-700">"C Hardware (9 yrs) &rarr; Web & UI/UX"</span>,
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
            <span className="text-emerald-700">"14-Week Capstone (CHF 0 / NDA)"</span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-500">location:</span>{' '}
            <span className="text-emerald-700">"Bussigny / Vaud, Switzerland"</span>
          </div>
          <div>&#125;;</div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperHeroCard;
