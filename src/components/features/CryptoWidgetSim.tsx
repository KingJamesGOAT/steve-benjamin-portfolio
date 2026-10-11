import React, { useState, useEffect } from 'react';
import { Activity, Shield, Terminal, BarChart2, Layers, Crosshair } from 'lucide-react';

interface CandleTelemetry {
  time: string;
  price: number;
  delta: string;
  isPositive: boolean;
  volume: number;
  surge: string;
  statusBadge: string;
  badgeColor: string;
  title: string;
  line1: string;
  line2: string;
  line3: string;
}

const CANDLE_DATA: CandleTelemetry[] = [
  {
    time: '09:00',
    price: 67840,
    delta: '-$120 (-0.18%)',
    isPositive: false,
    volume: 180,
    surge: '1.0x 20-MA baseline',
    statusBadge: 'EQUILIBRIUM',
    badgeColor: 'text-slate-400 border-slate-700 bg-slate-800',
    title: 'Neutral Range Baseline',
    line1: 'Market operating in low-volatility equilibrium within the baseline 20-EMA channel.',
    line2: 'Dynamic Grid module initiates resting limit bid ladders at support intervals.',
    line3: 'ADX registered at 18.2, confirming absence of directional momentum.',
  },
  {
    time: '09:15',
    price: 67920,
    delta: '+$80 (+0.12%)',
    isPositive: true,
    volume: 240,
    surge: '1.1x 20-MA baseline',
    statusBadge: 'COMPRESSION',
    badgeColor: 'text-blue-400 border-blue-800 bg-blue-950/60',
    title: 'Bollinger Band Squeeze',
    line1: 'Volatility contraction detected as price consolidates near the 20-EMA midpoint.',
    line2: 'Bid-ask spread tightens to 0.008% across high-liquidity orderbook books.',
    line3: 'Algorithmic models flag high probability of directional momentum expansion.',
  },
  {
    time: '09:30',
    price: 67810,
    delta: '-$110 (-0.16%)',
    isPositive: false,
    volume: 160,
    surge: '0.9x 20-MA baseline',
    statusBadge: 'GRID FILL',
    badgeColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/60',
    title: 'Support Test & Grid Accumulation',
    line1: 'Pullback tests the lower support band ($67,800); dynamic grid fills 0.15 BTC limit bid.',
    line2: 'Orderbook depth absorbs spot market sell pressure without structural breakdown.',
    line3: 'Protective stop-loss maintained at -1.5% distance below swing low.',
  },
  {
    time: '09:45',
    price: 68050,
    delta: '+$240 (+0.35%)',
    isPositive: true,
    volume: 310,
    surge: '1.4x 20-MA baseline',
    statusBadge: 'BID DENSITY',
    badgeColor: 'text-blue-400 border-blue-800 bg-blue-950/60',
    title: 'Institutional Bid Density Surge',
    line1: 'Heavy spot limit bidding detected in Binance WebSocket orderbook telemetry.',
    line2: 'Price ascends through the 20-EMA with accelerating candle tick velocity.',
    line3: 'Smart Momentum engine prepares breakout thresholds for evaluation.',
  },
  {
    time: '10:00',
    price: 68180,
    delta: '+$130 (+0.19%)',
    isPositive: true,
    volume: 420,
    surge: '1.7x 20-MA baseline',
    statusBadge: 'TREND GATE',
    badgeColor: 'text-purple-400 border-purple-800 bg-purple-950/60',
    title: 'ADX Trend Gate Approaching 25',
    line1: 'ADX indicator crosses 22.5, signalling market transition from chop into trend.',
    line2: 'Dynamic Grid cancels short ladder orders to prevent counter-trend execution.',
    line3: 'Upper Donchian resistance benchmark established at $68,340.',
  },
  {
    time: '10:15',
    price: 68120,
    delta: '-$60 (-0.09%)',
    isPositive: false,
    volume: 280,
    surge: '1.2x 20-MA baseline',
    statusBadge: 'ABSORPTION',
    badgeColor: 'text-slate-400 border-slate-700 bg-slate-800',
    title: 'Pre-Breakout Volume Absorption',
    line1: 'Minor retest of ascending 20-EMA support ($68,100) holds with zero slippage.',
    line2: 'Orderbook bid/ask ratio expands to 2.4:1 in favor of institutional buyers.',
    line3: 'Algorithmic state changes to Pre-Arm Breakout awaiting candle confirmation.',
  },
  {
    time: '10:30',
    price: 68340,
    delta: '+$220 (+0.32%)',
    isPositive: true,
    volume: 510,
    surge: '2.1x 20-MA abnormal volume',
    statusBadge: 'BREAKOUT FILLED',
    badgeColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/70',
    title: 'Donchian 20-High Breakout Execution',
    line1: 'Price breaches the 20-candle Donchian ceiling ($68,340) on confirmed 2.1x volume surge.',
    line2: 'Execution engine fires automated Long vector with fractional Kelly 2.0% sizing.',
    line3: 'Initial hard protective stop-loss locked at $67,800 to cap trade downside.',
  },
  {
    time: '10:45',
    price: 68290,
    delta: '-$50 (-0.07%)',
    isPositive: false,
    volume: 390,
    surge: '1.5x 20-MA baseline',
    statusBadge: 'VERIFICATION',
    badgeColor: 'text-blue-400 border-blue-800 bg-blue-950/60',
    title: 'Post-Breakout Benchmark Verification',
    line1: 'Immediate retest of former breakout resistance ($68,300) confirms role reversal into support.',
    line2: 'High-speed orderbook fills show aggressive market buy absorption of profit-taking.',
    line3: 'ADX surges to 26.8, officially validating trending regime confirmation.',
  },
  {
    time: '11:00',
    price: 68450,
    delta: '+$160 (+0.23%)',
    isPositive: true,
    volume: 580,
    surge: '2.3x 20-MA abnormal volume',
    statusBadge: 'MOMENTUM ACCEL',
    badgeColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/70',
    title: 'Trend Acceleration & EMA Support',
    line1: 'Ascending 20-EMA acts as dynamic upward floor; MACD histogram expands positively.',
    line2: 'Aggressive momentum long vector accumulates +$110.00 in floating mark-to-market profit.',
    line3: 'Groq LLaMA 3.3 sentiment synthesis scores macro inflow environment at +0.68 Bullish.',
  },
  {
    time: '11:15',
    price: 68410,
    delta: '-$40 (-0.06%)',
    isPositive: false,
    volume: 460,
    surge: '1.8x 20-MA baseline',
    statusBadge: 'FLOOR TEST',
    badgeColor: 'text-blue-400 border-blue-800 bg-blue-950/60',
    title: 'Dynamic Floor Re-Evaluation',
    line1: 'Healthy shallow pullback safely respects the rising 20-EMA curve without divergence.',
    line2: 'Cross-broker arbitrage telemetry confirms uniform liquidity across major spot pairs.',
    line3: 'Risk governor begins calculating trailing stop-loss ratchet threshold.',
  },
  {
    time: '11:30',
    price: 68520,
    delta: '+$110 (+0.16%)',
    isPositive: true,
    volume: 620,
    surge: '2.5x 20-MA abnormal volume',
    statusBadge: 'STOP RATCHET',
    badgeColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/70',
    title: 'Trailing Stop-Loss Ratchet Active',
    line1: 'Protective safety floor dynamically elevated from $67,800 to $68,120.00.',
    line2: 'Trade transitions into protected profit status; zero downside risk remains on capital.',
    line3: 'Strategy permits position to ride upward trend until structural breakdown occurs.',
  },
  {
    time: '11:45',
    price: 68492.30,
    delta: '-$27.70 (-0.04%)',
    isPositive: false,
    volume: 540,
    surge: '2.1x 20-MA baseline',
    statusBadge: 'LIVE MARK',
    badgeColor: 'text-emerald-400 border-emerald-800 bg-emerald-950/70',
    title: 'Current Live Candle Telemetry',
    line1: 'Active market candle. Position holds +$152.30 in unrealized mark-to-market gains.',
    line2: 'ADX stable at 28.4 confirming persistent trend strength with zero exhaustion signals.',
    line3: 'Orderbook scanning continuously for upper profit take-profit expansion targets.',
  },
];

export const CryptoWidgetSim: React.FC = () => {
  // Live Price State
  const [livePrice, setLivePrice] = useState<number>(68492.30);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Active Candle: Hovered one or default to the latest (11:45)
  const activeCandle = hoveredIndex !== null ? CANDLE_DATA[hoveredIndex] : CANDLE_DATA[CANDLE_DATA.length - 1];

  // Subtle live tick loop
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 28;
      setLivePrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        return next;
      });
      setPriceChange((prev) => Number((prev + delta * 0.0003).toFixed(2)));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // SVG Dimensions & Bounds
  const minPrice = 67600;
  const maxPrice = 68700;
  const breakoutPrice = 68340;
  const trailingStopPrice = 68120;
  const maxVolume = 700;

  const svgWidth = 840;
  const svgHeight = 260;

  const getY = (p: number) => {
    return svgHeight - ((p - minPrice) / (maxPrice - minPrice)) * (svgHeight - 70) - 45;
  };

  const breakoutY = getY(breakoutPrice);
  const trailingStopY = getY(trailingStopPrice);

  const pointsString = CANDLE_DATA.map((pt, i) => {
    const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
    const y = getY(pt.price);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const areaString = `70,${svgHeight - 20} ${pointsString} ${svgWidth - 20},${svgHeight - 20}`;

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] text-slate-200 rounded-none font-sans shadow-2xl overflow-hidden select-none">
      {/* 1. Header Bar: Ticker, Live Price & System Status */}
      <div className="bg-[#111622] border-b border-[#1E2638] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-100 tracking-wider text-sm">BTC/USDT</span>
            <span className="text-[10px] bg-[#161F30] border border-[#273756] px-1.5 py-0.5 text-slate-300 font-semibold rounded-none">
              PERPETUAL
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight tabular-nums">
              ${(hoveredIndex !== null ? activeCandle.price : livePrice).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-xs font-semibold ${
                priceChange >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <div className="hidden sm:flex items-center space-x-2 text-slate-400">
            <span>REGIME:</span>
            <span className="text-blue-400 font-bold">TRENDING (ADX 28.4)</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-950/70 border border-emerald-800 text-emerald-400 rounded-none text-[10px] font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* 2. Expanded Financial Graph with Explicit Price Scale & Legend */}
      <div className="p-4 sm:p-6 space-y-3 bg-[#0B0E14]">
        {/* Graph Legend & Explanation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400 border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold uppercase tracking-wider">
              QUANTITATIVE EXECUTION CHART (15M OHLC + STRUCTURAL TIERS)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px]">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
              <span>MARK PRICE</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-[#0052FF] inline-block" />
              <span>20-EMA FLOOR</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-emerald-500 border-b border-dashed border-emerald-400 inline-block" />
              <span>DONCHIAN 20-HIGH ($68,340)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-amber-500 inline-block" />
              <span>TRAILING STOP ($68,120)</span>
            </span>
          </div>
        </div>

        {/* Large SVG Chart with Y-Axis, Reference Levels, Volume Bars & Hover Trigger */}
        <div
          className="relative w-full h-64 sm:h-72 bg-[#0E131E]/80 border border-[#1E2638] rounded-none overflow-hidden p-2 flex items-center justify-center cursor-crosshair"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mainAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
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
                    opacity={isBreakout || isTrailing ? '0.75' : '0.4'}
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
            <g transform={`translate(${svgWidth - 210}, ${breakoutY - 6})`}>
              <rect x="0" y="-8" width="195" height="15" fill="#0B132B" stroke="#10b981" strokeWidth="0.8" />
              <text x="6" y="2" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                DONCHIAN 20-HIGH BREAKOUT ($68,340)
              </text>
            </g>

            <g transform={`translate(${svgWidth - 210}, ${trailingStopY - 6})`}>
              <rect x="0" y="-8" width="195" height="15" fill="#1C1408" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="6" y="2" fill="#fbbf24" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                TRAILING STOP LOSS FLOOR ($68,120)
              </text>
            </g>

            {/* Volume Histogram Bars along the base */}
            {CANDLE_DATA.map((pt, i) => {
              const barWidth = 14;
              const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70 - barWidth / 2;
              const barHeight = (pt.volume / maxVolume) * 36;
              const y = svgHeight - 20 - barHeight;
              const isHovered = hoveredIndex === i;

              return (
                <rect
                  key={`vol-${i}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHovered ? '#3b82f6' : pt.volume > 450 ? '#10b981' : '#1E293B'}
                  opacity={isHovered ? '1' : '0.75'}
                  className="transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                />
              );
            })}

            {/* Area Fill */}
            <polygon points={areaString} fill="url(#mainAreaGrad)" />

            {/* Main Price Line */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.4"
              strokeLinecap="square"
              strokeLinejoin="miter"
              points={pointsString}
            />

            {/* 20-EMA Secondary Trendline */}
            <polyline
              fill="none"
              stroke="#0052FF"
              strokeWidth="1.6"
              strokeDasharray="4 3"
              opacity="0.85"
              points={CANDLE_DATA.map((pt, i) => {
                const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
                const emaY = getY(pt.price * 0.9968);
                return `${x.toFixed(1)},${emaY.toFixed(1)}`;
              }).join(' ')}
            />

            {/* Interactive Data Nodes along the Price Line */}
            {CANDLE_DATA.map((pt, i) => {
              const x = (i / (CANDLE_DATA.length - 1)) * (svgWidth - 90) + 70;
              const y = getY(pt.price);
              const isHovered = hoveredIndex === i;
              const isBreakoutPoint = i === 6; // 10:30 candle
              const isTrailingRatchetPoint = i === 10; // 11:30 candle

              return (
                <g key={`node-${i}`} onMouseEnter={() => setHoveredIndex(i)} className="cursor-pointer">
                  {/* Subtle vertical crosshair guide line when hovered */}
                  {isHovered && (
                    <line
                      x1={x}
                      y1="20"
                      x2={x}
                      y2={svgHeight - 20}
                      stroke="#3b82f6"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  <rect
                    x={x - (isHovered ? 5 : 3.5)}
                    y={y - (isHovered ? 5 : 3.5)}
                    width={isHovered ? 10 : 7}
                    height={isHovered ? 10 : 7}
                    fill={isHovered ? '#3b82f6' : isBreakoutPoint ? '#10b981' : '#0B0E14'}
                    stroke={isHovered ? '#ffffff' : isBreakoutPoint ? '#34d399' : '#10b981'}
                    strokeWidth={isHovered ? '2' : '1.5'}
                    className="transition-all"
                  />

                  {/* Marker Pin at Breakout Point */}
                  {isBreakoutPoint && !isHovered && (
                    <g transform={`translate(${x - 35}, ${y - 18})`}>
                      <rect x="0" y="0" width="70" height="12" fill="#064E3B" stroke="#10b981" strokeWidth="0.6" />
                      <text x="5" y="9" fill="#A7F3D0" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                        LONG FILLED
                      </text>
                    </g>
                  )}

                  {/* Marker Pin at Trailing Stop Ratchet */}
                  {isTrailingRatchetPoint && !isHovered && (
                    <g transform={`translate(${x - 38}, ${y - 18})`}>
                      <rect x="0" y="0" width="76" height="12" fill="#78350F" stroke="#f59e0b" strokeWidth="0.6" />
                      <text x="5" y="9" fill="#FDE68A" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                        STOP RATCHET
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

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
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {pt.time}
                </text>
              );
            })}
          </svg>
        </div>

        {/* 3. Deep Algorithmic Context Inspector (Hover or Active State) */}
        <div className="bg-[#111622] border border-[#1E2638] p-4 sm:p-5 rounded-none space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2638] pb-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-slate-100 tracking-wider">
                CANDLE INSPECTOR: {activeCandle.time} UTC
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-none ${activeCandle.badgeColor}`}>
                {activeCandle.statusBadge}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span>
                MARK: <strong className="text-slate-100">${activeCandle.price.toLocaleString()}</strong> ({activeCandle.delta})
              </span>
              <span>
                VOL: <strong className="text-slate-200">{activeCandle.volume} BTC</strong> ({activeCandle.surge})
              </span>
            </div>
          </div>

          {/* 3-Line Plain-English Algorithmic Explanation */}
          <div className="space-y-1.5 text-xs">
            <div className="text-slate-200 font-bold flex items-center space-x-1.5 pb-0.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-none inline-block" />
              <span>{activeCandle.title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-slate-300 font-sans text-xs pt-1">
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5 rounded-none">
                <span className="font-mono text-[10px] text-blue-400 font-bold block mb-1">
                  01 / MARKET MECHANICS
                </span>
                <p className="leading-relaxed text-slate-300">{activeCandle.line1}</p>
              </div>
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5 rounded-none">
                <span className="font-mono text-[10px] text-emerald-400 font-bold block mb-1">
                  02 / STRATEGY EXECUTION
                </span>
                <p className="leading-relaxed text-slate-300">{activeCandle.line2}</p>
              </div>
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5 rounded-none">
                <span className="font-mono text-[10px] text-purple-400 font-bold block mb-1">
                  03 / RISK GOVERNANCE
                </span>
                <p className="leading-relaxed text-slate-300">{activeCandle.line3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Streamlined, Highly Educational Telemetry Modules (4 Clear Institutional Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E2638] border-t border-[#1E2638]">
        {/* Module 1: Execution Signal */}
        <div className="bg-[#111622] p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>01 / EXECUTION SIGNAL</span>
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            DONCHIAN 20-HIGH BREAKOUT
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Filters noise by triggering only when price exceeds the 20-candle peak ($68,340). Confirmed by a 2.1x volume surge to eliminate low-liquidity whipsaws.
          </p>
        </div>

        {/* Module 2: Risk Governor */}
        <div className="bg-[#111622] p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>02 / RISK GOVERNOR</span>
            <Shield className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-sm font-mono font-bold text-slate-100">
            KELLY CRITERION (2.0% CAP)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Calculates vector sizing mathematically to maximize capital growth while strictly capping downside exposure. Trailing stop ratchets upward to lock in profits.
          </p>
        </div>

        {/* Module 3: Regime Filter */}
        <div className="bg-[#111622] p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>03 / REGIME FILTER</span>
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-mono font-bold text-slate-100">
            ADX 28.4 &gt; 25.0 TREND GATE
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Measures directional trend strength rather than price direction. Readings above 25.0 deactivate the mean-reversion grid to ride persistent momentum breakouts.
          </p>
        </div>

        {/* Module 4: AI Macro Synthesis */}
        <div className="bg-[#111622] p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>04 / AI MACRO SYNTHESIS</span>
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            GROQ LLAMA 3.3 70B
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Ultra-low-latency LLM pipeline parses macro news headlines and orderbook depth, confirming a +0.68 net bullish sentiment before trade execution.
          </p>
        </div>
      </div>

      {/* 5. Bottom Infrastructure Telemetry Strip */}
      <div className="bg-[#0C101A] px-4 sm:px-6 py-2.5 border-t border-[#1E2638] flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono text-slate-500">
        <div className="flex items-center space-x-4">
          <span>24H VOLUME: $12.65B</span>
          <span className="hidden sm:inline">SPREAD: 0.01%</span>
          <span className="hidden sm:inline">SLIPPAGE: 0.002%</span>
          <span className="hidden sm:inline">INTERVAL: 15M TICKS</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>SUB-MILLISECOND BINANCE WEBSOCKET FEED</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
