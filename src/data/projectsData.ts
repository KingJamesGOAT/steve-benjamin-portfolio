import type { ProjectData } from '../types';

export const cryptoSnippet = `import { useEffect, useState } from 'react';
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
    <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-none">
      <div className="flex justify-between items-center mb-2">
        <span>Terminal status: {isConnected ? 'LIVE' : 'OFFLINE'}</span>
      </div>
      <ul className="h-48 overflow-y-auto">
        {logs.map((log, i) => <li key={i}>{log}</li>)}
      </ul>
    </div>
  );
}`;

export const donnonsSnippet = `<script setup>
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

export const catholicSnippet = `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DictionaryHover = ({ term, definition }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative underline decoration-dotted text-blue-600 cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {term}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full mb-2 w-64 p-3 bg-white shadow-xl rounded-none text-sm text-slate-800 z-50"
          >
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};`;

export const marriageSnippet = `import { useState } from 'react';

export function RSVPForm({ invitationId }: { invitationId: string }) {
  const [status, setStatus] = useState<'attending' | 'declined' | 'pending'>('pending');
  const [dietary, setDietary] = useState<string>('');

  const submitRSVP = async () => {
    await fetch('/api/guest/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitationId, status, dietary }),
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitRSVP(); }} className="space-y-4">
      {/* Confidential RSVP State Form */}
    </form>
  );
}`;

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'crypto-trade-hub',
    slug: 'crypto-trade-hub',
    titleKey: 'projects.crypto.title',
    tagKey: 'projects.crypto.tag',
    descriptionKey: 'projects.crypto.description',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Binance Streams', 'PnL Engine', 'Vite'],
    filename: 'src/components/LiveTerminal.tsx',
    code: cryptoSnippet,
    statusBadgeKey: 'projects.crypto.status',
    statsKey: 'projects.crypto.pnlLabel',
    statsValueKey: 'projects.crypto.pnlValue',
    features: [
      'Sub-millisecond WebSocket data ingestion from Binance API feeds',
      'Dynamic order execution simulator logging real-time fills',
      'Continuous profit-and-loss (PnL) mathematical simulation engine',
      'High-contrast terminal GUI with low-overhead React render cycles',
    ],
    featuresFr: [
      'Ingestion de données WebSocket sub-milliseconde depuis les flux API Binance',
      'Simulateur d\'exécution d\'ordres dynamique enregistrant les fills en direct',
      'Moteur mathématique continu de simulation des profits et pertes (PnL)',
      'Interface terminal à fort contraste avec cycles de rendu React ultra-légers',
    ],
    specs: {
      mandate: 'Personal FinTech Research & Simulator',
      role: 'Lead Frontend & Systems Architect',
      architecture: 'React 18, Custom WebSocket Hook, Tailwind CSS',
      evaluation: 'Sub-second real-time state synchronization',
    },
    specsFr: {
      mandate: 'Recherche & Simulateur FinTech Personnel',
      role: 'Architecte Frontend & Systèmes',
      architecture: 'React 18, Hook WebSocket Personnalisé, Tailwind CSS',
      evaluation: 'Synchronisation d\'état temps réel sub-seconde',
    },
  },
  {
    id: 'donnons-ch',
    slug: 'donnons-ch',
    titleKey: 'projects.donnons.title',
    tagKey: 'projects.donnons.tag',
    descriptionKey: 'projects.donnons.description',
    techStack: ['Vue.js 3', 'Laravel API', 'Tailwind CSS', 'Axios', 'HUG Mandate'],
    filename: 'resources/js/components/CollecteVitrine.vue',
    code: donnonsSnippet,
    statusBadgeKey: 'projects.donnons.status',
    statsKey: 'projects.donnons.gradeLabel',
    statsValueKey: 'projects.donnons.gradeValue',
    features: [
      'Official client mandate for HUG (Hôpitaux Universitaires de Genève)',
      'Handcrafted, intentional visual identity ensuring emotional connection',
      'Reactive Vue.js client with component modularity and smooth transitions',
      'Robust Laravel REST backend facilitating active collection point dispatching',
    ],
    featuresFr: [
      'Mandat client officiel pour les HUG (Hôpitaux Universitaires de Genève)',
      'Identité visuelle intentionnelle faite main renforçant le lien émotionnel',
      'Client réactif Vue.js avec composants modulaires et transitions fluides',
      'Backend Laravel REST robuste pour la coordination des collectes mobiles',
    ],
    specs: {
      mandate: 'HUG (Hôpitaux Universitaires de Genève)',
      role: 'Full-Stack Engineering & UX Delivery',
      architecture: 'Vue.js, Laravel Backend, MySQL, Tailwind CSS',
      evaluation: 'Grade 6.0 / 6.0 (Maximum Swiss academic grade)',
    },
    specsFr: {
      mandate: 'HUG (Hôpitaux Universitaires de Genève)',
      role: 'Ingénierie Full-Stack & Livraison UX',
      architecture: 'Vue.js, Backend Laravel, MySQL, Tailwind CSS',
      evaluation: 'Note 6.0 / 6.0 (Note académique maximale suisse)',
    },
  },
  {
    id: 'catholic-route',
    slug: 'catholic-route',
    titleKey: 'projects.catholicRoute.title',
    tagKey: 'projects.catholicRoute.tag',
    descriptionKey: 'projects.catholicRoute.description',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Ctrl+K Search'],
    filename: 'src/components/DictionaryHover.tsx',
    code: catholicSnippet,
    features: [
      'Interactive dictionary hover with smooth Framer Motion floating tooltips',
      'Instant global keyboard navigation via Ctrl+K command palette',
      'High-fidelity editorial layout and responsive typography hierarchy',
      'Deep-linking support and accessible semantic HTML architecture',
    ],
    featuresFr: [
      'Dictionnaire interactif avec infobulles flottantes Framer Motion fluides',
      'Navigation globale instantanée au clavier via palette de commandes Ctrl+K',
      'Mise en page éditoriale soignée et hiérarchie typographique réactive',
      'Prise en charge des liens profonds et architecture HTML sémantique accessible',
    ],
    specs: {
      mandate: 'Educational & Cultural Digital Platform',
      role: 'Frontend & Interaction Engineer',
      architecture: 'React, Framer Motion, Context API, Tailwind CSS',
      evaluation: 'Seamless micro-interactions with zero layout shifts',
    },
    specsFr: {
      mandate: 'Plateforme Numérique Éducative & Culturelle',
      role: 'Ingénieur Frontend & Interactions',
      architecture: 'React, Framer Motion, Context API, Tailwind CSS',
      evaluation: 'Micro-interactions fluides sans décalage de mise en page',
    },
  },
  {
    id: 'marriage-platform',
    slug: 'marriage-platform',
    titleKey: 'projects.marriage.title',
    tagKey: 'projects.marriage.tag',
    descriptionKey: 'projects.marriage.description',
    techStack: ['React / Vite', 'RSVP Engine', 'Private Access', 'Editorial UI'],
    filename: 'src/components/RSVPForm.tsx',
    code: marriageSnippet,
    features: [
      'Private authentication and confidentiality protocols shielding guest URLs',
      'Stateful multi-step guest RSVP tracking and dietary requirement handling',
      'Editorial Swiss minimalist typography and responsive mobile experience',
      'Deterministic database state dispatching with immediate confirmation feedback',
    ],
    featuresFr: [
      'Protocoles privés d\'authentification protégeant la confidentialité des invités',
      'Gestion d\'état multi-étapes des RSVP et préférences culinaires',
      'Typographie éditoriale suisse épurée et expérience mobile réactive',
      'Dispatch déterministe d\'état en base de données avec confirmation immédiate',
    ],
    specs: {
      mandate: 'Private Event Platform (2026)',
      role: 'Full-Stack Developer & UI Designer',
      architecture: 'React, Vite, Private Routing Engine, Tailwind CSS',
      evaluation: '100% guest RSVP accuracy and zero public indexing',
    },
    specsFr: {
      mandate: 'Plateforme Événementielle Privée (2026)',
      role: 'Développeur Full-Stack & Designer UI',
      architecture: 'React, Vite, Moteur de Routage Privé, Tailwind CSS',
      evaluation: '100% de précision des RSVP et zéro indexation publique',
    },
  },
];
