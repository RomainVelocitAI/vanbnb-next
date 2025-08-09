# VanBNB - Plateforme de Location de Véhicules Premium

Application Next.js 14 pour la location de véhicules de camping entre professionnels et particuliers.

## 🚀 Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Monitoring**: Vercel Analytics

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase
- Compte Vercel (pour le déploiement)

## 🛠️ Installation

1. Cloner le repository
```bash
git clone https://github.com/[your-username]/vanbnb-next.git
cd vanbnb-next
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos clés Supabase :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Lancer le serveur de développement
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

```
src/
├── app/                  # Routes Next.js App Router
│   ├── (auth)/          # Routes authentification
│   ├── (dashboard)/     # Routes dashboard
│   └── api/             # API Routes
├── components/          # Composants React
│   ├── ui/             # Composants UI réutilisables
│   └── features/       # Composants métier
├── lib/                # Utilitaires et configuration
│   ├── supabase/      # Client Supabase
│   └── utils.ts       # Fonctions utilitaires
└── types/             # Types TypeScript
```

## 🔒 Sécurité

- Headers de sécurité configurés (CSP, HSTS, etc.)
- Authentification JWT via Supabase
- Protection CSRF automatique
- Rate limiting sur les API
- Variables d'environnement sécurisées

## 📊 Performance

- SSR/ISR pour SEO optimal
- Optimisation automatique des images
- Code splitting automatique
- Prefetching intelligent
- Core Web Vitals optimisés

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push sur GitHub
2. Importer le projet sur Vercel
3. Configurer les variables d'environnement
4. Déployer

### Autres plateformes

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Lancer la production
- `npm run lint` - Linter le code
- `npm run type-check` - Vérification TypeScript

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de lire CONTRIBUTING.md

## 📄 License

Propriétaire - VanBNB © 2025
