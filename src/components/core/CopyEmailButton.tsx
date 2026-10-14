import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
  email?: string;
  subject?: string;
  className?: string;
  linkClassName?: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email = 'sbstevebenjamin@gmail.com',
  subject,
  className = '',
  linkClassName = '',
}) => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const mailtoUrl = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <div className={`inline-flex items-center gap-2 font-mono ${className}`}>
      {/* 1. Click to open in default mail app */}
      <a
        href={mailtoUrl}
        className={`hover:text-electric transition-colors ${linkClassName}`}
        title={isFrench ? 'Ouvrir dans l\'application e-mail' : 'Open in mail app'}
      >
        {email}
      </a>

      {/* 2. Direct copy icon button right next to it */}
      <button
        type="button"
        onClick={handleCopy}
        title={isFrench ? 'Copier l\'e-mail' : 'Copy email address'}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-electric transition-colors p-1 -m-1 cursor-pointer select-none"
        aria-label={isFrench ? 'Copier l\'e-mail' : 'Copy email'}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-sans font-semibold animate-in fade-in duration-150">
            <Check className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Copié !' : 'Copied!'}</span>
          </span>
        ) : (
          <Copy className="w-3.5 h-3.5 hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default CopyEmailButton;
