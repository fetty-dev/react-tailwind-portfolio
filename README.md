# Jafet Hernandez - Portfolio

A modern, interactive portfolio website showcasing my work as a developer and AI enthusiast. Built with React, featuring a cosmic-themed design with animated stars, smooth scrolling, and thoughtful user interactions.

## 🌟 Features

- **Responsive Design**: Fully responsive across all devices with modern CSS Grid and Flexbox
- **Animated Star Background**: Dynamic star field with floating meteors for a cosmic experience
- **Dark/Light Theme Toggle**: Seamless theme switching with system preference detection
- **Smooth Scroll Navigation**: Single-page application with smooth scrolling between sections
- **Interactive Components**: Hover effects, animations, and micro-interactions throughout
- **Contact Form**: Functional contact form with toast notifications
- **Modern Typography**: Berkeley Mono font for a distinctive, clean aesthetic
- **Performance Optimized**: Built with Vite for fast development and optimized production builds

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Ultra-fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework with custom design system
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful SVG icons

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Class Variance Authority** - Type-safe component variants
- **Tailwind Merge** - Intelligent Tailwind class merging
- **Custom Toast System** - Built with Radix UI Toast primitives

### Development Tools
- **ESLint** - Code linting with React-specific rules
- **Vite Aliases** - Clean import paths with @ alias
- **Hot Module Replacement** - Instant feedback during development

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (toast, etc.)
│   ├── AboutSection.jsx # About me section with cards
│   ├── ContactSection.jsx # Contact form and social links
│   ├── Footer.jsx       # Footer component
│   ├── HeroSection.jsx  # Landing hero with animations
│   ├── Navbar.jsx       # Navigation component
│   ├── ProjectsSection.jsx # Featured projects (coming soon)
│   ├── SkillsSection.jsx # Skills with category filtering
│   ├── StarBackground.jsx # Animated cosmic background
│   └── ThemeToggle.jsx  # Dark/light mode switcher
├── hooks/               # Custom React hooks
│   └── use-toast.js     # Toast notification hook
├── lib/                 # Utility functions
│   └── utils.js         # Class merging utilities
├── pages/               # Page components
│   ├── Home.jsx         # Main portfolio page
│   └── NotFound.jsx     # 404 error page
├── assets/              # Static assets
└── App.jsx              # Main app component with routing
```

## 🎨 Design Features

### Cosmic Theme
- Animated star background with randomly positioned stars
- Floating meteors with trail effects
- Gradient text effects and cosmic button styles
- Smooth animations and transitions

### Typography
- **Berkeley Mono** - Custom font family for distinctive branding
- Responsive text sizing
- Gradient text effects for headings
- Optimized font loading with `font-display: swap`

### Interactive Elements
- Hover effects on cards and buttons
- Smooth scroll navigation
- Animated skill category filtering
- Toast notifications for form submissions
- Bouncing scroll indicator

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Sections Overview

### Hero Section
- Animated introduction with staggered text reveals
- Call-to-action button with cosmic styling
- Scroll indicator with bounce animation

### About Section
- Personal introduction and philosophy
- Feature cards highlighting specializations:
  - AI & Automation
  - Frontend Development
  - Creative Problem Solving
- Contact and CV download buttons

### Skills Section
- Interactive skill filtering by category (Frontend, Backend, Tools)
- Animated skill cards with hover effects
- Clean categorization system

### Projects Section
- Currently shows "Coming Soon" placeholder
- Prepared structure for showcasing featured projects
- Grid layout ready for project cards with:
  - Project images
  - Technology tags
  - Live demo and GitHub links

### Contact Section
- Functional contact form with validation
- Social media links (Twitter, LinkedIn, Instagram, Twitch)
- Contact information display
- Toast notifications for form feedback

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

The portfolio uses a custom design system with CSS custom properties:
- Dynamic theming (light/dark mode)
- Primary accent colors
- Semantic color naming
- Consistent spacing and typography scales

## 🚀 Performance Features

- **Vite Build Optimization**: Fast builds and optimized bundles
- **Font Loading**: Optimized web font loading with `font-display: swap`
- **Code Splitting**: Automatic code splitting with React Router
- **CSS Optimization**: TailwindCSS purging for minimal bundle size
- **Image Optimization**: Ready for optimized image loading

## 🔮 Future Enhancements

- [ ] Add project showcase with real projects
- [ ] Implement blog section
- [ ] Add contact form backend integration
- [ ] Include resume/CV download functionality
- [ ] Add more interactive animations
- [ ] Implement progressive web app features

## 👤 About Me

I'm Jafet Hernandez, an engineer of thoughtful digital spaces—clean, intentional, and intelligent by design. I'm deeply curious about technology, AI, and building things that feel smart and thoughtful. I enjoy creating clean, responsive web experiences and am always experimenting and learning along the way.

---

Built with ❤️ and curiosity by Jafet Hernandez
