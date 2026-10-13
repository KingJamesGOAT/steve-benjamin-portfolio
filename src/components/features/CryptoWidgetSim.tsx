import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CandlePoint {
  time: string;
  price: number;
  delta: string;
  isPositive: boolean;
  volume: number;
}

const CANDLE_DATA: CandlePoint[] = [
  { time: '09:00', price: 67840, delta: '-$120 (-0.18%)', isPositive: false, volume: 180 },
  { time: '09:15', price: 67920, delta: '+$80 (+0.12%)', isPositive: true, volume: 240 },
  { time: '09:30', price: 67810, delta: '-$110 (-0.16%)', isPositive: false, volume: 160 },
  { time: '09:45', price: 68050, delta: '+$240 (+0.35%)', isPositive: true, volume: 310 },
  { time: '10:00', price: 68180, delta: '+$130 (+0.19%)', isPositive: true, volume: 420 },
  { time: '10:15', price: 68120, delta: '-$60 (-0.09%)', isPositive: false, volume: 280 },
  { time: '10:30', price: 68340, delta: '+$220 (+0.32%)', isPositive: true, volume: 510 },
  { time: '10:45', price: 68290, delta: '-$50 (-0.07%)', isPositive: false, volume: 390 },
  { time: '11:00', price: 68450, delta: '+$160 (+0.23%)', isPositive: true, volume: 580 },
  { time: '11:15', price: 68410, delta: '-$40 (-0.06%)', isPositive: false, volume: 460 },
  { time: '11:30', price: 68520, delta: '+$110 (+0.16%)', isPositive: true, volume: 620 },
  { time: '11:45', price: 68492.30, delta: '-$27.70 (-0.04%)', isPositive: false, volume: 540 },
];

export const CryptoWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Live Price Simulation State
  const [livePrice, setLivePrice] = useState<number>(68492.30);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 28;
      setLivePrice((prev) => Number((prev + delta).toFixed(2)));
      setPriceChange((prev) => Number((prev + delta * 0.0003).toFixed(2)));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // SVG Chart Bounds & Coordinate Math (~10% larger chart height)
  const minPrice = 67600;
  const maxPrice = 68700;
  const breakoutPrice = 68340;
  const trailingStopPrice = 68120;
  const maxVolume = 700;

  const svgWidth = 840;
  const svgHeight = 230;

  const getY = (p: number) => {
    return svgHeight - ((p - minPrice) / (maxPrice - minPrice)) * (svgHeight - 65) - 38;
  };

  const breakoutY = getY(breakoutPrice);
  const trailingStopY = getY(trailingStopPrice);

  const pointsString = CANDLE_DATA.map((pt, i) => {
    const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
    const y = getY(pt.price);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const areaString = `70,${svgHeight - 20} ${pointsString} ${svgWidth - 20},${svgHeight - 20}`;
  const displayedPrice = hoveredIndex !== null ? CANDLE_DATA[hoveredIndex].price : livePrice;

  // Horizontal mouse scrubbing calculation
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * svgWidth;
    const minX = 70;
    const maxX = svgWidth - 20; // 820
    const ratio = Math.max(0, Math.min(1, (svgX - minX) / (maxX - minX)));
    const nearestIndex = Math.round(ratio * (CANDLE_DATA.length - 1));
    setHoveredIndex(nearestIndex);
  };

  const activePt = hoveredIndex !== null ? CANDLE_DATA[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? (hoveredIndex / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70 : 0;
  const activeY = activePt ? getY(activePt.price) : 0;

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] text-slate-200 rounded-none font-sans shadow-2xl overflow-hidden select-none flex flex-col">
      {/* 1. Header Bar: Fixed 48px height, whitespace-nowrap to prevent vertical expansion */}
      <div className="bg-[#111622] border-b border-[#1E2638] px-4 sm:px-5 h-12 flex items-center justify-between gap-3 font-mono text-xs overflow-hidden shrink-0 whitespace-nowrap">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="font-bold text-slate-100 tracking-wider text-xs sm:text-sm">BTC/USDT</span>
            <span className="text-[10px] bg-[#161F30] border border-[#273756] px-1.5 py-0.5 text-slate-300 font-semibold rounded-none">
              {isFrench ? 'PERPÉTUEL' : 'PERPETUAL'}
            </span>
          </div>

          <div className="flex items-baseline space-x-2 shrink-0">
            <span className="text-base sm:text-lg font-bold text-slate-100 tracking-tight tabular-nums">
              ${displayedPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-xs font-semibold tabular-nums ${
                (activePt ? activePt.isPositive : priceChange >= 0) ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {activePt ? activePt.delta : (priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px] shrink-0">
          <div className="hidden sm:flex items-center space-x-1.5 text-slate-400">
            <span>{isFrench ? 'RÉGIME :' : 'REGIME:'}</span>
            <span className="text-blue-400 font-bold">
              {isFrench ? 'DIRECTIONNEL (ADX 28.4)' : 'TRENDING (ADX 28.4)'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/70 border border-emerald-800 text-emerald-400 rounded-none text-[10px] font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>{isFrench ? 'EN LIGNE' : 'ONLINE'}</span>
          </div>
        </div>
      </div>

      {/* 2. Streamlined Financial Graph Area */}
      <div className="p-3 sm:p-4 space-y-2 bg-[#0B0E14] flex-1 flex flex-col justify-between">
        {/* Fixed Height Minimal Graph Legend Bar */}
        <div className="h-7 flex items-center justify-between gap-2 text-[10.5px] font-mono text-slate-400 border-b border-[#1E2638] pb-1.5 shrink-0 overflow-hidden whitespace-nowrap">
          <div className="flex items-center space-x-2 text-slate-300 shrink-0">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
              {isFrench ? 'TÉLÉMÉTRIE D\'EXÉCUTION 15M' : '15M EXECUTION TELEMETRY'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] shrink-0">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-0.5 bg-emerald-400 inline-block" />
              <span>{isFrench ? 'COURS' : 'MARK'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-0.5 bg-[#0052FF] inline-block" />
              <span>20-EMA</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-0.5 bg-emerald-500 border-b border-dashed border-emerald-400 inline-block" />
              <span>{isFrench ? 'CASSURE (68 340 $)' : 'BREAKOUT ($68,340)'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-0.5 bg-amber-500 inline-block" />
              <span>{isFrench ? 'TRAIL STOP (68 120 $)' : 'TRAIL STOP ($68,120)'}</span>
            </span>
          </div>
        </div>

        {/* Stable, Rock-Solid Fixed Height SVG Canvas */}
        <div
          className="relative w-full h-56 sm:h-64 md:h-72 bg-[#0E131E]/80 border border-[#1E2638] rounded-none overflow-hidden p-2 flex items-center justify-center cursor-crosshair shrink-0"
          onMouseMove={handleChartMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full block overflow-hidden"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mainAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Y-Axis Horizontal Grid Lines & Price Labels */}
            {[68700, 68340, 68120, 67800, 67600].map((priceLevel) => {
              const y = getY(priceLevel);
              const isBreakout = priceLevel === 68340;
              const isTrailing = priceLevel === 68120;

              return (
                <g key={`grid-${priceLevel}`}>
                  <line
                    x1="65"
                    y1={y}
                    x2={svgWidth - 10}
                    y2={y}
                    stroke={
                      isBreakout
                        ? '#10b981'
                        : isTrailing
                        ? '#f59e0b'
                        : '#1E293B'
                    }
                    strokeWidth={isBreakout || isTrailing ? '1.2' : '0.8'}
                    strokeDasharray={isBreakout ? '4 3' : isTrailing ? '3 3' : 'none'}
                    opacity={isBreakout || isTrailing ? '0.75' : '0.35'}
                  />
                  <text
                    x="10"
                    y={y + 3.5}
                    fill={
                      isBreakout
                        ? '#34d399'
                        : isTrailing
                        ? '#fbbf24'
                        : '#64748B'
                    }
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight={isBreakout || isTrailing ? 'bold' : 'normal'}
                  >
                    ${priceLevel.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Reference Line Badges inside Chart Canvas */}
            <g transform={`translate(${svgWidth - 200}, ${breakoutY - 6})`}>
              <rect x="0" y="-8" width="185" height="14" fill="#0B132B" stroke="#10b981" strokeWidth="0.8" />
              <text x="6" y="2" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
                {isFrench ? 'SOMMET DONCHIAN (68 340 $)' : 'DONCHIAN HIGH ($68,340)'}
              </text>
            </g>

            <g transform={`translate(${svgWidth - 200}, ${trailingStopY - 6})`}>
              <rect x="0" y="-8" width="185" height="14" fill="#1C1408" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="6" y="2" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="bold">
                {isFrench ? 'TRAILING STOP (68 120 $)' : 'TRAILING STOP ($68,120)'}
              </text>
            </g>

            {/* Volume Histogram Bars along the base */}
            {CANDLE_DATA.map((pt, i) => {
              const barWidth = 14;
              const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70 - barWidth / 2;
              const barHeight = (pt.volume / maxVolume) * 34;
              const y = svgHeight - 20 - barHeight;
              const isHovered = hoveredIndex === i;

              return (
                <rect
                  key={`vol-${i}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHovered ? '#38BDF8' : pt.volume > 450 ? '#10b981' : '#1E293B'}
                  opacity={hoveredIndex === null ? (pt.volume > 450 ? '0.85' : '0.6') : isHovered ? '1' : '0.25'}
                  className="transition-all duration-100"
                />
              );
            })}

            {/* Area Fill */}
            <polygon points={areaString} fill="url(#mainAreaGrad)" />

            {/* Main Price Line */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              points={pointsString}
            />

            {/* 20-EMA Secondary Trendline */}
            <polyline
              fill="none"
              stroke="#0052FF"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.85"
              points={CANDLE_DATA.map((pt, i) => {
                const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
                const emaY = getY(pt.price * 0.9968);
                return `${x.toFixed(1)},${emaY.toFixed(1)}`;
              }).join(' ')}
            />

            {/* Static Data Nodes along the Price Line */}
            {CANDLE_DATA.map((pt, i) => {
              const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
              const y = getY(pt.price);
              const isBreakoutPoint = i === 6; // 10:30 candle
              const isTrailingRatchetPoint = i === 10; // 11:30 candle

              return (
                <g key={`node-${i}`}>
                  <rect
                    x={x - 3}
                    y={y - 3}
                    width={6}
                    height={6}
                    fill={isBreakoutPoint ? '#10b981' : '#0B0E14'}
                    stroke={isBreakoutPoint ? '#34d399' : '#10b981'}
                    strokeWidth="1.5"
                  />

                  {/* Marker Pin at Breakout Point */}
                  {isBreakoutPoint && hoveredIndex !== i && (
                    <g transform={`translate(${x - 30}, ${y - 16})`}>
                      <rect x="0" y="0" width="60" height="11" fill="#064E3B" stroke="#10b981" strokeWidth="0.6" />
                      <text x="4" y="8.5" fill="#A7F3D0" fontSize="7" fontFamily="monospace" fontWeight="bold">
                        {isFrench ? 'ACHAT (LONG)' : 'LONG ENTRY'}
                      </text>
                    </g>
                  )}

                  {/* Marker Pin at Trailing Stop Ratchet */}
                  {isTrailingRatchetPoint && hoveredIndex !== i && (
                    <g transform={`translate(${x - 34}, ${y - 16})`}>
                      <rect x="0" y="0" width="68" height="11" fill="#78350F" stroke="#f59e0b" strokeWidth="0.6" />
                      <text x="4" y="8.5" fill="#FDE68A" fontSize="7" fontFamily="monospace" fontWeight="bold">
                        {isFrench ? 'HAUSSE STOP' : 'STOP RATCHET'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Dynamic Interactive Elements When Hovered */}
            {hoveredIndex !== null && activePt && (
              <g className="pointer-events-none">
                {/* 1. Full Vertical Crosshair Guide Line */}
                <line
                  x1={activeX}
                  y1={15}
                  x2={activeX}
                  y2={svgHeight - 20}
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.85"
                />

                {/* 2. Horizontal Axis Guide Line */}
                <line
                  x1={65}
                  y1={activeY}
                  x2={activeX}
                  y2={activeY}
                  stroke="#60A5FA"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />

                {/* 3. Pulsing Active Node Rings */}
                <circle
                  cx={activeX}
                  cy={activeY}
                  r="8.5"
                  fill="#0052FF"
                  fillOpacity="0.3"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                <circle
                  cx={activeX}
                  cy={activeY}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#0052FF"
                  strokeWidth="2"
                />

                {/* 4. Enhanced Floating HUD Tooltip Badge (~20% larger, high-legibility) */}
                {(() => {
                  const tooltipWidth = 152;
                  const tooltipHeight = 52;
                  const isFarRight = activeX > svgWidth - 190;
                  const isFarLeft = activeX < 200;
                  const tooltipX = isFarRight ? activeX - tooltipWidth - 12 : isFarLeft ? activeX + 14 : activeX - tooltipWidth / 2;
                  const tooltipY = activeY > 65 ? activeY - tooltipHeight - 12 : activeY + 14;

                  return (
                    <g transform={`translate(${tooltipX}, ${tooltipY})`}>
                      <rect
                        x="0"
                        y="0"
                        width={tooltipWidth}
                        height={tooltipHeight}
                        fill="#070A10"
                        stroke="#273756"
                        strokeWidth="1.2"
                        className="filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
                      />
                      <rect
                        x="0"
                        y="0"
                        width="3.5"
                        height={tooltipHeight}
                        fill={activePt.isPositive ? '#10B981' : '#F43F5E'}
                      />
                      <text x="12" y="15" fill="#94A3B8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        {activePt.time} UTC · {activePt.volume} BTC
                      </text>
                      <text x="12" y="32" fill="#F8FAFC" fontSize="13" fontFamily="monospace" fontWeight="bold">
                        ${activePt.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </text>
                      <text
                        x="12"
                        y="45"
                        fill={activePt.isPositive ? '#34D399' : '#FB7185'}
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="semibold"
                      >
                        {activePt.delta}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* X-Axis Time Labels */}
            {CANDLE_DATA.map((pt, i) => {
              const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
              const isHovered = hoveredIndex === i;

              // Render labels every other point or when hovered
              if (i % 2 !== 0 && !isHovered) return null;

              return (
                <text
                  key={`time-${i}`}
                  x={x}
                  y={svgHeight - 5}
                  textAnchor="middle"
                  fill={isHovered ? '#60a5fa' : '#64748B'}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {pt.time}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3. Fixed Height Monospace Telemetry Footer Strip */}
      <div className="bg-[#0C101A] px-4 sm:px-5 h-8 border-t border-[#1E2638] flex items-center justify-between gap-2.5 text-[10px] font-mono text-slate-500 overflow-hidden shrink-0 whitespace-nowrap">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span>{isFrench ? 'VOL 24H : 12.65B $' : '24H VOL: $12.65B'}</span>
          <span className="hidden sm:inline">{isFrench ? 'ÉCART : 0.01%' : 'SPREAD: 0.01%'}</span>
          <span className="hidden sm:inline">{isFrench ? 'GLISSEMENT : 0.002%' : 'SLIPPAGE: 0.002%'}</span>
          <span className="hidden sm:inline">{isFrench ? 'INTERVALLE : 15M' : 'INTERVAL: 15M'}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>{isFrench ? 'FLUX WEBSOCKET BINANCE' : 'BINANCE WEBSOCKET FEED'}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
