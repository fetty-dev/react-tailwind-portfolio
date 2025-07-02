# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Project Setup

- `npm install` - Install all dependencies
- The project uses Node.js modules (`"type": "module"` in package.json)

## Architecture Overview

This is a React 19 portfolio website built with Vite 7 and TailwindCSS 4. The application follows a single-page design where all content sections are rendered on the Home page with smooth scrolling navigation.

### Key Architectural Patterns

**Single-Page Application Structure**: The main content lives in `/src/pages/Home.jsx` which orchestrates all portfolio sections (Hero, About, Skills, Contact, etc.). React Router is minimal - only handling home route and 404 fallback.

**Component Organization**:

- `/src/components/` contains section components (HeroSection, AboutSection, etc.) and shared UI
- `/src/components/ui/` contains base UI primitives built on Radix UI
- `/src/hooks/` contains custom React hooks (primarily toast system)

**Theme System**: Uses CSS custom properties defined in `/src/index.css` with a `@theme` directive. Theme switching is handled by `ThemeToggle.jsx` with localStorage persistence.

**Styling Approach**: TailwindCSS 4 with custom design tokens. Berkeley Mono font is loaded via `@font-face` declarations in the main CSS file. Custom animations are defined as CSS custom properties.

**Toast System**: Built on Radix UI Toast primitives with custom hook (`use-toast.js`) managing state via useReducer pattern.

**Vite Configuration**: Uses `@` alias pointing to `/src` directory. Plugins include React and TailwindCSS Vite integration.

## Project-Specific Guidelines

### Import Patterns
- Use `@/` alias for imports from src directory (configured in `vite.config.js`)
- Components use named exports, pages use named exports
- Utility functions are in `/src/lib/utils.js`

### Styling Conventions

- TailwindCSS utility classes throughout
- Custom animations use CSS custom properties defined in theme
- Theme variables follow HSL color format: `hsl(var(--variable-name))`
- Berkeley Mono font family is the primary typeface

### Component Patterns

- Functional components with hooks
- Toast notifications handled via `useToast()` hook
- Theme switching via `ThemeToggle` component
- Star background animation in `StarBackground.jsx` generates stars based on viewport size

### State Management

- Local component state via useState
- Theme persistence via localStorage
- Toast state managed via custom useReducer hook
- No global state management library used

### Current Status

- Projects section shows "Coming Soon" placeholder
- Contact form is functional but lacks backend integration
- All other sections (Hero, About, Skills, Contact) are fully implemented