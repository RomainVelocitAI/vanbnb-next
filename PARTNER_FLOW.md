# Parcours Partenaire VanBNB

## Vue d'ensemble
Le parcours partenaire permet aux propriétaires de véhicules de s'inscrire, gérer leur flotte et suivre leurs locations.

## Flux complet

### 1. Navigation initiale
- **Point d'entrée**: Bouton "Devenir partenaire" dans la navigation
- **Destination**: `/partners` (page de présentation)

### 2. Page Partenaires (/partners)
- **Description**: Page de présentation des avantages partenaires
- **Actions disponibles**:
  - "Commencer maintenant" → `/auth`
  - "Devenir partenaire" → `/auth`

### 3. Authentification (/auth)
- **Fonctionnalités**:
  - Connexion pour les partenaires existants
  - Inscription pour les nouveaux partenaires
  - Création du profil partenaire avec:
    - Nom de société
    - Numéro SIRET
    - Téléphone
    - Adresse
- **Après connexion**: Redirection vers `/dashboard`

### 4. Dashboard Partenaire (/dashboard)
- **Fonctionnalités**:
  - Vue d'ensemble des statistiques
  - Liste des véhicules
  - Gestion des véhicules (voir, modifier, supprimer)
  - Bouton "Ajouter un véhicule" → `/dashboard/add-vehicle`
- **Protection**: Redirection vers `/auth` si non connecté

### 5. Ajout de véhicule (/dashboard/add-vehicle)
- **Processus en 7 étapes**:
  1. **Informations générales**: Marque, modèle, année, type
  2. **Caractéristiques**: Places, couchages, carburant, transmission
  3. **Tarification**: Prix/jour, prix/semaine, caution
  4. **Localisation**: Ville/adresse, coordonnées GPS
  5. **Description**: Titre et description détaillée
  6. **Équipements**: Sélection des équipements disponibles
  7. **Photos**: Upload des photos du véhicule
- **Validation**: Vérification de tous les champs obligatoires
- **Après création**: Retour au dashboard

## Tables Supabase utilisées

### partners
- `id`: UUID
- `user_id`: Référence vers auth.users
- `company_name`: Nom de la société
- `siret`: Numéro SIRET
- `phone`: Téléphone
- `address`: Adresse
- `created_at`: Date de création

### vehicles
- `id`: UUID
- `partner_id`: Référence vers partners
- `brand`: Marque
- `model`: Modèle
- `year`: Année
- `type`: Type de véhicule
- `registration`: Immatriculation
- `capacity`: Nombre de places
- `beds`: Nombre de couchages
- `fuel_type`: Type de carburant
- `transmission`: Type de transmission
- `mileage`: Kilométrage
- `price_per_day`: Prix par jour
- `price_per_week`: Prix par semaine
- `deposit`: Caution
- `location`: Localisation
- `latitude`: Latitude (optionnel)
- `longitude`: Longitude (optionnel)
- `title`: Titre de l'annonce
- `description`: Description
- `status`: Statut (active/inactive)

### vehicle_photos
- `id`: UUID
- `vehicle_id`: Référence vers vehicles
- `photo_url`: URL de la photo
- `photo_order`: Ordre d'affichage

### vehicle_equipment
- `id`: UUID
- `vehicle_id`: Référence vers vehicles
- Colonnes booléennes pour chaque équipement

## Points de vérification

✅ Navigation "Devenir partenaire" → /partners
✅ Boutons page partners → /auth
✅ Page auth avec inscription/connexion
✅ Dashboard avec authentification
✅ Page ajout de véhicule complète
✅ Intégration Supabase

## Technologies utilisées
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Supabase (Auth + Database)
- Framer Motion