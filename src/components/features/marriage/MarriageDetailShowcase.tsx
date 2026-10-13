import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileSpreadsheet,
  Check,
  RotateCcw,
  Send,
} from 'lucide-react';

interface GuestRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  attending: boolean;
  adults: number;
  children: number;
  dietary: string;
  dinnerGuest: boolean;
  dinnerAttending?: boolean;
}

const INITIAL_RECORDS: GuestRecord[] = [
  {
    id: 'row-1',
    timestamp: '14:22',
    name: 'Julien Mercier',
    email: 'j.mercier@bluewin.ch',
    attending: true,
    adults: 2,
    children: 1,
    dietary: 'Sans gluten (1)',
    dinnerGuest: true,
    dinnerAttending: true,
  },
  {
    id: 'row-2',
    timestamp: '11:05',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@gmail.com',
    attending: true,
    adults: 2,
    children: 0,
    dietary: 'Végétarien (2)',
    dinnerGuest: false,
  },
  {
    id: 'row-3',
    timestamp: '09:41',
    name: 'Alexandre Rochat',
    email: 'a.rochat@sunrise.ch',
    attending: false,
    adults: 1,
    children: 0,
    dietary: 'Standard',
    dinnerGuest: false,
  },
];

export const MarriageDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Form Simulator State
  const [guestName, setGuestName] = useState('Claire Vionnet');
  const [guestEmail, setGuestEmail] = useState('claire.vionnet@unifr.ch');
  const [isAttending, setIsAttending] = useState(true);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [dietaryType, setDietaryType] = useState('Végétarien');
  const [hasMagicLink, setHasMagicLink] = useState(true);
  const [dinnerAttending, setDinnerAttending] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  // Simulated Persistent LocalStorage Session (wedding_user_data)
  const [savedSession, setSavedSession] = useState<{
    savedAt: string;
    name: string;
    email: string;
    adults: number;
    children: number;
    dietary: string;
    isDinner: boolean;
  }>({
    savedAt: '14:25',
    name: 'Claire Vionnet',
    email: 'claire.vionnet@unifr.ch',
    adults: 2,
    children: 0,
    dietary: 'Végétarien',
    isDinner: true,
  });

  const [records, setRecords] = useState<GuestRecord[]>(INITIAL_RECORDS);

  const translateDietary = (d: string) => {
    if (d.includes('gluten')) return isFrench ? 'Sans gluten (1)' : 'Gluten-free (1)';
    if (d.includes('gétarien') || d.includes('getarian')) return isFrench ? 'Végétarien (2)' : 'Vegetarian (2)';
    if (d.includes('lactose')) return isFrench ? 'Sans lactose' : 'Lactose-free';
    if (d === 'Vegan') return 'Vegan';
    if (d === 'Standard' || d === 'Menu Standard' || d === 'Standard Menu') {
      return isFrench ? 'Menu standard' : 'Standard menu';
    }
    return d;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newRecord: GuestRecord = {
        id: `row-${Date.now()}`,
        timestamp: timeStr,
        name: guestName.trim() || (isFrench ? 'Invité' : 'Guest'),
        email: guestEmail.trim() || 'invite@exemple.ch',
        attending: isAttending,
        adults: isAttending ? adultCount : 0,
        children: isAttending ? childCount : 0,
        dietary: isAttending ? dietaryType : '—',
        dinnerGuest: hasMagicLink,
        dinnerAttending: hasMagicLink && isAttending ? dinnerAttending : undefined,
      };

      setRecords([newRecord, ...records]);
      setIsSubmitting(false);

      setSavedSession({
        savedAt: timeStr,
        name: newRecord.name,
        email: newRecord.email,
        adults: newRecord.adults,
        children: newRecord.children,
        dietary: newRecord.dietary,
        isDinner: Boolean(newRecord.dinnerAttending),
      });

      setSubmittedNotice(
        isFrench
          ? 'Réponse synchronisée avec succès vers le tableur via Google Apps Script (200 OK).'
          : 'RSVP committed and synced to spreadsheet via Google Apps Script (200 OK).'
      );

      setTimeout(() => setSubmittedNotice(null), 4000);
    }, 350);
  };

  const handleReset = () => {
    setRecords(INITIAL_RECORDS);
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* MODULE 1: AUTHENTIC WEDDING RSVP INTERFACE */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {isFrench ? 'Module 01 // Interface Invité' : 'Module 01 // Guest Interface'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
            {isFrench ? 'Moteur de RSVP & Contrôle Magic Link' : 'RSVP Engine & Magic Link Control'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'Interface invité minimaliste : gestion des présences, répartition des adultes et enfants, régimes alimentaires et déverrouillage conditionnel du dîner sans création de compte.'
              : 'Minimalist guest interface: attendance intake, adults and children headcount split, dietary preferences, and URL-based conditional dinner access without account creation friction.'}
          </p>
        </div>

        {/* Two-Column Wedding Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Authentic Wedding Card Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            {/* Wedding Stationery Card Header */}
            <div className="text-center space-y-1 pb-4 border-b border-stone-200/80">
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                {isFrench ? 'Invitation Personnelle' : 'Personal Invitation'}
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-800 font-normal">
                {isFrench ? 'Célébration & Réception' : 'Celebration & Reception'}
              </h3>
              <p className="text-xs font-sans text-stone-600">
                {isFrench
                  ? 'Veuillez confirmer votre présence avant le délai imparti'
                  : 'Please confirm your attendance before the deadline'}
              </p>
            </div>

            {/* Magic Link Simulator Switch */}
            <div className="bg-white border border-stone-200 p-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-mono text-[11px] text-stone-700 font-semibold block">
                  {isFrench ? 'Paramètre d\'accès URL (Magic Link)' : 'URL Access Parameter (Magic Link)'}
                </span>
                <span className="font-mono text-[10px] text-stone-500">
                  {hasMagicLink
                    ? (isFrench ? '?invite=dinner (Dîner inclus)' : '?invite=dinner (Dinner access)')
                    : (isFrench ? '?invite=standard (Apéro)' : '?invite=standard (Cocktail reception)')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasMagicLink(!hasMagicLink)}
                className="px-2.5 py-1 text-[11px] font-mono border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
              >
                {hasMagicLink ? (isFrench ? 'Actif' : 'Active') : (isFrench ? 'Inactif' : 'Inactive')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Attendance Toggle */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-stone-700 uppercase tracking-wide block">
                  {isFrench ? 'Présence' : 'Attendance'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAttending(true)}
                    className={`py-2 px-3 text-xs font-mono font-medium border transition-all ${
                      isAttending
                        ? 'bg-[#785942] border-[#785942] text-white shadow-xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-[#785942]/50 hover:text-[#785942]'
                    }`}
                  >
                    {isFrench ? 'Je serai présent(e)' : 'Joyfully Accept'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAttending(false)}
                    className={`py-2 px-3 text-xs font-mono font-medium border transition-all ${
                      !isAttending
                        ? 'bg-[#785942] border-[#785942] text-white shadow-xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-[#785942]/50 hover:text-[#785942]'
                    }`}
                  >
                    {isFrench ? 'Je serai absent(e)' : 'Regretfully Decline'}
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-stone-600">
                    {isFrench ? 'Nom & Prénom' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2 border border-stone-200 rounded-none bg-white focus:outline-none focus:border-stone-800"
                    placeholder="ex. Claire Vionnet"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-stone-600">
                    {isFrench ? 'Courriel' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2 border border-stone-200 rounded-none bg-white focus:outline-none focus:border-stone-800"
                    placeholder="claire@exemple.ch"
                    required
                  />
                </div>
              </div>

              {isAttending && (
                <>
                  {/* Headcount Split */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-white border border-stone-200">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                        <span>{isFrench ? 'Adultes' : 'Adults'}</span>
                        <span className="font-bold text-stone-900">{adultCount}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                        className="w-full accent-stone-800 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                        <span>{isFrench ? 'Enfants (< 12 ans)' : 'Children (< 12)'}</span>
                        <span className="font-bold text-stone-900">{childCount}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                        className="w-full accent-stone-800 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">
                      {isFrench ? 'Régime alimentaire' : 'Dietary Requirements'}
                    </label>
                    <select
                      value={dietaryType}
                      onChange={(e) => setDietaryType(e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 border border-stone-200 rounded-none bg-white focus:outline-none focus:border-stone-800"
                    >
                      <option value="Standard">{isFrench ? 'Menu Standard' : 'Standard Menu'}</option>
                      <option value="Végétarien">{isFrench ? 'Végétarien' : 'Vegetarian'}</option>
                      <option value="Vegan">{isFrench ? 'Vegan' : 'Vegan'}</option>
                      <option value="Sans gluten">{isFrench ? 'Sans gluten' : 'Gluten-free'}</option>
                      <option value="Sans lactose">{isFrench ? 'Sans lactose' : 'Lactose-free'}</option>
                    </select>
                  </div>

                  {/* Conditional Magic Link Dinner Option */}
                  {hasMagicLink && (
                    <div className="p-3 bg-white border border-stone-300 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-stone-800">
                          {isFrench ? 'Option Privée : Participation au Dîner' : 'Private Option: Dinner Attendance'}
                        </span>
                        <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-1.5 py-0.5">
                          Magic Link
                        </span>
                      </div>
                      <div className="flex gap-4 pt-1 text-xs font-mono">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dinner"
                            checked={dinnerAttending}
                            onChange={() => setDinnerAttending(true)}
                            className="accent-stone-800 cursor-pointer"
                          />
                          <span>{isFrench ? 'Oui, je participe' : 'Yes, attending'}</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dinner"
                            checked={!dinnerAttending}
                            onChange={() => setDinnerAttending(false)}
                            className="accent-stone-800 cursor-pointer"
                          />
                          <span>{isFrench ? 'Non' : 'No'}</span>
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#785942] hover:bg-[#684C37] text-white text-xs font-mono transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? (isFrench ? 'Envoi en cours...' : 'Dispatching...')
                    : (isFrench ? 'Confirmer ma réponse' : 'Confirm RSVP')}
                </span>
              </button>
            </form>

            {/* Notification alert */}
            {submittedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{submittedNotice}</span>
              </div>
            )}
          </div>

          {/* Right: Persistent Client Session (LocalStorage Drawer Simulation) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-stone-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="font-serif italic text-lg text-stone-800">
                  {isFrench ? 'Récapitulatif Invité' : 'Guest Summary'}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  LocalStorage: wedding_user_data
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {isFrench
                  ? 'Une fois la réponse validée, la session est sérialisée dans le navigateur de l\'invité. Il peut la consulter à tout moment sans identifiant ni mot de passe.'
                  : 'Upon confirmation, session state is serialized in the guest\'s browser storage. They can review their confirmed status anytime without authentication.'}
              </p>

              {/* Summary Stationery Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 p-4 space-y-2.5 text-xs font-sans">
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-500">{isFrench ? 'Invité principal' : 'Primary Guest'}</span>
                  <span className="font-mono font-semibold text-stone-800">{savedSession.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-500">{isFrench ? 'E-mail' : 'Email'}</span>
                  <span className="font-mono text-stone-700">{savedSession.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-500">{isFrench ? 'Personnes' : 'Headcount'}</span>
                  <span className="font-mono text-stone-800">
                    {savedSession.adults} {isFrench ? 'adulte(s)' : 'adult(s)'}
                    {savedSession.children > 0 ? `, ${savedSession.children} ${isFrench ? 'enfant(s)' : 'child(ren)'}` : ''}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-500">{isFrench ? 'Régime' : 'Dietary'}</span>
                  <span className="text-stone-800">{translateDietary(savedSession.dietary)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">{isFrench ? 'Dîner' : 'Dinner Access'}</span>
                  <span className="font-mono font-semibold text-stone-800">
                    {savedSession.isDinner ? (isFrench ? 'Confirmé' : 'Confirmed') : '—'}
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-stone-500 pt-1">
                {isFrench
                  ? 'Événement émis : window.dispatchEvent(new Event("wedding-data-updated"))'
                  : 'Event dispatched: window.dispatchEvent(new Event("wedding-data-updated"))'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: SPREADSHEET SYNCHRONIZATION & SERVERLESS ARCHITECTURE */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {isFrench ? 'Module 02 // Architecture Serverless' : 'Module 02 // Serverless Architecture'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
            {isFrench ? 'Synchronisation Tableur (Google Apps Script → Excel)' : 'Spreadsheet Synchronization (Google Apps Script → Excel)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'Chaque soumission déclenche une requête POST vers un endpoint Google Apps Script en mode no-cors. Les réponses sont insérées directement dans la feuille de calcul des organisateurs sans base de données SQL coûteuse.'
              : 'Each submission dispatches an asynchronous POST to a Google Apps Script web endpoint in no-cors mode. Responses are atomically appended to the organizers\' spreadsheet with zero managed SQL database overhead.'}
          </p>
        </div>

        {/* Live Spreadsheet View */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header Bar */}
          <div className="bg-slate-900 text-white p-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">{isFrench ? 'FEUILLE_RSVP_2026.xlsx' : 'RSVP_SHEET_2026.xlsx'}</span>
              <span className="text-slate-400 text-[11px]">({records.length} {isFrench ? 'lignes' : 'rows'})</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isFrench ? 'Réinitialiser' : 'Reset'}</span>
              </button>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px]">
                Endpoint: /exec
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Heure' : 'Time'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Invité & E-mail' : 'Guest & Email'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Statut' : 'Status'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Adultes' : 'Adults'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Enfants' : 'Kids'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Régime' : 'Dietary'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Dîner' : 'Dinner'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{rec.timestamp}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {rec.name}
                      <span className="block font-normal text-[10px] text-slate-400">{rec.email}</span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {rec.attending ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          {isFrench ? 'Présent' : 'Accepted'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold">
                          {isFrench ? 'Absent' : 'Declined'}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{rec.adults}</td>
                    <td className="py-2.5 px-3 text-slate-700">{rec.children}</td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{translateDietary(rec.dietary)}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {rec.dinnerGuest ? (
                        rec.dinnerAttending ? (
                          <span className="text-stone-800 font-semibold">{isFrench ? 'Oui' : 'Yes'}</span>
                        ) : (
                          <span className="text-slate-400">{isFrench ? 'Non' : 'No'}</span>
                        )
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Concise Architecture Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          <div className="bg-white border border-slate-200 p-4 space-y-1 shadow-sm">
            <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase block">
              {isFrench ? 'Coût d\'Infrastructure' : 'Infrastructure Cost'}
            </span>
            <div className="text-lg font-bold font-mono text-emerald-600">{isFrench ? '0.00 CHF / mois' : '0.00 CHF / mo'}</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {isFrench
                ? 'Aucune base de données managée payante (RDS/Postgres). Google Apps Script assure le rôle de middleware gratuit et fiable.'
                : 'Zero paid managed databases (RDS/Postgres). Google Apps Script functions as a zero-cost, reliable serverless bridge.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-4 space-y-1 shadow-sm">
            <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase block">
              {isFrench ? 'Accès Organisateurs' : 'Organizer Access'}
            </span>
            <div className="text-lg font-bold font-mono text-slate-800">
              {isFrench ? 'Tableur Direct' : 'Direct Spreadsheet'}
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {isFrench
                ? 'Les organisateurs consultent, trient et transmettent les listes au traiteur directement depuis Excel sans panneau d\'administration complexe.'
                : 'Organizers view, filter, and share attendee manifests with caterers directly in Excel without complex admin tooling.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-4 space-y-1 shadow-sm">
            <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase block">
              {isFrench ? 'Résilience Mobile' : 'Mobile Resilience'}
            </span>
            <div className="text-lg font-bold font-mono text-slate-800">mode: 'no-cors'</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {isFrench
                ? 'Envoi de requêtes asynchrones fiables contournant les blocages CORS sur navigateurs mobiles avec insertion atomique.'
                : 'Reliable asynchronous dispatch bypassing browser CORS hurdles on mobile devices while guaranteeing atomic row inserts.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarriageDetailShowcase;
