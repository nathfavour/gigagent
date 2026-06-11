# AGENTS.md - Coding Guidelines for GigAgent

## 🏗️ Architectural Mandates (GigAgent Core)

### 🚫 IMMUTABLE FILES & API STRATEGY
- **No internal APIs**: DO NOT introduce new HTTP API routes/endpoints (`src/app/api/*`, `route.ts`) for in-app flows. GigAgent keeps zero extra attack surface.
- **Prefer Internal Methods**: Use existing in-process functions, Server Actions, and SDK helpers.
- **Data Consolidation**: Use Server Actions or consolidated internal service methods.

### 🛑 MANDATORY SOURCE CONTROL RESTRICTIONS
- **NO GIT COMMITS**: DO NOT run `git commit`, `git add`, etc.
- **ZERO STAGING**: Never stage changes.

### ⚡ Development Standards
- **Next.js & React**: Implement against Next.js 16+ and React 19+.
- **Tailwind CSS v4**: Use Tailwind CSS v4 for all styling.
- **OpenBricks 2.0 Design**: Follow the "Pitch-Dark Sanctuary" design system. No MUI, no Emotion.
- **Global Unmount Policy**: Strictly use conditional rendering (`{isOpen && <Component />}`) for all overlays.

## Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities.
- **Terminology Mandate**: Use **"Table"** instead of "Collection" and **"Row"** instead of "Document".

## Key Dependencies
- **Auth/Backend**: Appwrite.
- **Styling**: tailwindcss (v4), framer-motion.
- **Agent Logic**: custom signaling, peer-to-peer protocols.
