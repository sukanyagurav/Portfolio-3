# My Portfolio

A personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, and GSAP.

## Overview

This project showcases portfolio work, skills, experience, and contact information using a modern single-page layout with animated sections.

### Key features

- React + TypeScript frontend
- Vite development build system
- Local project data rendering from `src/constant/projectsData.js`
- Animated section reveals with GSAP and ScrollTrigger
- Responsive navigation and mobile menu
- Custom cursor for desktop interactions
- Footer with social links and quick actions

## Project structure

- `src/App.tsx` - main page composition and GitHub profile fetch
- `src/components/` - page sections and reusable UI components
- `src/constant/projectsData.js` - local project metadata used in the portfolio
- `src/types.ts` - shared TypeScript types
- `src/main.tsx` - Vite entry point
- `src/index.css` - global styles

## Run locally

### Prerequisites

- Node.js

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the URL shown in the terminal to view the portfolio locally.

## Build for production

```bash
npm run build
```

## Notes

- The portfolio uses a local `projectsData` file instead of live GitHub repository fetches for the projects section.
- The site forces dark mode by default via `document.documentElement.classList.add('dark')`.

## Customize

- Update `src/constant/projectsData.js` to change displayed projects.
- Edit `src/components/Footer.tsx` to update social links and footer actions.
- Modify `src/components/Skills.tsx` to change the skill list.
- Update `src/App.tsx` and `src/types.ts` if you want to customize profile or data behavior.

## Scripts

- `npm run dev` — start local development server
- `npm run build` — build production output
- `npm run preview` — preview the production build
- `npm run lint` — run TypeScript type checking
