import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet } from 'lucide-react';

export const MarriageWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [hasDinner, setHasDinner] = useState<boolean>(true);
  const [syncFeedback, setSyncFeedback] = useState<boolean>(false);

  const triggerSyncFeedback = () => {
    setSyncFeedback(true);
    setTimeout(() => setSyncFeedback(false), 1200);
  };

  const handleToggleAttendance = (attending: boolean) => {
    setIsAttending(attending);
    triggerSyncFeedback();
  };

  const handleSelectCount = (count: number) => {
    setGuestCount(count);
    triggerSyncFeedback();
  };

  const handleToggleDinner = () => {
    setHasDinner((prev) => !prev);
    triggerSyncFeedback();
  };

  return (
    <div className="bg-[#FAF8F5] border border-stone-200 p-3.5 space-y-2.5 text-xs font-sans rounded-none select-none transition-all">
      {/* Wedding Stationery Card Top Bar */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 text-stone-700">
        <span className="font-serif italic font-medium text-stone-900 text-[13px] tracking-wide">
          R.S.V.P. · {isFrench ? 'Célébration & Réception' : 'Celebration & Reception'}
        </span>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 border ${
            isAttending
              ? 'text-rose-900 bg-rose-50/70 border-rose-200'
              : 'text-stone-500 bg-stone-100 border-stone-200'
          }`}
        >
          {isAttending
            ? (isFrench ? 'Présence confirmée' : 'Attendance confirmed')
            : (isFrench ? 'Décliné avec regrets' : 'Regretfully declined')}
        </span>
      </div>

      {/* Interactive Controls Grid */}
      <div className="space-y-2 pt-0.5">
        {/* Row 1: Attendance Switch */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-stone-600">
            {isFrench ? 'Statut :' : 'Status:'}
          </span>
          <div className="grid grid-cols-2 gap-1.5 flex-1 max-w-[210px]">
            <button
              type="button"
              onClick={() => handleToggleAttendance(true)}
              className={`py-1 px-2 text-[11px] font-mono border transition-all text-center ${
                isAttending
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {isFrench ? '✓ Présent(e)' : '✓ Accept'}
            </button>
            <button
              type="button"
              onClick={() => handleToggleAttendance(false)}
              className={`py-1 px-2 text-[11px] font-mono border transition-all text-center ${
                !isAttending
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {isFrench ? '✕ Absent(e)' : '✕ Decline'}
            </button>
          </div>
        </div>

        {/* Row 2 & 3: Active Details when Attending */}
        {isAttending ? (
          <div className="space-y-1.5 pt-1 border-t border-stone-200/60">
            {/* Headcount Selector */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-stone-600">
                {isFrench ? 'Convives :' : 'Guests:'}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleSelectCount(count)}
                    className={`w-6 h-6 text-[10px] font-mono border transition-colors ${
                      guestCount === count
                        ? 'bg-stone-900 text-white border-stone-900 font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {count}
                  </button>
                ))}
                <span className="text-[10px] font-mono text-stone-500 pl-1">
                  {guestCount > 1
                    ? (isFrench ? `${guestCount} personnes` : `${guestCount} attendees`)
                    : (isFrench ? '1 personne' : '1 attendee')}
                </span>
              </div>
            </div>

            {/* Magic Link VIP Dinner Toggle */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <span className="text-[11px] font-mono text-stone-600">
                {isFrench ? 'Magic Link :' : 'Magic Link:'}
              </span>
              <button
                type="button"
                onClick={handleToggleDinner}
                className="text-[10px] font-mono px-2 py-0.5 bg-white border border-stone-300 hover:border-stone-800 text-stone-800 transition-colors flex items-center gap-1.5"
                title={isFrench ? 'Cliquez pour tester l\'option dîner' : 'Click to test dinner option'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  {hasDinner
                    ? (isFrench ? '?invite=dinner (Dîner inclus)' : '?invite=dinner (VIP Dinner)')
                    : (isFrench ? '?invite=standard (Apéro)' : '?invite=standard (Apéro)')}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-1 border-t border-stone-200/60 text-[11px] text-stone-500 italic py-1">
            {isFrench
              ? 'Réponse d\'absence enregistrée dans la feuille Excel des organisateurs.'
              : 'Absence response saved to organizers\' Excel spreadsheet.'}
          </div>
        )}
      </div>

      {/* Live Spreadsheet Sync Telemetry Footer */}
      <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-stone-500">
        <span className="flex items-center gap-1.5 text-stone-700">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">
            {isFrench ? 'Google Sheets' : 'Google Sheets'}
          </span>
          <span className="text-stone-400">→ /exec (200 OK)</span>
        </span>
        <span
          className={`transition-colors font-medium ${
            syncFeedback ? 'text-emerald-600 font-bold' : 'text-stone-400'
          }`}
        >
          {syncFeedback
            ? (isFrench ? '✓ Ligne synchronisée' : '✓ Row synced')
            : (isFrench ? '0€/mois serverless' : '0€/mo serverless')}
        </span>
      </div>
    </div>
  );
};

export default MarriageWidgetSim;
