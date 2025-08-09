# 🚀 Guide de Déploiement Vercel - VanBNB

## 📋 Prérequis
- Compte GitHub avec accès au repository
- Compte Vercel (gratuit ou pro)
- Accès au projet Supabase

## 🔧 Étapes de Déploiement

### 1. Connexion à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "Add New Project"

### 2. Import du Projet
1. Sélectionnez "Import Git Repository"
2. Choisissez le repository: `RomainVelocitAI/vanbnb-next`
3. Cliquez sur "Import"

### 3. Configuration du Projet

#### Nom du Projet
- Production: `vanbnb`
- Preview: `vanbnb-preview`

#### Framework Preset
- **Sélectionnez**: Next.js (détecté automatiquement)

#### Root Directory
- Laissez vide (le projet est à la racine)

#### Build Settings
- **Build Command**: `npm run build` (par défaut)
- **Output Directory**: `.next` (par défaut)
- **Install Command**: `npm install` (par défaut)

### 4. Variables d'Environnement 🔐

**IMPORTANT**: Ajoutez ces variables dans Vercel Dashboard > Settings > Environment Variables

```bash
# Supabase - OBLIGATOIRE
NEXT_PUBLIC_SUPABASE_URL=https://ycaetkqlgkhldxxwumlu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYWV0a3FsZ2tobGR4eHd1bWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NjU4MjAsImV4cCI6MjA1MTM0MTgyMH0.X3qqQFR-dFfIVDYO-m4qZzj2LFz2wL9xbyCm1fzT1WE
SUPABASE_SERVICE_ROLE_KEY=[VOTRE_SERVICE_ROLE_KEY]

# Stripe (Optionnel - pour plus tard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[À_AJOUTER]
STRIPE_SECRET_KEY=[À_AJOUTER]
STRIPE_WEBHOOK_SECRET=[À_AJOUTER]

# Analytics (Optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=[À_AJOUTER]
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=[AUTO_GÉNÉRÉ]

# Monitoring (Optionnel)
SENTRY_DSN=[À_AJOUTER]
SENTRY_AUTH_TOKEN=[À_AJOUTER]

# Email (Optionnel - pour plus tard)
SENDGRID_API_KEY=[À_AJOUTER]
SENDGRID_FROM_EMAIL=[À_AJOUTER]
```

### 5. Domaines Personnalisés

#### Production
- Domaine principal: `vanbnb.com` ou `clicknvan.com`
- www redirect: `www.vanbnb.com` → `vanbnb.com`

#### Configuration DNS (chez votre registrar)
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### 6. Paramètres de Sécurité

#### Headers de Sécurité
✅ Déjà configurés dans `next.config.ts`:
- Content Security Policy (CSP)
- Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

#### Protection DDoS
- Activée automatiquement par Vercel
- Rate limiting: 100 requêtes/10s par IP

#### Firewall Rules (Vercel Pro)
```javascript
// Exemple de règles WAF
{
  "rules": [
    {
      "name": "Block suspicious user agents",
      "expression": "http.user_agent contains \"bot\"",
      "action": "challenge"
    },
    {
      "name": "Rate limit API",
      "expression": "http.request.uri.path contains \"/api/\"",
      "action": "rateLimit",
      "rateLimit": {
        "requests": 100,
        "period": 60
      }
    }
  ]
}
```

### 7. Optimisations Performance

#### Edge Functions
- Activez les Edge Functions pour les routes API critiques
- Régions: `fra1` (Paris), `cdg1` (Paris), `lhr1` (Londres)

#### ISR Configuration
✅ Déjà configuré pour la homepage (revalidation: 1h)

#### Image Optimization
✅ Configuré avec Next.js Image component

### 8. Monitoring & Analytics

#### Vercel Analytics
1. Dashboard > Analytics > Enable
2. Coût: Inclus dans le plan Pro

#### Speed Insights
1. Dashboard > Speed Insights > Enable
2. Monitore les Core Web Vitals

#### Logs
- Accès: Dashboard > Functions > Logs
- Rétention: 1h (gratuit), 7j (Pro), 30j (Enterprise)

### 9. CI/CD Pipeline

#### Preview Deployments
- Automatique sur chaque PR
- URL format: `vanbnb-pr-{number}.vercel.app`

#### Production Deployments
- Automatique sur merge vers `main`
- Rollback disponible en 1 clic

#### GitHub Actions (Optionnel)
```yaml
name: Vercel Production Deployment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 10. Checklist Finale

#### Avant le Déploiement
- [ ] Variables d'environnement configurées
- [ ] Supabase RLS policies actives
- [ ] Tests de sécurité passés
- [ ] Backup de la base de données

#### Après le Déploiement
- [ ] Tester l'authentification
- [ ] Vérifier les headers de sécurité
- [ ] Tester la recherche de véhicules
- [ ] Vérifier les performances (Lighthouse)
- [ ] Configurer les alertes monitoring

### 11. Commandes Utiles

```bash
# CLI Vercel (optionnel)
npm i -g vercel

# Déployer manuellement
vercel --prod

# Preview deployment
vercel

# Voir les logs
vercel logs

# Variables d'environnement
vercel env pull .env.local
```

### 12. URLs de Production

- **Production**: https://vanbnb.vercel.app
- **GitHub**: https://github.com/RomainVelocitAI/vanbnb-next
- **Vercel Dashboard**: https://vercel.com/[your-team]/vanbnb

### 13. Support & Debugging

#### Erreurs Communes

**Build Failed**
```bash
# Vérifier les logs
vercel logs --follow

# Rebuild manuellement
vercel --force
```

**Variables d'environnement manquantes**
- Dashboard > Settings > Environment Variables
- Redéployer après ajout

**Performance Issues**
- Vérifier Speed Insights
- Activer Edge Functions
- Optimiser les images

### 14. Sécurité Avancée

#### Bot Protection (Vercel Pro+)
```javascript
// middleware.ts
export function middleware(request: Request) {
  const url = new URL(request.url)
  
  // Protection contre les bots malveillants
  if (request.headers.get('user-agent')?.includes('badbot')) {
    return new Response('Forbidden', { status: 403 })
  }
  
  // Rate limiting custom
  // Implement your logic here
}
```

#### Secrets Rotation
- Rotation automatique tous les 90 jours
- Alertes avant expiration
- Backup des anciennes clés

### 15. Coûts Estimés

#### Plan Hobby (Gratuit)
- 100GB bandwidth/mois
- Deployments illimités
- Analytics basiques

#### Plan Pro ($20/mois)
- 1TB bandwidth/mois
- Protection DDoS avancée
- Analytics complets
- Support prioritaire

#### Plan Enterprise (Sur devis)
- Bandwidth illimité
- SLA 99.99%
- Support dédié
- Compliance SOC2

## 📞 Contact Support

- **Vercel Support**: support@vercel.com
- **Discord**: discord.gg/vercel
- **Documentation**: vercel.com/docs

---

✅ **Le projet est prêt pour le déploiement !**

Repository GitHub: https://github.com/RomainVelocitAI/vanbnb-next