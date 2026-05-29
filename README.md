# 🏺 Tile Expert — The Artisan Kiln

A modern, interactive ceramic tile design and ordering platform built with **Next.js 16** and **React 19**. Customize tile layouts with drag-and-drop, preview artisanal patterns in real time, and seamlessly place orders through a streamlined checkout flow.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Directory Structure](#directory-structure)
- [Core Concepts](#core-concepts)
  - [Tile Entity](#tile-entity)
  - [Cart Entity](#cart-entity)
  - [Tile Designer Widget](#tile-designer-widget)
  - [Checkout Flow](#checkout-flow)
- [Styling](#styling)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tile Expert** is a full-stack e-commerce application tailored for artisanal ceramic tile makers and their customers. The platform enables users to:

- Browse a curated catalog of handcrafted tile designs
- Visually design tile layouts using an intuitive drag-and-drop tile designer
- Manage a shopping cart with real-time price calculations
- Complete orders through a multi-step checkout form with order summary and receipt generation

The application is built with a strong emphasis on performance, developer experience, and maintainability, leveraging the latest React and Next.js features including the App Router, React Compiler, and Server Components.

---

## Features

| Feature | Description |
|---|---|
| **Tile Designer** | Interactive drag-and-drop canvas powered by `@dnd-kit` for arranging and previewing tile layouts |
| **SVG Tile Patterns** | Four built-in artisan patterns — wave, fern, dot, and star — rendered as scalable SVG graphics |
| **Shopping Cart** | Full cart management with add/remove, quantity controls, and live subtotal tracking |
| **Checkout Form** | Multi-field order form with validation powered by `@tanstack/react-form` |
| **Order Receipt** | Generates a structured checkout receipt with order ID, itemized totals, shipping, and payment method |
| **Responsive Design** | Fully responsive layout optimized for desktop, tablet, and mobile viewports |
| **Animations** | Smooth, performant UI transitions and micro-interactions via `framer-motion` |
| **Dark/Light Theming** | CSS custom properties-based theming system with Tailwind CSS v4 |
| **State Management** | Centralized Redux store with Redux Toolkit slices for tiles and cart |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.6 | React framework with App Router |
| [React](https://react.dev) | 19.2.4 | UI library with React Compiler |
| [TypeScript](https://typescriptlang.org) | 5.x | Type-safe development |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2.12.0 | State management |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS framework |
| [Framer Motion](https://framer.com/motion) | 12.40.0 | Animation library |
| [@dnd-kit](https://dndkit.com) | 6.3.1 | Drag-and-drop toolkit |
| [@tanstack/react-form](https://tanstack.com/form) | 1.32.1 | Form state and validation |
| [Lucide React](https://lucide.dev) | 1.16.0 | Icon library |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | Conditional and merged class names |

### Tooling

| Technology | Purpose |
|---|---|
| [Biome](https://biomejs.dev) | Linting and formatting (replaces ESLint + Prettier) |
| [Jest](https://jestjs.io) | Unit and integration testing |
| [@testing-library/react](https://testing-library.com) | React component testing |
| [Bun](https://bun.sh) | Package manager and runtime |
| [Docker](https://docker.com) | Containerization |
| [Railway](https://railway.app) | Cloud deployment |

---

## Project Architecture

This project follows the **Feature-Sliced Design (FSD)** methodology — a frontend architectural pattern that organizes code by business domain and responsibility, promoting isolation, scalability, and reusability.

### Layers (bottom-up)

```
shared        →  Reusable primitives: UI components, utilities, libs
entities      →  Business domain models: Tile, Cart
widgets       →  Self-contained UI features: TileDesigner, CartCheckout, CheckoutForm, Header
views         →  Page-level compositions that assemble widgets
app           →  Next.js App Router entry points and layouts
app-layer     →  Application-level providers and store configuration
```

Each layer can only import from the layers below it, enforcing a strict dependency direction and preventing circular dependencies.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **Bun** ≥ 1.x (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tile-expert.git
cd tile-expert

# Install dependencies
bun install

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `bun dev` | Starts the Next.js development server with hot reloading |
| `bun build` | Creates an optimized production build |
| `bun start` | Starts the production server (requires `bun build` first) |
| `bun lint` | Runs Biome linter across the codebase |
| `bun format` | Formats all files with Biome |
| `bun test` | Runs the Jest test suite |
| `bun test:watch` | Runs tests in watch mode |
| `bun test:coverage` | Runs tests with coverage report |

---

## Environment Variables

Create a `.env.local` file in the project root for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> Refer to the [Next.js environment variables documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) for production configuration.

---

## Directory Structure

```
tile-expert/
├── public/                          # Static assets (images, fonts, favicons)
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout with fonts, providers, header/footer
│   │   ├── page.tsx                 # Home page (renders OrderForm view)
│   │   └── globals.css              # Global styles and Tailwind directives
│   │
│   ├── app-layer/                   # Application-level configuration
│   │   ├── providers.tsx            # Redux Provider wrapper
│   │   └── store/                   # Redux store setup
│   │       └── index.ts
│   │
│   ├── entities/                    # Business domain models
│   │   ├── tile/
│   │   │   ├── model/
│   │   │   │   ├── types.ts         # Tile interface
│   │   │   │   └── slice.ts         # Redux slice for tiles
│   │   │   ├── ui/
│   │   │   │   ├── tile-graphic.tsx # Tile visual component
│   │   │   │   └── svg-patterns.tsx # SVG pattern definitions
│   │   │   └── index.ts
│   │   └── cart/
│   │       ├── model/
│   │       │   ├── types.ts         # CartItem, CheckoutReceipt interfaces
│   │       │   └── slice.ts         # Redux slice for cart
│   │       └── index.ts
│   │
│   ├── views/                       # Page-level compositions
│   │   ├── order-form/
│   │   │   ├── ui/
│   │   │   │   ├── OrderForm.tsx
│   │   │   │   └── OrderFormTitle.tsx
│   │   │   └── index.ts
│   │   └── home/
│   │       └── index.ts
│   │
│   ├── widgets/                     # Self-contained feature components
│   │   ├── tile-designer/
│   │   │   ├── ui/
│   │   │   │   └── TileDesigner.tsx
│   │   │   └── index.ts
│   │   ├── cart-checkout/
│   │   │   ├── ui/
│   │   │   │   ├── CartCheckout.tsx
│   │   │   │   └── CartCheckout.test.tsx
│   │   │   └── index.ts
│   │   ├── checkout-form/
│   │   │   ├── ui/
│   │   │   │   └── CheckoutForm.tsx
│   │   │   └── index.ts
│   │   └── header/
│   │       ├── ui/
│   │       │   └── Header.tsx
│   │       └── index.ts
│   │
│   └── shared/                      # Reusable primitives
│       ├── ui/
│       │   ├── Button.tsx
│       │   ├── Button.test.tsx
│       │   ├── Input.tsx
│       │   ├── Menu.tsx
│       │   ├── Logo.tsx
│       │   ├── Footer.tsx
│       │   ├── CartButton.tsx
│       │   ├── ProfileButton.tsx
│       │   └── CompoundBackground/
│       │       ├── CompoundBackground.tsx
│       │       ├── CompoundBackground.module.css
│       │       └── index.ts
│       └── lib/
│           └── cn.ts                # clsx + tailwind-merge utility
│
├── __mocks__/                       # Jest module mocks
├── Dockerfile                       # Docker build configuration
├── railway.json                     # Railway deployment config
├── biome.json                       # Biome linter/formatter config
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── next.config.ts                   # Next.js configuration
├── jest.config.ts                   # Jest configuration
├── jest.setup.ts                    # Jest setup and custom matchers
├── tsconfig.json                    # TypeScript configuration
└── package.json
```

---

## Core Concepts

### Tile Entity

The `Tile` entity represents a ceramic tile product in the system.

```typescript
interface Tile {
  id: string;
  name: string;
  price: number;
  color: string;
  pattern: 'wave' | 'fern' | 'dot' | 'star';
  image?: string;
}
```

Each tile has a unique ID, display name, price, base color, and one of four supported SVG-rendered patterns. Tiles are managed through a Redux Toolkit slice that handles catalog state.

### Cart Entity

The `Cart` entity manages the user's shopping session.

```typescript
interface CartItem {
  tile: Tile;
  quantity: number;
}

interface CheckoutReceipt {
  orderId: string;
  name: string;
  email: string;
  subtotal: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  itemsCount: number;
}
```

The cart slice handles adding/removing items, adjusting quantities, and computing totals. Upon checkout, a `CheckoutReceipt` is generated summarizing the order.

### Tile Designer Widget

The Tile Designer is the core interactive feature. It provides a drag-and-drop canvas where users can:

- Browse available tile patterns and colors
- Arrange tiles visually on a design grid
- Preview how tiles look together before purchasing
- Add designed tiles directly to the cart

Powered by `@dnd-kit/core` for accessible, performant drag-and-drop interactions.

### Checkout Flow

The checkout flow consists of:

1. **Cart Review** (`CartCheckout`) — View items, adjust quantities, see running totals
2. **Order Form** (`OrderForm`) — Enter shipping and contact details with form validation
3. **Checkout Summary** (`CheckoutForm`) — Review and confirm the order, select payment method
4. **Receipt** — Receive a structured order confirmation with all details

---

## Styling

The project uses **Tailwind CSS v4** with a custom design system:

- **Custom Fonts**: Bebas Neue (display headings) and Quicksand (body text), loaded via `next/font/google`
- **CSS Custom Properties**: Theme tokens defined via CSS variables (`--font-bebas`, `--font-quicksand`, etc.)
- **Utility Classes**: `cn()` helper combining `clsx` and `tailwind-merge` for conflict-free class composition
- **CSS Modules**: Used for component-scoped styles where Tailwind utilities are insufficient (e.g., `CompoundBackground.module.css`)

---

## Testing

The test suite uses **Jest** with **@testing-library/react** and **@testing-library/user-event** for component and integration tests.

```bash
# Run all tests
bun test

# Watch mode during development
bun test:watch

# Generate coverage report
bun test:coverage
```

### Test Configuration

- **Test Runner**: Jest 30 with `@swc/jest` for fast TypeScript transpilation
- **Environment**: `jsdom` for browser-like testing
- **Setup**: `jest.setup.ts` extends Jest with `@testing-library/jest-dom` matchers
- **Mocks**: `__mocks__/` directory for module-level mocks
- **CSS Modules**: Mocked with `identity-obj-proxy`

---

## Linting & Formatting

This project uses **Biome** as a single tool for both linting and formatting, replacing the traditional ESLint + Prettier setup.

```bash
# Check for lint errors
bun lint

# Auto-format all files
bun format
```

Configuration is defined in `biome.json` at the project root.

---

## Deployment

### Docker

The application includes a `Dockerfile` for containerized deployments:

```bash
docker build -t tile-expert .
docker run -p 3000:3000 tile-expert
```

### Railway

A `railway.json` configuration file is included for one-click deployment to [Railway](https://railway.app). Connect your GitHub repository and Railway will automatically detect and deploy the project.

### Manual Deployment

```bash
bun install
bun build
bun start
```

The application will be available at `http://localhost:3000`.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes following the Feature-Sliced Design conventions
4. Run tests and lint: `bun test && bun lint`
5. Commit your changes: `git commit -m "feat: add my feature"`
6. Push to the branch: `git push origin feature/my-feature`
7. Open a Pull Request

---

## License

This project is private and proprietary. All rights reserved.
