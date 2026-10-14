import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
  email?: string;
  className?: string;
  showIcon?: boolean;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email = 'sbstevebenjamin@gmail.com',
  className = '',
  showIcon = true,
}) => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={isFrench ? 'Cliquer pour copier l\'e-mail' : 'Click to copy email'}
      className={`inline-flex items-center space-x-1.5 transition-colors cursor-pointer select-none font-mono ${className}`}
    >
      {showIcon && (
        copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 transition-transform scale-110" />
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
        )
      )}
      <span className={copied ? 'text-emerald-700 font-semibold' : ''}>
        {copied ? (isFrench ? 'Copié !' : 'Copied!') : email}
      </span>
    </button>
  );
};

export default CopyEmailButton;
