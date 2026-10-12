import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Info } from 'lucide-react';

export const DonnonsWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Live participation slider state (default 50% from the real HUG campaign)
  const [participationPct, setParticipationPct] = useState<number>(50);
  const [isRobyHovered, setIsRobyHovered] = useState<boolean>(false);
  const [isRobyClicked, setIsRobyClicked] = useState<boolean>(false);

  const totalGrid = 90; // 15 columns x 6 rows
  const blueCount = Math.round((participationPct / 100) * totalGrid);
  const livesSaved = Math.round(participationPct * 2.6); // 50% -> 130 lives
  const robyIndex = 3; // Position of Roby mascot in the grid

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-[#fffbf1] border-2 border-black shadow-[4px_4px_0px_0px_#000] text-black rounded-none overflow-hidden select-none font-sans">
      {/* Official Academic Banner */}
      <div className="bg-[#0073e6] text-white px-4 py-2 text-xs font-mono font-semibold flex items-center justify-between border-b-2 border-black">
        <span>
          {isFrench
            ? 'Ceci est un projet réalisé dans un cadre académique pour les HUG. N\'organisez pas de collecte ;)'
            : 'Academic diploma project engineered for Geneva University Hospitals (HUG).'}
        </span>
        <span className="hidden sm:inline-block px-1.5 py-0.2 bg-blue-900 border border-blue-400 text-[10px]">
          GENÈVE
        </span>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Stats & Slider */}
          <div className="lg:col-span-6 space-y-6">
            {/* Real Yellow Squares Image from sixieme_sens-main */}
            <div>
              <img
                src={`${baseUrl}images/donnons/YellowSquares.png`}
                alt="Squares"
                className="h-5 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Main Campaign Headline */}
            <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-[1.1] font-mono">
              {isFrench
                ? 'Mobilisez votre équipe pour sauver des vies !'
                : 'Engage your team to save lives!'}
            </h3>

            {/* Main Stats Display */}
            <div className="flex flex-row items-center gap-3">
              <div className="text-4xl sm:text-6xl font-black text-[#0073e6] font-mono leading-none">
                {participationPct}%
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="text-sm sm:text-lg font-bold text-black font-mono leading-tight">
                  {isFrench ? 'de participation,' : 'participation,'}
                </span>
                <span className="text-sm sm:text-lg font-bold text-black font-mono leading-tight flex items-center gap-1.5">
                  <span className="text-[#0073e6]">{livesSaved}</span>{' '}
                  <span>{isFrench ? 'vies sauvées.' : 'lives saved.'}</span>
                  <span title={isFrench ? 'Un don de sang peut sauver jusqu\'à 3 vies' : 'One donation can save up to 3 lives'}>
                    <Info className="w-3.5 h-3.5 text-slate-500 hover:text-[#0073e6] cursor-help" />
                  </span>
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
                <span>10% (Min)</span>
                <span>50% (Moyenne HUG)</span>
                <span>100% (Objectif)</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-[#0073e6] text-white font-mono text-sm sm:text-base font-bold px-6 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#0073e6]/90 transition-all cursor-pointer"
              >
                <span>{isFrench ? 'Organiser une collecte' : 'Schedule a blood drive'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic LittleMen Grid & Bouncing Roby Mascot */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[420px] bg-white border-2 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000]">
              {/* Background Grid: 90 Avatars using real littleman_blue and littleman_grey */}
              <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5 sm:gap-2 justify-items-center">
                {Array.from({ length: totalGrid }).map((_, i) => {
                  // Roby mascot position
                  if (i === robyIndex) {
                    return (
                      <div
                        key={`roby-${i}`}
                        className="relative w-5 h-7 sm:w-6 sm:h-8 flex items-center justify-center cursor-pointer z-20"
                        onMouseEnter={() => setIsRobyHovered(true)}
                        onMouseLeave={() => setIsRobyHovered(false)}
                        onClick={() => setIsRobyClicked((prev) => !prev)}
                      >
                        <img
                          src={`${baseUrl}images/donnons/dono_default.png`}
                          alt="Roby"
                          className="w-full h-full object-contain animate-bounce cursor-pointer hover:scale-125 transition-transform origin-bottom"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {/* Speech Bubble */}
                        {(isRobyHovered || isRobyClicked) && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0073e6] text-white font-mono text-[11px] font-bold px-2 py-1 border-2 border-black whitespace-nowrap shadow-[3px_3px_0px_0px_#000] pointer-events-none z-50">
                            {isFrench ? "Tu m'as trouvé !" : 'You found me!'}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Active vs Non-active littleman
                  const isBlue = i <= blueCount;
                  return (
                    <div key={`avatar-${i}`} className="w-5 h-7 sm:w-6 sm:h-8 flex items-center justify-center">
                      <img
                        src={`${baseUrl}images/donnons/${isBlue ? 'littleman_blue.png' : 'littleman_grey.png'}`}
                        alt={isBlue ? 'Blue donor' : 'Grey employee'}
                        className={`w-full h-full object-contain transition-all duration-150 ${
                          isBlue ? 'scale-110 drop-shadow-sm' : 'opacity-50'
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
                <div className="bg-[#fffbf1] border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center justify-center pointer-events-auto">
                  <span className="text-[#0073e6] font-mono text-3xl sm:text-4xl font-black leading-none">
                    {livesSaved}
                  </span>
                  <span className="text-[#0073e6] font-mono text-[11px] sm:text-xs font-bold text-center leading-tight">
                    {isFrench ? 'Potentielles vies' : 'Potential lives'}<br />
                    {isFrench ? 'sauvées' : 'saved'}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Footnote */}
            <div className="w-full max-w-[420px] pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>{isFrench ? 'Simulation d\'impact HUG' : 'HUG Impact Simulation'}</span>
              </span>
              <span>{blueCount} / {totalGrid} {isFrench ? 'donneurs' : 'donors'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnonsWidgetSim;
