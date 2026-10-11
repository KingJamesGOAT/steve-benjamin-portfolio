import React from 'react';
import { Activity, BarChart2, TrendingUp } from 'lucide-react';

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
  { rank: 2, symbol: 'QTC', marketRank: 600 },
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
            MARKET HYPE & VOLUME SURVEILLANCE
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 bg-[#111622] border border-[#1E2638] text-[11px] text-slate-300">
            SCANNER: 300+ PAIRS
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            INTERVAL: REALTIME TICK
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
                TOP VOLUME (24H)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">USDT PAIRINGS</span>
          </div>

          <div className="divide-y divide-[#1E2638]/60">
            {TOP_VOLUME_DATA.map((item) => (
              <div
                key={item.symbol}
                className="py-2 flex items-center justify-between text-xs font-mono hover:bg-[#161C2C] px-1.5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500 text-[11px] w-4">#{item.rank}</span>
                  <div className="w-6 h-6 bg-[#1A2234] border border-[#243048] flex items-center justify-center font-bold text-[10px] text-slate-200 rounded-none">
                    {item.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-100">{item.symbol}</span>
                    <span className="text-slate-400 text-[11px] ml-2">{item.price}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-200 font-semibold">{item.volume}</div>
                  <div
                    className={`text-[10px] ${
                      item.isPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {item.change}
                  </div>
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
                TRENDING SEARCH
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">ALGORITHM REGIME</span>
          </div>

          <div className="divide-y divide-[#1E2638]/60">
            {TRENDING_SEARCH_DATA.map((item) => (
              <div
                key={item.symbol}
                className="py-2 flex items-center justify-between text-xs font-mono hover:bg-[#161C2C] px-1.5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500 text-[11px] w-4">#{item.rank}</span>
                  <div className="w-6 h-6 bg-[#1A2234] border border-[#243048] flex items-center justify-center font-bold text-[10px] text-slate-200 rounded-none">
                    {item.symbol.substring(0, 3)}
                  </div>
                  <span className="font-bold text-slate-100">{item.symbol}</span>
                </div>

                <div className="border border-[#243048] bg-[#0E131F] px-2 py-0.5 text-[11px] text-slate-400 rounded-none">
                  Rank #{item.marketRank}
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
              GLOBAL MARKET OVERVIEW (TOP ASSETS)
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none" />
            <span>ORDERBOOK AGGREGATION: ACTIVE</span>
          </div>
        </div>

        {/* Dense Responsive Monospace Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#1E2638] text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2 font-normal w-8">#</th>
                <th className="py-2.5 px-2 font-normal">Asset</th>
                <th className="py-2.5 px-2 font-normal text-right">Price</th>
                <th className="py-2.5 px-2 font-normal text-right">1h %</th>
                <th className="py-2.5 px-2 font-normal text-right">24h %</th>
                <th className="py-2.5 px-2 font-normal text-right">7d %</th>
                <th className="py-2.5 px-2 font-normal text-right hidden sm:table-cell">Market Cap</th>
                <th className="py-2.5 px-2 font-normal text-right hidden md:table-cell">Volume (24h)</th>
                <th className="py-2.5 px-2 font-normal text-right hidden lg:table-cell">Circulating Supply</th>
                <th className="py-2.5 px-2 font-normal text-right w-32">Last 7 Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638]/60">
              {TABLE_ASSETS_DATA.map((asset) => (
                <tr
                  key={asset.symbol}
                  className="hover:bg-[#161C2C] transition-colors text-slate-200"
                >
                  <td className="py-3 px-2 text-slate-500">{asset.rank}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-6 h-6 bg-[#1A2234] border border-[#243048] flex items-center justify-center font-bold text-[10px] text-slate-200 rounded-none shrink-0">
                        {asset.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{asset.name}</div>
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
    </div>
  );
};

export default MarketOverviewSim;
