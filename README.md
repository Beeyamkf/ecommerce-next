# MyShop — Next.js E-commerce

A small e-commerce website built in one week to learn React, reusable components and the full stack.

## Stack

Next.js 16 (App Router) · React · TypeScript · Tailwind CSS · Drizzle ORM · Zod · PostgreSQL · JWT · Docker Compose · GitHub CLI

## Features

- Product listing and detail pages (`/products`, `/products/[slug]`)
- Sign up, sign in, sign out (JWT stored in an httpOnly cookie)
- Protected routes with `proxy.ts`
- Account page and shopping cart (stored in a cookie)
- Cart quantity controls (+ / −) with server-side stock checks
- Form validation with Zod (server side)
- Light, colorful UI with 3D tilt effects on product cards

## Prerequisites

- Node.js 20+
- Docker Desktop
- Git + GitHub CLI (`gh`)

## Getting started

```bash
# 1. Clone the project
gh repo clone Beeyamkf/ecommerce-next
cd ecommerce-next

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env
```

Generate a JWT secret and put it in `.env` (`JWT_SECRET=...`):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```bash
# 4. Start PostgreSQL
docker compose up -d

# 5. Create the tables
npm run db:migrate

# 6. Add demo products
npm run db:seed

# 7. Start the website
npm run dev
```

Open http://localhost:3000

## Scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Development server                           |
| `npm run build`       | Production build                             |
| `npm run lint`        | Code check (ESLint)                          |
| `npm run db:generate` | Generate a migration from `src/db/schema.ts` |
| `npm run db:migrate`  | Apply migrations                             |
| `npm run db:seed`     | Fill the database with demo products         |
| `npm run db:studio`   | Web UI to browse the database                |

## Project structure

```
src/
├── app/            # Pages (App Router), layouts, server actions
├── components/     # Reusable components (Card, ProductCard, Input, Tilt…)
├── db/             # Drizzle schema, connection, queries, seed
├── lib/            # JWT session, password hashing, cart, Zod validations
└── proxy.ts        # Route protection
```

## Troubleshooting

**Port 5432 is already in use** (PostgreSQL is installed on Windows): stop the Windows PostgreSQL service, or change the port in `docker-compose.yml` (`"5433:5432"`) and in `DATABASE_URL`.

## Git workflow

Each feature is developed on its own branch, then merged with the GitHub CLI:

```bash
git checkout main && git pull
git checkout -b feat/my-feature
git add .
git commit -m "feat: ..."
git push -u origin feat/my-feature
gh pr create --title "..." --body "..."
gh pr merge --squash --delete-branch
```
