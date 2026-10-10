import React, { useState, useEffect, useRef } from 'react';

interface SignalLog {
  id: string;
  time: string;
  type: 'BUY' | 'SELL' | 'RISK' | 'REGIME';
  text: string;
}

interface NewsItem {
  id: string;
  time: string;
  source: string;
  headline: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export const CryptoWidgetSim: React.FC = () => {
  // Live Ticker State
  const [price, setPrice] = useState<number>(68492.30);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; price: number; time: string } | null>(null);

  // Chart Data Points (Simulated 15m OHLC trend)
  const initialChartPoints = [
    { time: '09:00', price: 67840 },
    { time: '09:15', price: 67920 },
    { time: '09:30', price: 67810 },
    { time: '09:45', price: 68050 },
    { time: '10:00', price: 68180 },
    { time: '10:15', price: 68120 },
    { time: '10:30', price: 68340 },
    { time: '10:45', price: 68290 },
    { time: '11:00', price: 68450 },
    { time: '11:15', price: 68410 },
    { time: '11:30', price: 68520 },
    { time: '11:45', price: 68492 },
  ];
  const [chartPoints, setChartPoints] = useState(initialChartPoints);

  // Dynamic Bot Execution Logs
  const [signals, setSignals] = useState<SignalLog[]>([
    {
      id: 's1',
      time: '11:30:12',
      type: 'REGIME',
      text: 'ADX 28.4 > 25: Market Regime confirmed as Trending.',
    },
    {
      id: 's2',
      time: '11:32:05',
      type: 'BUY',
      text: 'Smart Momentum: Donchian 20-High Breakout @ $68,340. Vol: 2.2x 20MA.',
    },
    {
      id: 's3',
      time: '11:35:48',
      type: 'RISK',
      text: 'Kelly Sizing: 2.0% allocation. Hard Stop-Loss set at $66,973 (-2.0%).',
    },
    {
      id: 's4',
      time: '11:40:19',
      type: 'BUY',
      text: 'MACD Crossover: Fast (12) crossed Signal (26). Trend acceleration.',
    },
    {
      id: 's5',
      time: '11:43:22',
      type: 'RISK',
      text: 'Trailing Stop: 20-EMA floor dynamically lifted to $68,120.00.',
    },
  ]);

  // AI Market Feed
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 'n1',
      time: '11:42',
      source: 'Groq LLaMA 3.3',
      headline: 'Institutional ETF inflow hits $480M over 24h. Macro orderbook depth reflects strong bid support.',
      sentiment: 'BULLISH',
    },
    {
      id: 'n2',
      time: '11:35',
      source: 'Sentiment Radar',
      headline: 'X / Twitter volume for blue chips surged +34%. Narrative momentum centered on BTC break of key liquidity zone.',
      sentiment: 'BULLISH',
    },
    {
      id: 'n3',
      time: '11:18',
      source: 'Risk Engine',
      headline: 'Volatility expansion detected (ATR rising). Algorithmic take-profit targets adjusted outward to +3.6%.',
      sentiment: 'NEUTRAL',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Price Tick Loop (Every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 35;
      setPrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        setChartPoints((pts) => {
          const updated = [...pts];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            price: next,
          };
          return updated;
        });
        return next;
      });
      setPriceChange((prev) => Number((prev + delta * 0.0004).toFixed(2)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Bot Signals Dynamic Stream Loop
  useEffect(() => {
    const signalInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const r = Math.random();

      let newSig: SignalLog;
      if (r < 0.35) {
        newSig = {
          id: Math.random().toString(36).substring(2, 9),
          time: timeStr,
          type: 'BUY',
          text: `MACD / RSI Signal: Pullback to 20-EMA ($${(price * 0.995).toFixed(2)}) bought. Size: 0.18 BTC.`,
        };
      } else if (r < 0.65) {
        newSig = {
          id: Math.random().toString(36).substring(2, 9),
          time: timeStr,
          type: 'RISK',
          text: `Dynamic SL Adjustment: Trailing stop floor updated to $${(price * 0.988).toFixed(2)}.`,
        };
      } else if (r < 0.85) {
        newSig = {
          id: Math.random().toString(36).substring(2, 9),
          time: timeStr,
          type: 'SELL',
          text: `Take Profit Trigger: Upper Bollinger Band test. Scalp filled @ $${price.toFixed(2)}.`,
        };
      } else {
        newSig = {
          id: Math.random().toString(36).substring(2, 9),
          time: timeStr,
          type: 'REGIME',
          text: `Regime Sweep: ADX at 29.1. Bullish momentum regime confirmed.`,
        };
      }

      setSignals((prev) => [...prev.slice(-25), newSig]);

      // Occasionally add news
      if (Math.random() < 0.3) {
        const timeShort = timeStr.substring(0, 5);
        const newsItems: NewsItem[] = [
          {
            id: Math.random().toString(36).substring(2, 9),
            time: timeShort,
            source: 'Groq LLaMA 3.3',
            headline: 'Orderbook density indicates aggressive whale accumulation between $68.2K and $68.5K.',
            sentiment: 'BULLISH',
          },
          {
            id: Math.random().toString(36).substring(2, 9),
            time: timeShort,
            source: 'Macro Scanner',
            headline: 'US Treasury yield curve steepening. Cross-asset correlation with tech equities remains high at 0.74.',
            sentiment: 'NEUTRAL',
          },
          {
            id: Math.random().toString(36).substring(2, 9),
            time: timeShort,
            source: 'Social Sentinel',
            headline: 'X social volume confirms breakout momentum with positive narrative dispersion.',
            sentiment: 'BULLISH',
          },
        ];
        const randomNews = newsItems[Math.floor(Math.random() * newsItems.length)];
        setNews((prev) => [randomNews, ...prev.slice(0, 4)]);
      }
    }, 4500);

    return () => clearInterval(signalInterval);
  }, [price]);

  // SVG Chart Dimensions & Math
  const minPrice = 67600;
  const maxPrice = 68700;
  const svgWidth = 420;
  const svgHeight = 170;

  const pointsString = chartPoints
    .map((pt, i) => {
      const x = (i / (chartPoints.length - 1)) * svgWidth;
      const y = svgHeight - ((pt.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const areaString = `0,${svgHeight} ${pointsString} ${svgWidth},${svgHeight}`;

  return (
    <div className="bg-slate-950 border border-slate-800 text-slate-200 rounded-sm font-sans shadow-md overflow-hidden select-none">
      {/* Top Bar / Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-wider text-sm">BTC/USD</span>
            <span className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 text-slate-300 font-semibold rounded-sm">
              PERP
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono tracking-tight tabular-nums">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-mono font-semibold ${
                priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <div className="hidden sm:flex items-center space-x-2 text-slate-400">
            <span>REGIME:</span>
            <span className="text-electric font-semibold">TRENDING (ADX 28.4)</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 rounded-sm font-mono text-[10px]">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-sm inline-block" />
            <span className="font-bold">STATUS: LIVE</span>
          </div>
        </div>
      </div>

      {/* 3-Column Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Column: Trading212-Style Chart Area */}
        <div className="lg:col-span-5 p-3.5 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-1.5">
            <span className="font-semibold text-slate-300">TRADING 212 TELEMETRY (15M)</span>
            <span className="text-[10px] text-slate-500">EMA(20) • BB(20,2)</span>
          </div>

          {/* SVG Interactive Area */}
          <div
            className="relative w-full h-44 bg-slate-900/60 border border-slate-800/80 rounded-sm overflow-hidden p-1 flex items-center justify-center cursor-crosshair"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 p-2">
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
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area */}
              <polygon points={areaString} fill="url(#chartGrad)" />

              {/* Main Price Line */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Fake 20-EMA secondary line */}
              <polyline
                fill="none"
                stroke="#0052ff"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                opacity="0.8"
                points={chartPoints
                  .map((pt, i) => {
                    const x = (i / (chartPoints.length - 1)) * svgWidth;
                    const emaY =
                      svgHeight -
                      ((pt.price * 0.997 - minPrice) / (maxPrice - minPrice)) * (svgHeight - 20) -
                      10;
                    return `${x},${emaY}`;
                  })
                  .join(' ')}
              />

              {/* Interactive hover points */}
              {chartPoints.map((pt, i) => {
                const x = (i / (chartPoints.length - 1)) * svgWidth;
                const y =
                  svgHeight - ((pt.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 20) - 10;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-slate-900 stroke-emerald-400 stroke-2 hover:r-6 cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint({ x, price: pt.price, time: pt.time })}
                  />
                );
              })}
            </svg>

            {/* Hover Tooltip */}
            {hoveredPoint && (
              <div
                className="absolute top-2 right-2 bg-slate-900 border border-slate-700 px-2 py-1 text-[10px] font-mono text-white rounded-sm shadow pointer-events-none"
              >
                <div>Time: {hoveredPoint.time}</div>
                <div className="font-bold text-emerald-400">${hoveredPoint.price.toLocaleString()}</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>24h Vol: 28,491 BTC</span>
            <span>Spread: 0.01%</span>
            <span>Slippage: 0.002%</span>
          </div>
        </div>

        {/* Middle Column: Bot Execution Terminal */}
        <div className="lg:col-span-4 p-3.5 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-1.5">
            <span className="font-semibold text-slate-300">BOT EXECUTION (MACD / RSI)</span>
            <span className="text-[10px] text-emerald-400">AUTONOMOUS</span>
          </div>

          <div className="h-44 overflow-y-auto space-y-1.5 pr-1 font-mono text-[10.5px] leading-relaxed bg-slate-900/40 p-2 border border-slate-800/60 rounded-sm">
            {signals.map((sig) => {
              let tagColor = 'text-slate-400 border-slate-700 bg-slate-800';
              if (sig.type === 'BUY') tagColor = 'text-emerald-400 border-emerald-800 bg-emerald-950/60';
              if (sig.type === 'SELL') tagColor = 'text-rose-400 border-rose-800 bg-rose-950/60';
              if (sig.type === 'RISK') tagColor = 'text-amber-400 border-amber-800 bg-amber-950/60';
              if (sig.type === 'REGIME') tagColor = 'text-blue-400 border-blue-800 bg-blue-950/60';

              return (
                <div key={sig.id} className="flex items-start space-x-1.5">
                  <span className="text-slate-500 text-[10px] select-none">[{sig.time}]</span>
                  <span
                    className={`px-1 py-0.2 text-[9px] font-bold border rounded-sm ${tagColor}`}
                  >
                    {sig.type}
                  </span>
                  <span className="text-slate-300 flex-1">{sig.text}</span>
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>RSI: 41.8 (Neutral)</span>
            <span>MACD: +18.4</span>
            <span>Kelly: 2.0%</span>
          </div>
        </div>

        {/* Right Column: AI Macro News Feed */}
        <div className="lg:col-span-3 p-3.5 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-1.5">
            <span className="font-semibold text-slate-300">AI BRIEFING (GROQ LLAMA)</span>
            <span className="text-[10px] text-electric">BULLISH (+0.68)</span>
          </div>

          <div className="h-44 overflow-y-auto space-y-2 pr-1 font-mono text-[10.5px] leading-relaxed bg-slate-900/40 p-2 border border-slate-800/60 rounded-sm">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-1.5 border border-slate-800 bg-slate-900/80 rounded-sm space-y-1 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[9.5px]">
                  <span className="text-electric font-semibold">{item.source}</span>
                  <span className="text-slate-500">[{item.time}]</span>
                </div>
                <p className="text-slate-300 text-[10.5px] leading-normal">{item.headline}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>Model: LLaMA 3.3 70B</span>
            <span>Freq: 15m Cron</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
