import React, { useState } from 'react';
import { BarChart2, TrendingUp, X, Activity, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CryptoIcon from './CryptoIcon';

interface VolumeAsset {
  rank: number;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume: string;
}

interface TrendingAsset {
  rank: number;
  symbol: string;
  marketRank: number;
}

interface TableAsset {
  rank: number;
  symbol: string;
  name: string;
  price: string;
  change1h: string;
  is1hPositive: boolean;
  change24h: string;
  is24hPositive: boolean;
  change7d: string;
  is7dPositive: boolean;
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
  sparkline: number[];
}

const TOP_VOLUME_DATA: VolumeAsset[] = [
  { rank: 1, symbol: 'USDT', price: '$0.999', change: '-0.01%', isPositive: false, volume: '$28.24B' },
  { rank: 2, symbol: 'BTC', price: '$83,020', change: '+0.32%', isPositive: true, volume: '$12.65B' },
  { rank: 3, symbol: 'ETH', price: '$2,503.4', change: '+0.38%', isPositive: true, volume: '$7.05B' },
  { rank: 4, symbol: 'USDC', price: '$1.00', change: '-0.01%', isPositive: false, volume: '$6.86B' },
  { rank: 5, symbol: 'SOL', price: '$109.36', change: '-0.31%', isPositive: false, volume: '$1.51B' },
];

const TRENDING_SEARCH_DATA: TrendingAsset[] = [
  { rank: 1, symbol: 'STRK', marketRank: 86 },
  { rank: 2, symbol: 'SUI', marketRank: 14 },
  { rank: 3, symbol: 'HYPE', marketRank: 11 },
  { rank: 4, symbol: 'AERO', marketRank: 81 },
  { rank: 5, symbol: 'TIA', marketRank: 111 },
];

const TABLE_ASSETS_DATA: TableAsset[] = [
  {
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$83,020',
    change1h: '-0.07%',
    is1hPositive: false,
    change24h: '+0.32%',
    is24hPositive: true,
    change7d: '-2.65%',
    is7dPositive: false,
    marketCap: '$1668.40B',
    volume24h: '$12614M',
    circulatingSupply: '20.1M BTC',
    sparkline: [85200, 84900, 85600, 84300, 83900, 84100, 83400, 82800, 83020],
  },
  {
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,503.4',
    change1h: '-0.08%',
    is1hPositive: false,
    change24h: '+0.38%',
    is24hPositive: true,
    change7d: '-7.30%',
    is7dPositive: false,
    marketCap: '$305.71B',
    volume24h: '$7056M',
    circulatingSupply: '122.1M ETH',
    sparkline: [2710, 2690, 2640, 2580, 2550, 2510, 2480, 2495, 2503.4],
  },
  {
    rank: 3,
    symbol: 'SOL',
    name: 'Solana',
    price: '$109.36',
    change1h: '-0.14%',
    is1hPositive: false,
    change24h: '-0.31%',
    is24hPositive: false,
    change7d: '-9.73%',
    is7dPositive: false,
    marketCap: '$64.42B',
    volume24h: '$1515M',
    circulatingSupply: '589.1M SOL',
    sparkline: [121.5, 119.8, 116.4, 113.2, 112.0, 110.5, 108.4, 109.1, 109.36],
  },
  {
    rank: 4,
    symbol: 'XRP',
    name: 'XRP',
    price: '$1.39',
    change1h: '-0.02%',
    is1hPositive: false,
    change24h: '-0.64%',
    is24hPositive: false,
    change7d: '-7.02%',
    is7dPositive: false,
    marketCap: '$87.97B',
    volume24h: '$694M',
    circulatingSupply: '63129.7M XRP',
    sparkline: [1.51, 1.48, 1.46, 1.43, 1.41, 1.38, 1.36, 1.38, 1.39],
  },
  {
    rank: 5,
    symbol: 'TRX',
    name: 'TRON',
    price: '$0.33',
    change1h: '+0.02%',
    is1hPositive: true,
    change24h: '-0.15%',
    is24hPositive: false,
    change7d: '-1.67%',
    is7dPositive: false,
    marketCap: '$31.39B',
    volume24h: '$231M',
    circulatingSupply: '94991.3M TRX',
    sparkline: [0.338, 0.336, 0.334, 0.331, 0.332, 0.329, 0.328, 0.330, 0.3305],
  },
];

export const MarketOverviewSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [selectedAsset, setSelectedAsset] = useState<TableAsset | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  const [orderSent, setOrderSent] = useState<boolean>(false);

  const handleSelectSymbol = (symbol: string) => {
    const found = TABLE_ASSETS_DATA.find((a) => a.symbol === symbol);
    if (found) {
      setSelectedAsset(found);
    } else {
      const vol = TOP_VOLUME_DATA.find((v) => v.symbol === symbol);
      if (vol) {
        setSelectedAsset({
          rank: vol.rank,
          symbol: vol.symbol,
          name: vol.symbol === 'USDT' ? 'Tether' : vol.symbol === 'USDC' ? 'USD Coin' : vol.symbol,
          price: vol.price,
          change1h: '-0.02%',
          is1hPositive: false,
          change24h: vol.change,
          is24hPositive: vol.isPositive,
          change7d: '+0.01%',
          is7dPositive: true,
          marketCap: '$120.4B',
          volume24h: vol.volume,
          circulatingSupply: '120,400M ' + vol.symbol,
          sparkline: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        });
      } else {
        setSelectedAsset({
          rank: 99,
          symbol,
          name: symbol,
          price: '$1.45',
          change1h: '+0.12%',
          is1hPositive: true,
          change24h: '+3.45%',
          is24hPositive: true,
          change7d: '+12.50%',
          is7dPositive: true,
          marketCap: '$1.85B',
          volume24h: '$312M',
          circulatingSupply: '1,200M ' + symbol,
          sparkline: [1.2, 1.25, 1.3, 1.28, 1.35, 1.4, 1.38, 1.42, 1.45],
        });
      }
    }
    setOrderSent(false);
  };

  const renderSparkline = (data: number[], isUp: boolean) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 110;
    const height = 28;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#34d399' : '#f43f5e';

    return (
      <svg width={width} height={height} className="overflow-visible ml-auto block">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] rounded-none p-4 sm:p-6 space-y-6 text-slate-200 font-sans shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2638] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-none shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            {isFrench ? 'SURVEILLANCE DU MARCHÉ ET DES VOLUMES' : 'MARKET HYPE & VOLUME SURVEILLANCE'}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 bg-[#111622] border border-[#1E2638] text-[11px] text-slate-300">
            {isFrench ? 'SCANNER : 300+ PAIRES' : 'SCANNER: 300+ PAIRS'}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            {isFrench ? 'INTERVALLE : TICKS TEMPS RÉEL' : 'INTERVAL: REALTIME TICK'}
          </span>
        </div>
      </div>

      {/* Top Section: Two-Column Dark Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: TOP VOLUME (24H) */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                {isFrench ? 'VOLUMES LES PLUS ÉLEVÉS (24H)' : 'TOP VOLUME (24H)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {isFrench ? 'PAIRES USDT' : 'USDT PAIRINGS'}
            </span>
          </div>

          <div className="divide-y divide-[#1E2638]/60">
            {TOP_VOLUME_DATA.map((item) => (
              <div
                key={item.symbol}
                onClick={() => handleSelectSymbol(item.symbol)}
                className="py-2 flex items-center justify-between text-xs font-mono hover:bg-[#1A253A] border-l-2 border-transparent hover:border-blue-400 px-2 cursor-pointer transition-colors"
                title={isFrench ? `Inspecter ${item.symbol}` : `Inspect ${item.symbol}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500 text-[11px] w-4">#{item.rank}</span>
                  <CryptoIcon symbol={item.symbol} size={24} />
                  <div>
                    <span className="font-bold text-slate-100">{item.symbol}</span>
                    <span className="text-slate-400 text-[11px] ml-2">{item.price}</span>
                  </div>
                </div>

                <div className="text-right flex items-center space-x-2">
                  <div>
                    <div className="text-slate-200 font-semibold">{item.volume}</div>
                    <div
                      className={`text-[10px] ${
                        item.isPositive ? 'text-emerald-400' : 'text-rose-500'
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: TRENDING SEARCH */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                {isFrench ? 'TENDANCES DE RECHERCHE' : 'TRENDING SEARCH'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {isFrench ? 'RÉGIME ALGORITHMIQUE' : 'ALGORITHM REGIME'}
            </span>
          </div>

          <div className="divide-y divide-[#1E2638]/60">
            {TRENDING_SEARCH_DATA.map((item) => (
              <div
                key={item.symbol}
                onClick={() => handleSelectSymbol(item.symbol)}
                className="py-2 flex items-center justify-between text-xs font-mono hover:bg-[#1A253A] border-l-2 border-transparent hover:border-emerald-400 px-2 cursor-pointer transition-colors"
                title={isFrench ? `Inspecter ${item.symbol}` : `Inspect ${item.symbol}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500 text-[11px] w-4">#{item.rank}</span>
                  <CryptoIcon symbol={item.symbol} size={24} />
                  <span className="font-bold text-slate-100">{item.symbol}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="border border-[#243048] bg-[#0E131F] px-2 py-0.5 text-[11px] text-slate-400 rounded-none">
                    {isFrench ? `Rang #${item.marketRank}` : `Rank #${item.marketRank}`}
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Global Market Overview (Top Assets) */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench ? 'APERÇU GLOBAL DU MARCHÉ (TOP ACTIFS)' : 'GLOBAL MARKET OVERVIEW (TOP ASSETS)'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none" />
            <span>{isFrench ? 'AGRÉGATION DU CARNET D\'ORDRES : ACTIVE' : 'ORDERBOOK AGGREGATION: ACTIVE'}</span>
          </div>
        </div>

        {/* Dense Responsive Monospace Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#1E2638] text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2 font-normal w-8">#</th>
                <th className="py-2.5 px-2 font-normal">{isFrench ? 'Actif' : 'Asset'}</th>
                <th className="py-2.5 px-2 font-normal text-right">{isFrench ? 'Prix' : 'Price'}</th>
                <th className="py-2.5 px-2 font-normal text-right">1h %</th>
                <th className="py-2.5 px-2 font-normal text-right">24h %</th>
                <th className="py-2.5 px-2 font-normal text-right">7d %</th>
                <th className="py-2.5 px-2 font-normal text-right hidden sm:table-cell">{isFrench ? 'Cap. Marché' : 'Market Cap'}</th>
                <th className="py-2.5 px-2 font-normal text-right hidden md:table-cell">{isFrench ? 'Volume (24h)' : 'Volume (24h)'}</th>
                <th className="py-2.5 px-2 font-normal text-right hidden lg:table-cell">{isFrench ? 'Offre en Circulation' : 'Circulating Supply'}</th>
                <th className="py-2.5 px-2 font-normal text-right w-32">{isFrench ? '7 Derniers Jours' : 'Last 7 Days'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638]/60">
              {TABLE_ASSETS_DATA.map((asset) => (
                <tr
                  key={asset.symbol}
                  onClick={() => {
                    setSelectedAsset(asset);
                    setOrderSent(false);
                  }}
                  className="hover:bg-[#1A253A] border-l-2 border-transparent hover:border-blue-400 cursor-pointer transition-colors text-slate-200 group"
                  title={isFrench ? `Cliquer pour inspecter ${asset.name}` : `Click to inspect ${asset.name}`}
                >
                  <td className="py-3 px-2 text-slate-500">{asset.rank}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2.5">
                      <CryptoIcon symbol={asset.symbol} size={26} />
                      <div>
                        <div className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                          {asset.name}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-slate-100">
                    {asset.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-right ${
                      asset.is1hPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {asset.change1h}
                  </td>
                  <td
                    className={`py-3 px-2 text-right ${
                      asset.is24hPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {asset.change24h}
                  </td>
                  <td
                    className={`py-3 px-2 text-right ${
                      asset.is7dPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {asset.change7d}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300 hidden sm:table-cell">
                    {asset.marketCap}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300 hidden md:table-cell">
                    {asset.volume24h}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-400 hidden lg:table-cell">
                    {asset.circulatingSupply}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {renderSparkline(asset.sparkline, asset.is7dPositive)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Click hint footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-[#1E2638]/60">
          <span>
            {isFrench
              ? 'Astuce : Cliquez sur n\'importe quel actif pour inspecter la télémétrie en temps réel.'
              : 'Tip: Click any asset row to inspect real-time orderbook telemetry.'}
          </span>
          <span className="text-blue-400 flex items-center space-x-1">
            <Activity className="w-3 h-3 mr-1" />
            {isFrench ? 'Télémétrie Interactive' : 'Interactive Telemetry'}
          </span>
        </div>
      </div>

      {/* Interactive Asset Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#111622] border border-[#1E2638] rounded-none max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl font-mono text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
              <div className="flex items-center space-x-3">
                <CryptoIcon symbol={selectedAsset.symbol} size={28} />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-100">{selectedAsset.name}</span>
                    <span className="text-xs text-slate-400 uppercase">{selectedAsset.symbol}/USDT</span>
                    <span className="text-[10px] bg-blue-950/70 border border-blue-800 text-blue-400 px-1.5 py-0.2">
                      PERP
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isFrench ? 'Flux Ticker Binance WebSocket 24h' : 'Binance WebSocket 24h Ticker Stream'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price & Timeframe Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] border border-[#1E2638] p-3.5">
              <div>
                <div className="text-[10px] text-slate-500 uppercase">
                  {isFrench ? 'Cours Indexé en Temps Réel' : 'Real-Time Benchmark Price'}
                </div>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-bold text-slate-100">{selectedAsset.price}</span>
                  <span
                    className={`text-xs font-semibold ${
                      selectedTimeframe === '1h'
                        ? selectedAsset.is1hPositive
                          ? 'text-emerald-400'
                          : 'text-rose-500'
                        : selectedTimeframe === '7d'
                        ? selectedAsset.is7dPositive
                          ? 'text-emerald-400'
                          : 'text-rose-500'
                        : selectedAsset.is24hPositive
                        ? 'text-emerald-400'
                        : 'text-rose-500'
                    }`}
                  >
                    {selectedTimeframe === '1h'
                      ? selectedAsset.change1h
                      : selectedTimeframe === '7d'
                      ? selectedAsset.change7d
                      : selectedAsset.change24h}
                  </span>
                </div>
              </div>

              {/* Timeframe Selector Pills */}
              <div className="flex items-center space-x-1 border border-[#1E2638] p-1 bg-[#111622]">
                {(['1h', '24h', '7d'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                      selectedTimeframe === tf
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5">
                <span className="text-[10px] text-slate-500 uppercase">
                  {isFrench ? 'Volume 24h' : '24h Volume'}
                </span>
                <div className="text-slate-200 font-bold mt-0.5">{selectedAsset.volume24h}</div>
              </div>
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5">
                <span className="text-[10px] text-slate-500 uppercase">
                  {isFrench ? 'Capitalisation' : 'Market Cap'}
                </span>
                <div className="text-slate-200 font-bold mt-0.5">{selectedAsset.marketCap}</div>
              </div>
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5">
                <span className="text-[10px] text-slate-500 uppercase">
                  {isFrench ? 'Offre Active' : 'Supply'}
                </span>
                <div className="text-slate-200 font-bold mt-0.5">{selectedAsset.circulatingSupply}</div>
              </div>
              <div className="bg-[#0B0E14] border border-[#1E2638] p-2.5">
                <span className="text-[10px] text-slate-500 uppercase">
                  {isFrench ? 'Slippage Estimé' : 'Est. Slippage'}
                </span>
                <div className="text-emerald-400 font-bold mt-0.5">&lt; 0.003%</div>
              </div>
            </div>

            {/* Orderbook Depth Imbalance Bar */}
            <div className="bg-[#0B0E14] border border-[#1E2638] p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-semibold">
                  {isFrench ? 'Profondeur Achat (Bid) : 54.2%' : 'Bid Depth: 54.2%'}
                </span>
                <span className="text-slate-400 uppercase text-[10px]">
                  {isFrench ? 'Ratio Carnet d\'Ordres' : 'Orderbook Depth Ratio'}
                </span>
                <span className="text-rose-400 font-semibold">
                  {isFrench ? 'Profondeur Vente (Ask) : 45.8%' : 'Ask Depth: 45.8%'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1E2638] flex overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '54.2%' }} />
                <div className="h-full bg-rose-500" style={{ width: '45.8%' }} />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                {isFrench ? 'Contrat perpétuel USDT validé' : 'USDT Perpetual contract validated'}
              </span>
              <div className="flex items-center space-x-2">
                {orderSent ? (
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5">
                    {isFrench ? '✓ Ordre Paper Trading simulé' : '✓ Simulated Paper Order Sent'}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOrderSent(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-none transition-colors"
                  >
                    {isFrench ? 'Simuler Allocation' : 'Simulate Order'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="px-3 py-1.5 text-xs border border-[#1E2638] text-slate-300 hover:text-white hover:bg-[#1A2234] transition-colors"
                >
                  {isFrench ? 'Fermer' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketOverviewSim;
