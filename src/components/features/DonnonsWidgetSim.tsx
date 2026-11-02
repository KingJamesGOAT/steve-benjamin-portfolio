import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, ExternalLink, Gamepad2, HelpCircle, Globe } from 'lucide-react';

export const DonnonsWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Live participation slider state (default 50% from the real HUG campaign)
  const [participationPct, setParticipationPct] = useState<number>(50);
  const [isRobyHovered, setIsRobyHovered] = useState<boolean>(false);
  const [isRobyClicked, setIsRobyClicked] = useState<boolean>(false);
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        noticeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  // 60 total people in the visualizer for generous size matching Roby
  const totalGrid = 60; // 10 columns x 6 rows
  const blueCount = Math.round((participationPct / 100) * totalGrid);
  const livesSaved = Math.round(participationPct * 2.6); // 50% -> 130 lives
  const robyIndex = 2; // Position of Roby mascot in the grid

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-[#fffbf1] border-2 border-black shadow-[4px_4px_0px_0px_#000] text-black rounded-none overflow-hidden select-none font-sans">
      {/* Top Bar with Live Project Links */}
      <div className="bg-white border-b-2 border-black px-2.5 sm:px-6 py-2 flex items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
          <span className="font-mono font-black text-xs sm:text-sm tracking-tight text-black shrink-0">
            DONNONS.CH
          </span>
          <span className="px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-black uppercase truncate">
            {isFrench ? 'Maquette interactive' : 'Interactive Prototype'}
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline shrink-0">
            // HUG & HEIG-VD
          </span>
        </div>

        {/* Real Live Links - Only primary on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold shrink-0">
          <a
            href="https://donnons.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 hover:bg-[#0073e6] hover:text-white border border-black transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>donnons.ch</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href="https://donnons.ch/quizz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 hover:bg-purple-700 hover:text-white border border-black transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            <span>/quizz</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href="https://donnons.ch/roby-game"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 hover:bg-emerald-600 hover:text-white border border-black transition-colors"
          >
            <Gamepad2 className="w-3 h-3" />
            <span>/roby-game</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div className="p-4 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Heading, Stats & Slider */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            {/* Real Yellow Squares Image from sixieme_sens-main (Desktop only) */}
            <div className="hidden sm:block">
              <img
                src={`${baseUrl}images/donnons/YellowSquares.png`}
                alt="Squares"
                className="h-5 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Main Campaign Headline (Desktop only for minimalist mobile) */}
            <h3 className="hidden sm:block text-2xl sm:text-4xl font-black text-black tracking-tight leading-[1.1] font-mono">
              {isFrench
                ? 'Mobilisez votre équipe pour sauver des vies !'
                : 'Engage your team to save lives!'}
            </h3>

            {/* Main Stats Display */}
            <div className="flex flex-row items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl sm:text-6xl font-black text-[#0073e6] font-mono leading-none">
                  {participationPct}%
                </div>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-xs sm:text-lg font-bold text-black font-mono leading-tight">
                    {isFrench ? 'de participation,' : 'participation,'}
                  </span>
                  <span className="text-xs sm:text-lg font-bold text-black font-mono leading-tight flex items-center gap-1.5">
                    <span className="text-[#0073e6]">{livesSaved}</span>{' '}
                    <span>{isFrench ? 'vies sauvées.' : 'lives saved.'}</span>
                    <div className="relative group hidden sm:inline-flex items-center">
                      <button
                        type="button"
                        className="p-0.5 text-slate-500 hover:text-[#0073e6] cursor-help transition-colors"
                        aria-label="Info"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                      {/* Tooltip Popup */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64 sm:w-72 p-2.5 bg-white text-black text-[11px] font-mono shadow-[3px_3px_0px_0px_#000] leading-relaxed pointer-events-none border-2 border-black text-center">
                        {isFrench
                          ? `Les ${livesSaved} vies sauvées sont une estimation basée sur le fait qu'un don de sang peut sauver jusqu'à 3 vies.`
                          : `The ${livesSaved} lives saved are an estimate based on the fact that one blood donation can save up to 3 lives.`}
                      </div>
                    </div>
                  </span>
                </div>
              </div>

              {/* Compact Mobile Roby Mascot Badge */}
              <div className="sm:hidden flex items-center gap-1.5 bg-white border border-black px-2 py-1 shadow-[2px_2px_0px_0px_#000]">
                <img
                  src={`${baseUrl}images/donnons/dono_default.png`}
                  alt="Roby"
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="font-mono text-[10px] font-bold text-[#0073e6]">
                  {blueCount}/{totalGrid}
                </span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-2 bg-white/70 p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                <span>{isFrench ? 'Taux de participation :' : 'Participation turnout:'}</span>
                <span className="text-[#0073e6] text-sm">{participationPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={participationPct}
                onChange={(e) => setParticipationPct(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 border border-black appearance-none cursor-pointer accent-[#0073e6]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>{isFrench ? '10% (Min)' : '10% (Min)'}</span>
                <span>{isFrench ? '50% (Moyenne)' : '50% (Average)'}</span>
                <span>{isFrench ? '100% (Objectif)' : '100% (Target)'}</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowNotice((prev) => !prev)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0073e6] hover:bg-[#005bb5] text-white font-mono text-sm sm:text-base font-bold px-6 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center"
              >
                <span>{isFrench ? 'Organiser une collecte' : 'Schedule a blood drive'}</span>
              </button>

              {/* Interactive Prototype Feedback Notice */}
              {showNotice && (
                <div
                  ref={noticeRef}
                  className="mt-3.5 p-3 sm:p-4 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs font-mono space-y-2 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between font-bold text-black border-b border-slate-200 pb-1.5">
                    <span className="flex items-center gap-1.5 text-amber-800">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      {isFrench ? 'Information Prototype' : 'Prototype Notice'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNotice(false)}
                      className="text-slate-400 hover:text-black font-bold px-1 text-sm cursor-pointer"
                      aria-label="Fermer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-sans text-xs">
                    {isFrench
                      ? "Ce bouton fait partie d'une maquette interactive de démonstration. Pour accéder à la plateforme officielle déployée du projet HUG, rendez-vous directement sur :"
                      : 'This button is part of an interactive demonstration prototype. To access the live deployed platform for the HUG project, visit:'}
                  </p>
                  <div>
                    <a
                      href="https://donnons.ch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#0073e6] text-[#0073e6] hover:text-white border border-black font-mono font-bold text-xs transition-colors"
                    >
                      <span>donnons.ch</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Resized LittleMen Grid & Roby Mascot (Desktop/Tablet only for clean mobile) */}
          <div className="hidden sm:flex lg:col-span-6 flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] bg-white border-2 border-black p-2.5 sm:p-5 shadow-[4px_4px_0px_0px_#000]">
              {/* Background Grid: 60 avatars scaled for mobile */}
              <div className="grid grid-cols-10 gap-0.5 sm:gap-2.5 justify-items-center">
                {Array.from({ length: totalGrid }).map((_, i) => {
                  // Roby mascot position
                  if (i === robyIndex) {
                    return (
                      <div
                        key={`roby-${i}`}
                        className="relative w-5 h-7 sm:w-9 sm:h-12 flex items-center justify-center cursor-pointer z-20"
                        onMouseEnter={() => setIsRobyHovered(true)}
                        onMouseLeave={() => setIsRobyHovered(false)}
                        onClick={() => setIsRobyClicked((prev) => !prev)}
                      >
                        <img
                          src={`${baseUrl}images/donnons/dono_default.png`}
                          alt="Roby"
                          className="w-[65%] h-[65%] object-contain animate-bounce cursor-pointer hover:scale-110 transition-transform origin-bottom"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {/* Speech Bubble */}
                        {(isRobyHovered || isRobyClicked) && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0073e6] text-white font-mono text-[11px] font-bold px-2.5 py-1 border-2 border-black whitespace-nowrap shadow-[3px_3px_0px_0px_#000] pointer-events-none z-50">
                            {isFrench ? "Tu m'as trouvé !" : 'You found me!'}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Active vs Non-active littleman (scaled up to match Roby)
                  const isBlue = i <= blueCount;
                  return (
                    <div
                      key={`avatar-${i}`}
                      className="w-5 h-7 sm:w-9 sm:h-12 flex items-center justify-center"
                    >
                      <img
                        src={`${baseUrl}images/donnons/${isBlue ? 'littleman_blue.png' : 'littleman_grey.png'}`}
                        alt={isBlue ? 'Blue donor' : 'Grey employee'}
                        className={`w-full h-full object-contain transition-all duration-150 ${
                          isBlue ? 'scale-110 sm:scale-125 drop-shadow-sm' : 'opacity-40 scale-100 sm:scale-110'
                        }`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Foreground Center White Cutout Square */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="bg-[#fffbf1] border-2 border-black px-4 py-2 sm:px-5 sm:py-2.5 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center justify-center pointer-events-auto">
                  <span className="text-[#0073e6] font-mono text-3xl sm:text-5xl font-black leading-none">
                    {livesSaved}
                  </span>
                  <span className="text-[#0073e6] font-mono text-xs sm:text-sm font-bold text-center leading-tight">
                    {isFrench ? 'Potentielles vies' : 'Potential lives'}<br />
                    {isFrench ? 'sauvées' : 'saved'}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Footnote */}
            <div className="w-full max-w-[460px] pt-2 flex items-center justify-end text-[11px] font-mono text-slate-500">
              <span className="font-bold text-[#0073e6]">
                {blueCount} / {totalGrid} {isFrench ? 'donneurs actifs' : 'active donors'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnonsWidgetSim;
