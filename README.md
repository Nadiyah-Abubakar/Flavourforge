# FlavourForge

FlavourForge is a responsive recipe platform for discovering curated meals, generating AI-powered recipes from your ingredients, and managing your personal cookbook—with dedicated tools for baking and Halaal cooking.

## Tech stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18, TypeScript, Vite |
| **Routing** | React Router v6 |
| **UI** | Tailwind CSS, shadcn/ui (Radix primitives), Framer Motion |
| **State & data** | TanStack Query, React Hook Form, Zod |
| **Backend** | Supabase (auth, database, Edge Functions) |
| **Testing** | Vitest, Testing Library |

## Features

- **Recipe library** — Browse 150+ curated recipes with detail pages, filters, and search.
- **AI recipe generator** — Enter ingredients and preferences (cuisine, skill level, cook time, servings) to generate personalised recipes via Supabase Edge Functions.
- **Baking studio** — Dedicated baking recipes and precision-focused tools.
- **Baker's toolkit** — Utility helpers for common baking calculations and conversions.
- **Halaal hub** — Verified Halaal recipes with certified alternatives and transparency.
- **Meal planner** — Plan meals across the week.
- **Saved recipes** — Sign in to save and revisit favourite recipes (requires Supabase auth).
- **Authentication** — Email-based sign-up and sign-in powered by Supabase.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (or another package manager compatible with `package-lock.json`)
- A Supabase project with the required tables, auth, and `generate-recipe` Edge Function configured

## Setup

1. **Clone the repository**

   ```sh
   git clone <YOUR_GIT_URL>
   cd FLAVORFORGE
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   VITE_SUPABASE_PROJECT_ID=your-project-id
   ```

   Obtain these values from your [Supabase project settings](https://supabase.com/dashboard).

   For the AI recipe generator Edge Function, set these secrets in your Supabase project (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):

   ```env
   AI_API_KEY=your-gemini-or-openai-compatible-api-key
   ```

   Optional overrides (defaults target the Google Gemini OpenAI-compatible API):

   ```env
   AI_API_URL=https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
   AI_MODEL=gemini-2.0-flash
   ```

4. **Start the development server**

   ```sh
   npm run dev
   ```

   The app runs at [http://localhost:8080](http://localhost:8080) by default.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot module replacement |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build (useful for debugging build issues) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run test` | Run Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |

## Project structure

```
├── src/
│   ├── components/   # Shared UI and layout components
│   ├── contexts/     # React context providers (e.g. auth)
│   ├── data/         # Static recipe data
│   ├── hooks/        # Custom React hooks
│   ├── integrations/ # Supabase client and types
│   ├── pages/        # Route-level page components
│   └── ...
├── public/           # Static assets
├── index.html        # HTML entry point
└── vite.config.ts    # Vite configuration
```

## Building for production

```sh
npm run build
npm run preview
```

Deploy the contents of the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Ensure your Supabase URL and anon key are set in the deployment environment.

## License

Private project. All rights reserved unless otherwise specified by the repository owner.
