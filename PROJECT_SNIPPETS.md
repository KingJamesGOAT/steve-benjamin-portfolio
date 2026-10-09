# Project Code Snippets for Portfolio Display

**AI INSTRUCTION:** *These are curated code ideas representing actual projects. Use these snippets inside the interactive `<MockIDE/>` component on the Projects page.*

### 1. Crypto Trade Hub (React / TypeScript / Tailwind)
**Context:** A live trading bot simulator showing PnL and terminal logs.
**File to simulate:** `src/components/LiveTerminal.tsx`
**Code Idea to Display:**
import { useEffect, useState } from 'react';
import { useBinanceStream } from '@/hooks/useBinanceStream';

export default function LiveTerminal() {
  const { tradeData, isConnected } = useBinanceStream('btcusdt');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (tradeData) {
      const pnl = calculatePnL(tradeData.price);
      setLogs(prev => [`[EXEC] BTC/USDT @ $${tradeData.price} | PnL: ${pnl}%`, ...prev]);
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
}
### 2. Donnons.ch / Sixième Sens (Vue.js / Laravel)
**Context:** A blood donation platform (Grade 6/6) mandated by HUG.
**File to simulate:** `resources/js/components/CollecteVitrine.vue`
**Code Idea to Display:**
<script setup>
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
</template>
### 3. Catholic Route (UI / UX / Interactive)
**Context:** Sleek UX features including a Ctrl+K search and a Dictionary Hover.
**File to simulate:** `src/components/DictionaryHover.tsx`
**Code Idea to Display:**
import { useState } from 'react';
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
            className="absolute bottom-full mb-2 w-64 p-3 bg-white shadow-xl rounded-md text-sm text-slate-800 z-50"
          >
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};