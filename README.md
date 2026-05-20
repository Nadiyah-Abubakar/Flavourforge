# 🍽️ FlavourForge

**FlavourForge** is a modern recipe discovery platform designed to make cooking more personalised, accessible, and enjoyable.

Discover curated recipes, generate AI-powered meals from ingredients you already have, organise favourites into your personal cookbook, and explore dedicated spaces for baking and Halaal cooking—all in one responsive experience.

---

## ✨ Features

### 🍴 Recipe Discovery
Browse a growing collection of curated recipes

### 🤖 AI Recipe Generator
Generate personalised recipes from available ingredients and preferences including:
- Cuisine style
- Skill level
- Cooking time
- Serving size
- 

### 🧁 Baking Studio
Explore a dedicated baking experience with precision-focused recipes and baking-specific tools.

### 🧮 Baker's Toolkit
Built-in baking utilities for:
- Ingredient scaling
- Conversions
- Measurement assistance

### ☪️ Halaal Hub
Discover Halaal-friendly recipes with ingredient transparency and certified alternatives.

### 📅 Meal Planner
Plan meals throughout the week and stay organised.

### ❤️ Personal Cookbook
Save favourite recipes and revisit them anytime.

### 🔐 Authentication
Secure email-based authentication powered by Supabase.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React · TypeScript · Vite |
| UI | Tailwind CSS · shadcn/ui |
| Backend | Supabase |
| State | TanStack Query |
| Testing | Vitest |

---

## 📦 Prerequisites

Before running locally, ensure you have:

- Node.js **18+**
- npm (or compatible package manager)
- A configured Supabase project
- `generate-recipe` Edge Function enabled

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FLAVORFORGE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

For AI recipe generation:

```env
AI_API_KEY=your-api-key
```

Optional configuration:

```env
AI_API_URL=https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
```

---

### 4. Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:8080
```

---

## 📜 Available Scripts

| Command | Purpose |
|---|---|
npm run dev
npm run build

---

## 📁 Project Structure

```plaintext
src/
├── components/      # Shared UI components
├── contexts/        # Global state & providers
├── data/            # Recipe datasets
├── hooks/           # Custom hooks
├── integrations/    # Supabase setup
├── pages/           # Route pages
└── ...

public/              # Static assets
index.html
vite.config.ts
```

---

## 🚢 Production Build

Build the application:

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder to platforms such as:

- Vercel
- Netlify
- Cloudflare Pages

Ensure deployment environment variables are configured.

---

## 🔒 License

Private project.  
All rights reserved unless otherwise specified by the repository owner.
