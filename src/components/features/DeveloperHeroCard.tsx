import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DeveloperHeroCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');
  const [copied, setCopied] = useState(false);
  const [swissTime, setSwissTime] = useState('');

  // Update Swiss local time in real-time
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setSwissTime(timeStr);
      } catch {
        const now = new Date();
        setSwissTime(now.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sbstevebenjamin@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5 rounded-none font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50/70 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
          </div>
          <span className="text-[11px] font-semibold text-slate-600 pl-2 flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-electric" />
            <span>developer.config.ts</span>
          </span>
        </div>

        {/* Live Swiss Time */}
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 tabular-nums">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CH: {swissTime || '--:--:--'}</span>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 space-y-4 bg-white text-slate-700 leading-relaxed overflow-x-auto">
        {/* Availability Banner */}
        <div className="flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-200/60 text-electric">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-none bg-electric inline-block" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">
              {isFrench
                ? 'Disponible pour Mandat Bachelor (Printemps 2027)'
                : 'Available for Bachelor Mandate (Spring 2027)'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">HEIG-VD</span>
        </div>

        {/* Formatted Code Block */}
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

      {/* Terminal Footer Quick Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-600">
        <button
          onClick={handleCopyEmail}
          type="button"
          className="inline-flex items-center space-x-1.5 hover:text-electric transition-colors"
          title="Copy email to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">
                {isFrench ? 'Copié !' : 'Copied!'}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>sbstevebenjamin@gmail.com</span>
            </>
          )}
        </button>

        <a
          href="#bachelor-pitch"
          className="inline-flex items-center space-x-1 text-slate-500 hover:text-electric transition-colors"
        >
          <span>{isFrench ? 'Voir le pitch' : 'View pitch'}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default DeveloperHeroCard;
