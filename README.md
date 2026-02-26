# elysia-master

A high-performance monorepo powered by **Turborepo** and **pnpm**. This project manages multiple applications (API, Admin, and Toko) with a unified development workflow.

## 🚀 Quick Start

### Prerequisites

* **Node.js**: `>=18`
* **pnpm**: `^10.30.2` (Strictly enforced)
* **Turbo**: Global installation is optional as it's included in `devDependencies`.

### Installation

```bash
pnpm install

```

## 🛠 Development Scripts

This monorepo uses Turborepo for optimized task execution and caching.

### Core Commands

* **`pnpm dev`**: Run all applications in development mode.
* **`pnpm build`**: Build all applications for production.
* **`pnpm lint`**: Run ESLint across all packages.
* **`pnpm format`**: Format all code using Prettier.
* **`pnpm check-types`**: Run TypeScript type checking across the entire workspace.

### Scoped Development

If you want to focus on a specific application and its dependencies (like the API):

* **`pnpm dev:toko`**: Start the **Toko** app and the **API**.
* **`pnpm dev:admin`**: Start the **Admin** dashboard and the **API**.

---

## 📦 Dependency Management

To keep the workspace clean, use the built-in filters to add dependencies to specific packages:

| Command | Description |
| --- | --- |
| `pnpm add:api <pkg>` | Add a package to the **API** service |
| `pnpm add:toko <pkg>` | Add a package to the **Toko** (Storefront) app |
| `pnpm add:admin <pkg>` | Add a package to the **Admin** dashboard |

*Example:* `pnpm add:api elysia`

---

## 🏗 Project Structure

```text
.
├── apps/
│   ├── api/          # Elysia / Backend service
│   ├── admin/        # Next.js / Admin Dashboard
│   └── toko/         # Next.js / Storefront
├── packages/         # Shared configurations or libraries (UI, Utils, Config)
├── turbo.json        # Turborepo pipeline configuration
└── package.json      # Workspace root configuration

```

---

## 🔧 Tech Stack

* **Monorepo Manager**: [Turborepo](https://turbo.build/)
* **Package Manager**: [pnpm](https://pnpm.io/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Formatting/Linting**: Prettier & ESLint
