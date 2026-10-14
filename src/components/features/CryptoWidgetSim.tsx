import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  price: number;
  delta: string;
  isPositive: boolean;
  volume: number;
}

interface NewsCatalyst {
  id: number;
  index: number;
  symbol: string;
  badge: string;
  accentColor: string;
  time: string;
  tagFr: string;
  tagEn: string;
  line1Fr: string;
  line1En: string;
  line2Fr: string;
  line2En: string;
}

const CANDLE_DATA: CandlePoint[] = [
  { time: '09:00', open: 67960, high: 68020, low: 67790, close: 67840, price: 67840, delta: '-$120 (-0.18%)', isPositive: false, volume: 180 },
  { time: '09:15', open: 67840, high: 67980, low: 67810, close: 67920, price: 67920, delta: '+$80 (+0.12%)', isPositive: true, volume: 240 },
  { time: '09:30', open: 67920, high: 67960, low: 67770, close: 67810, price: 67810, delta: '-$110 (-0.16%)', isPositive: false, volume: 160 },
  { time: '09:45', open: 67810, high: 68130, low: 67790, close: 68050, price: 68050, delta: '+$240 (+0.35%)', isPositive: true, volume: 310 },
  { time: '10:00', open: 68050, high: 68240, low: 68020, close: 68180, price: 68180, delta: '+$130 (+0.19%)', isPositive: true, volume: 420 },
  { time: '10:15', open: 68180, high: 68230, low: 68080, close: 68120, price: 68120, delta: '-$60 (-0.09%)', isPositive: false, volume: 280 },
  { time: '10:30', open: 68120, high: 68410, low: 68100, close: 68340, price: 68340, delta: '+$220 (+0.32%)', isPositive: true, volume: 510 },
  { time: '10:45', open: 68340, high: 68380, low: 68240, close: 68290, price: 68290, delta: '-$50 (-0.07%)', isPositive: false, volume: 390 },
  { time: '11:00', open: 68290, high: 68510, low: 68260, close: 68450, price: 68450, delta: '+$160 (+0.23%)', isPositive: true, volume: 580 },
  { time: '11:15', open: 68450, high: 68490, low: 68360, close: 68410, price: 68410, delta: '-$40 (-0.06%)', isPositive: false, volume: 460 },
  { time: '11:30', open: 68410, high: 68580, low: 68380, close: 68520, price: 68520, delta: '+$110 (+0.16%)', isPositive: true, volume: 620 },
  { time: '11:45', open: 68520, high: 68560, low: 68440, close: 68492.30, price: 68492.30, delta: '-$27.70 (-0.04%)', isPositive: false, volume: 540 },
];

const NEWS_CATALYSTS: NewsCatalyst[] = [
  {
    id: 1,
    index: 3, // 09:45
    symbol: 'Ð',
    badge: 'DOGE',
    accentColor: '#F59E0B',
    time: '09:45',
    tagFr: 'PAIEMENTS X · 09:45',
    tagEn: 'X PAYMENTS · 09:45',
    line1Fr: 'Licence paiements crypto validée pour X',
    line1En: 'Crypto payments license approved for X',
    line2Fr: 'Rebond haussier sur Dogecoin ($DOGE)',
    line2En: 'Bullish bounce on Dogecoin ($DOGE)',
  },
  {
    id: 2,
    index: 8, // 11:00
    symbol: '🏛',
    badge: 'BANK',
    accentColor: '#38BDF8',
    time: '11:00',
    tagFr: 'WALL STREET · 11:00',
    tagEn: 'WALL STREET · 11:00',
    line1Fr: 'Morgan Stanley valide les ETF Bitcoin',
    line1En: 'Morgan Stanley approves Bitcoin ETFs',
    line2Fr: 'Accès ouvert à 15 000 conseillers',
    line2En: 'Access opened to 15,000 advisors',
  },
];

export const CryptoWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Chart Mode: Line vs Candlesticks
  const [chartMode, setChartMode] = useState<'line' | 'candles'>('line');

  // Live Price Simulation State
  const [livePrice, setLivePrice] = useState<number>(68492.30);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredNewsId, setHoveredNewsId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 28;
      setLivePrice((prev) => Number((prev + delta).toFixed(2)));
      setPriceChange((prev) => Number((prev + delta * 0.0003).toFixed(2)));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // SVG Chart Bounds & Coordinate Math
  const minPrice = 67600;
  const maxPrice = 68700;

  const svgWidth = 840;
  const svgHeight = 230;

  const getY = (p: number) => {
    return svgHeight - ((p - minPrice) / (maxPrice - minPrice)) * (svgHeight - 65) - 38;
  };

  const pointsString = CANDLE_DATA.map((pt, i) => {
    const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
    const y = getY(pt.price);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const areaString = `70,${svgHeight - 20} ${pointsString} ${svgWidth - 20},${svgHeight - 20}`;
  const displayedPrice = hoveredIndex !== null ? CANDLE_DATA[hoveredIndex].price : livePrice;

  // Horizontal mouse scrubbing calculation
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredNewsId !== null) return;
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
            <span className="hidden sm:inline-block text-[10px] bg-[#161F30] border border-[#273756] px-1.5 py-0.5 text-slate-300 font-semibold rounded-none">
              {isFrench ? 'PERPÉTUEL' : 'PERPETUAL'}
            </span>
          </div>

          <div className="flex items-baseline space-x-2 shrink-0">
            <span className="text-sm sm:text-lg font-bold text-slate-100 tracking-tight tabular-nums">
              ${displayedPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-[11px] sm:text-xs font-semibold tabular-nums ${
                (activePt ? activePt.isPositive : priceChange >= 0) ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {activePt ? activePt.delta : (priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`)}
            </span>
          </div>
        </div>

        {/* Minimalist Line / Candles Switcher */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setChartMode('line')}
              className={`px-2 py-0.5 sm:px-2.5 transition-all cursor-pointer ${
                chartMode === 'line'
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={isFrench ? 'Afficher graphique linéaire' : 'Show line chart'}
            >
              {isFrench ? 'Ligne' : 'Line'}
            </button>
            <button
              type="button"
              onClick={() => setChartMode('candles')}
              className={`px-2 py-0.5 sm:px-2.5 transition-all cursor-pointer ${
                chartMode === 'candles'
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={isFrench ? 'Afficher chandeliers japonais' : 'Show candlestick chart'}
            >
              {isFrench ? 'Bougies' : 'Candles'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Streamlined Financial Graph Area */}
      <div className="p-2.5 sm:p-4 space-y-2 bg-[#0B0E14] flex-1 flex flex-col justify-between">
        {/* Fixed Height Minimal Graph Legend Bar */}
        <div className="h-6 flex items-center justify-end gap-3 text-[10px] font-mono text-slate-400 border-b border-[#1E2638] pb-1.5 shrink-0 overflow-hidden whitespace-nowrap">
          {chartMode === 'line' ? (
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
              <span>{isFrench ? 'COURS (BTC)' : 'PRICE (BTC)'}</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-2.5 bg-emerald-400 inline-block" />
              <span className="w-1.5 h-2.5 bg-rose-500 inline-block" />
              <span>{isFrench ? 'CHANDELIERS (15M)' : 'CANDLES (15M)'}</span>
            </span>
          )}
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-0.5 bg-[#0052FF] inline-block" />
            <span>20-EMA</span>
          </span>
        </div>

        {/* Stable, Rock-Solid Responsive Height SVG Canvas */}
        <div
          className="relative w-full h-44 sm:h-64 md:h-72 bg-[#0E131E]/80 border border-[#1E2638] rounded-none overflow-hidden p-2 flex items-center justify-center cursor-crosshair shrink-0"
          onMouseMove={handleChartMouseMove}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setHoveredNewsId(null);
          }}
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
            {[68700, 68400, 68100, 67800, 67600].map((priceLevel) => {
              const y = getY(priceLevel);

              return (
                <g key={`grid-${priceLevel}`}>
                  <line
                    x1="65"
                    y1={y}
                    x2={svgWidth - 10}
                    y2={y}
                    stroke="#1E293B"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <text
                    x="10"
                    y={y + 3.5}
                    fill="#64748B"
                    fontSize="9.5"
                    fontFamily="monospace"
                  >
                    ${priceLevel.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* 20-EMA Secondary Trendline (Shown in both Line and Candlestick modes) */}
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

            {/* MODE 1: Line Chart View */}
            {chartMode === 'line' && (
              <g>
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

                {/* Static Data Nodes along the Price Line */}
                {CANDLE_DATA.map((pt, i) => {
                  const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
                  const y = getY(pt.price);

                  return (
                    <rect
                      key={`node-${i}`}
                      x={x - 2.5}
                      y={y - 2.5}
                      width={5}
                      height={5}
                      fill="#0B0E14"
                      stroke="#10b981"
                      strokeWidth="1.2"
                    />
                  );
                })}
              </g>
            )}

            {/* MODE 2: Candlestick Chart View */}
            {chartMode === 'candles' && (
              <g>
                {CANDLE_DATA.map((pt, i) => {
                  const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
                  const highY = getY(pt.high);
                  const lowY = getY(pt.low);
                  const openY = getY(pt.open);
                  const closeY = getY(pt.close);
                  const isUp = pt.close >= pt.open;
                  const color = isUp ? '#10B981' : '#F43F5E';
                  const candleWidth = 14;
                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(3, Math.abs(openY - closeY));

                  return (
                    <g key={`candle-${i}`}>
                      {/* Upper & Lower Wick */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      {/* Real Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                        stroke={color}
                        strokeWidth="0.8"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Distinct Event Pins on dedicated top rail (y = 22) with generous hover targets */}
            {NEWS_CATALYSTS.map((item) => {
              const candle = CANDLE_DATA[item.index];
              const x = (item.index / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
              const candleTopY = getY(candle.high);
              const pinY = 22;
              const isHovered = hoveredNewsId === item.id;
              const tooltipWidth = 240;
              const tooltipHeight = 55;
              const tooltipX = Math.max(70, Math.min(svgWidth - tooltipWidth - 20, x - tooltipWidth / 2));
              const tooltipY = 38;

              return (
                <g
                  key={`news-marker-${item.id}`}
                  className="cursor-pointer"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredNewsId(item.id);
                    setHoveredIndex(null);
                  }}
                  onMouseMove={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseLeave={() => {
                    setHoveredNewsId(null);
                  }}
                >
                  {/* Subtle vertical dashed anchor line down to candle top */}
                  <line
                    x1={x}
                    y1={pinY + 10}
                    x2={x}
                    y2={candleTopY}
                    stroke={item.accentColor}
                    strokeWidth="1.2"
                    strokeDasharray="2.5 2"
                    opacity={isHovered ? 0.95 : 0.45}
                  />

                  {/* Generous invisible hit target to prevent any mouse-out jitter (36px hitbox) */}
                  <circle
                    cx={x}
                    cy={pinY}
                    r="18"
                    fill="transparent"
                  />

                  {/* Pulsing subtle outer ring */}
                  <circle
                    cx={x}
                    cy={pinY}
                    r={isHovered ? 12 : 10.5}
                    fill="none"
                    stroke={item.accentColor}
                    strokeWidth="1"
                    opacity={isHovered ? 0.9 : 0.4}
                    className={isHovered ? '' : 'animate-ping'}
                    style={{ transformOrigin: `${x}px ${pinY}px`, animationDuration: '3.5s' }}
                  />

                  {/* Core interactive round badge */}
                  <circle
                    cx={x}
                    cy={pinY}
                    r={isHovered ? 9.5 : 8.5}
                    fill="#080D1A"
                    stroke={item.accentColor}
                    strokeWidth={isHovered ? 2 : 1.5}
                    className="transition-all duration-150"
                  />

                  {/* Inner Icon / Symbol */}
                  <text
                    x={x}
                    y={pinY + 3.5}
                    textAnchor="middle"
                    fill={item.accentColor}
                    fontSize={item.symbol === 'Ð' ? 10.5 : 9}
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {item.symbol}
                  </text>

                  {/* News Catalyst Floating Tooltip (seamlessly nested in the same group) */}
                  {isHovered && (
                    <g transform={`translate(${tooltipX}, ${tooltipY})`} className="pointer-events-none">
                      {/* Drop shadow background */}
                      <rect
                        x="0"
                        y="0"
                        width={tooltipWidth}
                        height={tooltipHeight}
                        fill="#060911"
                        stroke={item.accentColor}
                        strokeWidth="1.4"
                        className="filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)]"
                      />
                      {/* Left colored accent bar */}
                      <rect x="0" y="0" width="3.5" height={tooltipHeight} fill={item.accentColor} />

                      {/* Header Tag */}
                      <text x="12" y="15" fill={item.accentColor} fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                        {item.symbol} · {isFrench ? item.tagFr : item.tagEn}
                      </text>

                      {/* Line 1 (Headline) */}
                      <text x="12" y="30" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" fontWeight="600">
                        {isFrench ? item.line1Fr : item.line1En}
                      </text>

                      {/* Line 2 (Detail) */}
                      <text x="12" y="44" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">
                        {isFrench ? item.line2Fr : item.line2En}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Dynamic Interactive Crosshair and Price Tooltip (only when not hovering news marker) */}
            {hoveredIndex !== null && activePt && hoveredNewsId === null && (
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

                {/* 4. Enhanced Floating HUD Tooltip Badge */}
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

