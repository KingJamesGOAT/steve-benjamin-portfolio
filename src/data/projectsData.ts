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

export const marriageSnippet = `import { useState, useEffect } from 'react';
import { EmailService } from '../services/EmailService';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBk.../exec';

export function RSVPWorkflow() {
  const [formData, setFormData] = useState({
    attending: 'yes',
    firstName: '',
    lastName: '',
    email: '',
    guests: '1',
    children: '0',
    dietaryType: 'none',
    dinnerAttendance: '',
    aperoContribution: 'no',
    aperoItem: '',
  });
  const [isDinnerGuest, setIsDinnerGuest] = useState(false);

  // Magic Link Access Control (?invite=dinner)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('invite') === 'dinner') setIsDinnerGuest(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Live Webhook Dispatch to Google Sheets / Excel DB
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'rsvp', ...formData }),
    });

    // 2. Client-Side Persistent Session Storage
    const sessionData = { rsvp: { ...formData } };
    localStorage.setItem('rsvp_session_data', JSON.stringify(sessionData));
    window.dispatchEvent(new Event('rsvp-data-updated'));

    // 3. Automated Bilingual Confirmation Dispatch
    await EmailService.sendRSVPConfirmation({
      to_name: \`\${formData.firstName} \${formData.lastName}\`,
      to_email: formData.email,
      attending_status: formData.attending === 'yes' ? 'Présent(e)' : 'Absent(e)',
      guests_count: formData.guests,
      children_count: parseInt(formData.children),
      dinner_status: formData.dinnerAttendance || 'N/A',
      dietary_info: formData.dietaryType,
    });
  };

  return <form onSubmit={handleSubmit}>{/* Dynamic Multi-Step RSVP UI */}</form>;
};`;

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
    techStack: ['Vue.js 3', 'MySQL', 'Laravel REST', 'Tailwind CSS', 'Grade 6.0'],
    filename: 'resources/js/components/CollecteVitrine.vue',
    code: donnonsSnippet,
    statusBadgeKey: 'projects.donnons.status',
    statsKey: 'projects.donnons.gradeLabel',
    statsValueKey: 'projects.donnons.gradeValue',
    features: [
      'Official client mandate addressing the 30% on-site rejection rate',
      'Gamified pre-screening cosmic quiz with Roby mascot demystifying medical deferral criteria',
      'Corporate CSR partner portal with real-time lives-saved forecasting and Label CTS',
    ],
    featuresFr: [
      'Mandat officiel résorbant le différentiel de rejet de 30% en entreprise',
      'Quiz spatial ludo-pédagogique avec Roby désamorçant les freins médicaux',
      'Portail partenaires RSE avec projection d\'impact en direct et Label CTS',
    ],
    specs: {
      mandate: 'HUG (Hôpitaux Universitaires de Genève)',
      role: 'Full-Stack Engineering & UX Delivery',
      architecture: 'Vue.js 3, MySQL, Laravel REST API, Tailwind CSS',
      evaluation: 'Grade: 6.0 / 6.0 (Maximum Swiss academic distinction)',
    },
    specsFr: {
      mandate: 'HUG (Hôpitaux Universitaires de Genève)',
      role: 'Ingénierie Full-Stack & Livraison UX',
      architecture: 'Vue.js 3, MySQL, API REST Laravel, Tailwind CSS',
      evaluation: 'Note : 6.0 / 6.0 (Note académique maximale suisse)',
    },
  },
  {
    id: 'catholic-route',
    slug: 'catholic-route',
    titleKey: 'projects.catholicRoute.title',
    tagKey: 'projects.catholicRoute.tag',
    descriptionKey: 'projects.catholicRoute.description',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Search Engine'],
    filename: 'src/components/GlossarySearch.tsx',
    code: catholicSnippet,
    features: [
      'Fast client-side querying across 5,000+ terms with instant Enter selection',
      'Contextual floating definition cards on hover without losing reading flow',
      'Chronological timeline of foundational treatises and scholars',
    ],
    featuresFr: [
      'Recherche instantanée sur 5 000+ termes avec sélection Entrée',
      'Infobulles de définitions au survol sans interrompre la lecture',
      'Frise chronologique des traités et figures fondatrices',
    ],
    specs: {
      mandate: 'Digital Humanities & Epistemology',
      role: 'Frontend Engineering & UI Design',
      architecture: 'React, TypeScript, Tailwind CSS',
      evaluation: 'Sub-10ms response time & zero layout shift',
    },
    specsFr: {
      mandate: 'Humanités Numériques & Épistémologie',
      role: 'Développement Frontend & Design UI',
      architecture: 'React, TypeScript, Tailwind CSS',
      evaluation: 'Temps de réponse < 10ms & zéro décalage visuel',
    },
  },
  {
    id: 'marriage-platform',
    slug: 'marriage-platform',
    titleKey: 'projects.marriage.title',
    tagKey: 'projects.marriage.tag',
    descriptionKey: 'projects.marriage.description',
    techStack: ['React 18', 'TypeScript', 'Google Sheets / Excel Sync', 'LocalStorage Session', 'Magic Link Access', 'EmailJS'],
    filename: 'src/components/pages/RSVP.tsx',
    code: marriageSnippet,
    features: [
      'Interactive RSVP intake engine with headcount (adults/children) and dietary preferences',
      'Real-time serverless webhook synchronization appending rows to Google Sheets and Excel',
      'Magic Link access (?invite=dinner) and persistent browser session (LocalStorage)',
    ],
    featuresFr: [
      'Moteur de RSVP interactif avec répartition (adultes/enfants) et préférences alimentaires',
      'Synchronisation temps réel par webhook serverless vers Google Sheets et Excel',
      'Contrôle d\'accès Magic Link (?invite=dinner) et session navigateur persistante (LocalStorage)',
    ],
    specs: {
      mandate: 'Private Event & Wedding Platform',
      role: 'Full-Stack Developer & UI Designer',
      architecture: 'React 18, Google Apps Script (Excel DB), LocalStorage',
      evaluation: '100% RSVP intake accuracy, 0 CHF/mo serverless infrastructure',
    },
    specsFr: {
      mandate: 'Plateforme Événementielle Privée',
      role: 'Développeur Full-Stack & Designer UI',
      architecture: 'React 18, Google Apps Script (Base Excel), LocalStorage',
      evaluation: '100% de précision des réponses, 0 CHF/mois d\'infrastructure',
    },
  },
];
