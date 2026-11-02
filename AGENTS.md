# Project Agent Guide — BUNORA

## 1. Project Overview & Business Domain

**BUNORA** is an end-to-end Machine Learning web application designed to predict coffee bean quality scores based on verifiable agronomic, geographic, and physical metadata before physical cupping occurs.

### Project Background & Context:
- **Academic Context**: Faculty of Computers and Information, Mansoura University (AI / Machine Learning Project, supervised by Dr. Sara El-Sayed El-Metwally).
- **Core Value Proposition**: Traditional coffee quality assessment is labor-intensive, subjective, and carried out by certified Q-graders. BUNORA enables coffee producers, exporters, and roasters to estimate cup quality (`Total.Cup.Points`) early in the supply chain using pre-tasting characteristics.
- **Dataset**: Coffee Quality Institute (CQI) database (Arabica and Robusta records) covering origin, altitude, variety, processing methods, moisture, defect counts, and cupping scores.

### Key Machine Learning Problem Formulation:
- **Learning Type**: Supervised Learning (Regression).
- **Target Variable**: `Total.Cup.Points` (continuous cupping score).
- **Key Input Features (Pre-Tasting Metadata)**:
  - `Species`: Botanical species (e.g., Arabica, Robusta).
  - `Country.of.Origin`: Country where beans were cultivated.
  - `Variety`: Botanical variety (e.g., Typica, Bourbon, Caturra).
  - `Processing.Method`: Post-harvest processing (e.g., Washed / Wet, Natural / Dry, Honey).
  - Extended agronomic attributes: Altitude, moisture, category 1 & 2 defects.
- **Target Leakage Prevention (Strict Rule)**:
  - Exclude all post-tasting sensory attribute scores (Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup, Sweetness, Cupper Points) from the training feature set.
- **Evaluated Algorithms**:
  - Baseline: `DummyRegressor` (mean strategy).
  - Linear models: `LinearRegression`, `Ridge`.
  - Ensembles: `RandomForestRegressor`, `ExtraTreesRegressor`, `GradientBoostingRegressor`, `XGBoost` (`XGBRegressor`).
- **Evaluation Metrics**: Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and $R^2$ Score.

This repository is the interactive web client (SPA, client-rendered React) and presentation tier representing BUNORA, enabling users to explore dataset insights, compare ML model metrics, and input coffee characteristics to receive real-time, explainable quality predictions.

---

## 2. Tech Stack

- **Bundler / App**: Vite 8 + React 19 (SPA, client-rendered). React Compiler (`babel-plugin-react-compiler`) is enabled.
- **Language**: TypeScript (strict). No `.js`. No `any`.
- **Routing**: React Router v7 (`react-router`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + `tw-animate-css` + `shadcn/tailwind.css`. Theme tokens live in `src/index.css`.
- **UI Primitives & Icons**:
  - Base UI (`@base-ui/react`) & Shadcn UI primitives in `src/components/ui/` (Dialog, Select, Input, Card, Table, Tabs, Tooltip, Sonner, etc.)
  - Lucide React (`lucide-react`) for icons
- **Data Visualization**:
  - Recharts (`recharts`) for model performance charts, feature importance, and distribution analysis.
- **Animations & Interactions**:
  - Motion (`motion`) for smooth viewport reveals, stagger effects, and interactive UI transitions.
- **Syntax & Code Highlighting**:
  - Shiki (`shiki`) and custom code block highlighting in `src/lib/highlighter.tsx`.
- **Typography & Font**:
  - Geist Variable (`@fontsource-variable/geist`) as the primary sans font.
- **Form Handling & Validation**:
  - Controlled forms with strict Zod validation schemas.
- **State & Data Fetching**:
  - TanStack React Query / unified fetch client wrapper in `src/lib/` for connecting to the Python FastAPI backend (`/predict`, `/health`, `/model-info`, `/metrics`).

There is **no Next.js** in this repo: no App Router, no RSC, no `'use client'`, no Server Actions, no `next/image` / `next/font` / `next/dynamic`, no `NEXT_PUBLIC_*` env vars.

---

## 3. Project Structure & Architecture

The application follows a modular, **Feature-Driven Architecture** where UI pages assemble domain-specific feature sections:

```
├── index.html                  # SPA shell
├── public/                     # Static assets, coffee icons, favicon
├── docs/                       # Academic proposals & project documentation
│   ├── BUNORA.pdf              # Comprehensive project proposal
│   └── شرح المشروع.pdf         # ML training pipeline technical specification
├── src/
│   ├── main.tsx                # createRoot + providers
│   ├── App.tsx                 # Root application component & layout shell
│   ├── router/                 # Route tree and router configurations (src/router/index.tsx)
│   ├── index.css               # Tailwind v4 theme, design tokens, OKLCH color system
│   ├── pages/                  # Page-level route assemblies
│   │   ├── Predict/            # Coffee Quality Prediction page
│   │   ├── Models/             # Model comparison & evaluation metrics dashboard
│   │   ├── Dataset/            # CQI Dataset explorer & feature analysis
│   │   └── About/              # Project background, team & methodology
│   ├── features/               # Feature-driven domain modules
│   │   ├── prediction/         # Prediction form, result card, quality gauge
│   │   │   ├── components/     # PredictionForm, ScoreGauge, FeatureSummary
│   │   │   ├── api/            # FastAPI inference endpoints (/predict)
│   │   │   ├── hooks/          # usePredictQuality, useModelInfo
│   │   │   ├── schemas/        # Zod validation schemas for input metadata
│   │   │   └── types/          # Feature DTOs, request & response interfaces
│   │   ├── model-comparison/   # ML model metrics & evaluation comparison
│   │   │   ├── components/     # MetricsTable, ComparisonChart, ImportanceBar
│   │   │   ├── api/            # Endpoints for evaluation_metrics.json & comparison.csv
│   │   │   └── types/          # Model metric DTOs (MAE, RMSE, R2)
│   │   └── dataset-explorer/   # CQI dataset insights & distributions
│   │       ├── components/     # DistributionCharts, FeatureCorrelation
│   │       └── types/          # Dataset record interfaces
│   ├── components/             # Shared cross-cutting components
│   │   ├── ui/                 # Reusable UI primitives (Button, Card, Input, Select, etc.)
│   │   ├── animations/         # Motion wrappers (FadeIn, StaggerContainer, ScaleIn)
│   │   └── layout/             # Global layout (Navbar, Footer, Shell)
│   ├── hooks/                  # Global shared React hooks (e.g., use-document-title)
│   └── lib/                    # Global utilities (api-client, env, utils, highlighter)
└── package.json
```

### Architectural Principles:
- **Pages as Assemblers (`src/pages/`)**: Route pages remain thin. They set page metadata (`document.title`), orchestrate layout, and assemble feature components.
- **Feature Encapsulation (`src/features/<feature-name>/`)**:
  - `components/`: UI components and section blocks specific to that domain.
  - `api/`: API service fetch calls talking to the FastAPI backend.
  - `hooks/`: Domain hooks and state management.
  - `schemas/`: Zod validation schemas for user input forms.
  - `types/`: Strict TypeScript interfaces for API requests, inference responses, and metrics.
- **Shared Primitives (`src/components/ui/`)**: Reusable Base UI / Shadcn primitives.
- **Animations (`src/components/animations/`)**: Keep animation at the edges using pre-built wrappers (`FadeIn`, `ScaleIn`, `StaggerContainer`).
- Import alias `@/` maps to `src/`.

---

## 4. Design System & Theme Tokens

Theme tokens live in `src/index.css` (`:root`, `.dark`, `@theme inline`) using standard modern OKLCH tokens and semantic Tailwind classes:

- **Semantic Color Tokens**:
  - Surfaces: `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-popover`, `text-popover-foreground`.
  - Brand & Primary: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`.
  - Subtle & Borders: `bg-muted`, `text-muted-foreground`, `border-border`, `outline-ring`.
  - Feedback: `text-destructive`, `bg-destructive`.
  - Chart Tokens: `--chart-1` through `--chart-5` for Recharts data visualizations.
- **Layout Utilities**:
  - `page-shell`: Max container width + responsive horizontal padding (`px-4 sm:px-6 lg:px-8`) centered with `mx-auto`.
  - `full-bleed`: Full-viewport breakout where needed.

---

## 5. Development & Agent Conventions

1. **NO Hardcoded Hex Colors (Strict Rule)**:
   - **NEVER** use arbitrary hardcoded hex color values (e.g. `#6f4e37`, `text-[#00898a]`, inline hex) inside components, charts, SVGs, or JSX.
   - **ALWAYS** use design-system tokens and semantic Tailwind classes defined in `src/index.css` (`bg-primary`, `text-foreground`, `border-border`, etc.).

2. **React Compiler & No Manual Memoization (Strict Rule)**:
   - **DO NOT** use `useMemo`, `useCallback`, or `React.memo`.
   - The React Compiler (`babel-plugin-react-compiler`) is enabled and automatically handles all memoization across the codebase. Write idiomatic, clean React code with direct variable assignments and standard functions.

3. **Client SPA — No Server Components**:
   - Every React component runs in the browser.
   - Do not add `'use client'`, `async` React components, or Server Actions.
   - Vite environment variables must be prefixed with `VITE_*` and accessed via `src/lib/env.ts` (`import.meta.env`). Never use `process.env`.

4. **Type Safety & Validation**:
   - Strict TypeScript everywhere. No `.js` files. No `any` type escapes.
   - Use standard `function ComponentName()` syntax for React components.
   - Use Zod schemas exclusively for client-side form validation (paired with input handlers). API response structures must be typed with TypeScript interfaces in `types/`.

5. **Tooltips & Accessibility**:
   - Small icons, icon-only action buttons, and metric info triggers must be wrapped in Shadcn Tooltips (`@/components/ui/tooltip`) with clear, descriptive labels and appropriate ARIA attributes.
   - Maintain high contrast, responsive tap targets, and semantic HTML (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`).

6. **Loading States & Skeletons**:
   - Every data-fetching or asynchronous model inference UI must provide a matching skeleton component (`*-skeleton.tsx`) to prevent layout shifts (CLS ≈ 0). Never leave blank screens or raw unstyled loaders.

7. **Key Commands**:
   - `npm run dev`: Start Vite development server
   - `npm run build`: Type-check (`tsc -b`) and build production bundle
   - `npm run preview`: Preview production build
   - `npm run lint`: Run ESLint checks
