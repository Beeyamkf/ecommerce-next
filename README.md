# MyShop — E-commerce Next.js

Petit site e-commerce réalisé en une semaine pour apprendre React, les composants réutilisables et le full stack.

## Stack

Next.js 16 (App Router) · React · TypeScript · Tailwind CSS · Drizzle ORM · Zod · PostgreSQL · JWT · Docker Compose · GitHub CLI

## Fonctionnalités

- Liste des produits et page détail (`/products`, `/products/[slug]`)
- Inscription, connexion, déconnexion (JWT dans un cookie httpOnly)
- Routes protégées via `proxy.ts`
- Page compte et panier (stocké dans un cookie)
- Validation des formulaires avec Zod (côté serveur)

## Prérequis

- Node.js 20+
- Docker Desktop
- Git + GitHub CLI (`gh`)

## Installation

```bash
# 1. Cloner le projet
gh repo clone Beeyamkf/ecommerce-next
cd ecommerce-next

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.example .env
```

Générer un secret JWT et le mettre dans `.env` (`JWT_SECRET=...`) :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```bash
# 4. Démarrer PostgreSQL
docker compose up -d

# 5. Créer les tables
npm run db:migrate

# 6. Ajouter les produits de démo
npm run db:seed

# 7. Lancer le site
npm run dev
```

Ouvrir http://localhost:3000

## Scripts

| Commande              | Description                                     |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Serveur de développement                        |
| `npm run build`       | Build de production                             |
| `npm run lint`        | Vérification du code (ESLint)                   |
| `npm run db:generate` | Générer une migration depuis `src/db/schema.ts` |
| `npm run db:migrate`  | Appliquer les migrations                        |
| `npm run db:seed`     | Remplir la base avec des produits               |
| `npm run db:studio`   | Interface web pour voir la base                 |

## Structure

```
src/
├── app/            # Pages (App Router), layouts, server actions
├── components/     # Composants réutilisables (Card, ProductCard, Input…)
├── db/             # Schéma Drizzle, connexion, requêtes, seed
├── lib/            # Session JWT, mot de passe, panier, validations Zod
└── proxy.ts        # Protection des routes
```

## Dépannage

**Le port 5432 est déjà utilisé** (un PostgreSQL est installé sur Windows) : arrêter le service PostgreSQL de Windows, ou changer le port dans `docker-compose.yml` (`"5433:5432"`) et dans `DATABASE_URL`.

## Workflow Git

Chaque fonctionnalité est développée sur une branche, puis fusionnée avec le GitHub CLI :

```bash
git checkout main && git pull
git checkout -b feat/ma-fonctionnalite
git add .
git commit -m "feat: ..."
git push -u origin feat/ma-fonctionnalite
gh pr create --title "..." --body "..."
gh pr merge --squash --delete-branch
```
