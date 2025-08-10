# Configuration Supabase Auth pour VanBNB

## 🔧 Configuration des URLs d'authentification

### 1. Accéder au Dashboard Supabase
- URL: https://supabase.com/dashboard/project/ycaetkqlgkhldxxwumlu/auth/url-configuration
- Projet: VanBNB (ycaetkqlgkhldxxwumlu)

### 2. Configuration des URLs

#### Site URL (URL du site)
```
https://vanbnb-next.vercel.app
```

#### Redirect URLs (URLs de redirection autorisées)
Ajouter les URLs suivantes:
```
https://vanbnb-next.vercel.app/**
https://vanbnb-next.vercel.app/auth/callback
https://vanbnb-next.vercel.app/dashboard
http://localhost:3000/**
http://localhost:3001/**
```

### 3. Configuration des emails

#### Email Templates
Naviguer vers: Authentication > Email Templates

##### Confirm signup (Confirmation d'inscription)
Vérifier que l'URL de confirmation utilise:
```html
<a href="{{ .ConfirmationURL }}">Confirmer mon email</a>
```

Le système remplacera automatiquement `{{ .ConfirmationURL }}` avec l'URL correcte basée sur la configuration Site URL.

##### Reset Password (Réinitialisation du mot de passe)
Vérifier que l'URL utilise:
```html
<a href="{{ .ConfirmationURL }}">Réinitialiser mon mot de passe</a>
```

### 4. Variables d'environnement

#### Production (.env.production)
```bash
NEXT_PUBLIC_APP_URL=https://vanbnb-next.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://ycaetkqlgkhldxxwumlu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYWV0a3FsZ2tobGR4eHd1bWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjM2MDYsImV4cCI6MjA3MDIzOTYwNn0.95G2-REYOgh3PjgQVkAVkNVrePBnYGSvLVpCj32_IYk
```

#### Local Development (.env.local)
```bash
NEXT_PUBLIC_APP_URL=https://vanbnb-next.vercel.app
# Utiliser l'URL de production même en local pour les emails
```

### 5. Test de configuration

#### Étapes de test:
1. Créer un nouveau compte avec une adresse email valide
2. Vérifier que l'email de confirmation contient le lien: `https://vanbnb-next.vercel.app/auth/confirm?token=...`
3. Cliquer sur le lien devrait rediriger vers la page de connexion
4. Se connecter avec les identifiants créés

### 6. Dépannage

#### Problème: Les emails pointent vers localhost
**Solution**: Vérifier que Site URL dans le Dashboard est bien configuré à `https://vanbnb-next.vercel.app`

#### Problème: "Email not confirmed" après inscription
**Solution**: C'est le comportement normal. L'utilisateur doit confirmer son email avant de pouvoir se connecter.

#### Problème: Redirection après confirmation échoue
**Solution**: Vérifier que l'URL est dans la liste des Redirect URLs autorisées

### 7. Notes importantes

- **JAMAIS** utiliser `http://localhost` dans Site URL en production
- Les changements de configuration peuvent prendre 1-2 minutes pour être effectifs
- Toujours tester avec de vraies adresses email en production
- Utiliser `romain.cano33@gmail.com` pour tous les tests comme demandé

### 8. Accès direct aux paramètres

URLs directes pour la configuration:
- [URL Configuration](https://supabase.com/dashboard/project/ycaetkqlgkhldxxwumlu/auth/url-configuration)
- [Email Templates](https://supabase.com/dashboard/project/ycaetkqlgkhldxxwumlu/auth/templates)
- [Auth Settings](https://supabase.com/dashboard/project/ycaetkqlgkhldxxwumlu/settings/auth)

---

**Dernière mise à jour**: 10 Janvier 2025
**Status**: Configuration en cours