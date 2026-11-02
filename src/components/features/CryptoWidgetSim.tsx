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
  pct: string;
  isPositive: boolean;
  volume: string;
  catalystEn?: string;
  catalystFr?: string;
}

interface AssetConfig {
  id: 'BTC' | 'ETH' | 'SOL';
  pair: string;
  basePrice: number;
  baseChange: number;
  minPrice: number;
  maxPrice: number;
  vol24h: string;
  highLabel: string;
  lowLabel: string;
  candles: CandlePoint[];
}

const ASSETS: Record<'BTC' | 'ETH' | 'SOL', AssetConfig> = {
  BTC: {
    id: 'BTC',
    pair: 'BTC/USDT',
    basePrice: 68492.3,
    baseChange: 2.84,
    minPrice: 67600,
    maxPrice: 68700,
    vol24h: '$12.65B',
    highLabel: '$68,580',
    lowLabel: '$67,770',
    candles: [
      { time: '09:00', open: 67960, high: 68020, low: 67790, close: 67840, price: 67840, delta: '-$120 (-0.18%)', pct: '-0.18%', isPositive: false, volume: '180 BTC' },
      { time: '09:15', open: 67840, high: 67980, low: 67810, close: 67920, price: 67920, delta: '+$80 (+0.12%)', pct: '+0.12%', isPositive: true, volume: '240 BTC' },
      { time: '09:30', open: 67920, high: 67960, low: 67770, close: 67810, price: 67810, delta: '-$110 (-0.16%)', pct: '-0.16%', isPositive: false, volume: '160 BTC' },
      {
        time: '09:45',
        open: 67810,
        high: 68130,
        low: 67790,
        close: 68050,
        price: 68050,
        delta: '+$240 (+0.35%)',
        pct: '+0.35%',
        isPositive: true,
        volume: '310 BTC',
        catalystEn: 'X Payments crypto license approved',
        catalystFr: 'Licence paiements crypto validée pour X',
      },
      { time: '10:00', open: 68050, high: 68240, low: 68020, close: 68180, price: 68180, delta: '+$130 (+0.19%)', pct: '+0.19%', isPositive: true, volume: '420 BTC' },
      { time: '10:15', open: 68180, high: 68230, low: 68080, close: 68120, price: 68120, delta: '-$60 (-0.09%)', pct: '-0.09%', isPositive: false, volume: '280 BTC' },
      { time: '10:30', open: 68120, high: 68410, low: 68100, close: 68340, price: 68340, delta: '+$220 (+0.32%)', pct: '+0.32%', isPositive: true, volume: '510 BTC' },
      { time: '10:45', open: 68340, high: 68380, low: 68240, close: 68290, price: 68290, delta: '-$50 (-0.07%)', pct: '-0.07%', isPositive: false, volume: '390 BTC' },
      {
        time: '11:00',
        open: 68290,
        high: 68510,
        low: 68260,
        close: 68450,
        price: 68450,
        delta: '+$160 (+0.23%)',
        pct: '+0.23%',
        isPositive: true,
        volume: '580 BTC',
        catalystEn: 'Morgan Stanley approves spot Bitcoin ETFs',
        catalystFr: 'Morgan Stanley valide les ETF Bitcoin spot',
      },
      { time: '11:15', open: 68450, high: 68490, low: 68360, close: 68410, price: 68410, delta: '-$40 (-0.06%)', pct: '-0.06%', isPositive: false, volume: '460 BTC' },
      { time: '11:30', open: 68410, high: 68580, low: 68380, close: 68520, price: 68520, delta: '+$110 (+0.16%)', pct: '+0.16%', isPositive: true, volume: '620 BTC' },
      { time: '11:45', open: 68520, high: 68560, low: 68440, close: 68492.3, price: 68492.3, delta: '-$27.70 (-0.04%)', pct: '-0.04%', isPositive: false, volume: '540 BTC' },
    ],
  },
  ETH: {
    id: 'ETH',
    pair: 'ETH/USDT',
    basePrice: 3482.5,
    baseChange: 1.92,
    minPrice: 3410,
    maxPrice: 3500,
    vol24h: '$6.40B',
    highLabel: '$3,494',
    lowLabel: '$3,422',
    candles: [
      { time: '09:00', open: 3432, high: 3440, low: 3422, close: 3436, price: 3436, delta: '+$4.00 (+0.12%)', pct: '+0.12%', isPositive: true, volume: '1.2K ETH' },
      { time: '09:15', open: 3436, high: 3445, low: 3430, close: 3441, price: 3441, delta: '+$5.00 (+0.15%)', pct: '+0.15%', isPositive: true, volume: '1.5K ETH' },
      { time: '09:30', open: 3441, high: 3444, low: 3428, close: 3433, price: 3433, delta: '-$8.00 (-0.23%)', pct: '-0.23%', isPositive: false, volume: '1.1K ETH' },
      {
        time: '09:45',
        open: 3433,
        high: 3460,
        low: 3431,
        close: 3454,
        price: 3454,
        delta: '+$21.00 (+0.61%)',
        pct: '+0.61%',
        isPositive: true,
        volume: '2.4K ETH',
        catalystEn: 'L2 blob throughput hits new daily record',
        catalystFr: 'Débit L2 record sur le réseau Ethereum',
      },
      { time: '10:00', open: 3454, high: 3468, low: 3450, close: 3462, price: 3462, delta: '+$8.00 (+0.23%)', pct: '+0.23%', isPositive: true, volume: '2.1K ETH' },
      { time: '10:15', open: 3462, high: 3465, low: 3448, close: 3453, price: 3453, delta: '-$9.00 (-0.26%)', pct: '-0.26%', isPositive: false, volume: '1.7K ETH' },
      { time: '10:30', open: 3453, high: 3476, low: 3451, close: 3471, price: 3471, delta: '+$18.00 (+0.52%)', pct: '+0.52%', isPositive: true, volume: '2.9K ETH' },
      { time: '10:45', open: 3471, high: 3475, low: 3463, close: 3467, price: 3467, delta: '-$4.00 (-0.12%)', pct: '-0.12%', isPositive: false, volume: '1.9K ETH' },
      {
        time: '11:00',
        open: 3467,
        high: 3488,
        low: 3466,
        close: 3484,
        price: 3484,
        delta: '+$17.00 (+0.49%)',
        pct: '+0.49%',
        isPositive: true,
        volume: '3.3K ETH',
        catalystEn: 'Institutional staking inflows surge +4.2%',
        catalystFr: 'Hausse de +4,2 % des flux de staking institutionnel',
      },
      { time: '11:15', open: 3484, high: 3489, low: 3476, close: 3479, price: 3479, delta: '-$5.00 (-0.14%)', pct: '-0.14%', isPositive: false, volume: '2.2K ETH' },
      { time: '11:30', open: 3479, high: 3494, low: 3478, close: 3487, price: 3487, delta: '+$8.00 (+0.23%)', pct: '+0.23%', isPositive: true, volume: '2.7K ETH' },
      { time: '11:45', open: 3487, high: 3491, low: 3479, close: 3482.5, price: 3482.5, delta: '-$4.50 (-0.13%)', pct: '-0.13%', isPositive: false, volume: '2.4K ETH' },
    ],
  },
  SOL: {
    id: 'SOL',
    pair: 'SOL/USDT',
    basePrice: 184.65,
    baseChange: 4.15,
    minPrice: 176,
    maxPrice: 187,
    vol24h: '$3.85B',
    highLabel: '$185.80',
    lowLabel: '$177.40',
    candles: [
      { time: '09:00', open: 178.2, high: 179.1, low: 177.4, close: 178.6, price: 178.6, delta: '+$0.40 (+0.22%)', pct: '+0.22%', isPositive: true, volume: '42K SOL' },
      { time: '09:15', open: 178.6, high: 179.8, low: 178.3, close: 179.4, price: 179.4, delta: '+$0.80 (+0.45%)', pct: '+0.45%', isPositive: true, volume: '51K SOL' },
      { time: '09:30', open: 179.4, high: 179.7, low: 178.5, close: 178.9, price: 178.9, delta: '-$0.50 (-0.28%)', pct: '-0.28%', isPositive: false, volume: '38K SOL' },
      {
        time: '09:45',
        open: 178.9,
        high: 181.6,
        low: 178.8,
        close: 181.2,
        price: 181.2,
        delta: '+$2.30 (+1.29%)',
        pct: '+1.29%',
        isPositive: true,
        volume: '84K SOL',
        catalystEn: 'Firedancer validator client benchmark: 100k+ TPS',
        catalystFr: 'Benchmark validateur Firedancer : 100k+ TPS',
      },
      { time: '10:00', open: 181.2, high: 182.5, low: 180.9, close: 182.1, price: 182.1, delta: '+$0.90 (+0.50%)', pct: '+0.50%', isPositive: true, volume: '67K SOL' },
      { time: '10:15', open: 182.1, high: 182.4, low: 181.3, close: 181.6, price: 181.6, delta: '-$0.50 (-0.27%)', pct: '-0.27%', isPositive: false, volume: '49K SOL' },
      { time: '10:30', open: 181.6, high: 183.7, low: 181.5, close: 183.3, price: 183.3, delta: '+$1.70 (+0.94%)', pct: '+0.94%', isPositive: true, volume: '76K SOL' },
      { time: '10:45', open: 183.3, high: 183.6, low: 182.6, close: 182.9, price: 182.9, delta: '-$0.40 (-0.22%)', pct: '-0.22%', isPositive: false, volume: '55K SOL' },
      {
        time: '11:00',
        open: 182.9,
        high: 185.1,
        low: 182.8,
        close: 184.7,
        price: 184.7,
        delta: '+$1.80 (+0.98%)',
        pct: '+0.98%',
        isPositive: true,
        volume: '92K SOL',
        catalystEn: 'DEX 24h settlement volume leads all chains',
        catalystFr: 'Volume DEX 24h en tête de toutes les blockchains',
      },
      { time: '11:15', open: 184.7, high: 185.0, low: 183.9, close: 184.2, price: 184.2, delta: '-$0.50 (-0.27%)', pct: '-0.27%', isPositive: false, volume: '61K SOL' },
      { time: '11:30', open: 184.2, high: 185.8, low: 184.0, close: 185.1, price: 185.1, delta: '+$0.90 (+0.49%)', pct: '+0.49%', isPositive: true, volume: '79K SOL' },
      { time: '11:45', open: 185.1, high: 185.4, low: 184.3, close: 184.65, price: 184.65, delta: '-$0.45 (-0.24%)', pct: '-0.24%', isPositive: false, volume: '68K SOL' },
    ],
  },
};

export const CryptoWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Active Asset Pair & Chart Mode
  const [selectedAsset, setSelectedAsset] = useState<'BTC' | 'ETH' | 'SOL'>('BTC');
  const [chartMode, setChartMode] = useState<'line' | 'candles'>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 639px)');
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    update(mq);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const effectiveChartMode = isMobile ? 'line' : chartMode;

  const asset = ASSETS[selectedAsset];
  const candles = asset.candles;

  // Subtle live tick on current asset
  const [tickOffset, setTickOffset] = useState<number>(0);

  useEffect(() => {
    setTickOffset(0);
    setHoveredIndex(null);
  }, [selectedAsset]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = selectedAsset === 'BTC' ? 18 : selectedAsset === 'ETH' ? 1.8 : 0.18;
      const delta = (Math.random() - 0.48) * step;
      setTickOffset((prev) => Number((prev + delta).toFixed(2)));
    }, 2600);

    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Normalized SVG coordinate space (0..1000 x 0..240) for pure vector geometry only
  const svgWidth = 1000;
  const svgHeight = 240;
  const padLeft = isMobile ? 6 : 16;
  const padRight = isMobile ? 6 : 68; // Edge-to-edge on mobile; right gutter for Y-axis on desktop
  const padTop = isMobile ? 28 : 22;
  const padBottom = isMobile ? 14 : 26;

  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const getX = (index: number) =>
    padLeft + (index / (candles.length - 1)) * plotWidth;

  const getY = (price: number) =>
    padTop +
    (1 - (price - asset.minPrice) / (asset.maxPrice - asset.minPrice)) *
      plotHeight;

  // Percentage coordinates (0..100%) for crisp HTML overlays (zero SVG distortion)
  const getXPct = (index: number) => (getX(index) / svgWidth) * 100;
  const getYPct = (price: number) => (getY(price) / svgHeight) * 100;

  const pointsString = candles
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.price).toFixed(1)}`)
    .join(' ');

  const areaString = `${getX(0).toFixed(1)},${svgHeight - padBottom} ${pointsString} ${getX(
    candles.length - 1
  ).toFixed(1)},${svgHeight - padBottom}`;

  const emaPointsString = candles
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.price * 0.9972).toFixed(1)}`)
    .join(' ');

  const activePt = hoveredIndex !== null ? candles[hoveredIndex] : null;
  const livePrice = Number((asset.basePrice + tickOffset).toFixed(2));
  const displayedPrice = activePt ? activePt.price : livePrice;

  // Horizontal mouse & touch scrubbing
  const updateScrubFromClientX = (clientX: number, rect: DOMRect) => {
    const xRatio = (clientX - rect.left) / rect.width;
    const minRatio = padLeft / svgWidth;
    const maxRatio = (svgWidth - padRight) / svgWidth;
    const normalized = Math.max(0, Math.min(1, (xRatio - minRatio) / (maxRatio - minRatio)));
    const nearestIndex = Math.round(normalized * (candles.length - 1));
    setHoveredIndex(nearestIndex);
  };

  // 4 clean Y-axis price levels
  const yLevels = [0.15, 0.42, 0.69, 0.92].map((r) => {
    const val = asset.maxPrice - r * (asset.maxPrice - asset.minPrice);
    return selectedAsset === 'SOL' ? Number(val.toFixed(1)) : Math.round(val);
  });

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] text-slate-200 rounded-none font-sans shadow-2xl overflow-hidden select-none flex flex-col">
      {/* 1. Header Bar: Clean Mobile Coin Ticker & Asset Pills / Desktop Full Controls */}
      <div className="bg-[#111622] border-b border-[#1E2638] px-3 sm:px-5 h-12 flex items-center justify-between gap-2 sm:gap-3 font-mono text-xs overflow-hidden shrink-0 whitespace-nowrap">
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
                  className={`px-2 py-0.5 transition-colors cursor-pointer ${
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

          {/* Live / Scrubbed Price & Delta */}
          <div className="flex items-baseline space-x-1.5 sm:space-x-2 shrink-0">
            <span className="text-sm sm:text-lg font-bold text-slate-100 tracking-tight tabular-nums">
              ${displayedPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-[11px] sm:text-xs font-semibold tabular-nums ${
                (activePt ? activePt.isPositive : asset.baseChange >= 0)
                  ? 'text-emerald-400'
                  : 'text-rose-500'
              }`}
            >
              <span className="sm:hidden">
                {activePt ? activePt.pct : `+${asset.baseChange}%`}
              </span>
              <span className="hidden sm:inline">
                {activePt ? activePt.delta : `+${asset.baseChange}%`}
              </span>
            </span>
          </div>
        </div>

        {/* Right Side: Touch-Friendly Asset Pills on Mobile / Line-Candles Toggle on Desktop */}
        <div className="flex items-center shrink-0">
          {/* Mobile Only: Minimalist Touch Asset Selector (BTC / ETH / SOL) */}
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

          {/* Desktop Only: Line / Candles Switcher (Removed on mobile per user request) */}
          <div className="hidden sm:flex items-center border border-[#1E2638] bg-[#0A0E17] p-0.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setChartMode('line')}
              className={`px-2.5 py-0.5 transition-all cursor-pointer ${
                chartMode === 'line'
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40 shadow-sm'
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
                  ? 'bg-[#1D283A] text-sky-400 font-bold border border-[#38BDF8]/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFrench ? 'Bougies' : 'Candles'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Streamlined Financial Graph Area */}
      <div className="p-2 sm:p-4 sm:space-y-2 bg-[#0B0E14] flex-1 flex flex-col justify-between">
        {/* Desktop-Only Telemetry / Catalyst Sub-Bar (Hidden on mobile for a clean Robinhood/Coinbase look) */}
        <div className="hidden sm:flex h-6 items-center justify-between gap-2 text-[10px] font-mono text-slate-400 border-b border-[#1E2638] pb-1.5 shrink-0 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-2 min-w-0 truncate">
            {activePt ? (
              <>
                <span className="text-sky-400 font-semibold shrink-0">
                  {activePt.time} UTC · {activePt.volume}
                </span>
                {(isFrench ? activePt.catalystFr : activePt.catalystEn) && (
                  <span className="inline-flex items-center gap-1.5 text-amber-300 font-sans font-medium truncate">
                    <span className="text-slate-600 font-mono">|</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">
                      {isFrench ? activePt.catalystFr : activePt.catalystEn}
                    </span>
                  </span>
                )}
              </>
            ) : (
              <span className="text-slate-400 font-medium">
                {isFrench
                  ? '15M · TEMPS RÉEL (SURVOLEZ LE GRAPHIQUE)'
                  : '15M · LIVE STREAM (HOVER CHART TO INSPECT)'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {chartMode === 'line' ? (
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
                <span>{isFrench ? `COURS (${selectedAsset})` : `PRICE (${selectedAsset})`}</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-2.5 bg-emerald-400 inline-block" />
                <span className="w-1.5 h-2.5 bg-rose-500 inline-block" />
                <span>{isFrench ? 'BOUGIES' : 'CANDLES'}</span>
              </span>
            )}
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-0.5 bg-[#0052FF] inline-block" />
              <span>20-EMA</span>
            </span>
          </div>
        </div>

        {/* Responsive Chart Canvas: Minimalist Mobile Touch Graph / Full Desktop Terminal */}
        <div
          className="relative w-full h-44 sm:h-60 md:h-64 bg-[#0E131E]/80 border border-[#1E2638] rounded-none overflow-hidden flex items-center justify-center cursor-crosshair shrink-0 touch-pan-y"
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
          {/* Mobile Minimalist Touch Pill (Only visible while touching/inspecting a point) */}
          {activePt && (
            <div className="sm:hidden pointer-events-none absolute inset-x-2 top-2 z-10 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-[#111622]/95 border border-[#1E2638] px-2.5 py-0.5 text-[10px] font-mono shadow-md max-w-full">
                <span className="text-sky-400 font-bold shrink-0">{activePt.time} UTC</span>
                {(isFrench ? activePt.catalystFr : activePt.catalystEn) ? (
                  <span className="text-amber-300 font-sans truncate">
                    · {isFrench ? activePt.catalystFr : activePt.catalystEn}
                  </span>
                ) : (
                  <span className="text-slate-400 shrink-0">· {activePt.volume}</span>
                )}
              </div>
            </div>
          )}

          {/* Crisp HTML Right-Axis Price Labels (Desktop/Tablet) */}
          <div className="hidden sm:block pointer-events-none absolute inset-0">
            {yLevels.map((priceLevel) => (
              <span
                key={priceLevel}
                style={{ top: `${getYPct(priceLevel)}%` }}
                className="absolute right-2 -translate-y-1/2 text-[10px] font-mono text-slate-500 tabular-nums"
              >
                ${priceLevel.toLocaleString('en-US')}
              </span>
            ))}
          </div>

          {/* Crisp HTML Bottom X-Axis Timestamps + Subtle Catalyst Dots (Desktop/Tablet) */}
          <div className="hidden sm:block pointer-events-none absolute inset-x-0 bottom-1.5 h-4">
            {candles.map((pt, i) => {
              const hasCatalyst = Boolean(pt.catalystEn);
              const isHovered = hoveredIndex === i;
              if (i % 2 !== 0 && !hasCatalyst && !isHovered) return null;

              return (
                <div
                  key={pt.time}
                  style={{ left: `${getXPct(i)}%` }}
                  className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center"
                >
                  {hasCatalyst && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mb-0.5 transition-transform ${
                        isHovered ? 'bg-amber-300 scale-125' : 'bg-amber-400/80'
                      }`}
                    />
                  )}
                  <span
                    className={`text-[9.5px] font-mono tabular-nums transition-colors ${
                      isHovered
                        ? 'text-sky-400 font-bold'
                        : hasCatalyst
                        ? 'text-amber-300/90 font-semibold'
                        : 'text-slate-500'
                    }`}
                  >
                    {pt.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pure Vector Geometry SVG (No text or circles to stretch) */}
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

            {/* Horizontal Grid Lines (Subtle on mobile, 4 levels on desktop) */}
            {yLevels
              .filter((_, idx) => !isMobile || idx === 1 || idx === 2)
              .map((priceLevel) => {
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
                    opacity={isMobile ? '0.3' : '0.45'}
                  />
                );
              })}

            {/* 20-EMA Trendline (Desktop only to keep mobile curve completely uncluttered) */}
            {!isMobile && (
              <polyline
                fill="none"
                stroke="#0052FF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.85"
                points={emaPointsString}
              />
            )}

            {/* MODE 1: Line Chart (Always active on mobile) */}
            {effectiveChartMode === 'line' && (
              <g>
                <polygon points={areaString} fill="url(#mainAreaGrad)" />
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={isMobile ? '2.4' : '2'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />
              </g>
            )}

            {/* MODE 2: Candlestick Chart (Desktop only) */}
            {effectiveChartMode === 'candles' && (
              <g>
                {candles.map((pt, i) => {
                  const x = getX(i);
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
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.4"
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

          {/* Crisp HTML Crosshair & Perfectly Round Snap-Dot Overlay */}
          {hoveredIndex !== null && activePt && (
            <div className="pointer-events-none absolute inset-0">
              {/* Vertical Hairline */}
              <div
                style={{ left: `${getXPct(hoveredIndex)}%` }}
                className="absolute top-0 bottom-0 sm:bottom-5 w-px border-l border-dashed border-sky-400/75"
              />

              {/* Horizontal Hairline (Desktop/Tablet) */}
              <div
                style={{
                  top: `${getYPct(activePt.price)}%`,
                  right: `${(padRight / svgWidth) * 100}%`,
                }}
                className="hidden sm:block absolute left-0 h-px border-t border-dashed border-sky-400/45"
              />

              {/* Perfectly Round Snap-Dot on Price Curve */}
              <div
                style={{
                  left: `${getXPct(hoveredIndex)}%`,
                  top: `${getYPct(activePt.price)}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-full bg-white border-2 border-emerald-400 sm:border-[#0052FF] shadow-[0_0_10px_rgba(16,185,129,0.9)] sm:shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              />

              {/* Right-Axis Active Price Tag Pill (Desktop/Tablet) */}
              <div
                style={{ top: `${getYPct(activePt.price)}%` }}
                className={`hidden sm:flex absolute right-1 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-bold tabular-nums border ${
                  activePt.isPositive
                    ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-950/95 text-rose-300 border-rose-500/50'
                }`}
              >
                ${activePt.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Minimalist Footer Strip */}
      <div className="bg-[#0C101A] px-3 sm:px-5 h-8 border-t border-[#1E2638] flex items-center justify-between gap-2.5 text-[10px] font-mono text-slate-500 overflow-hidden shrink-0 whitespace-nowrap">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span>
            {isFrench ? `VOL 24H : ${asset.vol24h}` : `24H VOL: ${asset.vol24h}`}
          </span>
          <span className="hidden sm:inline">{isFrench ? 'ÉCART : 0.01%' : 'SPREAD: 0.01%'}</span>
          <span className="hidden sm:inline">{isFrench ? 'RISQUE KELLY : MAX 2%' : 'KELLY RISK: 2% MAX'}</span>
        </div>
        <div className="sm:hidden text-slate-400">
          {activePt ? (
            <button
              type="button"
              onClick={() => setHoveredIndex(null)}
              className="text-sky-400 font-semibold"
            >
              {isFrench ? 'Réinitialiser ↺' : 'Reset live ↺'}
            </button>
          ) : (
            <span>{isFrench ? 'Glisser pour inspecter' : 'Touch & drag chart'}</span>
          )}
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-slate-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>{isFrench ? 'FLUX BINANCE WS' : 'BINANCE WS LIVE'}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoWidgetSim;
