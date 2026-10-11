import React, { useState, useEffect } from 'react';
import { Activity, Shield, Terminal, BarChart2, Layers } from 'lucide-react';

interface ChartPoint {
  time: string;
  price: number;
  volume: number;
}

export const CryptoWidgetSim: React.FC = () => {
  // Live Price State
  const [price, setPrice] = useState<number>(68492.30);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  // Simulated 15m OHLC Data Points with Volume Bars
  const initialChartPoints: ChartPoint[] = [
    { time: '09:00', price: 67840, volume: 180 },
    { time: '09:15', price: 67920, volume: 240 },
    { time: '09:30', price: 67810, volume: 160 },
    { time: '09:45', price: 68050, volume: 310 },
    { time: '10:00', price: 68180, volume: 420 },
    { time: '10:15', price: 68120, volume: 280 },
    { time: '10:30', price: 68340, volume: 510 },
    { time: '10:45', price: 68290, volume: 390 },
    { time: '11:00', price: 68450, volume: 580 },
    { time: '11:15', price: 68410, volume: 460 },
    { time: '11:30', price: 68520, volume: 620 },
    { time: '11:45', price: 68492, volume: 540 },
  ];

  const [chartPoints, setChartPoints] = useState<ChartPoint[]>(initialChartPoints);

  // Price Tick Loop (Subtle live market heartbeat every 2.4s)
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 32;
      setPrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        setChartPoints((pts) => {
          const updated = [...pts];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            price: next,
          };
          return updated;
        });
        return next;
      });
      setPriceChange((prev) => Number((prev + delta * 0.0003).toFixed(2)));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // SVG Chart Geometry & Math
  const minPrice = 67600;
  const maxPrice = 68700;
  const maxVolume = 700;
  const svgWidth = 840;
  const svgHeight = 240;

  const pointsString = chartPoints
    .map((pt, i) => {
      const x = (i / (chartPoints.length - 1)) * svgWidth;
      const y = svgHeight - ((pt.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 60) - 45;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaString = `0,${svgHeight} ${pointsString} ${svgWidth},${svgHeight}`;

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] text-slate-200 rounded-none font-sans shadow-2xl overflow-hidden select-none space-y-0">
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
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

      {/* 2. Expanded Interactive Financial Chart */}
      <div className="p-4 sm:p-6 space-y-3 bg-[#0B0E14]">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-[#1E2638] pb-2">
          <div className="flex items-center space-x-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold uppercase tracking-wider">
              QUANTITATIVE TELEMETRY (15M OHLC + 20-EMA)
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[10px]">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
              <span>MARK PRICE</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 bg-[#0052FF] inline-block" />
              <span>20-EMA FLOOR</span>
            </span>
          </div>
        </div>

        {/* Large SVG Chart Canvas with Volume Bars */}
        <div
          className="relative w-full h-56 sm:h-64 bg-[#0F1420]/70 border border-[#1E2638] rounded-none overflow-hidden p-2 flex items-center justify-center cursor-crosshair"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 p-3">
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mainAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Volume Histogram Bars along the base */}
            {chartPoints.map((pt, i) => {
              const barWidth = 14;
              const x = (i / (chartPoints.length - 1)) * (svgWidth - 40) + 20 - barWidth / 2;
              const barHeight = (pt.volume / maxVolume) * 36;
              const y = svgHeight - barHeight;
              return (
                <rect
                  key={`vol-${i}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#1E293B"
                  opacity="0.8"
                  className="hover:fill-blue-500 transition-colors"
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
              points={chartPoints
                .map((pt, i) => {
                  const x = (i / (chartPoints.length - 1)) * svgWidth;
                  const emaY =
                    svgHeight -
                    ((pt.price * 0.9968 - minPrice) / (maxPrice - minPrice)) * (svgHeight - 60) -
                    45;
                  return `${x.toFixed(1)},${emaY.toFixed(1)}`;
                })
                .join(' ')}
            />

            {/* Interactive Data Nodes */}
            {chartPoints.map((pt, i) => {
              const x = (i / (chartPoints.length - 1)) * svgWidth;
              const y =
                svgHeight - ((pt.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 60) - 45;
              return (
                <rect
                  key={i}
                  x={x - 3.5}
                  y={y - 3.5}
                  width="7"
                  height="7"
                  className="fill-[#0B0E14] stroke-emerald-400 stroke-2 hover:stroke-[3] cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(pt)}
                />
              );
            })}
          </svg>

          {/* Interactive Hover Telemetry Tooltip */}
          {hoveredPoint && (
            <div className="absolute top-3 right-3 bg-[#111622] border border-[#1E2638] px-3 py-1.5 text-[11px] font-mono text-slate-200 rounded-none shadow-xl pointer-events-none space-y-0.5">
              <div className="text-slate-400 text-[10px]">CANDLE: {hoveredPoint.time} UTC</div>
              <div className="font-bold text-emerald-400 text-xs">
                ${hoveredPoint.price.toLocaleString()}
              </div>
              <div className="text-slate-400 text-[10px]">
                VOL: {hoveredPoint.volume} BTC
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Streamlined, High-Impact Telemetry Modules (4 Clear Institutional Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E2638] border-t border-[#1E2638]">
        {/* Module 1: Active Execution Signal */}
        <div className="bg-[#111622] p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>01 / EXECUTION SIGNAL</span>
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            DONCHIAN BREAKOUT
          </div>
          <div className="text-[11px] font-mono text-slate-300 leading-relaxed">
            20-Candle High ($68,340) validated with 2.1x volume surge.
          </div>
        </div>

        {/* Module 2: Risk Governor */}
        <div className="bg-[#111622] p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>02 / RISK GOVERNOR</span>
            <Shield className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-sm font-mono font-bold text-slate-100">
            KELLY CRITERION 2.0%
          </div>
          <div className="text-[11px] font-mono text-slate-300 leading-relaxed">
            Trailing stop dynamically lifted to $68,120 floor.
          </div>
        </div>

        {/* Module 3: Regime Filter */}
        <div className="bg-[#111622] p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>03 / REGIME FILTER</span>
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-mono font-bold text-slate-100">
            ADX 28.4 &gt; 25.0
          </div>
          <div className="text-[11px] font-mono text-slate-300 leading-relaxed">
            Trend momentum regime active. Dynamic Grid paused.
          </div>
        </div>

        {/* Module 4: AI Macro Synthesis */}
        <div className="bg-[#111622] p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>04 / AI MACRO SYNTHESIS</span>
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            NET BULLISH (+0.68)
          </div>
          <div className="text-[11px] font-mono text-slate-300 leading-relaxed">
            Groq LLaMA 3.3 70B: Institutional bid support confirmed.
          </div>
        </div>
      </div>

      {/* 4. Bottom Infrastructure Telemetry Strip */}
      <div className="bg-[#0C101A] px-4 sm:px-6 py-2.5 border-t border-[#1E2638] flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono text-slate-500">
        <div className="flex items-center space-x-4">
          <span>24H VOLUME: $12.65B</span>
          <span className="hidden sm:inline">SPREAD: 0.01%</span>
          <span className="hidden sm:inline">SLIPPAGE: 0.002%</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block" />
          <span>SUB-MILLISECOND BINANCE STREAM</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
