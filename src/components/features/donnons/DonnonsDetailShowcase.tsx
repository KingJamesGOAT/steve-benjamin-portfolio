import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import GlossaryTerm from '../GlossaryTerm';
import { getGlossaryDef } from '../../../data/cryptoGlossary';

export const DonnonsDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const baseUrl = import.meta.env.BASE_URL;

  // Quiz interactive state
  const [quizAnswer, setQuizAnswer] = useState<'none' | 'no' | 'yes'>('no');
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [closedDrives, setClosedDrives] = useState<string[]>([]);

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
    <div className="space-y-6 sm:space-y-16">
      {/* Mobile Module Tab Switcher (shows 1 module at a time on mobile) */}
      <div className="sm:hidden grid grid-cols-3 gap-1.5 font-mono text-[11px]">
        {[
          { idx: 0 as const, label: isFrench ? '01 · Quiz' : '01 · Quiz' },
          { idx: 1 as const, label: isFrench ? '02 · Admin HUG' : '02 · HUG Admin' },
          { idx: 2 as const, label: isFrench ? '03 · Trophées' : '03 · Trophies' },
        ].map((tab) => (
          <button
            key={tab.idx}
            type="button"
            onClick={() => setActiveTab(tab.idx)}
            className={`py-2 px-2 border text-center font-bold transition-colors ${
              activeTab === tab.idx
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: THE GAMIFIED COSMIC QUIZ (/quizz / QuizzCobrand.vue)    */}
      {/* ----------------------------------------------------------------- */}
      <section className={`space-y-4 sm:space-y-6 ${activeTab === 0 ? 'block' : 'hidden sm:block'}`}>
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
            <span>{isFrench ? 'Module 01 // Expérience Utilisateur' : 'Module 01 // User Experience'}</span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-300">
              {isFrench ? 'QUIZ D\'ÉLIGIBILITÉ SPATIAL' : 'COSMIC ELIGIBILITY QUIZ'}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? '1. Quiz d\'Éligibilité Interactif' : '1. Interactive Eligibility Quiz'}
          </h2>
          <p className="sm:hidden text-xs text-slate-600 font-sans leading-snug">
            {isFrench
              ? "J'ai travaillé sur ce quiz spatial illustré qui remplace le formulaire papier et explique les critères médicaux de façon bienveillante."
              : 'I worked on this illustrated space quiz that replaces the paper form and explains medical deferral rules in a friendly way.'}
          </p>
          <p className="hidden sm:block text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Nous avons remplacé le long questionnaire médical papier par un voyage illustré dans l\'espace avec la mascotte Roby. Si un employé ne peut pas donner son sang temporairement, le quiz lui explique pourquoi de manière bienveillante avant la prise de rendez-vous.'
              : 'We replaced the long medical paper form with an illustrated space journey featuring Roby the mascot. If an employee cannot donate temporarily, the quiz explains why in a friendly way before they book a slot.'}
          </p>
        </div>

        {/* Playable Cosmic Quiz Screen */}
        <div className="border-2 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] bg-[#241838] text-white p-3.5 sm:p-8 relative overflow-hidden">
          {/* Authentic Space Background from sixieme_sens-main */}
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <img
              src={`${baseUrl}images/donnons/quiz/00_bkg/background_space.png`}
              alt="Space background"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: The Authentic QuizzCobrand Question Box (#463b78) */}
            <div className="lg:col-span-7 bg-[#463b78] border-2 border-black p-4 sm:p-8 shadow-[3px_3px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] text-[#fffbf1] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between text-xs font-mono border-b border-black/30 pb-3">
                <span className="px-3 py-1 bg-[#322947] border-2 border-black text-white font-bold shadow-[2px_2px_0px_0px_#000]">
                  QUESTION 06 / 12
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-2xl font-bold font-mono text-white leading-tight">
                  {isFrench
                    ? 'As-tu été piqué par une tique dans les 4 dernières semaines ?'
                    : 'Have you been bitten by a tick in the last 4 weeks?'}
                </h3>
                <p className="hidden sm:block text-xs sm:text-sm text-[#D5D9ED] leading-relaxed font-sans">
                  {isFrench
                    ? 'Ce critère prévient la transmission potentielle de bactéries ou virus transmissibles par les tiques.'
                    : 'This safety criterion prevents the potential transmission of tick-borne bacteria or viruses.'}
                </p>
              </div>

              {/* Action Buttons styled as QuizzCobrand */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 font-mono text-xs sm:text-sm pt-1">
                <button
                  type="button"
                  onClick={() => setQuizAnswer('no')}
                  className={`px-3 sm:px-5 py-2.5 sm:py-3 border-2 border-black font-bold transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 ${
                    quizAnswer === 'no'
                      ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]'
                      : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-y-[1px]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{isFrench ? 'Non' : 'No'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuizAnswer('yes')}
                  className={`px-3 sm:px-5 py-2.5 sm:py-3 border-2 border-black font-bold transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 ${
                    quizAnswer === 'yes'
                      ? 'bg-[#ff9166] text-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]'
                      : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-y-[1px]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-amber-900 shrink-0" />
                  <span>{isFrench ? 'Oui' : 'Yes'}</span>
                </button>
              </div>

              {/* Feedback Display */}
              <div className="pt-1 sm:pt-2">
                {quizAnswer === 'no' ? (
                  <div className="p-3 sm:p-4 bg-[#1f3f2d] border-2 border-black text-emerald-100 shadow-[3px_3px_0px_0px_#000] space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="px-2 py-0.5 bg-[#4ade80] text-black border border-black uppercase text-[10px]">
                        Tick: No
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {isFrench ? 'Éligible au don ✓' : 'Eligible ✓'}
                      </span>
                    </div>
                    <span className="font-bold text-white block text-xs sm:text-base font-mono pt-1">
                      {isFrench ? 'La tique a raté sa cible, zéro souci !' : 'Target missed, all clear!'}
                    </span>
                    <p className="hidden sm:block text-xs text-emerald-200/90 font-sans leading-relaxed">
                      {isFrench
                        ? 'Tu es pleinement éligible pour donner ton sang lors de la prochaine collecte en entreprise.'
                        : 'You are fully eligible to donate blood at the upcoming corporate mobile drive.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 sm:p-4 bg-[#3d2319] border-2 border-black text-amber-100 shadow-[3px_3px_0px_0px_#000] space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="px-2 py-0.5 bg-[#ff9166] text-black border border-black uppercase text-[10px]">
                        Tick: Yes
                      </span>
                      <span className="text-amber-400 font-bold">
                        {isFrench ? 'Report 4 semaines' : '4-week buffer'}
                      </span>
                    </div>
                    <span className="font-bold text-white block text-xs sm:text-base font-mono pt-1">
                      {isFrench ? 'Délai de précaution de 4 semaines' : '4-week precaution buffer'}
                    </span>
                    <p className="hidden sm:block text-xs text-amber-200/90 font-sans leading-relaxed">
                      {isFrench
                        ? 'Simple report temporaire par précaution. Tu pourras participer dès la fin de ce délai sans aucune démarche compliquée !'
                        : 'Simple temporary deferral for peace of mind. You will be able to donate as soon as this period elapses!'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Authentic Tick Quiz Illustration from 06_tick/ (Desktop only) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center p-2 relative min-h-[340px]">
              <img
                src={`${baseUrl}images/donnons/quiz/06_tick/tick_${
                  quizAnswer === 'yes' ? 'yes' : quizAnswer === 'no' ? 'no' : 'base'
                }.png`}
                alt="Tick Quiz Roby"
                className="max-h-[260px] sm:max-h-[340px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: HUG ADMIN DASHBOARD (DashboardAdmin.vue)               */}
      {/* ----------------------------------------------------------------- */}
      <section className={`space-y-4 sm:space-y-6 ${activeTab === 1 ? 'block' : 'hidden sm:block'}`}>
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            <span>{isFrench ? 'Module 02 // Espace Professionnel' : 'Module 02 // Administration Portal'}</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300">
              {isFrench ? 'SUPERVISION DES COLLECTES HUG' : 'HUG DRIVES SUPERVISION'}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? '2. Tableau de Bord Administrateur HUG' : '2. HUG Staff Admin Dashboard'}
          </h2>
          <p className="sm:hidden text-xs text-slate-600 font-sans leading-snug">
            {isFrench
              ? "J'ai contribué à ce panneau permettant à l'équipe des HUG de planifier les collectes en entreprise et de les clôturer en un clic."
              : 'I helped build this admin panel so the HUG team can schedule corporate blood drives and close completed drives in one click.'}
          </p>
          <p className="hidden sm:block text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Nous avons conçu un panneau d\'administration pour l\'équipe des HUG afin de planifier les collectes en entreprise, générer des liens personnalisés par société et clôturer les collectes terminées en un clic.'
              : 'We built an administration panel for the HUG medical team so they can plan upcoming corporate blood drives, generate custom links for each company, and close completed drives in one click.'}
          </p>
        </div>

        {/* Real Admin Dashboard UI from DashboardAdmin.vue */}
        <div className="border-2 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] bg-white text-slate-900 p-3.5 sm:p-8 space-y-4 sm:space-y-6">
          {/* Warning Banner: Collectes à clore */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border-2 border-black p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#000] transition-colors ${
              closedDrives.length >= 2 ? 'bg-[#4ade80]' : 'bg-[#ff9166]'
            }`}
          >
            <div className="flex items-center space-x-2 font-mono font-bold text-xs sm:text-sm text-slate-950">
              <span className="px-1.5 py-0.5 bg-black text-white text-[10px]">
                {closedDrives.length >= 2 ? 'OK' : 'URGENT'}
              </span>
              <span>
                {closedDrives.length >= 2
                  ? isFrench
                    ? 'Toutes les collectes ont été clôturées ✓'
                    : 'All mobile blood drives closed ✓'
                  : isFrench
                  ? `${2 - closedDrives.length} collecte(s) à clore aujourd'hui.`
                  : `${2 - closedDrives.length} mobile drive(s) awaiting closure.`}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                closedDrives.length >= 2
                  ? setClosedDrives([])
                  : setClosedDrives(['bcge', 'swisscom'])
              }
              className="bg-black text-white px-3 py-1 font-mono text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {closedDrives.length >= 2
                ? isFrench
                  ? 'Réinitialiser'
                  : 'Reset'
                : isFrench
                ? 'Traiter tout'
                : 'Batch process'}
            </button>
          </div>

          {/* Table 1: Collectes à clore */}
          <div className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold font-mono text-slate-900">
              {isFrench ? 'Collectes à clore (Fin de mission)' : 'Drives pending closure'}
            </h4>

            {/* MOBILE ONLY: Zero-Scroll Stacked Cards */}
            <div className="sm:hidden space-y-2 font-mono text-xs">
              {[
                { id: 'bcge', name: 'BCGE Genève', date: '02.07.2026', staff: isFrench ? '280 inscrits' : '280 staff' },
                { id: 'swisscom', name: 'Swisscom Genève', date: '15.08.2026', staff: isFrench ? '140 inscrits' : '140 staff' },
              ].map((drive) => {
                const isClosed = closedDrives.includes(drive.id);
                return (
                  <div
                    key={drive.id}
                    className="border-2 border-black bg-[#fffbf1] p-3 shadow-[2px_2px_0px_0px_#000] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{drive.name}</div>
                      <div className="text-[11px] text-blue-700 font-bold">
                        {drive.staff} <span className="text-slate-500 font-normal">· {drive.date}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setClosedDrives((prev) =>
                          prev.includes(drive.id)
                            ? prev.filter((x) => x !== drive.id)
                            : [...prev, drive.id]
                        )
                      }
                      className={`px-3 py-1.5 font-bold border border-black shadow-[2px_2px_0px_0px_#000] transition-colors ${
                        isClosed
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-[#5bb124] text-white'
                      }`}
                    >
                      {isClosed
                        ? isFrench
                          ? 'Clôturé ✓'
                          : 'Closed ✓'
                        : isFrench
                        ? 'Clore'
                        : 'Close'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP/TABLET: Full Table */}
            <div className="hidden sm:block border-2 border-black overflow-x-auto shadow-[3px_3px_0px_0px_#000]">
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
                    <td className="p-3 font-bold text-blue-700">
                      {isFrench ? '280 employés' : '280 employees'}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          setClosedDrives((prev) =>
                            prev.includes('bcge') ? prev.filter((x) => x !== 'bcge') : [...prev, 'bcge']
                          )
                        }
                        className={`px-3 py-1 font-bold border border-black shadow-[2px_2px_0px_0px_#000] cursor-pointer ${
                          closedDrives.includes('bcge') ? 'bg-slate-200 text-slate-700' : 'bg-[#5bb124] text-white'
                        }`}
                      >
                        {closedDrives.includes('bcge')
                          ? isFrench
                            ? 'Clôturé ✓'
                            : 'Closed ✓'
                          : isFrench
                          ? 'Clore'
                          : 'Close'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-blue-600 inline-block" />
                      <span>Swisscom (Centre Genève)</span>
                    </td>
                    <td className="p-3 text-slate-700">15.08.2026</td>
                    <td className="p-3 font-bold text-blue-700">
                      {isFrench ? '140 employés' : '140 employees'}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          setClosedDrives((prev) =>
                            prev.includes('swisscom') ? prev.filter((x) => x !== 'swisscom') : [...prev, 'swisscom']
                          )
                        }
                        className={`px-3 py-1 font-bold border border-black shadow-[2px_2px_0px_0px_#000] cursor-pointer ${
                          closedDrives.includes('swisscom') ? 'bg-slate-200 text-slate-700' : 'bg-[#5bb124] text-white'
                        }`}
                      >
                        {closedDrives.includes('swisscom')
                          ? isFrench
                            ? 'Clôturé ✓'
                            : 'Closed ✓'
                          : isFrench
                          ? 'Clore'
                          : 'Close'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Collectes à venir (Desktop only to keep mobile clean) */}
          <div className="hidden sm:block space-y-2 pt-2">
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
                    <th className="p-3 text-right">
                      {isFrench ? (
                        <GlossaryTerm
                          term="OneDoc HUG"
                          definition={getGlossaryDef('onedoc-sync', 'fr')}
                        />
                      ) : (
                        <GlossaryTerm
                          term="OneDoc Sync"
                          definition={getGlossaryDef('onedoc-sync', 'en')}
                        />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-[#fffbf1]">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Rolex (Les Acacias)</td>
                    <td className="p-3 text-slate-700">22.09.2026</td>
                    <td className="p-3 text-slate-700">
                      {isFrench ? '450 employés' : '450 employees'}
                    </td>
                    <td className="p-3">
                      <span className="text-[#0073e6] font-bold underline cursor-pointer">donnons.ch/rolex</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                        {isFrench ? 'SYNCHRONISÉ' : 'SYNCHRONIZED'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Migros Genève</td>
                    <td className="p-3 text-slate-700">08.10.2026</td>
                    <td className="p-3 text-slate-700">
                      {isFrench ? '320 employés' : '320 employees'}
                    </td>
                    <td className="p-3">
                      <span className="text-[#0073e6] font-bold underline cursor-pointer">donnons.ch/migros</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                        {isFrench ? 'SYNCHRONISÉ' : 'SYNCHRONIZED'}
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
      <section className={`space-y-4 sm:space-y-6 ${activeTab === 2 ? 'block' : 'hidden sm:block'}`}>
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            <span>{isFrench ? 'Module 03 // Reconnaissance Institutionnelle' : 'Module 03 // Partner Recognition'}</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300">
              {isFrench ? 'LABEL PARTENAIRE DU DON' : 'CORPORATE RECOGNITION'}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? '3. Vitrine des Entreprises Partenaires & Trophées' : '3. Partner Companies & Trophy Showcase'}
          </h2>
          <p className="sm:hidden text-xs text-slate-600 font-sans leading-snug">
            {isFrench
              ? 'Nous avons créé cette vitrine attribuant les labels Or, Argent et Bronze aux entreprises selon la participation des employés.'
              : 'We created this partner showcase awarding Gold, Silver, and Bronze labels to companies based on employee participation.'}
          </p>
          <p className="hidden sm:block text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench ? (
              <>
                Pour encourager les entreprises genevoises à participer chaque année, nous avons créé une vitrine partenaires attribuant le{' '}
                <GlossaryTerm
                  term="Label Partenaire du Don"
                  definition={getGlossaryDef('label-cts', 'fr')}
                />{' '}
                (Or, Argent et Bronze) selon la mobilisation des employés.
              </>
            ) : (
              <>
                To motivate Geneva companies to participate every year, we designed a partner showcase awarding the{' '}
                <GlossaryTerm
                  term="Corporate Donor Label"
                  definition={getGlossaryDef('label-cts', 'en')}
                />{' '}
                (Gold, Silver, and Bronze) based on employee participation.
              </>
            )}
          </p>
        </div>

        {/* Real Trophies Grid UI from TropheesVitrine.vue */}
        <div className="border-2 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] bg-[#fffbf1] p-3.5 sm:p-8 space-y-4 sm:space-y-6">
          {/* Top Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-black pb-3 sm:pb-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono">
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

            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-mono">
              <span className="font-bold text-slate-700">{isFrench ? 'Prix :' : 'Award:'}</span>
              {[
                { id: 'all', label: isFrench ? 'Tous' : 'All' },
                { id: 'gold', label: isFrench ? 'Or' : 'Gold' },
                { id: 'silver', label: isFrench ? 'Argent' : 'Silver' },
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {filteredPartners.map((company, idx) => {
              const localizedAward =
                company.award === 'Or 2025'
                  ? (isFrench ? 'Or 2025' : 'Gold 2025')
                  : company.award === 'Argent 2025'
                  ? (isFrench ? 'Argent 2025' : 'Silver 2025')
                  : (isFrench ? 'Partenaire' : 'Partner');

              return (
                <div
                  key={company.name}
                  className={`bg-white border-2 border-black p-3 sm:p-4 shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] flex-col items-center justify-between text-center space-y-2 sm:space-y-3 hover:translate-y-[-2px] transition-transform ${
                    idx >= 4 ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <div className="h-10 sm:h-12 flex items-center justify-center w-full">
                    <img
                      src={`${baseUrl}images/donnons/companies_logo/${company.logo}`}
                      alt={company.name}
                      className="max-h-8 sm:max-h-10 max-w-[80%] object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="w-full border-t border-slate-200 pt-1.5 sm:pt-2 font-mono">
                    <span className="font-bold text-xs text-slate-900 block truncate">
                      {company.name}
                    </span>
                    <span className="text-[10px] text-[#0073e6] font-bold block">
                      {localizedAward}
                    </span>
                    <span className="hidden sm:block text-[9px] text-slate-500">
                      {isFrench
                        ? `Partenaire du Don · ${company.years} ans`
                        : `Blood Drive Partner · ${company.years} yrs`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonnonsDetailShowcase;
