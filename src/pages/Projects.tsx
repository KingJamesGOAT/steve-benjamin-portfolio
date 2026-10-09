import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Activity, Award, Lock, BookOpen, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import MockIDE from '../components/features/MockIDE';

const cryptoSnippet = `import { useEffect, useState } from 'react';
import { useBinanceStream } from '@/hooks/useBinanceStream';

export default function LiveTerminal() {
  const { tradeData, isConnected } = useBinanceStream('btcusdt');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (tradeData) {
      const pnl = calculatePnL(tradeData.price);
      setLogs(prev => [\`[EXEC] BTC/USDT @ $\${tradeData.price} | PnL: \${pnl}%\`, ...prev]);
    }
  }, [tradeData]);

  return (
    <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span>Terminal status: {isConnected ? 'LIVE' : 'OFFLINE'}</span>
      </div>
      <ul className="h-48 overflow-y-auto">
        {logs.map((log, i) => <li key={i}>{log}</li>)}
      </ul>
    </div>
  );
}`;

const donnonsSnippet = `<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const collections = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('/api/collections/active');
    collections.value = response.data;
  } catch (error) {
    console.error("Failed to load collections", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <CollectionCard v-for="item in collections" :key="item.id" :data="item" />
  </div>
</template>`;

export const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Page Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-electric-light text-electric border border-electric/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('projects.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
          {t('projects.title')}
        </h1>
        <p className="text-base text-fintech-secondary max-w-2xl leading-relaxed">
          {t('projects.subtitle')}
        </p>
      </section>

      {/* Primary Project 1: Crypto Trade Hub */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {t('projects.crypto.tag')}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('projects.crypto.status')}</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-electric flex-shrink-0" />
                <span>{t('projects.crypto.title')}</span>
              </h2>
              <p className="mt-3 text-sm text-fintech-secondary leading-relaxed">
                {t('projects.crypto.description')}
              </p>
            </div>

            {/* Metrics Highlight Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {t('projects.crypto.pnlLabel')}
                </span>
                <div className="text-xl font-bold font-mono text-emerald-600">
                  {t('projects.crypto.pnlValue')}
                </div>
              </div>
              <Activity className="w-6 h-6 text-emerald-500 opacity-80" />
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Binance Streams', 'PnL Engine'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-white border border-slate-200 text-slate-600 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <MockIDE
              filename="src/components/LiveTerminal.tsx"
              code={cryptoSnippet}
            />
          </div>
        </div>
      </section>

      {/* Primary Project 2: Donnons.ch */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-50 text-rose-700 border border-rose-200">
                {t('projects.donnons.tag')}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                <HeartHandshake className="w-3 h-3 text-rose-500" />
                <span>HUG</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2">
                <Award className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <span>{t('projects.donnons.title')}</span>
              </h2>
              <p className="mt-3 text-sm text-fintech-secondary leading-relaxed">
                {t('projects.donnons.description')}
              </p>
            </div>

            {/* Academic Evaluation Highlight */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {t('projects.donnons.gradeLabel')}
                </span>
                <div className="text-xl font-bold font-mono text-fintech-primary">
                  {t('projects.donnons.gradeValue')}
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Vue.js 3', 'Laravel API', 'Tailwind CSS', 'Axios', 'HUG Mandate'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-white border border-slate-200 text-slate-600 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <MockIDE
              filename="resources/js/components/CollecteVitrine.vue"
              code={donnonsSnippet}
            />
          </div>
        </div>
      </section>

      {/* Smaller Showcase Grid: Catholic Route & Marriage Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Showcase: Catholic Route */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {t('projects.catholicRoute.tag')}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-electric flex-shrink-0" />
              <span>{t('projects.catholicRoute.title')}</span>
            </h3>
            <p className="text-sm text-fintech-secondary leading-relaxed">
              {t('projects.catholicRoute.description')}
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature1')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature2')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature3')}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {['React', 'Framer Motion', 'Dictionary Hover', 'Search UX'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-slate-50 border border-slate-200 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Showcase: Marriage Website */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
              {t('projects.marriage.tag')}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2">
              <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>{t('projects.marriage.title')}</span>
            </h3>
            <p className="text-sm text-fintech-secondary leading-relaxed">
              {t('projects.marriage.description')}
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature1')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature2')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature3')}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {['React / Vite', 'RSVP Engine', 'Private Access', 'Editorial UI'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-slate-50 border border-slate-200 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
