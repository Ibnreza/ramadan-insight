# Ramadan Mubarak 2026

## Overview
Premium dark-themed Ramadan companion web app for Bangladesh (Chandpur default). Features prayer times, fasting countdown, tasbih counter, Qibla compass, and Ramadan calendar. Fully offline-first with localStorage persistence.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express (minimal, serves frontend only)
- **Storage**: localStorage (offline-first, no database needed)
- **Prayer Calculation**: `adhan` npm package (Karachi method for Bangladesh)

## Theme
- Deep navy background (#0A0F1E)
- Teal accent (#00E5C0) with glow effects
- Gold accent (#FFD700)
- Fonts: Inter (Latin), Amiri (Arabic)
- Always dark mode

## Key Files
- `client/src/App.tsx` - Main app with routing and bottom nav
- `client/src/lib/prayer-utils.ts` - Prayer time calculations using adhan
- `client/src/lib/ramadan-data.ts` - Ramadan calendar data, duas, dhikr presets
- `client/src/lib/app-context.tsx` - App state with localStorage persistence
- `client/src/pages/home.tsx` - Home dashboard with countdown, streak, duas
- `client/src/pages/calendar-page.tsx` - Ramadan calendar table
- `client/src/pages/prayer-times.tsx` - 5 daily prayer times
- `client/src/pages/tasbih.tsx` - Tasbih counter with 16 dhikr presets
- `client/src/pages/qibla.tsx` - Qibla compass
- `client/src/components/bottom-nav.tsx` - Bottom navigation bar
- `client/src/components/location-header.tsx` - Location display + language toggle
- `client/src/components/location-modal.tsx` - Location picker modal

## Features
1. **Home Dashboard**: Ramadan day counter, live Iftar/Sahari countdown, fasting streak, daily duas (Arabic + transliteration + English/Bangla), progress ring, badges
2. **Calendar**: 30-day Ramadan schedule with Sahari/Iftar times, today highlighted
3. **Prayer Times**: 5 daily prayers with next prayer highlight and countdown
4. **Tasbih Counter**: 16 dhikr presets, animated circle counter, haptic feedback, confetti on goal
5. **Qibla Compass**: Device orientation compass with Qibla direction indicator
6. **Location Selection**: 15 preset cities, searchable
7. **Language Toggle**: English/Bangla ready (all strings prepared)

## Dependencies
Key packages: adhan, framer-motion, canvas-confetti, date-fns, wouter, lucide-react, @tanstack/react-query
