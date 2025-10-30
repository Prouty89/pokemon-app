# Pokémon Explorer — Take Home Project

Minimal Nuxt 3 app (TypeScript) that lists 60 Pokémon, supports search filtering, and displays detailed profile pages.

## Features
- Landing page: shows 60 Pokémon (name + thumbnail)
- Live search filter (client-side)
- Click a Pokémon to view profile page (large sprite, height, weight, abilities)
- Abilities: formatted as a capitalized, comma-delimited string
- Styled with plain CSS in `assets/css/main.css`

## Local dev
```bash
npm install
npx nuxi prepare
npm run dev
# open http://localhost:3000

npm run build
npm run preview

## Live Demo
[View on Vercel](https://pokemon-explorer-iaed.vercel.app)