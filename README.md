# FPL Team Optimizer

A Next.js application that uses linear programming to calculate the optimal Fantasy Premier League team selection based on expected points over the next 3 gameweeks.

## Features

- Optimizes for the next 3 Premier League gameweeks
- Respects all FPL constraints (budget, squad composition, max players per team)
- Uses linear programming for mathematically optimal team selection
- Modern, responsive UI with FPL theming

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- javascript-lp-solver
- Official FPL API
