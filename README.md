# ARIA - Le kit pour apprivoiser l'IA en classe

ARIA est une **Progressive Web App (PWA) pédagogique et gamifiée** qui accompagne les enseignants dans la découverte de l'intelligence artificielle : ce qu'elle peut faire pour eux, et ce qu'elle ne fera jamais à leur place. Le parcours est mobile-first, guidé par une mascotte, rythmé par des étapes, de l'XP et des badges.

> L'IA ne remplace pas l'enseignant. Elle lui rend du temps pour enseigner.

## Le parcours

Le kit se déroule en 4 modules, chacun récompensé par un badge (700 XP au total) :

| Module | Contenu | Badge | XP |
| --- | --- | --- | --- |
| Accroche | Présentation d'ARIA, profil de l'utilisateur | Curieux | 50 |
| Les possibilités | 4 cas d'usage concrets (avant / après IA) | Premiers Pas | 200 |
| Limites & Dangers | Exercice « repère les erreurs », scénario, risques RGPD, outils recommandés | Responsable | 200 |
| Quiz final | 5 questions, résultat par paliers | Engagé | 250 |

La progression (XP, badges, score) est gérée **côté client**, sans collecte de données — en cohérence avec le message du kit sur la protection des données.

## Stack technique

- **Next.js 16** (App Router, React Server Components, routes typées)
- **React 19** + **React Compiler** (mémoïsation automatique)
- **TypeScript** strict
- **Tailwind CSS v4** + design tokens de marque
- **Motion** (animations)
- **PWA** (manifeste, installable, mode standalone)
- **tRPC 11** + **TanStack Query** (API typée de bout en bout)
- **Better-Auth** (authentification email/mot de passe, sessions)
- **Drizzle ORM** + **PostgreSQL**
- **Monorepo Bun** (workspaces + catalog)
- Déploiement **Vercel**

> Le parcours fonctionne entièrement en front. Le back-end (tRPC, auth, base de données) est en place pour les évolutions futures (comptes enseignants, sauvegarde de progression) mais n'est pas requis pour faire tourner le kit.

## Structure du monorepo

```
aria/
├─ apps/
│  └─ web/                 # l'application Next.js (le kit)
│     └─ src/
│        ├─ app/           # routes (App Router) = écrans du parcours
│        ├─ components/    # composants (écrans, briques interactives)
│        └─ lib/           # store de progression (XP), client auth
├─ packages/
│  ├─ api/                 # routeurs tRPC + contexte
│  ├─ auth/                # configuration Better-Auth
│  ├─ db/                  # schéma Drizzle + connexion PostgreSQL
│  ├─ env/                 # variables d'environnement validées (zod)
│  ├─ ui/                  # design system partagé (tokens, primitives)
│  └─ config/              # config TypeScript partagée
└─ package.json            # workspaces Bun + catalog de versions
```

## Prérequis

- [Bun](https://bun.sh) `>= 1.2`
- [Docker](https://www.docker.com/) (pour la base PostgreSQL locale)

## Installation & lancement

```bash
# 1. Installer les dépendances
bun install

# 2. (Optionnel — back-end) Démarrer la base PostgreSQL
bun run db:start
bun run db:push      # applique le schéma

# 3. Lancer le serveur de développement
bun run dev
```

L'application est disponible sur **http://localhost:3001**.

> Pour explorer uniquement le parcours, l'étape 2 (base de données) est facultative.

## Variables d'environnement

À renseigner dans `apps/web/.env` (nécessaires pour l'auth et la base) :

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/aria
BETTER_AUTH_SECRET=une-chaine-secrete
BETTER_AUTH_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001
```

## Scripts utiles

```bash
bun run dev           # tous les workspaces en mode dev
bun run dev:web       # seulement l'app web
bun run build         # build de production
bun run check-types   # vérification TypeScript

bun run db:start      # démarre PostgreSQL (Docker)
bun run db:push       # applique le schéma à la base
bun run db:studio     # interface Drizzle Studio
bun run db:stop       # arrête la base
```

## Architecture front (en bref)

- **Routing par fichiers** : chaque écran du parcours est une route dans `src/app/`.
- **Server Components par défaut**, **Client Components** (`"use client"`) uniquement pour les écrans interactifs (quiz, carrousels, exercices).
- **Contenu data-driven** : les questions, cas et exercices vivent dans des fichiers de données (`*-data.ts`) séparés des composants d'affichage.
- **État de progression** : un store maison (`lib/progress.ts`) persisté en `sessionStorage`, branché à React via `useSyncExternalStore`, qui alimente le compteur d'XP et l'animation de gain.
- **Layout global** : colonne centrée en desktop (vue mobile inchangée), overlay d'XP monté une seule fois.

## Déploiement

Déploiement continu sur **Vercel** : chaque branche génère un déploiement de prévisualisation, la production est mise à jour au merge sur `main`.

## Contexte

Projet réalisé dans le cadre des YDAYS (projet interfilière) - Ynov.
