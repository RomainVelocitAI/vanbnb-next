-- Script pour supprimer l'utilisateur test
-- Usage: Exécuter dans Supabase SQL Editor ou via l'API

-- Supprimer d'abord de la table partners (contrainte de clé étrangère)
DELETE FROM partners WHERE email = 'romain.cano33@gmail.com';

-- Ensuite supprimer de auth.users
DELETE FROM auth.users WHERE email = 'romain.cano33@gmail.com';

-- Vérification
SELECT 'Suppression terminée' as status;
SELECT 'Partners:' as table_name, COUNT(*) as remaining FROM partners WHERE email = 'romain.cano33@gmail.com'
UNION ALL
SELECT 'Auth Users:', COUNT(*) FROM auth.users WHERE email = 'romain.cano33@gmail.com';