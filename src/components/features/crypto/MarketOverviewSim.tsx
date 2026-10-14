import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, X, Activity, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CryptoIcon from './CryptoIcon';

interface VolumeAsset {
  rank: number;
  symbol: string;
  price: string;
  price1h: string;
  price24h: string;
  price7d: string;
  change: string;
  isPositive: boolean;
  volume: string;
}

interface TrendingAsset {
  rank: number;
  symbol: string;
  marketRank: number;
  price: string;
  price1h: string;
  price24h: string;
  price7d: string;
  change1h: string;
  is1hPositive: boolean;
  change24h: string;
  is24hPositive: boolean;
  change7d: string;
  is7dPositive: boolean;
}

interface TableAsset {
  rank: number;
  symbol: string;
  name: string;
  price: string;
  price1h: string;
  price24h: string;
  price7d: string;
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
  { rank: 1, symbol: 'USDT', price: '$0.9990', price1h: '$0.9991', price24h: '$0.9990', price7d: '$1.0001', change: '-0.01%', isPositive: false, volume: '$28.24B' },
  { rank: 2, symbol: 'BTC', price: '$83,020', price1h: '$83,078', price24h: '$83,020', price7d: '$85,280', change: '+0.32%', isPositive: true, volume: '$12.65B' },
  { rank: 3, symbol: 'ETH', price: '$2,503.4', price1h: '$2,505.4', price24h: '$2,503.4', price7d: '$2,700.5', change: '+0.38%', isPositive: true, volume: '$7.05B' },
  { rank: 4, symbol: 'USDC', price: '$1.0000', price1h: '$1.0001', price24h: '$1.0000', price7d: '$1.0000', change: '-0.01%', isPositive: false, volume: '$6.86B' },
  { rank: 5, symbol: 'SOL', price: '$109.36', price1h: '$109.51', price24h: '$109.36', price7d: '$121.15', change: '-0.31%', isPositive: false, volume: '$1.51B' },
];

const TRENDING_SEARCH_DATA: TrendingAsset[] = [
  {
    rank: 1,
    symbol: 'STRK',
    marketRank: 86,
    price: '$0.428',
    price1h: '$0.425',
    price24h: '$0.428',
    price7d: '$0.380',
    change1h: '+0.71%',
    is1hPositive: true,
    change24h: '+2.15%',
    is24hPositive: true,
    change7d: '+12.63%',
    is7dPositive: true,
  },
  {
    rank: 2,
    symbol: 'SUI',
    marketRank: 14,
    price: '$2.18',
    price1h: '$2.15',
    price24h: '$2.18',
    price7d: '$1.92',
    change1h: '+1.40%',
    is1hPositive: true,
    change24h: '+4.81%',
    is24hPositive: true,
    change7d: '+13.54%',
    is7dPositive: true,
  },
  {
    rank: 3,
    symbol: 'HYPE',
    marketRank: 11,
    price: '$24.60',
    price1h: '$24.10',
    price24h: '$24.60',
    price7d: '$21.20',
    change1h: '+2.07%',
    is1hPositive: true,
    change24h: '+6.96%',
    is24hPositive: true,
    change7d: '+16.04%',
    is7dPositive: true,
  },
  {
    rank: 4,
    symbol: 'AERO',
    marketRank: 81,
    price: '$1.14',
    price1h: '$1.12',
    price24h: '$1.14',
    price7d: '$1.02',
    change1h: '+1.79%',
    is1hPositive: true,
    change24h: '+3.64%',
    is24hPositive: true,
    change7d: '+11.76%',
    is7dPositive: true,
  },
  {
    rank: 5,
    symbol: 'TIA',
    marketRank: 111,
    price: '$4.85',
    price1h: '$4.89',
    price24h: '$4.85',
    price7d: '$5.40',
    change1h: '-0.82%',
    is1hPositive: false,
    change24h: '-1.02%',
    is24hPositive: false,
    change7d: '-10.19%',
    is7dPositive: false,
  },
];

const TABLE_ASSETS_DATA: TableAsset[] = [
  {
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$83,020',
    price1h: '$83,078',
    price24h: '$83,020',
    price7d: '$85,280',
    change1h: '-0.07%',
    is1hPositive: false,
    change24h: '+0.32%',
    is24hPositive: true,
    change7d: '-2.65%',
    is7dPositive: false,
    marketCap: '$1,668.4B',
    volume24h: '$12.61B',
    circulatingSupply: '20.1M BTC',
    sparkline: [85200, 84900, 85600, 84300, 83900, 84100, 83400, 82800, 83020],
  },
  {
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,503.4',
    price1h: '$2,505.4',
    price24h: '$2,503.4',
    price7d: '$2,700.5',
    change1h: '-0.08%',
    is1hPositive: false,
    change24h: '+0.38%',
    is24hPositive: true,
    change7d: '-7.30%',
    is7dPositive: false,
    marketCap: '$305.7B',
    volume24h: '$7.05B',
    circulatingSupply: '122.1M ETH',
    sparkline: [2710, 2690, 2640, 2580, 2550, 2510, 2480, 2495, 2503.4],
  },
  {
    rank: 3,
    symbol: 'SOL',
    name: 'Solana',
    price: '$109.36',
    price1h: '$109.51',
    price24h: '$109.36',
    price7d: '$121.15',
    change1h: '-0.14%',
    is1hPositive: false,
    change24h: '-0.31%',
    is24hPositive: false,
    change7d: '-9.73%',
    is7dPositive: false,
    marketCap: '$64.4B',
    volume24h: '$1.51B',
    circulatingSupply: '589.1M SOL',
    sparkline: [121.5, 119.8, 116.4, 113.2, 112.0, 110.5, 108.4, 109.1, 109.36],
  },
  {
    rank: 4,
    symbol: 'XRP',
    name: 'XRP',
    price: '$1.390',
    price1h: '$1.392',
    price24h: '$1.390',
    price7d: '$1.495',
    change1h: '-0.02%',
    is1hPositive: false,
    change24h: '-0.64%',
    is24hPositive: false,
    change7d: '-7.02%',
    is7dPositive: false,
    marketCap: '$87.9B',
    volume24h: '$694M',
    circulatingSupply: '63,129M XRP',
    sparkline: [1.51, 1.48, 1.46, 1.43, 1.41, 1.38, 1.36, 1.38, 1.39],
  },
  {
    rank: 5,
    symbol: 'TRX',
    name: 'TRON',
    price: '$0.3305',
    price1h: '$0.3299',
    price24h: '$0.3305',
    price7d: '$0.3361',
    change1h: '+0.02%',
    is1hPositive: true,
    change24h: '-0.15%',
    is24hPositive: false,
    change7d: '-1.67%',
    is7dPositive: false,
    marketCap: '$31.4B',
    volume24h: '$231M',
    circulatingSupply: '94,991M TRX',
    sparkline: [0.338, 0.336, 0.334, 0.331, 0.332, 0.329, 0.328, 0.330, 0.3305],
  },
];

export const MarketOverviewSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [selectedAsset, setSelectedAsset] = useState<TableAsset | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedAsset) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedAsset]);

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
          price1h: vol.price1h,
          price24h: vol.price24h,
          price7d: vol.price7d,
          change1h: '-0.01%',
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
        const tr = TRENDING_SEARCH_DATA.find((t) => t.symbol === symbol);
        if (tr) {
          setSelectedAsset({
            rank: tr.rank,
            symbol: tr.symbol,
            name: tr.symbol,
            price: tr.price,
            price1h: tr.price1h,
            price24h: tr.price24h,
            price7d: tr.price7d,
            change1h: tr.change1h,
            is1hPositive: tr.is1hPositive,
            change24h: tr.change24h,
            is24hPositive: tr.is24hPositive,
            change7d: tr.change7d,
            is7dPositive: tr.is7dPositive,
            marketCap: '$1.85B',
            volume24h: '$312M',
            circulatingSupply: '1,200M ' + tr.symbol,
            sparkline: [1.2, 1.25, 1.3, 1.28, 1.35, 1.4, 1.38, 1.42, 1.45],
          });
        } else {
          setSelectedAsset({
            rank: 99,
            symbol,
            name: symbol,
            price: '$1.45',
            price1h: '$1.44',
            price24h: '$1.45',
            price7d: '$1.28',
            change1h: '+0.69%',
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
    }
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

  // Compute active price based on selected timeframe
  const displayPrice = selectedAsset
    ? selectedTimeframe === '1h'
      ? selectedAsset.price1h
      : selectedTimeframe === '7d'
      ? selectedAsset.price7d
      : selectedAsset.price24h
    : '';

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
            {isFrench ? 'SCANNER : 200 PAIRES' : 'SCANNER: 200 PAIRS'}
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
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench ? 'APERÇU GLOBAL DU MARCHÉ (TOP ACTIFS)' : 'GLOBAL MARKET OVERVIEW (TOP ASSETS)'}
            </span>
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
                  onClick={() => setSelectedAsset(asset)}
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
      </div>

      {/* Interactive Asset Inspection Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-[#111622] border border-[#1E2638] rounded-none max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl font-mono text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
              <div className="flex items-center space-x-3">
                <CryptoIcon symbol={selectedAsset.symbol} size={28} />
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-slate-100">{selectedAsset.name}</span>
                  <span className="text-xs text-slate-400 uppercase">{selectedAsset.symbol}/USDT</span>
                  <span className="text-[10px] bg-blue-950/70 border border-blue-800 text-blue-400 px-1.5 py-0.2">
                    PERP
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-white p-1 transition-colors"
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
                  <span className="text-2xl font-bold text-slate-100">{displayPrice}</span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketOverviewSim;
