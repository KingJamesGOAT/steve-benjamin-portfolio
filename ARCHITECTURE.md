# Technical Architecture & Core Features

1. INTERNATIONALIZATION (i18n):
  - Use `i18next-browser-languagedetector` to auto-detect language on first load.
  - Save language preference in a cookie via `js-cookie`.
  - Include a sleek EN/FR toggle in the Navbar.

2. ANTIGRAVITY PHYSICS ENGINE:
  - The Home page must feature an interactive canvas using `matter-js` and `framer-motion`.
  - Icons of the tech stack (React, Vite, Tailwind, Figma, Canva, Notion, GitHub, Vercel, Tally, DaVinci Resolve, FL Studio, CapCut, Trading212) will fall into the screen and react to mouse drag/throw physics.

3. CTRL+K COMMAND PALETTE:
  - Global event listener for `Ctrl+K` (or `Cmd+K`).
  - Blurs the background (`backdrop-blur-md`).
  - Provides instant search routing to: Home, About, Projects, Bachelor Pitch.

4. INTERACTIVE DICTIONARY:
  - A custom wrapper component `<GlossaryTerm term="API" definition="..." />`.
  - On hover, it displays a sleek, animated tooltip with the definition. Used for complex media/finance/tech terms.

5. CODE SHOWCASES:
  - Projects are NOT static screenshots.
  - Read from `PROJECT_SNIPPETS.md` to extract actual logic from the crypto trading bot and the donation platform to display inside a sleek `<MockIDE />` window component.