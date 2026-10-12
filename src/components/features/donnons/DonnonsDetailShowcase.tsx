import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const DonnonsDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const baseUrl = import.meta.env.BASE_URL;

  // Quiz interactive state
  const [quizAnswer, setQuizAnswer] = useState<'none' | 'no' | 'yes'>('no');

  // Partner Trophy filter state
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const partnerGrid = [
    { name: 'Rolex', logo: 'rolex.png', award: 'Or 2025', years: 5, category: 'gold' },
    { name: 'Swisscom', logo: 'swisscom.png', award: 'Or 2025', years: 5, category: 'gold' },
    { name: 'UBS', logo: 'ubs.png', award: 'Or 2025', years: 6, category: 'gold' },
    { name: 'EPFL', logo: 'epfl.png', award: 'Argent 2025', years: 4, category: 'silver' },
    { name: 'HEIG-VD', logo: 'heig.png', award: 'Argent 2025', years: 4, category: 'silver' },
    { name: 'Nestlé', logo: 'nestle.png', award: 'Partenaire', years: 5, category: 'partner' },
    { name: 'Migros', logo: 'migros.png', award: 'Partenaire', years: 4, category: 'partner' },
    { name: 'Coop', logo: 'coop.png', award: 'Partenaire', years: 5, category: 'partner' },
  ];

  const filteredPartners = partnerGrid.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="space-y-16">
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: THE GAMIFIED COSMIC QUIZ (/quizz / QuizzCobrand.vue)    */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
            <span>{isFrench ? 'Module 01 // Expérience Utilisateur' : 'Module 01 // User Experience'}</span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-300">
              {isFrench ? 'QUIZ D\'ÉLIGIBILITÉ SPATIAL' : 'COSMIC ELIGIBILITY QUIZ'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Démystification Médicale par la Gamification' : 'Medical De-stigmatization via Gamification'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Conçu pour remplacer les questionnaires papier austères par un voyage narratif dans l\'espace avec Roby la mascotte. Chaque critère d\'exclusion médicale est expliqué de manière bienveillante sans culpabilisation.'
              : 'Engineered to replace dry paper screening forms with an interactive narrative cosmic journey. Every medical deferral condition is explained with supportive clarity without donor frustration.'}
          </p>
        </div>

        {/* Playable Cosmic Quiz Screen */}
        <div className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-[#241838] text-white p-6 sm:p-10 relative overflow-hidden">
          {/* Real Background Image from sixieme_sens-main */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <img
              src={`${baseUrl}images/donnons/quiz/00_bkg/background_space.png`}
              alt="Space background"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Question Card */}
            <div className="lg:col-span-7 bg-[#2E2045] border-2 border-black p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] space-y-5">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-purple-800/80 pb-2">
                <span className="px-2 py-0.5 bg-purple-950 border border-purple-700 text-purple-200 font-bold">
                  QUESTION 06 / 12
                </span>
                <span className="text-purple-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isFrench ? 'Critère de sécurité HUG' : 'HUG safety protocol'}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white leading-snug">
                  {isFrench
                    ? 'As-tu été piqué par une tique dans les 4 dernières semaines ?'
                    : 'Have you been bitten by a tick in the last 4 weeks?'}
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed font-sans">
                  {isFrench
                    ? 'Ce critère prévient la transmission potentielle de bactéries ou virus transmissibles par les tiques.'
                    : 'This safety criteria prevents potential transmission of tick-borne bacteria or viruses.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setQuizAnswer('no')}
                  className={`px-4 py-2.5 border-2 font-bold transition-all flex items-center space-x-2 ${
                    quizAnswer === 'no'
                      ? 'bg-emerald-400 text-black border-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-[#1D132D] text-purple-200 border-purple-700 hover:border-purple-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isFrench ? 'Non, aucune piqûre' : 'No, no bites'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuizAnswer('yes')}
                  className={`px-4 py-2.5 border-2 font-bold transition-all flex items-center space-x-2 ${
                    quizAnswer === 'yes'
                      ? 'bg-amber-400 text-black border-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-[#1D132D] text-purple-200 border-purple-700 hover:border-purple-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{isFrench ? 'Oui, récemment' : 'Yes, recently'}</span>
                </button>
              </div>

              {/* Dynamic Feedback Card */}
              <div className="pt-2">
                {quizAnswer === 'no' ? (
                  <div className="p-3.5 bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200 text-xs flex items-start space-x-3">
                    <img
                      src={`${baseUrl}images/donnons/quiz/06_tick/tick_no.png`}
                      alt="Tick No"
                      className="w-8 h-8 object-contain shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <span className="font-bold text-emerald-300 block text-sm font-mono">
                        {isFrench ? 'La tique a raté sa cible, zéro souci !' : 'Target missed, all clear!'}
                      </span>
                      <p className="text-[11px] text-emerald-200/90 pt-0.5 font-sans leading-relaxed">
                        {isFrench
                          ? 'Tu es pleinement éligible pour donner ton sang lors de la prochaine collecte en entreprise.'
                          : 'You are fully eligible to donate blood at the upcoming corporate mobile drive.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-950/90 border-2 border-amber-500 text-amber-200 text-xs flex items-start space-x-3">
                    <img
                      src={`${baseUrl}images/donnons/quiz/06_tick/tick_yes.png`}
                      alt="Tick Yes"
                      className="w-8 h-8 object-contain shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <span className="font-bold text-amber-300 block text-sm font-mono">
                        {isFrench ? 'Délai de précaution de 4 semaines' : '4-week precaution buffer'}
                      </span>
                      <p className="text-[11px] text-amber-200/90 pt-0.5 font-sans leading-relaxed">
                        {isFrench
                          ? 'Simple report temporaire par précaution. Tu pourras participer dès la fin de ce délai sans aucune démarche compliquée !'
                          : 'Simple temporary deferral for peace of mind. You will be able to donate as soon as this period elapses!'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Real Roby Mascot & Parachute Asset from sixieme_sens-main */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 space-y-4">
              <div className="relative">
                <img
                  src={`${baseUrl}images/donnons/dono_smiling.png`}
                  alt="Roby"
                  className="w-36 sm:w-44 h-auto object-contain drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Neo-brutalist Speech Bubble */}
              <div className="bg-[#1a81e7] text-white p-3.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] max-w-xs text-center font-mono text-xs font-bold leading-snug">
                {isFrench
                  ? 'Salut ! Je suis Roby. Ensemble, on vérifie ton éligibilité en toute bienveillance.'
                  : 'Hey! I am Roby. Together, we check your blood donation eligibility smoothly.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: HUG ADMIN DASHBOARD (DashboardAdmin.vue)               */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            <span>{isFrench ? 'Module 02 // Espace Professionnel' : 'Module 02 // Administration Portal'}</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300">
              {isFrench ? 'SUPERVISION DES COLLECTES HUG' : 'HUG DRIVES SUPERVISION'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Tableau de Bord & Gestion des Collectes' : 'Dashboard & Blood Drive Operations'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Portail dédié pour l\'équipe du Centre de Transfusion Sanguine des HUG pour suivre les promesses en temps réel, clore les collectes terminées et synchroniser les plannings OneDoc.'
              : 'Dedicated management portal for Geneva University Hospital transfusion coordinators to track real-time pledges, close completed drives, and dispatch OneDoc slots.'}
          </p>
        </div>

        {/* Real Admin Dashboard UI from DashboardAdmin.vue */}
        <div className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-white text-slate-900 p-6 sm:p-8 space-y-6">
          {/* Warning Banner: Collectes à clore */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#ff9166] border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_#000]">
            <div className="flex items-center space-x-2 font-mono font-bold text-xs sm:text-sm text-slate-950">
              <span className="px-1.5 py-0.5 bg-black text-white text-[10px]">URGENT</span>
              <span>{isFrench ? 'Vous avez 2 collectes mobiles à clore aujourd\'hui.' : 'You have 2 mobile blood drives awaiting closure.'}</span>
            </div>
            <button
              type="button"
              className="bg-black text-white px-3 py-1 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              {isFrench ? 'Traiter tout' : 'Batch process'}
            </button>
          </div>

          {/* Table 1: Collectes à clore */}
          <div className="space-y-2">
            <h4 className="text-base font-bold font-mono text-slate-900">
              {isFrench ? 'Collectes à clore (Fin de mission)' : 'Drives pending closure'}
            </h4>

            <div className="border-2 border-black overflow-x-auto shadow-[3px_3px_0px_0px_#000]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#ffeeab] border-b-2 border-black text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">{isFrench ? 'Entreprise' : 'Company'}</th>
                    <th className="p-3">{isFrench ? 'Dates de collecte' : 'Date Range'}</th>
                    <th className="p-3">{isFrench ? 'Employés inscrits' : 'Registered Staff'}</th>
                    <th className="p-3 text-right">{isFrench ? 'Actions' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-[#fffbf1]">
                  <tr>
                    <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-blue-600 inline-block" />
                      <span>BCGE (Banque Cantonale de Genève)</span>
                    </td>
                    <td className="p-3 text-slate-700">02.07.2026</td>
                    <td className="p-3 font-bold text-blue-700">280 employés</td>
                    <td className="p-3 text-right space-x-2">
                      <button type="button" className="px-3 py-1 bg-[#5bb124] text-white font-bold border border-black shadow-[2px_2px_0px_0px_#000]">
                        {isFrench ? 'Clore' : 'Close'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-blue-600 inline-block" />
                      <span>Swisscom (Centre Genève)</span>
                    </td>
                    <td className="p-3 text-slate-700">15.08.2026</td>
                    <td className="p-3 font-bold text-blue-700">140 employés</td>
                    <td className="p-3 text-right space-x-2">
                      <button type="button" className="px-3 py-1 bg-[#5bb124] text-white font-bold border border-black shadow-[2px_2px_0px_0px_#000]">
                        {isFrench ? 'Clore' : 'Close'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Collectes à venir */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-mono text-slate-900">
                {isFrench ? 'Collectes à venir (Planification HUG)' : 'Upcoming Scheduled Drives'}
              </h4>
              <button
                type="button"
                className="bg-[#0073e6] text-white px-3 py-1 font-mono text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              >
                + {isFrench ? 'Nouvelle collecte' : 'New Drive'}
              </button>
            </div>

            <div className="border-2 border-black overflow-x-auto shadow-[3px_3px_0px_0px_#000]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#ffeeab] border-b-2 border-black text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">{isFrench ? 'Entreprise' : 'Company'}</th>
                    <th className="p-3">{isFrench ? 'Dates' : 'Dates'}</th>
                    <th className="p-3">{isFrench ? 'Effectif total' : 'Headcount'}</th>
                    <th className="p-3">{isFrench ? 'Plateforme Co-brandée' : 'Co-branded URL'}</th>
                    <th className="p-3 text-right">{isFrench ? 'OneDoc HUG' : 'OneDoc Sync'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-[#fffbf1]">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Rolex (Les Acacias)</td>
                    <td className="p-3 text-slate-700">22.09.2026</td>
                    <td className="p-3 text-slate-700">450 employés</td>
                    <td className="p-3">
                      <span className="text-[#0073e6] font-bold underline cursor-pointer">donnons.ch/rolex</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                        SYNCHRONISÉ
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Migros Genève</td>
                    <td className="p-3 text-slate-700">08.10.2026</td>
                    <td className="p-3 text-slate-700">320 employés</td>
                    <td className="p-3">
                      <span className="text-[#0073e6] font-bold underline cursor-pointer">donnons.ch/migros</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                        SYNCHRONISÉ
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: CORPORATE TROPHIES & PARTNER GRID (TropheesVitrine.vue) */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            <span>{isFrench ? 'Module 03 // Reconnaissance Institutionnelle' : 'Module 03 // Partner Recognition'}</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300">
              {isFrench ? 'LABEL PARTENAIRE DU DON' : 'CORPORATE RECOGNITION'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Système de Trophées & Leaderboard des Entreprises' : 'Trophy System & Corporate Leaderboard'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Le Label Partenaire du Don valorise la marque employeur et la responsabilité sociétale des entreprises genevoises participantes, avec distinction Or, Argent et Bronze selon les promesses recueillies.'
              : 'The Corporate Donor Label enhances employer brand and CSR commitments for participating Geneva institutions, granting Gold, Silver, and Bronze awards based on donation targets.'}
          </p>
        </div>

        {/* Real Trophies Grid UI from TropheesVitrine.vue */}
        <div className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-[#fffbf1] p-6 sm:p-8 space-y-6">
          {/* Top Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="font-bold text-slate-700">{isFrench ? 'Année :' : 'Year:'}</span>
              {['2026', '2025', '2024'].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 border-2 font-bold transition-all ${
                    selectedYear === year
                      ? 'bg-[#0073e6] text-white border-black shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-black'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="font-bold text-slate-700">{isFrench ? 'Catégorie :' : 'Award:'}</span>
              {[
                { id: 'all', label: isFrench ? 'Tous' : 'All' },
                { id: 'gold', label: 'Prix Or' },
                { id: 'silver', label: 'Prix Argent' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 border font-bold text-xs ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Partner Cards Grid using real logos from companies_logo/ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredPartners.map((company) => (
              <div
                key={company.name}
                className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center justify-between text-center space-y-3 hover:translate-y-[-2px] transition-transform"
              >
                <div className="h-12 flex items-center justify-center w-full">
                  <img
                    src={`${baseUrl}images/donnons/companies_logo/${company.logo}`}
                    alt={company.name}
                    className="max-h-10 max-w-[80%] object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="w-full border-t border-slate-200 pt-2 font-mono">
                  <span className="font-bold text-xs text-slate-900 block truncate">
                    {company.name}
                  </span>
                  <span className="text-[10px] text-[#0073e6] font-bold block">
                    {company.award}
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    Partenaire du Don · {company.years} ans
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonnonsDetailShowcase;
