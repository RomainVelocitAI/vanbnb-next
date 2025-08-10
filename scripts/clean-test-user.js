#!/usr/bin/env node

/**
 * Script pour supprimer l'utilisateur test de la base de données
 * Usage: npm run clean:test-user
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables Supabase manquantes dans .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanTestUser() {
  // Prendre l'email depuis les arguments de ligne de commande ou utiliser celui par défaut
  const testEmail = process.argv[2] || 'romain.cano33@gmail.com';
  
  console.log(`🧹 Suppression de l'utilisateur test: ${testEmail}`);
  
  try {
    // Supprimer de la table partners
    const { error: partnersError } = await supabase
      .from('partners')
      .delete()
      .eq('email', testEmail);
    
    if (partnersError && partnersError.code !== 'PGRST116') {
      console.error('Erreur lors de la suppression dans partners:', partnersError);
    } else {
      console.log('✅ Supprimé de la table partners');
    }
    
    // Pour auth.users, on doit utiliser l'API Admin
    console.log('ℹ️  Pour supprimer de auth.users, utilisez le Dashboard Supabase ou le script SQL');
    console.log('   ou exécutez: DELETE FROM auth.users WHERE email = \'' + testEmail + '\';');
    
    // Vérifier le résultat
    const { data: remaining, error: checkError } = await supabase
      .from('partners')
      .select('email')
      .eq('email', testEmail);
    
    if (remaining && remaining.length === 0) {
      console.log('✅ Utilisateur test supprimé avec succès de partners');
    } else {
      console.log('⚠️  L\'utilisateur existe encore dans partners');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
  
  console.log('\n📝 Note: Pour une suppression complète, exécutez le script SQL dans Supabase Dashboard');
  console.log('   Ou utilisez: npm run clean:test-user autre.email@example.com');
}

cleanTestUser();