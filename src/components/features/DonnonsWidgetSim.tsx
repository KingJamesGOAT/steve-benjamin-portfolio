import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, HelpCircle, BarChart3, CheckCircle2, AlertCircle, Heart, Building2, Award } from 'lucide-react';

type DonnonsViewMode = 'impact' | 'quiz' | 'admin';

export const DonnonsWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const [activeTab, setActiveTab] = useState<DonnonsViewMode>('impact');

  // Tab 1: Impact Slider State
  const [participationPct, setParticipationPct] = useState<number>(50);
  const totalEmployees = 90;
  const activeDonors = Math.round((participationPct / 100) * totalEmployees);
  const livesSaved = activeDonors * 3; // 1 blood unit = up to 3 lives

  // Tab 2: Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<'none' | 'tick_no' | 'tick_yes'>('tick_no');

  // Tab 3: Admin KPI filter
  const [adminYearFilter, setAdminYearFilter] = useState<'2025' | '2024'>('2025');

  const partnerCompanies = [
    { name: 'Rolex', promises: 210, award: 'Prix Or', lives: 630, status: 'Validée' },
    { name: 'Swisscom', promises: 140, award: 'Prix Or', lives: 420, status: 'Validée' },
    { name: 'Migros Genève', promises: 115, award: 'Prix Argent', lives: 345, status: 'En cours' },
    { name: 'EPFL / HEIG-VD', promises: 95, award: 'Prix Argent', lives: 285, status: 'Planifiée' },
    { name: 'Nestlé', promises: 80, award: 'Partenaire', lives: 240, status: 'Validée' },
  ];

  return (
    <div className="bg-[#FAF8F5] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0B0E14] text-slate-900 rounded-none overflow-hidden select-none font-sans">
      {/* 1. TOP HEADER & NAVIGATION BAR */}
      <div className="bg-white border-b-2 border-slate-900 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-rose-500 inline-block border border-slate-900" />
            <span className="font-mono font-black text-sm tracking-tight text-slate-900">
              DONNONS.CH
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            HUG // NOTE 6.0
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 p-1 border border-slate-300">
          <button
            type="button"
            onClick={() => setActiveTab('impact')}
            className={`px-2.5 py-1 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'impact'
                ? 'bg-blue-600 text-white shadow-[2px_2px_0px_0px_#000]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Impact & Collecte' : 'Impact Visualizer'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-2.5 py-1 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#2E1A47] text-purple-200 shadow-[2px_2px_0px_0px_#000]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Quiz Éligibilité' : 'Pixel Quiz'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_#000]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isFrench ? 'Admin & KPI' : 'Admin & KPIs'}</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT 1: IMPACT SIMULATOR (IMAGE 4) */}
      {activeTab === 'impact' && (
        <div className="p-5 sm:p-7 space-y-6 bg-[#FAF8F5]">
          {/* Academic Banner */}
          <div className="px-3 py-1.5 bg-blue-600 border border-slate-900 text-white text-xs font-mono font-semibold flex items-center justify-between">
            <span>{isFrench ? 'Projet de diplôme officiel réalisé pour les HUG' : 'Official HUG client diploma mandate'}</span>
            <span className="hidden sm:inline text-[10px] bg-blue-800 px-1.5 py-0.5">GENÈVE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Controls & Numbers */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-amber-500 font-mono text-xs font-bold">
                  <span>✦ ✦ ✦ ✦ ✦</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {isFrench ? 'Mobilisez votre équipe pour sauver des vies !' : 'Engage your team to save lives!'}
                </h3>
              </div>

              {/* Dynamic Big Stat */}
              <div className="p-4 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
                  {participationPct}%{' '}
                  <span className="text-sm font-semibold text-slate-700">
                    {isFrench ? 'de participation' : 'turnout'}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-mono flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>
                    {livesSaved} {isFrench ? 'vies sauvées potentielles' : 'potential lives saved'}
                  </span>
                </div>
              </div>

              {/* Interactive Participation Slider */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-mono text-slate-600 font-semibold">
                  <span>{isFrench ? 'Taux de participation :' : 'Participation rate:'}</span>
                  <span className="text-blue-600 font-bold">{participationPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={participationPct}
                  onChange={(e) => setParticipationPct(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 border border-slate-900 appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>10% (Min)</span>
                  <span>50% (Moyenne HUG)</span>
                  <span>100% (Objectif)</span>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Pixel Donor Grid */}
            <div className="lg:col-span-7 bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000] flex flex-col items-center justify-center space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                {isFrench ? 'Visualisation des Collaborateurs' : 'Interactive Workforce Visualizer'} ({activeDonors} / {totalEmployees})
              </div>

              {/* Grid of 60 Pixel Art People */}
              <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 p-3 bg-slate-50 border border-slate-200 w-full justify-items-center">
                {Array.from({ length: 60 }).map((_, i) => {
                  const isDonor = i < Math.round((participationPct / 100) * 60);
                  return (
                    <div
                      key={`pixel-person-${i}`}
                      title={isDonor ? (isFrench ? 'Donneur actif' : 'Active donor') : (isFrench ? 'Non-participant' : 'Non-donor')}
                      className={`w-4 h-6 sm:w-5 sm:h-7 flex flex-col items-center justify-between p-0.5 transition-colors duration-200 ${
                        isDonor
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      {/* Head */}
                      <div className={`w-2.5 h-2.5 rounded-none ${isDonor ? 'bg-amber-100' : 'bg-slate-300'}`} />
                      {/* Torso with tie */}
                      <div className={`w-3.5 h-2.5 flex items-center justify-center ${isDonor ? 'bg-blue-700' : 'bg-slate-400'}`}>
                        <div className={`w-1 h-1.5 ${isDonor ? 'bg-rose-500' : 'bg-slate-500'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend & Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 w-full pt-1 text-xs font-mono">
                <div className="flex items-center space-x-3 text-slate-600 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-blue-600 inline-block border border-slate-900" />
                    <span>{isFrench ? 'Donneurs' : 'Donors'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-slate-200 inline-block border border-slate-400" />
                    <span>{isFrench ? 'Non participants' : 'Non-participants'}</span>
                  </span>
                </div>

                <div className="px-3 py-1 bg-slate-900 text-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#0052FF]">
                  {livesSaved} {isFrench ? 'Vies sauvées' : 'Lives saved'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT 2: PIXEL SPACE QUIZ (IMAGE 5 - /quizz) */}
      {activeTab === 'quiz' && (
        <div className="p-5 sm:p-7 bg-[#231738] text-white relative overflow-hidden space-y-6">
          {/* Pixel Stars Ambient Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 font-mono text-[9px] select-none text-purple-300 leading-none overflow-hidden">
            + &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; + <br />
            &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; + <br />
            + &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + <br />
            &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; +
          </div>

          {/* Quiz Top Status */}
          <div className="flex items-center justify-between border-b border-purple-800/80 pb-3 text-xs font-mono">
            <span className="px-2 py-0.5 bg-purple-950 border border-purple-700 text-purple-200 font-bold">
              QUESTION 04 / 12
            </span>
            <span className="text-purple-300">
              {isFrench ? 'Démystification médicale HUG' : 'HUG Medical Eligibility Engine'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left: Interactive Question Card */}
            <div className="md:col-span-7 bg-[#2D1F47] border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] space-y-4">
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
                  {isFrench
                    ? 'As-tu été piqué par une tique dans les 4 dernières semaines ?'
                    : 'Have you been bitten by a tick in the last 4 weeks?'}
                </h4>
                <p className="text-xs text-purple-300 font-sans">
                  {isFrench
                    ? 'Vérification rapide des critères de précaution pour la sécurité du receveur.'
                    : 'Rapid safety check for donor and recipient safety.'}
                </p>
              </div>

              {/* Clickable Choice Buttons */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedAnswer('tick_no')}
                  className={`px-3.5 py-2 border-2 transition-all font-bold ${
                    selectedAnswer === 'tick_no'
                      ? 'bg-emerald-500 border-black text-slate-950 shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-[#1E1430] border-purple-700 text-purple-200 hover:border-purple-500'
                  }`}
                >
                  {isFrench ? 'Non, zéro piqûre' : 'No, no bites'}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAnswer('tick_yes')}
                  className={`px-3.5 py-2 border-2 transition-all font-bold ${
                    selectedAnswer === 'tick_yes'
                      ? 'bg-amber-400 border-black text-slate-950 shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-[#1E1430] border-purple-700 text-purple-200 hover:border-purple-500'
                  }`}
                >
                  {isFrench ? 'Oui, récemment' : 'Yes, recently'}
                </button>
              </div>

              {/* Dynamic Instant Feedback Box */}
              <div className="pt-2">
                {selectedAnswer === 'tick_no' ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-emerald-200">
                        {isFrench ? 'La tique a raté sa cible, zéro souci !' : 'No tick issue, all clear!'}
                      </span>
                      <span className="text-[11px] text-emerald-300/90">
                        {isFrench
                          ? 'Tu es pleinement éligible pour donner ton sang lors de la prochaine collecte.'
                          : 'You are fully eligible for the upcoming blood collection drive.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-950/80 border border-amber-600 text-amber-300 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-amber-200">
                        {isFrench ? 'Délai de précaution de 4 semaines' : '4-week caution buffer'}
                      </span>
                      <span className="text-[11px] text-amber-300/90">
                        {isFrench
                          ? 'Simple report temporaire sans gravité pour s\'assurer de l\'absence de symptômes.'
                          : 'Temporary deferral only to ensure complete absence of symptoms.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Retro Pixel Mascot & Planet Scene */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-32 h-32 sm:w-36 sm:h-36 relative flex items-center justify-center">
                {/* Purple Planet */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-900 to-fuchsia-950 border-2 border-purple-600 shadow-xl relative overflow-hidden">
                  <div className="w-6 h-6 rounded-full bg-purple-950/70 absolute top-3 left-4" />
                  <div className="w-8 h-8 rounded-full bg-purple-950/70 absolute bottom-3 right-3" />
                </div>

                {/* Floating Parachute Mascot */}
                <div className="absolute top-1 left-3 flex flex-col items-center animate-bounce">
                  {/* Yellow Parachute */}
                  <div className="w-12 h-6 bg-amber-400 border border-black rounded-t-full shadow-sm" />
                  {/* Cords */}
                  <div className="w-8 h-2 border-l border-r border-amber-200" />
                  {/* Pixel Robot */}
                  <div className="w-6 h-6 bg-slate-100 border border-black flex flex-col items-center justify-center shadow-md">
                    <div className="flex space-x-1">
                      <span className="w-1 h-1 bg-blue-600 block" />
                      <span className="w-1 h-1 bg-blue-600 block" />
                    </div>
                    <Heart className="w-2.5 h-2.5 text-rose-600 fill-rose-600 mt-0.5" />
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono text-purple-300 text-center">
                {isFrench ? 'Mascotte interactive du parcours don' : 'Interactive donor journey mascot'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT 3: ADMIN & KPI DASHBOARD (USER REQUEST) */}
      {activeTab === 'admin' && (
        <div className="p-5 sm:p-7 space-y-6 bg-white">
          {/* Admin Header with Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 font-mono">
                {isFrench ? 'HUG · TABLEAU DE BORD COLLECTES' : 'HUG · DRIVES DASHBOARD'}
              </h4>
              <p className="text-xs text-slate-500 font-mono">
                {isFrench ? 'Supervision opérationnelle des collectes mobiles' : 'Operational overview of mobile blood drives'}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-500">{isFrench ? 'Période :' : 'Period:'}</span>
              <button
                type="button"
                onClick={() => setAdminYearFilter('2025')}
                className={`px-2 py-0.5 border font-bold ${
                  adminYearFilter === '2025'
                    ? 'bg-blue-600 text-white border-slate-900'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                2025
              </button>
              <button
                type="button"
                onClick={() => setAdminYearFilter('2024')}
                className={`px-2 py-0.5 border font-bold ${
                  adminYearFilter === '2024'
                    ? 'bg-blue-600 text-white border-slate-900'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                2024
              </button>
            </div>
          </div>

          {/* 4 Clean Minimalist KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                {isFrench ? 'Poches Collectées' : 'Units Collected'}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                1,420
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                +18% {isFrench ? 'vs objectif' : 'vs target'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                {isFrench ? 'Vies Sauvées' : 'Lives Saved'}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-rose-600">
                4,260
              </div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isFrench ? 'Ratio 1 don = 3 vies' : '1 donation = 3 lives'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                {isFrench ? 'Mobilisation Entreprises' : 'Corporate Turnout'}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-blue-600">
                54.2%
              </div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isFrench ? '52 entreprises partenaires' : '52 partner companies'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                {isFrench ? 'Passation Quiz Éligible' : 'Quiz Pass Rate'}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                84.6%
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                {isFrench ? 'Démystification réussie' : 'High engagement'}
              </span>
            </div>
          </div>

          {/* Partner Leaderboard Table */}
          <div className="border-2 border-slate-900 overflow-x-auto shadow-[3px_3px_0px_0px_#000]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2.5">{isFrench ? 'Entreprise Partenaire' : 'Partner Company'}</th>
                  <th className="p-2.5">{isFrench ? 'Promesses de Don' : 'Pledges'}</th>
                  <th className="p-2.5">{isFrench ? 'Vies Impactées' : 'Lives Impacted'}</th>
                  <th className="p-2.5">{isFrench ? 'Label Don' : 'Award'}</th>
                  <th className="p-2.5">{isFrench ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {partnerCompanies.map((c) => (
                  <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900 flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{c.name}</span>
                    </td>
                    <td className="p-2.5 font-semibold text-slate-700">{c.promises}</td>
                    <td className="p-2.5 font-bold text-rose-600">{c.lives}</td>
                    <td className="p-2.5">
                      <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-bold">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>{c.award}</span>
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 border border-slate-300 text-slate-700">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MINIMALIST FOOTER TELEMETRY STRIP */}
      <div className="bg-slate-900 px-4 sm:px-6 py-2 border-t-2 border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-3">
          <span>CLIENT: HÔPITAUX UNIVERSITAIRES DE GENÈVE</span>
          <span className="hidden sm:inline">STACK: VUE.JS 3 // LARAVEL REST</span>
          <span className="hidden md:inline">WCAG AA COMPLIANT</span>
        </div>
        <div className="flex items-center space-x-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>PRODUCTION MANDATE</span>
        </div>
      </div>
    </div>
  );
};

export default DonnonsWidgetSim;
