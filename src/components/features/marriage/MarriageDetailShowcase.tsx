import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileSpreadsheet,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  Wine,
  Mail,
  Send,
  UserCheck,
  Cookie,
  Lock,
  Sparkles,
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
  aperoContribution: string;
  syncStatus: 'synced' | 'pending';
}

const INITIAL_RECORDS: GuestRecord[] = [
  {
    id: 'row-1',
    timestamp: '14:22:08',
    name: 'Julien Mercier',
    email: 'j.mercier@bluewin.ch',
    attending: true,
    adults: 2,
    children: 1,
    dietary: 'Sans gluten (1)',
    dinnerGuest: true,
    dinnerAttending: true,
    aperoContribution: 'Mini-croissants apéritifs',
    syncStatus: 'synced',
  },
  {
    id: 'row-2',
    timestamp: '11:05:42',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@gmail.com',
    attending: true,
    adults: 2,
    children: 0,
    dietary: 'Végétarien (2)',
    dinnerGuest: false,
    aperoContribution: 'Brochettes melon / jambon cru',
    syncStatus: 'synced',
  },
  {
    id: 'row-3',
    timestamp: '09:41:19',
    name: 'Alexandre Rochat',
    email: 'a.rochat@sunrise.ch',
    attending: false,
    adults: 1,
    children: 0,
    dietary: 'Aucun',
    dinnerGuest: false,
    aperoContribution: '—',
    syncStatus: 'synced',
  },
  {
    id: 'row-4',
    timestamp: 'Hier',
    name: 'Élodie & Thomas Favre',
    email: 'famille.favre@bluemail.ch',
    attending: true,
    adults: 2,
    children: 2,
    dietary: 'Aucun',
    dinnerGuest: true,
    dinnerAttending: true,
    aperoContribution: 'Tartelettes citron meringuées',
    syncStatus: 'synced',
  },
];

const APERO_QUOTAS = [
  { id: 'croissants', name: 'Mini-croissants apéritifs', max: 2, current: 1, category: 'Salé' },
  { id: 'wraps', name: 'Wraps saumon & aneth', max: 1, current: 1, category: 'Salé' },
  { id: 'blinis', name: 'Blinis & tartinades artisanales', max: 2, current: 0, category: 'Salé' },
  { id: 'brochettes', name: 'Brochettes melon / mozzarella', max: 1, current: 1, category: 'Salé' },
  { id: 'brownies', name: 'Bouchées Brownies chocolat', max: 1, current: 0, category: 'Sucré' },
  { id: 'tartes', name: 'Tartelettes citron meringuées', max: 1, current: 1, category: 'Sucré' },
];

export const MarriageDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // 1. Simulation Form State
  const [guestName, setGuestName] = useState('Claire Vionnet');
  const [guestEmail, setGuestEmail] = useState('claire.vionnet@unifr.ch');
  const [isAttending, setIsAttending] = useState(true);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [dietaryType, setDietaryType] = useState('Végétarien');
  const [magicLinkActive, setMagicLinkActive] = useState(true);
  const [dinnerConfirmed, setDinnerConfirmed] = useState(true);
  const [selectedApero, setSelectedApero] = useState('blinis');

  // 2. Excel Live Table State
  const [records, setRecords] = useState<GuestRecord[]>(INITIAL_RECORDS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSubmissionNotice, setLastSubmissionNotice] = useState<string | null>(null);

  // 3. Persistent Client Session (Simulating LocalStorage wedding_user_data)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clientSession, setClientSession] = useState<{
    savedAt: string;
    name: string;
    email: string;
    adults: number;
    children: number;
    dietary: string;
    apero: string;
    isDinner: boolean;
  }>({
    savedAt: 'Session active',
    name: 'Claire Vionnet',
    email: 'claire.vionnet@unifr.ch',
    adults: 2,
    children: 0,
    dietary: 'Végétarien',
    apero: 'Blinis & tartinades artisanales',
    isDinner: true,
  });

  // Calculate stats
  const totalAttending = records.filter((r) => r.attending);
  const totalAdults = totalAttending.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = totalAttending.reduce((acc, r) => acc + r.children, 0);
  const totalApero = records.filter((r) => r.aperoContribution !== '—').length;

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    const aperoItem = APERO_QUOTAS.find((q) => q.id === selectedApero);
    const chosenAperoName = isAttending && aperoItem ? aperoItem.name : '—';

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newRow: GuestRecord = {
        id: `row-${Date.now()}`,
        timestamp: timeStr,
        name: guestName.trim() || 'Invité Anonyme',
        email: guestEmail.trim() || 'invite@exemple.ch',
        attending: isAttending,
        adults: isAttending ? adultCount : 0,
        children: isAttending ? childCount : 0,
        dietary: isAttending ? dietaryType : '—',
        dinnerGuest: magicLinkActive,
        dinnerAttending: magicLinkActive && isAttending ? dinnerConfirmed : undefined,
        aperoContribution: chosenAperoName,
        syncStatus: 'synced',
      };

      setRecords([newRow, ...records]);
      setIsSyncing(false);

      // Update client session
      setClientSession({
        savedAt: `Mis à jour à ${timeStr}`,
        name: newRow.name,
        email: newRow.email,
        adults: newRow.adults,
        children: newRow.children,
        dietary: newRow.dietary,
        apero: newRow.aperoContribution,
        isDinner: Boolean(newRow.dinnerAttending),
      });

      setLastSubmissionNotice(
        isFrench
          ? `Ligne ajoutée avec succès au tableur Excel via Google Apps Script (200 OK)`
          : `Row successfully committed to Excel spreadsheet via Google Apps Script (200 OK)`
      );

      setTimeout(() => setLastSubmissionNotice(null), 4500);
    }, 450);
  };

  const handleResetRecords = () => {
    setRecords(INITIAL_RECORDS);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Overview Context Banner */}
      <div className="border border-stone-200 bg-[#fbf9f5] p-5 sm:p-6 rounded-none space-y-3 font-sans shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-none inline-block" />
            <span className="font-mono text-xs uppercase tracking-wider text-stone-700 font-bold">
              {isFrench ? 'Architecture Serverless & Événementielle' : 'Serverless & Event Architecture'}
            </span>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold bg-white border border-stone-300 text-stone-700">
            {isFrench ? 'Zéro Coût d\'Infrastructure ($0/mois)' : 'Zero Infrastructure Cost ($0/mo)'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          {isFrench
            ? 'Plateforme web sur-mesure développée pour un événement privé de grande envergure. L\'application résout le triple défi de la confidentialité des invités, de la synchronisation instantanée des présences sans base de données SQL coûteuse, et de la persistance de session sans mot de passe pour les convives.'
            : 'Custom web platform engineered for a large-scale private gathering. The system addresses the triple challenge of guest confidentiality, instantaneous RSVP synchronization without costly SQL database overhead, and passwordless client session persistence.'}
        </p>
      </div>

      {/* SECTION 1: INTERACTIVE RSVP & MAGIC LINK SIMULATOR */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFrench ? 'DÉMONSTRATION INTERACTIVE' : 'INTERACTIVE DEMONSTRATION'}
            </span>
            <span className="text-[11px] font-mono text-rose-600 font-semibold bg-rose-50 border border-rose-200 px-2 py-0.5">
              {isFrench ? 'SIMULATEUR TEMPS RÉEL' : 'REAL-TIME SIMULATOR'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
            {isFrench ? '1. Moteur de RSVP Multi-Critères & Magic Link' : '1. Multi-Criteria RSVP Engine & Magic Link'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'Testez le flux de validation d\'un invité en direct : répartition du nombre d\'adultes et d\'enfants, régime alimentaire, sélection de contribution avec quotas stricts et contrôle d\'accès conditionnel par URL.'
              : 'Test the live guest RSVP intake flow: adults & children headcount split, dietary preferences, collaborative dish quota validation, and URL-based conditional access control.'}
          </p>
        </div>

        {/* Live Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-6 shadow-sm space-y-5 font-sans">
            <form onSubmit={handleSimulateSubmit} className="space-y-4">
              {/* Magic Link Bar */}
              <div className="bg-[#fcfaf7] border border-stone-200 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-600 flex items-center gap-1.5 font-medium">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isFrench ? 'Contrôle d\'Accès Magic Link' : 'Magic Link Access Control'}</span>
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[11px] font-mono text-slate-500">
                      {magicLinkActive ? '?invite=dinner (VIP)' : 'Standard'}
                    </span>
                    <input
                      type="checkbox"
                      checked={magicLinkActive}
                      onChange={(e) => setMagicLinkActive(e.target.checked)}
                      className="accent-rose-500 cursor-pointer"
                    />
                  </label>
                </div>
                <div className="text-[11px] font-mono text-slate-500 truncate">
                  https://evenement-prive.ch/rsvp{magicLinkActive ? '?invite=dinner' : ''}
                </div>
              </div>

              {/* Attendance Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700 block">
                  {isFrench ? 'Statut de Présence :' : 'Attendance Status:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAttending(true)}
                    className={`py-2 px-3 text-xs font-mono font-semibold border transition-all ${
                      isAttending
                        ? 'bg-rose-50 border-rose-400 text-rose-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {isFrench ? '✓ Présent(e)' : '✓ Joyfully Accept'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAttending(false)}
                    className={`py-2 px-3 text-xs font-mono font-semibold border transition-all ${
                      !isAttending
                        ? 'bg-stone-100 border-stone-400 text-stone-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {isFrench ? '✕ Absent(e)' : '✕ Regretfully Decline'}
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-600">
                    {isFrench ? 'Nom & Prénom' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-rose-400"
                    placeholder="ex. Claire Vionnet"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-600">
                    {isFrench ? 'Courriel (Vérification)' : 'Email (Verification)'}
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-rose-400"
                    placeholder="claire@exemple.ch"
                    required
                  />
                </div>
              </div>

              {isAttending && (
                <>
                  {/* Headcount Split: Adults vs Children */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50/70 border border-stone-200/80">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-700 flex items-center justify-between">
                        <span>{isFrench ? 'Adultes' : 'Adults'}</span>
                        <span className="font-bold text-rose-700">{adultCount}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-700 flex items-center justify-between">
                        <span>{isFrench ? 'Enfants (< 12 ans)' : 'Children (< 12)'}</span>
                        <span className="font-bold text-rose-700">{childCount}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-600">
                      {isFrench ? 'Régime / Allergies' : 'Dietary Requirements'}
                    </label>
                    <select
                      value={dietaryType}
                      onChange={(e) => setDietaryType(e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-rose-400"
                    >
                      <option value="Aucun">{isFrench ? 'Aucun (Standard)' : 'None (Standard)'}</option>
                      <option value="Végétarien">{isFrench ? 'Végétarien' : 'Vegetarian'}</option>
                      <option value="Vegan">{isFrench ? 'Vegan' : 'Vegan'}</option>
                      <option value="Sans gluten">{isFrench ? 'Sans gluten' : 'Gluten-free'}</option>
                      <option value="Sans lactose">{isFrench ? 'Sans lactose' : 'Lactose-free'}</option>
                    </select>
                  </div>

                  {/* Conditional Magic Link VIP Dinner Section */}
                  {magicLinkActive && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/90 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-amber-900 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isFrench ? 'Option Privée : Souper des Invités' : 'Private Option: Dinner Guest'}</span>
                        </span>
                        <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5">VIP</span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {isFrench
                          ? 'Ce champ est visible uniquement grâce au paramètre ?invite=dinner dans l\'URL de l\'invitation.'
                          : 'This section is exclusively unlocked via the ?invite=dinner URL token in the guest link.'}
                      </p>
                      <div className="flex gap-4 pt-1 text-xs font-mono">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dinner"
                            checked={dinnerConfirmed}
                            onChange={() => setDinnerConfirmed(true)}
                            className="accent-amber-600 cursor-pointer"
                          />
                          <span>{isFrench ? 'Oui, je participe' : 'Yes, attending'}</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dinner"
                            checked={!dinnerConfirmed}
                            onChange={() => setDinnerConfirmed(false)}
                            className="accent-amber-600 cursor-pointer"
                          />
                          <span>{isFrench ? 'Non' : 'No'}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Collaborative Apéro Quota Picker */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-700 flex items-center gap-1">
                        <Wine className="w-3.5 h-3.5 text-rose-500" />
                        <span>{isFrench ? 'Contribution Apéro (Quotas en Direct) :' : 'Apéro Contribution (Live Quotas):'}</span>
                      </span>
                    </div>
                    <select
                      value={selectedApero}
                      onChange={(e) => setSelectedApero(e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-rose-400"
                    >
                      {APERO_QUOTAS.map((item) => {
                        const isFull = item.current >= item.max;
                        return (
                          <option key={item.id} value={item.id} disabled={isFull}>
                            {item.category}: {item.name} [{item.current}/{item.max} réservés]
                            {isFull ? ' (COMPLET)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </>
              )}

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isSyncing}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{isFrench ? 'Envoi vers le Webhook...' : 'Dispatching to Webhook...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isFrench ? 'Confirmer la Réponse & Synchroniser' : 'Confirm RSVP & Trigger Sync'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Notification alert */}
            {lastSubmissionNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center space-x-2 animate-in fade-in duration-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{lastSubmissionNotice}</span>
              </div>
            )}
          </div>

          {/* Right: Technical Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#fcfaf7] border border-stone-200 p-5 space-y-3 font-sans">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
                {isFrench ? 'Mécanique du Formulaire' : 'Intake Mechanism'}
              </span>
              <h3 className="text-base font-bold text-stone-800">
                {isFrench ? 'Zéro Friction & Contrôle Déterministe' : 'Zero Friction & Deterministic Routing'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isFrench
                  ? 'Pour un événement privé, forcer les invités à créer un compte utilisateur génère un taux d\'abandon massif. L\'architecture s\'appuie sur un flux d\'URL personnalisées : le paramètre URL sécurisé active les modules conditionnels sans authentification lourde.'
                  : 'For a private event, requiring guests to create accounts creates massive abandonment. The platform leverages personalized query tokens: query parameters conditionally mount private sections with zero credential overhead.'}
              </p>
              <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold font-mono">01.</span>
                  <span className="text-stone-700">
                    <strong>{isFrench ? 'Plafonds stricts' : 'Strict Quotas'} :</strong>{' '}
                    {isFrench
                      ? 'Évite que 10 invités n\'apportent le même dessert via une lecture dynamique des places disponibles.'
                      : 'Prevents multiple guests from bringing duplicate dishes via dynamic quota telemetry.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold font-mono">02.</span>
                  <span className="text-stone-700">
                    <strong>{isFrench ? 'Calcul des jauges' : 'Headcount Breakdown'} :</strong>{' '}
                    {isFrench
                      ? 'Distingue immédiatement les adultes des enfants pour adapter la logistique traiteur.'
                      : 'Instantly segregates adult catering counts from children menus for caterer logistics.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bg-white border border-slate-200 p-4 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                {isFrench ? 'Télémétrie en Direct de la Session' : 'Live Session Telemetry'}
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-stone-50 border border-stone-200">
                  <span className="text-lg font-bold font-mono text-slate-800">{totalAdults}</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {isFrench ? 'Adultes' : 'Adults'}
                  </span>
                </div>
                <div className="p-2 bg-stone-50 border border-stone-200">
                  <span className="text-lg font-bold font-mono text-slate-800">{totalChildren}</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {isFrench ? 'Enfants' : 'Children'}
                  </span>
                </div>
                <div className="p-2 bg-stone-50 border border-stone-200">
                  <span className="text-lg font-bold font-mono text-rose-700">{totalApero}</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {isFrench ? 'Plats Apéro' : 'Dishes'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE EXCEL / GOOGLE SHEETS SYNCHRONIZATION INSPECTOR */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFrench ? 'BASE DE DONNÉES TEMPS RÉEL' : 'REAL-TIME DATABASE'}
            </span>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isFrench ? 'WEBHOOK EXCEL CONNECTÉ' : 'EXCEL WEBHOOK CONNECTED'}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
            {isFrench
              ? '2. Synchronisation Bidirectionnelle Excel / Tableur'
              : '2. Two-Way Excel / Spreadsheet Synchronization'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'Le pont serverless repose sur un Google Apps Script déployé en API Web. Il reçoit les requêtes POST, valide l\'intégrité des données et insère immédiatement les lignes dans le tableur Excel / Sheets servant de base relationnelle pour les organisateurs.'
              : 'The serverless pipeline relies on a Google Apps Script deployed as a Web API. It ingests POST requests, validates schemas, and atomically appends rows into the Excel / Sheets spreadsheet acting as the organizer dashboard.'}
          </p>
        </div>

        {/* Live Table Component */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header Bar */}
          <div className="bg-slate-900 text-white p-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">FEUILLE_RSVP_LIVE_2026.xlsx</span>
              <span className="text-slate-400 text-[11px]">({records.length} entrées actives)</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleResetRecords}
                className="text-[11px] text-slate-400 hover:text-white underline transition-colors"
              >
                {isFrench ? 'Réinitialiser le tableau' : 'Reset Table'}
              </button>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                API: POST /macros/.../exec
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Horodatage' : 'Timestamp'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Invité & E-mail' : 'Guest & Email'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Statut' : 'Status'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Adultes' : 'Adults'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Enfants' : 'Kids'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Régime' : 'Dietary'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Souper VIP' : 'Dinner VIP'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px]">{isFrench ? 'Contribution Apéro' : 'Apéro Dish'}</th>
                  <th className="py-2.5 px-3 uppercase text-[11px] text-right">{isFrench ? 'Webhook' : 'Webhook'}</th>
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
                          {isFrench ? 'PRÉSENT' : 'ACCEPTED'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold">
                          {isFrench ? 'DÉCLINÉ' : 'DECLINED'}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{rec.adults}</td>
                    <td className="py-2.5 px-3 text-slate-700">{rec.children}</td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{rec.dietary}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {rec.dinnerGuest ? (
                        rec.dinnerAttending ? (
                          <span className="text-amber-700 font-bold">✓ {isFrench ? 'Oui' : 'Yes'}</span>
                        ) : (
                          <span className="text-slate-400">✕ {isFrench ? 'Non' : 'No'}</span>
                        )
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{rec.aperoContribution}</td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-mono font-bold">
                        200 OK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Architecture Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          <div className="bg-white border border-slate-200 p-4 space-y-1.5 shadow-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {isFrench ? 'Économie Financière' : 'Financial Efficiency'}
            </span>
            <div className="text-xl font-bold font-mono text-emerald-600">0.00 CHF / mois</div>
            <p className="text-slate-600 leading-relaxed">
              {isFrench
                ? 'Aucune base de données cloud payante (RDS/Postgres) ni serveur VPS à maintenir. Google Apps Script assure le rôle de middleware gratuit et ultra-fiable.'
                : 'Zero costly managed databases (RDS/Postgres) or VPS instances to maintain. Google Apps Script serves as a zero-cost, high-reliability middleware bridge.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-4 space-y-1.5 shadow-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {isFrench ? 'Ergonomie pour les Organisateurs' : 'Organizer UX'}
            </span>
            <div className="text-xl font-bold font-mono text-slate-800">
              {isFrench ? 'Accès Excel Direct' : 'Direct Excel Access'}
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isFrench
                ? 'Les organisateurs peuvent filtrer, trier, imprimer les listes traiteur et exporter les coordonnées directement depuis leur tableur sans aucun outil d\'administration complexe.'
                : 'Organizers can sort, filter, print dietary manifests, and export attendee lists directly in their preferred spreadsheet without needing complex admin portals.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-4 space-y-1.5 shadow-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {isFrench ? 'Résilience Réseau' : 'Network Resilience'}
            </span>
            <div className="text-xl font-bold font-mono text-slate-800">mode: 'no-cors'</div>
            <p className="text-slate-600 leading-relaxed">
              {isFrench
                ? 'Envoi de requêtes asynchrones opaques contournant les restrictions CORS des navigateurs mobiles tout en garantissant l\'insertion atomique de chaque ligne.'
                : 'Asynchronous opaque POST transmissions bypassing browser CORS hurdles on mobile devices while guaranteeing atomic row insertion.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: BROWSER SESSION & FLOATING GUEST DASHBOARD */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFrench ? 'PERSISTANCE CLIENT & COOKIES' : 'CLIENT PERSISTENCE & COOKIES'}
            </span>
            <span className="text-[11px] font-mono text-blue-600 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5">
              wedding_user_data
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
            {isFrench
              ? '3. Persistance de Session Navigateur & Tiroir Invité'
              : '3. Browser Session Persistence & Floating Guest Drawer'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'Après confirmation, l\'état de l\'invité est automatiquement sérialisé dans le stockage local du navigateur. Un bouton flottant latéral permet à l\'invité de retrouver son récapitulatif sans friction à chaque visite ultérieure.'
              : 'Upon confirmation, guest state is serialized into browser LocalStorage. A floating side-panel button enables attendees to inspect and update their confirmed status on subsequent visits without entering credentials.'}
          </p>
        </div>

        {/* Interactive Floating Button Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Interactive Trigger Card */}
          <div className="lg:col-span-6 bg-[#fcfaf7] border border-stone-200 p-6 space-y-4 font-sans">
            <div className="flex items-center space-x-2 text-stone-700">
              <Cookie className="w-4 h-4 text-amber-600" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                {isFrench ? 'Simulateur du Bouton Flottant (UserSummaryButton)' : 'Floating Button Simulator (UserSummaryButton)'}
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isFrench
                ? 'Cliquez ci-dessous pour ouvrir le tiroir récapitulatif tel qu\'il apparaît sur le site de production :'
                : 'Click below to expand the attendee drawer exactly as implemented in production:'}
            </p>

            {/* Simulated Floating Button Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="inline-flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-rose-50 to-white border border-rose-200 shadow-md hover:shadow-lg transition-all text-stone-800 text-xs font-mono group"
              >
                <div className="w-7 h-7 rounded-full bg-white border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm group-hover:bg-rose-50">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">
                    {drawerOpen
                      ? (isFrench ? 'Fermer le Récapitulatif' : 'Close Summary')
                      : (isFrench ? 'Mon Récapitulatif Invité' : 'My Guest Summary')}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {drawerOpen ? 'Cliquez pour rétracter' : 'Cliquez pour ouvrir le tiroir'}
                  </span>
                </div>
              </button>
            </div>

            {/* Storage Key Details */}
            <div className="bg-white border border-stone-200 p-3 text-xs font-mono space-y-1 text-stone-600">
              <div className="text-slate-400 text-[10px] uppercase">
                {isFrench ? 'Clé de stockage local' : 'LocalStorage Key'} :
              </div>
              <div className="text-rose-700 font-bold">localStorage.getItem('wedding_user_data')</div>
              <div className="text-[11px] text-slate-500 pt-1">
                {isFrench
                  ? 'Déclenche un événement "wedding-data-updated" pour synchroniser instantanément l\'interface utilisateur.'
                  : 'Fires custom "wedding-data-updated" event to instantly synchronize reactive components across tabs.'}
              </div>
            </div>
          </div>

          {/* Right: Drawer Preview Window */}
          <div className="lg:col-span-6 bg-white border border-stone-200 shadow-lg p-5 font-sans space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-stone-800 uppercase">
                    {isFrench ? 'Votre Confirmation Invité' : 'Confirmed Registration'}
                  </h4>
                  <span className="text-[10px] font-mono text-stone-400">{clientSession.savedAt}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isFrench ? 'Vérifié dans le tableur' : 'Verified in Sheet'}</span>
              </span>
            </div>

            {/* Session Items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">{isFrench ? 'Convive principal' : 'Primary Attendee'} :</span>
                <span className="font-bold text-stone-800 font-mono">{clientSession.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">{isFrench ? 'Adresse e-mail' : 'Email Address'} :</span>
                <span className="font-mono text-stone-700">{clientSession.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">{isFrench ? 'Personnes prévues' : 'Total Headcount'} :</span>
                <span className="font-bold text-stone-800 font-mono">
                  {clientSession.adults} {isFrench ? 'adulte(s)' : 'adult(s)'}
                  {clientSession.children > 0 ? `, ${clientSession.children} ${isFrench ? 'enfant(s)' : 'child(ren)'}` : ''}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">{isFrench ? 'Régime alimentaire' : 'Dietary Request'} :</span>
                <span className="text-stone-800">{clientSession.dietary}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">{isFrench ? 'Souper privé' : 'Dinner Access'} :</span>
                <span className="font-bold text-amber-700 font-mono">
                  {clientSession.isDinner ? (isFrench ? 'Confirmé ✓' : 'Confirmed ✓') : '—'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-500">{isFrench ? 'Plat apéro réservé' : 'Assigned Apéro Dish'} :</span>
                <span className="text-rose-700 font-medium">{clientSession.apero}</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 leading-relaxed">
              {isFrench
                ? 'Fonctionnalité clé : à l\'ouverture du tiroir, le frontend exécute une requête POST silencieuse avec { type: "verify", email } pour confirmer que l\'invité existe toujours dans la feuille Excel. Si la ligne a été supprimée par un organisateur, la session locale est purgée automatiquement.'
                : 'Key mechanism: upon drawer expansion, the frontend runs a silent verification POST with { type: "verify", email } to validate that the record exists in the backend sheet. If removed by an organizer, local storage is automatically invalidated.'}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TALLY FORMS & EMAILJS COMMUNICATIONS PIPELINE */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFrench ? 'FLUX LOGISTIQUE & COMMUNICATIONS' : 'LOGISTICS & COMMUNICATIONS FLOW'}
            </span>
            <span className="text-[11px] font-mono text-purple-600 font-semibold bg-purple-50 border border-purple-200 px-2 py-0.5">
              Tally & EmailJS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
            {isFrench
              ? '4. Intégration Formulaires (Tally) & Accusés de Réception EmailJS'
              : '4. Form Engine (Tally) & EmailJS Confirmation Workflows'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {isFrench
              ? 'L\'écosystème combine des formulaires d\'admission flexibles (compatibles Tally) et un service transactionnel automatisé d\'e-mails bilingues délivrant des accusés de réception personnalisés avec instructions de paiement pour la liste de cadeaux.'
              : 'The ecosystem combines versatile intake forms (Tally-compatible endpoints) and an automated bilingual transactional email engine delivering personalized confirmation receipts with payment instructions for the gift registry.'}
          </p>
        </div>

        {/* 3-Step Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {isFrench ? 'Formulaires & Tally Embed' : 'Forms & Tally Intake'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFrench
                ? 'Intégration de formulaires modulaires (Tally / formulaires React sur-mesure) pour les besoins annexes (sondages musicaux, hébergements, régimes complexes) sans coder de nouveau backend.'
                : 'Integration of modular forms (Tally embed / custom React forms) for satellite requirements (music requests, lodging, dietary nuances) without provisioning backend code.'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-purple-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Intégration sans friction' : 'Frictionless Embed'}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {isFrench ? 'Médiation Webhook Google Apps Script' : 'Google Apps Script Middleware'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFrench
                ? 'Traitement serveur serverless : validation des schémas d\'entrée, gestion de la concurrence sur les lignes Excel et renvoi du dictionnaire de quotas restants en JSON.'
                : 'Serverless execution: payload validation, concurrency management across Excel rows, and JSON dispatch of remaining dish quota states.'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Persistance Excel atomique' : 'Atomic Excel Commit'}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {isFrench ? 'EmailJS : Accusés Bilingues' : 'EmailJS: Bilingual Dispatch'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFrench
                ? 'Génération d\'e-mails transactionnels HTML en temps réel (FR/EN) avec récapitulatif complet de présence, alertes pour les plats d\'apéro et coordonnées bancaires (IBAN/Twint) pour les contributions.'
                : 'Real-time HTML transactional email dispatch (FR/EN) with complete headcount summaries, apero drop-off instructions, and IBAN/Twint details for registry pledges.'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-rose-700">
              <Mail className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Délivrabilité 100% garantie' : '100% Guaranteed Inbox Delivery'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarriageDetailShowcase;
