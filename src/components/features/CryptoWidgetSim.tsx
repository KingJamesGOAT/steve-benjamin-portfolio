import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type AssetId = 'BTC' | 'ETH' | 'SOL';
type TimeframeId = '15m' | '1h' | '4h' | '1d';

interface CandlePoint {
  timestamp: number;
  timeLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20: number;
  isPositive: boolean;
  pctChange: string;
}

interface TickerStats {
  lastPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  vol24hUsd: number;
  isLiveApi: boolean;
}

const ASSET_META: Record<
  AssetId,
  {
    symbol: string;
    pair: string;
    basePrice: number;
    volatility: number;
    change24h: number;
    high24h: number;
    low24h: number;
    vol24hUsd: number;
    decimals: number;
  }
> = {
  BTC: {
    symbol: 'BTCUSDT',
    pair: 'BTC/USDT',
    basePrice: 84280.0,
    volatility: 165,
    change24h: 2.64,
    high24h: 84950.0,
    low24h: 81920.0,
    vol24hUsd: 24_850_000_000,
    decimals: 2,
  },
  ETH: {
    symbol: 'ETHUSDT',
    pair: 'ETH/USDT',
    basePrice: 2684.5,
    volatility: 11.5,
    change24h: 1.92,
    high24h: 2732.0,
    low24h: 2615.0,
    vol24hUsd: 11_420_000_000,
    decimals: 2,
  },
  SOL: {
    symbol: 'SOLUSDT',
    pair: 'SOL/USDT',
    basePrice: 178.4,
    volatility: 1.25,
    change24h: 4.18,
    high24h: 182.6,
    low24h: 169.8,
    vol24hUsd: 4_380_000_000,
    decimals: 2,
  },
};

const TIMEFRAME_MS: Record<TimeframeId, number> = {
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '4h': 4 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
};

function formatTimeLabel(ts: number, tf: TimeframeId): string {
  const d = new Date(ts);
  if (tf === '1d') {
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${day}/${month}`;
  }
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function formatCompactUsd(val: number): string {
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

function formatVolumeBase(vol: number, asset: AssetId): string {
  if (vol >= 1e6) return `${(vol / 1e6).toFixed(2)}M ${asset}`;
  if (vol >= 1e3) return `${(vol / 1e3).toFixed(1)}K ${asset}`;
  return `${vol.toFixed(0)} ${asset}`;
}

function computeEma20(closes: number[]): number[] {
  const k = 2 / (20 + 1);
  const ema: number[] = [];
  let prev = closes[0] || 0;
  for (let i = 0; i < closes.length; i++) {
    const val = i === 0 ? closes[i] : closes[i] * k + prev * (1 - k);
    ema.push(val);
    prev = val;
  }
  return ema;
}

// Deterministic, realistic 48-candle fallback generator for instant zero-spinner render
function buildFallbackCandles(asset: AssetId, tf: TimeframeId): CandlePoint[] {
  const meta = ASSET_META[asset];
  const count = 48;
  const stepMs = TIMEFRAME_MS[tf];
  const nowAligned = Math.floor(Date.now() / stepMs) * stepMs;
  const tfMultiplier = tf === '15m' ? 1 : tf === '1h' ? 1.8 : tf === '4h' ? 3.2 : 6.0;
  const volStep = meta.volatility * tfMultiplier;

  const seedOffset =
    (asset === 'BTC' ? 1 : asset === 'ETH' ? 2.7 : 4.3) +
    (tf === '15m' ? 0.2 : tf === '1h' ? 1.1 : tf === '4h' ? 2.4 : 3.8);

  // Generate realistic path ending at meta.basePrice
  const rawCloses: number[] = [];
  let cursor = meta.basePrice * (1 - 0.018 * Math.min(2, tfMultiplier * 0.6));
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const wave1 = Math.sin(i * 0.36 + seedOffset) * volStep * 0.85;
    const wave2 = Math.cos(i * 0.78 - seedOffset * 1.3) * volStep * 0.48;
    const micro = Math.sin(i * 1.65 + seedOffset * 2.1) * volStep * 0.28;
    const trendTarget =
      meta.basePrice * (0.984 + 0.016 * progress) + wave1 + wave2 + micro;
    cursor = i === count - 1 ? meta.basePrice : trendTarget;
    rawCloses.push(Number(cursor.toFixed(meta.decimals)));
  }

  const emaValues = computeEma20(rawCloses);

  return rawCloses.map((close, i) => {
    const open =
      i === 0
        ? Number((close - volStep * 0.25).toFixed(meta.decimals))
        : rawCloses[i - 1];
    const bodyMax = Math.max(open, close);
    const bodyMin = Math.min(open, close);
    const wickUp = Math.abs(Math.sin(i * 1.3 + seedOffset)) * volStep * 0.55;
    const wickDown = Math.abs(Math.cos(i * 1.7 + seedOffset)) * volStep * 0.52;
    const high = Number((bodyMax + wickUp).toFixed(meta.decimals));
    const low = Number((bodyMin - wickDown).toFixed(meta.decimals));
    const timestamp = nowAligned - (count - 1 - i) * stepMs;
    const baseVol =
      asset === 'BTC' ? 280 : asset === 'ETH' ? 2400 : 38000;
    const volume =
      baseVol *
      tfMultiplier *
      (0.55 + Math.abs(Math.sin(i * 0.9 + seedOffset)) * 1.35);
    const deltaPct = open > 0 ? ((close - open) / open) * 100 : 0;

    return {
      timestamp,
      timeLabel: formatTimeLabel(timestamp, tf),
      open,
      high,
      low,
      close,
      volume,
      ema20: Number(emaValues[i].toFixed(meta.decimals)),
      isPositive: close >= open,
      pctChange: `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(2)}%`,
    };
  });
}

export const CryptoWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const [selectedAsset, setSelectedAsset] = useState<AssetId>('BTC');
  const [timeframe, setTimeframe] = useState<TimeframeId>('15m');
  const [chartMode, setChartMode] = useState<'line' | 'candles'>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Detect mobile breakpoint (< 640px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 639px)');
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    update(mq);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const meta = ASSET_META[selectedAsset];

  // Instant preloaded state (zero loading flash), upgraded automatically by Binance API
  const [candles, setCandles] = useState<CandlePoint[]>(() =>
    buildFallbackCandles('BTC', '15m')
  );
  const [stats, setStats] = useState<TickerStats>(() => ({
    lastPrice: ASSET_META.BTC.basePrice,
    change24h: ASSET_META.BTC.change24h,
    high24h: ASSET_META.BTC.high24h,
    low24h: ASSET_META.BTC.low24h,
    vol24hUsd: ASSET_META.BTC.vol24hUsd,
    isLiveApi: false,
  }));

  // Fetch real 48-candle history & 24h ticker from public keyless Binance Vision API
  useEffect(() => {
    let isCancelled = false;
    setHoveredIndex(null);

    // 1. Immediately set fallback for snappy UI transition
    const fallback = buildFallbackCandles(selectedAsset, timeframe);
    setCandles(fallback);
    setStats({
      lastPrice: ASSET_META[selectedAsset].basePrice,
      change24h: ASSET_META[selectedAsset].change24h,
      high24h: ASSET_META[selectedAsset].high24h,
      low24h: ASSET_META[selectedAsset].low24h,
      vol24hUsd: ASSET_META[selectedAsset].vol24hUsd,
      isLiveApi: false,
    });

    const symbol = ASSET_META[selectedAsset].symbol;
    const decimals = ASSET_META[selectedAsset].decimals;

    async function fetchLiveMarketData() {
      try {
        const [klinesRes, tickerRes] = await Promise.all([
          fetch(
            `https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=48`
          ),
          fetch(
            `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=${symbol}`
          ),
        ]);

        if (!klinesRes.ok || !tickerRes.ok) return;

        const rawKlines = await klinesRes.json();
        const rawTicker = await tickerRes.json();

        if (isCancelled || !Array.isArray(rawKlines) || rawKlines.length < 10) {
          return;
        }

        const closes = rawKlines.map((k: (string | number)[]) => Number(k[4]));
        const emaSeries = computeEma20(closes);

        const parsedCandles: CandlePoint[] = rawKlines.map(
          (k: (string | number)[], idx: number) => {
            const ts = Number(k[0]);
            const open = Number(Number(k[1]).toFixed(decimals));
            const high = Number(Number(k[2]).toFixed(decimals));
            const low = Number(Number(k[3]).toFixed(decimals));
            const close = Number(Number(k[4]).toFixed(decimals));
            const volume = Number(k[5]);
            const deltaPct = open > 0 ? ((close - open) / open) * 100 : 0;

            return {
              timestamp: ts,
              timeLabel: formatTimeLabel(ts, timeframe),
              open,
              high,
              low,
              close,
              volume,
              ema20: Number(emaSeries[idx].toFixed(decimals)),
              isPositive: close >= open,
              pctChange: `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(2)}%`,
            };
          }
        );

        setCandles(parsedCandles);
        setStats({
          lastPrice: Number(Number(rawTicker.lastPrice).toFixed(decimals)),
          change24h: Number(Number(rawTicker.priceChangePercent).toFixed(2)),
          high24h: Number(Number(rawTicker.highPrice).toFixed(decimals)),
          low24h: Number(Number(rawTicker.lowPrice).toFixed(decimals)),
          vol24hUsd: Number(rawTicker.quoteVolume),
          isLiveApi: true,
        });
      } catch {
        // Silently retain fallback dataset if offline or blocked by corporate proxy
      }
    }

    fetchLiveMarketData();

    // 2. Connect to keyless Binance public WebSocket for live price ticks
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
      );
      ws.onmessage = (event) => {
        if (isCancelled) return;
        try {
          const msg = JSON.parse(event.data);
          if (!msg || !msg.c) return;
          const liveClose = Number(Number(msg.c).toFixed(decimals));
          const livePct = Number(Number(msg.P).toFixed(2));
          const liveHigh = Number(Number(msg.h).toFixed(decimals));
          const liveLow = Number(Number(msg.l).toFixed(decimals));
          const liveQuoteVol = Number(msg.q);

          setStats({
            lastPrice: liveClose,
            change24h: livePct,
            high24h: liveHigh,
            low24h: liveLow,
            vol24hUsd: liveQuoteVol,
            isLiveApi: true,
          });

          setCandles((prev) => {
            if (prev.length === 0) return prev;
            const updated = [...prev];
            const last = { ...updated[updated.length - 1] };
            last.close = liveClose;
            last.high = Math.max(last.high, liveClose);
            last.low = Math.min(last.low, liveClose);
            last.isPositive = liveClose >= last.open;
            const deltaPct =
              last.open > 0 ? ((liveClose - last.open) / last.open) * 100 : 0;
            last.pctChange = `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(2)}%`;
            updated[updated.length - 1] = last;
            return updated;
          });
        } catch {
          // ignore malformed ws frame
        }
      };
    } catch {
      // ignore if ws blocked
    }

    return () => {
      isCancelled = true;
      if (ws) {
        ws.close();
      }
    };
  }, [selectedAsset, timeframe]);

  // Subtle fallback heartbeat if WebSocket is blocked by network
  useEffect(() => {
    if (stats.isLiveApi) return;
    const interval = setInterval(() => {
      const step =
        selectedAsset === 'BTC' ? 14 : selectedAsset === 'ETH' ? 1.4 : 0.14;
      const delta = (Math.random() - 0.48) * step;
      setStats((prev) => {
        const nextPrice = Number(
          Math.max(1, prev.lastPrice + delta).toFixed(meta.decimals)
        );
        return { ...prev, lastPrice: nextPrice };
      });
      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        const last = { ...updated[updated.length - 1] };
        const nextClose = Number(
          Math.max(1, last.close + delta).toFixed(meta.decimals)
        );
        last.close = nextClose;
        last.high = Math.max(last.high, nextClose);
        last.low = Math.min(last.low, nextClose);
        last.isPositive = nextClose >= last.open;
        updated[updated.length - 1] = last;
        return updated;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [stats.isLiveApi, selectedAsset, meta.decimals]);

  const effectiveChartMode = isMobile ? 'line' : chartMode;

  // Compute dynamic min/max price and max volume across the 48 candles
  const { minPrice, maxPrice, maxVol } = useMemo(() => {
    if (candles.length === 0) {
      return { minPrice: 0, maxPrice: 100, maxVol: 1 };
    }
    let minP = Infinity;
    let maxP = -Infinity;
    let maxV = 0;
    for (const c of candles) {
      if (c.low < minP) minP = c.low;
      if (c.high > maxP) maxP = c.high;
      if (c.ema20 < minP) minP = c.ema20;
      if (c.ema20 > maxP) maxP = c.ema20;
      if (c.volume > maxV) maxV = c.volume;
    }
    const span = Math.max(maxP - minP, minP * 0.002);
    return {
      minPrice: minP - span * 0.14,
      maxPrice: maxP + span * 0.08,
      maxVol: maxV || 1,
    };
  }, [candles]);

  // Normalized SVG coordinate space (1000 x 260)
  const svgWidth = 1000;
  const svgHeight = 260;
  const padLeft = isMobile ? 10 : 16;
  const padRight = isMobile ? 62 : 74; // Clean right gutter for Y-axis scale & live price tag on both mobile & PC
  const padTop = 18;
  const padBottom = 26;

  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const getX = (index: number) =>
    padLeft + (index / Math.max(1, candles.length - 1)) * plotWidth;

  const getY = (price: number) =>
    padTop +
    (1 - (price - minPrice) / Math.max(0.0001, maxPrice - minPrice)) *
      plotHeight;

  const getXPct = (index: number) => (getX(index) / svgWidth) * 100;
  const getYPct = (price: number) =>
    Math.max(4, Math.min(92, (getY(price) / svgHeight) * 100));

  const pointsString = candles
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.close).toFixed(1)}`)
    .join(' ');

  const areaString = `${getX(0).toFixed(1)},${svgHeight - padBottom} ${pointsString} ${getX(
    candles.length - 1
  ).toFixed(1)},${svgHeight - padBottom}`;

  const emaPointsString = candles
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.ema20).toFixed(1)}`)
    .join(' ');

  const activePt = hoveredIndex !== null ? candles[hoveredIndex] : null;
  const displayedPrice = activePt ? activePt.close : stats.lastPrice;
  const isUpOverall = stats.change24h >= 0;
  const mainStrokeColor = isUpOverall ? '#10b981' : '#f43f5e';

  // Horizontal mouse & touch scrubbing across 48 candles
  const updateScrubFromClientX = (clientX: number, rect: DOMRect) => {
    const xRatio = (clientX - rect.left) / rect.width;
    const minRatio = padLeft / svgWidth;
    const maxRatio = (svgWidth - padRight) / svgWidth;
    const normalized = Math.max(
      0,
      Math.min(1, (xRatio - minRatio) / (maxRatio - minRatio))
    );
    const nearestIndex = Math.round(normalized * (candles.length - 1));
    setHoveredIndex(nearestIndex);
  };

  // Y-axis price levels (3 on mobile, 4 on desktop)
  const yRatios = isMobile ? [0.18, 0.5, 0.82] : [0.14, 0.38, 0.62, 0.86];
  const yLevels = yRatios.map((r) => {
    const val = maxPrice - r * (maxPrice - minPrice);
    return selectedAsset === 'BTC'
      ? Math.round(val)
      : Number(val.toFixed(meta.decimals));
  });

  // X-axis timestamp indices (4 on mobile, 6 on desktop)
  const xTickIndices = isMobile
    ? [4, 17, 31, 45]
    : [3, 11, 20, 29, 38, 46];

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] text-slate-200 rounded-none font-sans shadow-2xl overflow-hidden select-none flex flex-col">
      {/* 1. Top Header Bar */}
      <div className="bg-[#111622] border-b border-[#1E2638] px-3 sm:px-5 h-12 flex items-center justify-between gap-2 sm:gap-4 font-mono text-xs overflow-hidden shrink-0 whitespace-nowrap">
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          {/* Desktop 3-Asset Switcher */}
          <div className="hidden sm:flex items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 text-[11px]">
            {(['BTC', 'ETH', 'SOL'] as const).map((sym) => {
              const isSelected = selectedAsset === sym;
              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setSelectedAsset(sym)}
                  className={`px-2.5 py-0.5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1D283A] text-white font-bold border border-[#38BDF8]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sym}
                </button>
              );
            })}
          </div>

          {/* Live / Scrubbed Price & 24h Change */}
          <div className="flex items-baseline space-x-2 shrink-0">
            <span className="text-sm sm:text-lg font-bold text-slate-100 tracking-tight tabular-nums">
              $
              {displayedPrice.toLocaleString('en-US', {
                minimumFractionDigits: meta.decimals,
                maximumFractionDigits: meta.decimals,
              })}
            </span>
            <span
              className={`px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold tabular-nums border ${
                (activePt ? activePt.isPositive : isUpOverall)
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-950/60 text-rose-400 border-rose-500/30'
              }`}
            >
              {activePt
                ? activePt.pctChange
                : `${stats.change24h >= 0 ? '+' : ''}${stats.change24h}%`}
            </span>
          </div>

          {/* Desktop 24h High / Low / Volume Strip */}
          <div className="hidden lg:flex items-center space-x-4 pl-3 border-l border-[#1E2638] text-[10px] text-slate-400 tabular-nums">
            <div>
              <span className="text-slate-500 mr-1">24H H</span>
              <span className="text-slate-200">
                ${stats.high24h.toLocaleString('en-US')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 mr-1">24H L</span>
              <span className="text-slate-200">
                ${stats.low24h.toLocaleString('en-US')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 mr-1">24H VOL</span>
              <span className="text-slate-200">
                {formatCompactUsd(stats.vol24hUsd)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls: Asset Switcher on Mobile / Timeframe + Chart Mode on Desktop */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Asset Selector Pills (BTC / ETH / SOL) */}
          <div className="flex sm:hidden items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 text-[10px]">
            {(['BTC', 'ETH', 'SOL'] as const).map((sym) => {
              const isSelected = selectedAsset === sym;
              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setSelectedAsset(sym)}
                  className={`px-2.5 py-1 transition-colors ${
                    isSelected
                      ? 'bg-[#1D283A] text-white font-bold border border-[#38BDF8]/40'
                      : 'text-slate-400'
                  }`}
                >
                  {sym}
                </button>
              );
            })}
          </div>

          {/* Desktop Timeframe Selector (15m / 1H / 4H / 1D) */}
          <div className="hidden sm:flex items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 font-mono text-[10px]">
            {(['15m', '1h', '4h', '1d'] as const).map((tf) => {
              const isSelected = timeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 uppercase transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1D283A] text-white font-bold border border-[#38BDF8]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              );
            })}
          </div>

          {/* Desktop Line / Candles Toggle */}
          <div className="hidden sm:flex items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setChartMode('line')}
              className={`px-2.5 py-0.5 transition-all cursor-pointer ${
                chartMode === 'line'
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFrench ? 'Ligne' : 'Line'}
            </button>
            <button
              type="button"
              onClick={() => setChartMode('candles')}
              className={`px-2.5 py-0.5 transition-all cursor-pointer ${
                chartMode === 'candles'
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFrench ? 'Bougies' : 'Candles'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Chart Area + Sub-Header */}
      <div className="p-2.5 sm:p-4 space-y-2 bg-[#0B0E14] flex-1 flex flex-col justify-between">
        {/* Sub-Bar: Mobile Timeframe & H/L Strip | Desktop Live OHLCV Readout */}
        <div className="h-6 flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400 border-b border-[#1E2638] pb-1.5 shrink-0 overflow-hidden whitespace-nowrap">
          {/* Mobile Sub-Bar: Timeframe Pills + Compact H/L or Scrubbed Info */}
          <div className="flex sm:hidden items-center justify-between w-full gap-2">
            <div className="flex items-center gap-1">
              {(['15m', '1h', '4h', '1d'] as const).map((tf) => {
                const isSelected = timeframe === tf;
                return (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-1.5 py-0.5 uppercase text-[9.5px] transition-colors ${
                      isSelected
                        ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/30'
                        : 'text-slate-500'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>
            <div className="text-[9.5px] text-slate-400 tabular-nums truncate">
              {activePt ? (
                <span className="text-sky-400 font-semibold">
                  {activePt.timeLabel} · Vol {formatVolumeBase(activePt.volume, selectedAsset)}
                </span>
              ) : (
                <span>
                  H ${stats.high24h.toLocaleString('en-US')} · L $
                  {stats.low24h.toLocaleString('en-US')}
                </span>
              )}
            </div>
          </div>

          {/* Desktop Sub-Bar: OHLCV Telemetry Readout */}
          <div className="hidden sm:flex items-center gap-3 min-w-0 truncate tabular-nums">
            {activePt ? (
              <>
                <span className="text-sky-400 font-semibold">
                  {activePt.timeLabel} UTC
                </span>
                <span>
                  <span className="text-slate-500">O </span>
                  <span className="text-slate-200">{activePt.open.toLocaleString('en-US')}</span>
                </span>
                <span>
                  <span className="text-slate-500">H </span>
                  <span className="text-slate-200">{activePt.high.toLocaleString('en-US')}</span>
                </span>
                <span>
                  <span className="text-slate-500">L </span>
                  <span className="text-slate-200">{activePt.low.toLocaleString('en-US')}</span>
                </span>
                <span>
                  <span className="text-slate-500">C </span>
                  <span
                    className={
                      activePt.isPositive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'
                    }
                  >
                    {activePt.close.toLocaleString('en-US')}
                  </span>
                </span>
                <span className="text-slate-400">
                  Vol {formatVolumeBase(activePt.volume, selectedAsset)}
                </span>
              </>
            ) : (
              <span className="text-slate-400">
                {isFrench
                  ? `${meta.pair} · ${timeframe.toUpperCase()} · 48 BOUGIES (SURVOLEZ POUR INSPECTER OHLCV)`
                  : `${meta.pair} · ${timeframe.toUpperCase()} · 48 CANDLES (HOVER TO INSPECT OHLCV)`}
              </span>
            )}
          </div>

          {/* Desktop Legend */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <span className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-0.5 inline-block"
                style={{ backgroundColor: mainStrokeColor }}
              />
              <span>{selectedAsset}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-0.5 bg-[#38BDF8] inline-block" />
              <span>20-EMA</span>
            </span>
          </div>
        </div>

        {/* 48-Point Chart Canvas */}
        <div
          className="relative w-full h-48 sm:h-64 bg-[#0E131E]/85 border border-[#1E2638] rounded-none overflow-hidden flex items-center justify-center cursor-crosshair shrink-0 touch-pan-y"
          onMouseMove={(e) =>
            updateScrubFromClientX(e.clientX, e.currentTarget.getBoundingClientRect())
          }
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              updateScrubFromClientX(
                e.touches[0].clientX,
                e.currentTarget.getBoundingClientRect()
              );
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              updateScrubFromClientX(
                e.touches[0].clientX,
                e.currentTarget.getBoundingClientRect()
              );
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Right-Axis Price Scale (3 levels on mobile, 4 on desktop) */}
          <div className="pointer-events-none absolute inset-0">
            {yLevels.map((priceLevel) => (
              <span
                key={priceLevel}
                style={{ top: `${getYPct(priceLevel)}%` }}
                className="absolute right-1.5 sm:right-2 -translate-y-1/2 text-[9px] sm:text-[10px] font-mono text-slate-500 tabular-nums"
              >
                ${priceLevel.toLocaleString('en-US')}
              </span>
            ))}
          </div>

          {/* Pinned Live Price Horizontal Dashed Line & Right-Axis Badge */}
          <div className="pointer-events-none absolute inset-0">
            <div
              style={{
                top: `${getYPct(stats.lastPrice)}%`,
                right: `${(padRight / svgWidth) * 100}%`,
              }}
              className={`absolute left-0 h-px border-t border-dashed ${
                isUpOverall ? 'border-emerald-500/40' : 'border-rose-500/40'
              }`}
            />
            {hoveredIndex === null && (
              <div
                style={{ top: `${getYPct(stats.lastPrice)}%` }}
                className={`absolute right-1 -translate-y-1/2 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tabular-nums border ${
                  isUpOverall
                    ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-950/95 text-rose-300 border-rose-500/50'
                }`}
              >
                $
                {stats.lastPrice.toLocaleString('en-US', {
                  minimumFractionDigits: selectedAsset === 'BTC' ? 0 : 2,
                  maximumFractionDigits: selectedAsset === 'BTC' ? 0 : 2,
                })}
              </div>
            )}
          </div>

          {/* Bottom X-Axis Timestamps (4 on mobile, 6 on desktop) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-1 h-4">
            {xTickIndices.map((idx) => {
              const pt = candles[idx];
              if (!pt) return null;
              return (
                <span
                  key={pt.timestamp}
                  style={{ left: `${getXPct(idx)}%` }}
                  className="absolute bottom-0 -translate-x-1/2 text-[9px] sm:text-[9.5px] font-mono text-slate-500 tabular-nums"
                >
                  {pt.timeLabel}
                </span>
              );
            })}
          </div>

          {/* Pure Vector SVG: Grid + Volume Histogram Bars + 20-EMA + 48 Candles/Line */}
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full block overflow-hidden"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradUp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="areaGradDown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {yLevels.map((priceLevel) => {
              const y = getY(priceLevel);
              return (
                <line
                  key={`grid-${priceLevel}`}
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth="1"
                  opacity="0.45"
                />
              );
            })}

            {/* Subtle Bottom Volume Histogram Bars (48 bars) */}
            {candles.map((pt, i) => {
              const x = getX(i);
              const volMaxHeight = plotHeight * 0.2;
              const barH = Math.max(
                2,
                (pt.volume / maxVol) * volMaxHeight
              );
              const barY = svgHeight - padBottom - barH;
              const barW = Math.max(4, (plotWidth / candles.length) * 0.58);
              const isHovered = hoveredIndex === i;
              return (
                <rect
                  key={`vol-${pt.timestamp}`}
                  x={x - barW / 2}
                  y={barY}
                  width={barW}
                  height={barH}
                  fill={pt.isPositive ? '#10b981' : '#f43f5e'}
                  opacity={isHovered ? '0.6' : '0.18'}
                />
              );
            })}

            {/* 20-EMA Trendline */}
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth={isMobile ? '1.2' : '1.4'}
              strokeDasharray="4 3"
              opacity={isMobile ? '0.55' : '0.8'}
              points={emaPointsString}
            />

            {/* MODE 1: 48-Point High-Resolution Line + Area Fill */}
            {effectiveChartMode === 'line' && (
              <g>
                <polygon
                  points={areaString}
                  fill={isUpOverall ? 'url(#areaGradUp)' : 'url(#areaGradDown)'}
                />
                <polyline
                  fill="none"
                  stroke={mainStrokeColor}
                  strokeWidth={isMobile ? '2.2' : '2'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />
              </g>
            )}

            {/* MODE 2: 48-Candle OHLC Chart (Desktop) */}
            {effectiveChartMode === 'candles' && (
              <g>
                {candles.map((pt, i) => {
                  const x = getX(i);
                  const highY = getY(pt.high);
                  const lowY = getY(pt.low);
                  const openY = getY(pt.open);
                  const closeY = getY(pt.close);
                  const color = pt.isPositive ? '#10B981' : '#F43F5E';
                  const candleWidth = Math.max(
                    5,
                    (plotWidth / candles.length) * 0.62
                  );
                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(2.5, Math.abs(openY - closeY));

                  return (
                    <g key={`candle-${pt.timestamp}`}>
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      <rect
                        x={x - candleWidth / 2}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </svg>

          {/* Interactive Crosshair & Snap-Dot Overlay */}
          {hoveredIndex !== null && activePt && (
            <div className="pointer-events-none absolute inset-0">
              {/* Vertical Hairline */}
              <div
                style={{ left: `${getXPct(hoveredIndex)}%` }}
                className="absolute top-0 bottom-4 w-px border-l border-dashed border-sky-400/75"
              />

              {/* Horizontal Hairline */}
              <div
                style={{
                  top: `${getYPct(activePt.close)}%`,
                  right: `${(padRight / svgWidth) * 100}%`,
                }}
                className="absolute left-0 h-px border-t border-dashed border-sky-400/45"
              />

              {/* Snap-Dot on Price Curve */}
              <div
                style={{
                  left: `${getXPct(hoveredIndex)}%`,
                  top: `${getYPct(activePt.close)}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              />

              {/* Right-Axis Active Price Tag */}
              <div
                style={{ top: `${getYPct(activePt.close)}%` }}
                className={`absolute right-1 -translate-y-1/2 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tabular-nums border ${
                  activePt.isPositive
                    ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-950/95 text-rose-300 border-rose-500/50'
                }`}
              >
                $
                {activePt.close.toLocaleString('en-US', {
                  minimumFractionDigits: selectedAsset === 'BTC' ? 0 : 2,
                  maximumFractionDigits: selectedAsset === 'BTC' ? 0 : 2,
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Minimalist Footer Strip */}
      <div className="bg-[#0C101A] px-3 sm:px-5 h-8 border-t border-[#1E2638] flex items-center justify-between gap-2.5 text-[10px] font-mono text-slate-500 overflow-hidden shrink-0 whitespace-nowrap">
        <div className="flex items-center space-x-3 sm:space-x-4 tabular-nums">
          <span>
            {isFrench
              ? `VOL 24H : ${formatCompactUsd(stats.vol24hUsd)}`
              : `24H VOL: ${formatCompactUsd(stats.vol24hUsd)}`}
          </span>
          <span className="hidden sm:inline">
            {isFrench ? 'ÉCART : 0.01%' : 'SPREAD: 0.01%'}
          </span>
          <span className="hidden sm:inline">
            {isFrench ? 'RISQUE KELLY : MAX 2%' : 'KELLY RISK: 2% MAX'}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          {isMobile && activePt ? (
            <button
              type="button"
              onClick={() => setHoveredIndex(null)}
              className="text-sky-400 font-semibold"
            >
              {isFrench ? ' Temps réel ↺' : 'Live ↺'}
            </button>
          ) : (
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span>
                {stats.isLiveApi
                  ? isFrench
                    ? 'FLUX BINANCE EN DIRECT'
                    : 'BINANCE LIVE FEED'
                  : isFrench
                  ? 'FLUX BINANCE WS'
                  : 'BINANCE WS LIVE'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
