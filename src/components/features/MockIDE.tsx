import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import type { MockIDEProps } from '../../types';

export const MockIDE: React.FC<MockIDEProps> = ({ filename, code, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code to clipboard', err);
    }
  };

  return (
    <div
      className={`rounded-none overflow-hidden border border-slate-800 bg-slate-900 shadow-xl transition-all ${className}`}
    >
      {/* FinTech Code Terminal Header */}
      <div className="relative bg-slate-900/95 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
        {/* Filename and Code Tag */}
        <div className="flex items-center space-x-2 text-slate-300 font-mono text-xs font-medium tracking-wide">
          <Terminal className="w-3.5 h-3.5 text-electric" />
          <span className="text-slate-200">{filename}</span>
          <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.2 bg-slate-800 border border-slate-700 rounded-none">
            SOURCE
          </span>
        </div>

        {/* Copy to Clipboard Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-none text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex items-center space-x-1.5 text-xs font-mono border border-slate-800 hover:border-slate-700"
            title={copied ? 'Copied to clipboard' : 'Copy code'}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 transition-transform scale-110" />
                <span className="text-[11px] text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] text-slate-400 hover:text-slate-200 hidden sm:inline">
                  Copy
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="bg-slate-900 text-slate-300 font-mono text-xs sm:text-sm p-4 overflow-x-auto leading-relaxed">
        <pre className="m-0 font-mono">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default MockIDE;
