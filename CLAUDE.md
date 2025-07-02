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

**Single-Page Application Structure**: The main content lives in `/src/pages/Home.jsx` which orchestrates all portfolio sections (Hero, About, Skills, Projects, Contact). React Router handles home route and 404 fallback via NotFound.jsx.

**Component Organization**:
- `/src/components/` contains section components (HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection, etc.) and shared UI
- `/src/components/ui/` contains base UI primitives built on Radix UI (toast system)
- `/src/hooks/` contains custom React hooks (toast system via use-toast.js)
- `/src/services/` contains external API integrations (GitHub API service)

**GitHub Integration**: The SkillsSection dynamically fetches repository data via `/src/services/githubApi.js` to calculate programming language skills based on actual code usage. Requires `VITE_GITHUB_TOKEN` environment variable.

**Theme System**: Uses CSS custom properties defined in `/src/index.css` with TailwindCSS 4 `@theme` directive. Theme switching handled by `ThemeToggle.jsx` with localStorage persistence.

**Styling Approach**: TailwindCSS 4 with custom design tokens. Berkeley Mono font loaded via `@font-face` declarations in main CSS. Custom animations defined as CSS custom properties.

**Toast System**: Built on Radix UI Toast primitives with custom hook (`use-toast.js`) managing state via useReducer pattern.

**Vite Configuration**: Uses `@` alias pointing to `/src` directory. Plugins include React and TailwindCSS Vite integration.

## Project-Specific Guidelines

### Import Patterns
- Use `@/` alias for imports from src directory (configured in `vite.config.js`)
- Components use named exports consistently
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

### API Integration
- GitHub API service in `/src/services/githubApi.js` handles repository data fetching
- Error handling with custom GitHubApiError class
- Skill levels calculated from actual repository language statistics
- Fallback skills provided when GitHub API is unavailable

### State Management
- Local component state via useState
- Theme persistence via localStorage
- Toast state managed via custom useReducer hook
- No global state management library used

### Environment Variables
- `VITE_GITHUB_TOKEN` - Required for GitHub API integration in SkillsSection

### Current Status
- All sections fully implemented (Hero, About, Skills, Projects, Contact)
- Skills section dynamically populated from GitHub repositories
- Contact form functional but lacks backend integration
- Project section ready for project showcase