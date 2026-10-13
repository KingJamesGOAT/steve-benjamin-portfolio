import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const MarriageWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState<number>(2);

  return (
    <div className="bg-[#FAF8F5] border border-stone-200/90 p-4 space-y-3.5 text-xs font-sans rounded-none select-none transition-all">
      {/* Wedding Stationery Card Header */}
      <div className="border-b border-stone-200/80 pb-2.5">
        <div className="font-serif italic font-medium text-stone-900 text-sm sm:text-base tracking-wide">
          R.S.V.P. · {isFrench ? 'Célébration & Réception' : 'Celebration & Reception'}
        </div>
        <div className="text-[11px] font-sans text-stone-500 pt-0.5">
          {isFrench
            ? 'Veuillez confirmer votre présence et le nombre de convives'
            : 'Please confirm your attendance and number of guests'}
        </div>
      </div>

      {/* Accept or Decline Toggle */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
          {isFrench ? 'Réponse' : 'Response'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsAttending(true)}
            className={`py-2 px-3 text-xs font-mono transition-all text-center border ${
              isAttending
                ? 'bg-[#785942] border-[#785942] text-white font-semibold shadow-xs'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#785942]/50 hover:text-[#785942]'
            }`}
          >
            {isFrench ? 'Je serai présent(e)' : 'Joyfully Accept'}
          </button>
          <button
            type="button"
            onClick={() => setIsAttending(false)}
            className={`py-2 px-3 text-xs font-mono transition-all text-center border ${
              !isAttending
                ? 'bg-[#785942] border-[#785942] text-white font-semibold shadow-xs'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#785942]/50 hover:text-[#785942]'
            }`}
          >
            {isFrench ? 'Je serai absent(e)' : 'Regretfully Decline'}
          </button>
        </div>
      </div>

      {/* Choice of Guests (when attending) */}
      {isAttending ? (
        <div className="space-y-1.5 pt-2 border-t border-stone-200/70">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              {isFrench ? 'Nombre de convives' : 'Number of Guests'}
            </label>
            <span className="text-[11px] font-mono text-[#6B4E3A] font-medium">
              {guestCount > 1
                ? (isFrench ? `${guestCount} personnes attendues` : `${guestCount} guests attending`)
                : (isFrench ? '1 personne attendue' : '1 guest attending')}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setGuestCount(count)}
                className={`py-1.5 text-xs font-mono border transition-all text-center ${
                  guestCount === count
                    ? 'bg-[#785942] text-white border-[#785942] font-bold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-[#785942]/50 hover:text-[#785942]'
                }`}
              >
                {count === 4 ? '4+' : count}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-2 border-t border-stone-200/70 text-[11px] font-sans text-stone-500 italic py-0.5">
          {isFrench
            ? 'Votre message d\'absence est bien pris en compte pour l\'organisation.'
            : 'Your absence has been recorded with sincere regrets.'}
        </div>
      )}
    </div>
  );
};

export default MarriageWidgetSim;
