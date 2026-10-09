# AI Coding Directives

1. ROLE & TONE: You are an expert Senior Frontend Architect. Code must be highly optimized, modular, and production-ready.
2. STACK: React 18, TypeScript (Strict), Vite, Tailwind CSS. No deprecated patterns. Use functional components and hooks exclusively.
3. NO HALLUCINATIONS: Do not generate "Lorem Ipsum" or fake projects. Use ONLY the data provided in `CONTENT.md` and `PROJECT_SNIPPETS.md`. If data is missing, ask the user.
4. DESIGN SYSTEM:
  - Light Theme strictly. Minimalist, sleek, modern.
  - Inspiration: High-end Swiss FinTechs and modern developer portfolios.
  - Colors: High contrast black/white/grays with a single sharp accent color (e.g., electric blue) for interactive states.
  - Borders/Shadows: Use very subtle borders (`border-gray-200`), ample padding, and soft, modern shadows.
5. TYPESCRIPT: No `any` types. Define all interfaces in `src/types/`.
6. I18N: All text MUST be wrapped in the `t()` function from `react-i18next`. Do not hardcode English or French text in the components.