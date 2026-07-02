# Andhika Rafi — Portfolio V3

Personal portfolio website built with **Next.js 15** (App Router), **TypeScript**, and **Tailwind CSS v4**. Designed in the style of Awwwards Site of the Day — minimal but bold, with typography as the core element and playful interactions.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (labels)

## Features

- 🎯 Kinetic hero typography with cursor-reactive letters
- 🖱️ Custom cursor with contextual hover states
- 📸 Project hover-reveal images that follow cursor
- 📱 Responsive design with tap-reveal on mobile
- ♿ Keyboard navigation with visible focus states
- 🎭 Respects `prefers-reduced-motion`
- 🌊 Lenis smooth scrolling
- 🎨 Cohesive design system (off-white, cobalt blue, lime accent)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/
│   ├── globals.css      # Design system + Tailwind config
│   ├── layout.tsx        # Root layout with fonts + SEO
│   └── page.tsx          # Main page composition
├── components/
│   ├── SmoothScroll.tsx  # Lenis wrapper
│   ├── CustomCursor.tsx  # Custom cursor with hover states
│   ├── Navbar.tsx        # Fixed minimal navbar
│   ├── Hero.tsx          # Kinetic typography hero
│   ├── ProjectsSection.tsx # Project grid with hover-reveal
│   ├── AboutSection.tsx  # About section with photo + bio
│   └── ContactSection.tsx # Email CTA + footer
└── lib/
    ├── data.ts           # Project data + social links
    └── utils.ts          # Tailwind merge utility
```

## Author

**Andhika Hisyam Muhammad Rafi**  
[dhikarafi.me](https://dhikarafi.me) · [GitHub](https://github.com/ndhika) · [LinkedIn](https://www.linkedin.com/in/andhika-hisyam-muhammad-rafi/)
