const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const vehicles = [
  {
    name: "Van California Coast",
    vehicle_type: "van",
    brand: "Volkswagen",
    model: "California",
    year: 2022,
    capacity: 4,
    transmission: "manual",
    fuel_type: "diesel",
    daily_rate: 120,
    weekly_discount: 10,
    monthly_discount: 20,
    minimum_rental_days: 2,
    preparation_days: 1,
    location: "Nice, Côte d'Azur",
    latitude: 43.7102,
    longitude: 7.2620,
    description: "Van tout équipé parfait pour explorer la Côte d'Azur. Cuisine complète, lit confortable pour 4 personnes, douche extérieure.",
    equipment: ["cuisine", "lit", "chauffage", "wifi", "douche"],
    photos: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800"
    ],
    partner_id: null, // Will be updated when we have partners
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: true,
    cancellation_policy: "flexible",
    average_rating: 4.9,
    total_reviews: 47,
    rules: ["Non-fumeur", "Animaux acceptés", "Permis B valide depuis 3 ans"],
    included: ["Assurance tous risques", "Kilométrage illimité", "Kit de cuisine", "Literie"],
    mileage: 45000,
    license_required: "B"
  },
  {
    name: "Camping-car Famille Luxe",
    vehicle_type: "camping_car",
    brand: "Fiat",
    model: "Ducato",
    year: 2023,
    capacity: 6,
    transmission: "automatic",
    fuel_type: "diesel",
    daily_rate: 150,
    weekly_discount: 15,
    monthly_discount: 25,
    minimum_rental_days: 3,
    preparation_days: 1,
    location: "Annecy, Alpes",
    latitude: 45.8992,
    longitude: 6.1294,
    description: "Camping-car spacieux idéal pour les familles. 6 couchages, cuisine complète, salle de bain avec douche et WC.",
    equipment: ["cuisine", "lit", "chauffage", "douche", "wc", "wifi"],
    photos: [
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
      "https://images.unsplash.com/photo-1543420940-91e7377dd77c?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: true,
    cancellation_policy: "moderate",
    average_rating: 4.8,
    total_reviews: 35,
    rules: ["Non-fumeur", "Animaux non acceptés", "Permis B valide depuis 3 ans"],
    included: ["Assurance", "200km/jour", "Kit de cuisine", "Literie", "Produits d'entretien"],
    mileage: 32000,
    license_required: "B"
  },
  {
    name: "Van Compact Urbain",
    vehicle_type: "van",
    brand: "Citroën",
    model: "Jumpy",
    year: 2021,
    capacity: 2,
    transmission: "manual",
    fuel_type: "diesel",
    daily_rate: 85,
    weekly_discount: 10,
    monthly_discount: 15,
    minimum_rental_days: 2,
    preparation_days: 1,
    location: "Bordeaux, Nouvelle-Aquitaine",
    latitude: 44.8378,
    longitude: -0.5792,
    description: "Petit van aménagé parfait pour un couple. Compact et maniable en ville, tout confort pour la route.",
    equipment: ["lit", "cuisine", "chauffage"],
    photos: [
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: false,
    cancellation_policy: "flexible",
    average_rating: 4.7,
    total_reviews: 28,
    rules: ["Non-fumeur", "Animaux acceptés", "Permis B valide depuis 2 ans"],
    included: ["Assurance", "150km/jour", "Kit de cuisine", "Literie"],
    mileage: 58000,
    license_required: "B"
  },
  {
    name: "Fourgon Aménagé Premium",
    vehicle_type: "fourgon",
    brand: "Mercedes",
    model: "Sprinter",
    year: 2023,
    capacity: 4,
    transmission: "automatic",
    fuel_type: "diesel",
    daily_rate: 135,
    weekly_discount: 12,
    monthly_discount: 22,
    minimum_rental_days: 3,
    preparation_days: 1,
    location: "Biarritz, Pays Basque",
    latitude: 43.4832,
    longitude: -1.5586,
    description: "Fourgon haut de gamme avec tout le confort moderne. Parfait pour les surfeurs et les aventuriers.",
    equipment: ["wifi", "douche", "wc", "cuisine", "lit", "chauffage"],
    photos: [
      "https://images.unsplash.com/photo-1543420940-91e7377dd77c?w=800",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: true,
    cancellation_policy: "moderate",
    average_rating: 5.0,
    total_reviews: 62,
    rules: ["Non-fumeur", "Animaux acceptés sous conditions", "Permis B valide depuis 3 ans"],
    included: ["Assurance tous risques", "Kilométrage illimité", "Kit surf", "Kit de cuisine", "Literie premium"],
    mileage: 12000,
    license_required: "B"
  },
  {
    name: "Van Vintage Rétro",
    vehicle_type: "van",
    brand: "Volkswagen",
    model: "T3 Westfalia",
    year: 1985,
    capacity: 4,
    transmission: "manual",
    fuel_type: "essence",
    daily_rate: 110,
    weekly_discount: 15,
    monthly_discount: 20,
    minimum_rental_days: 3,
    preparation_days: 2,
    location: "La Rochelle, Charente-Maritime",
    latitude: 46.1591,
    longitude: -1.1520,
    description: "Authentique van vintage pour une expérience unique. Restauré avec amour, parfait pour les nostalgiques.",
    equipment: ["cuisine", "lit", "auvent"],
    photos: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800",
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: false,
    cancellation_policy: "strict",
    average_rating: 4.6,
    total_reviews: 19,
    rules: ["Non-fumeur impératif", "Animaux non acceptés", "Permis B valide depuis 5 ans", "Expérience de conduite manuelle requise"],
    included: ["Assurance", "100km/jour", "Kit vintage", "Radio cassette", "Carte routière papier"],
    mileage: 125000,
    license_required: "B"
  },
  {
    name: "Camping-car Intégral Luxe",
    vehicle_type: "camping_car",
    brand: "Hymer",
    model: "B-Class",
    year: 2024,
    capacity: 6,
    transmission: "automatic",
    fuel_type: "diesel",
    daily_rate: 200,
    weekly_discount: 20,
    monthly_discount: 30,
    minimum_rental_days: 5,
    preparation_days: 2,
    location: "Cannes, Côte d'Azur",
    latitude: 43.5528,
    longitude: 7.0174,
    description: "Le summum du camping-car de luxe. Tout équipé avec finitions haut de gamme pour un voyage inoubliable.",
    equipment: ["wifi", "douche", "wc", "cuisine", "lit", "chauffage", "climatisation", "tv"],
    photos: [
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
      "https://images.unsplash.com/photo-1543420940-91e7377dd77c?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: false,
    cancellation_policy: "strict",
    average_rating: 4.9,
    total_reviews: 41,
    rules: ["Non-fumeur", "Animaux non acceptés", "Permis B valide depuis 5 ans", "Caution de 3000€"],
    included: ["Assurance premium", "Kilométrage illimité", "Kit premium", "Vélos électriques", "Barbecue", "Store extérieur"],
    mileage: 5000,
    license_required: "B"
  },
  {
    name: "Van Électrique Écolo",
    vehicle_type: "van",
    brand: "Nissan",
    model: "e-NV200",
    year: 2023,
    capacity: 2,
    transmission: "automatic",
    fuel_type: "electric",
    daily_rate: 95,
    weekly_discount: 15,
    monthly_discount: 25,
    minimum_rental_days: 2,
    preparation_days: 1,
    location: "Lyon, Auvergne-Rhône-Alpes",
    latitude: 45.7640,
    longitude: 4.8357,
    description: "Van 100% électrique pour voyager en respectant l'environnement. Silencieux et économique.",
    equipment: ["lit", "cuisine", "panneau_solaire"],
    photos: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: true,
    cancellation_policy: "flexible",
    average_rating: 4.7,
    total_reviews: 23,
    rules: ["Non-fumeur", "Animaux acceptés", "Permis B valide depuis 2 ans", "Carte de recharge fournie"],
    included: ["Assurance", "Recharge illimitée", "Kit écolo", "Application de bornes de recharge"],
    mileage: 15000,
    license_required: "B"
  },
  {
    name: "Fourgon Baroudeur 4x4",
    vehicle_type: "fourgon",
    brand: "Ford",
    model: "Transit AWD",
    year: 2022,
    capacity: 3,
    transmission: "manual",
    fuel_type: "diesel",
    daily_rate: 140,
    weekly_discount: 12,
    monthly_discount: 20,
    minimum_rental_days: 4,
    preparation_days: 1,
    location: "Grenoble, Alpes",
    latitude: 45.1885,
    longitude: 5.7245,
    description: "Fourgon 4x4 pour les aventuriers. Parfait pour les routes de montagne et les terrains difficiles.",
    equipment: ["cuisine", "lit", "chauffage", "coffre_toit", "porte_velos"],
    photos: [
      "https://images.unsplash.com/photo-1543420940-91e7377dd77c?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800"
    ],
    partner_id: null,
    status: "active",
    available_from: new Date().toISOString(),
    available_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    instant_booking: false,
    cancellation_policy: "moderate",
    average_rating: 4.8,
    total_reviews: 38,
    rules: ["Non-fumeur", "Animaux acceptés", "Permis B valide depuis 3 ans", "Expérience 4x4 recommandée"],
    included: ["Assurance tous terrains", "200km/jour", "Kit montagne", "Chaînes", "Pelle", "Corde"],
    mileage: 67000,
    license_required: "B"
  }
]

async function seedVehicles() {
  console.log('🚀 Starting to seed vehicles...')
  
  try {
    // Insert vehicles
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicles)
      .select()
    
    if (error) {
      console.error('❌ Error inserting vehicles:', error)
      return
    }
    
    console.log(`✅ Successfully inserted ${data.length} vehicles`)
    
    // Display inserted vehicles
    data.forEach(vehicle => {
      console.log(`  - ${vehicle.name} (${vehicle.location})`)
    })
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the seed function
seedVehicles()