import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Fuel, 
  Gauge, 
  Bed, 
  Shield,
  Star,
  ChevronLeft,
  Check,
  X,
  Wifi,
  Wind,
  Battery,
  Thermometer,
  Coffee,
  Utensils,
  Tv,
  Music,
  ShowerHead
} from 'lucide-react'
import { createServiceClient } from '@/lib/supabase/server'

// ISR - Revalidate every hour
export const revalidate = 3600

async function getVehicle(id: string) {
  const supabase = await createServiceClient()
  
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      vehicle_photos (
        photo_url,
        photo_order
      ),
      vehicle_equipment (*),
      partners (
        id,
        company_name,
        created_at
      )
    `)
    .eq('id', id)
    .single()

  if (error || !vehicle) {
    return null
  }

  return vehicle
}

export default async function VehicleDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vehicle = await getVehicle(id)

  if (!vehicle) {
    notFound()
  }

  // Equipment mapping
  const equipmentIcons: Record<string, any> = {
    wifi: { icon: Wifi, label: 'WiFi' },
    climatisation: { icon: Wind, label: 'Climatisation' },
    chauffage: { icon: Thermometer, label: 'Chauffage' },
    cuisine: { icon: Utensils, label: 'Cuisine équipée' },
    frigo: { icon: Battery, label: 'Réfrigérateur' },
    cafetiere: { icon: Coffee, label: 'Cafetière' },
    tv: { icon: Tv, label: 'Télévision' },
    audio: { icon: Music, label: 'Système audio' },
    douche: { icon: ShowerHead, label: 'Douche' },
    toilettes: { icon: ShowerHead, label: 'Toilettes' },
    panneau_solaire: { icon: Battery, label: 'Panneau solaire' },
    groupe_electrogene: { icon: Battery, label: 'Groupe électrogène' }
  }

  const hasEquipment = (key: string) => {
    return vehicle.vehicle_equipment?.[0]?.[key] === true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/vehicles">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour aux véhicules
            </Link>
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[500px] bg-gray-900">
        <Image
          src={vehicle.vehicle_photos?.[0]?.photo_url || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover"
          priority
        />
        {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {vehicle.vehicle_photos.slice(0, 5).map((photo: any, index: number) => (
              <div
                key={index}
                className="w-20 h-20 relative rounded-lg overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition-transform"
              >
                <Image
                  src={photo.photo_url}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.pickup_location_address || 'France'}
                    </span>
                    <Badge variant={vehicle.vehicle_type === 'camping_car' ? 'default' : 'secondary'}>
                      {vehicle.vehicle_type === 'camping_car' ? 'Camping-car' : 
                       vehicle.vehicle_type === 'van' ? 'Van' : 'Fourgon'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="ml-1 text-lg font-semibold">4.5</span>
                    <span className="text-gray-600 ml-1">(12 avis)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="equipment">Équipements</TabsTrigger>
                <TabsTrigger value="rules">Conditions</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de ce véhicule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      {vehicle.description || `Découvrez ce magnifique ${vehicle.brand} ${vehicle.model}, parfait pour vos aventures en famille ou entre amis. Avec sa capacité de ${vehicle.capacity_passengers} personnes et ${vehicle.capacity_sleep} couchages, ce véhicule offre tout le confort nécessaire pour un voyage inoubliable.`}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="font-medium">Capacité</span>
                          <p className="text-sm text-gray-600">
                            {vehicle.capacity_passengers} passagers, {vehicle.capacity_sleep} couchages
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gauge className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="font-medium">Transmission</span>
                          <p className="text-sm text-gray-600">
                            {vehicle.transmission === 'manual' ? 'Manuelle' : 'Automatique'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Fuel className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="font-medium">Carburant</span>
                          <p className="text-sm text-gray-600">
                            {vehicle.fuel_type === 'diesel' ? 'Diesel' : 
                             vehicle.fuel_type === 'petrol' ? 'Essence' : 
                             vehicle.fuel_type === 'electric' ? 'Électrique' : 'Hybride'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="font-medium">Année</span>
                          <p className="text-sm text-gray-600">{vehicle.year}</p>
                        </div>
                      </div>
                    </div>

                    {vehicle.dimensions_length && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Dimensions</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Longueur:</span>
                            <p className="font-medium">{vehicle.dimensions_length}m</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Largeur:</span>
                            <p className="font-medium">{vehicle.dimensions_width}m</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Hauteur:</span>
                            <p className="font-medium">{vehicle.dimensions_height}m</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Équipements inclus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(equipmentIcons).map(([key, config]) => {
                        const Icon = config.icon
                        const isIncluded = hasEquipment(key)
                        return (
                          <div
                            key={key}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              isIncluded ? 'bg-green-50' : 'bg-gray-50'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isIncluded ? 'text-green-600' : 'text-gray-400'}`} />
                            <span className={isIncluded ? 'font-medium' : 'text-gray-500'}>
                              {config.label}
                            </span>
                            {isIncluded ? (
                              <Check className="w-4 h-4 text-green-600 ml-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 ml-auto" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rules" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conditions de location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Conditions générales</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Permis de conduire valide depuis au moins 3 ans</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Âge minimum : {vehicle.minimum_driver_age || 25} ans</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Caution : {vehicle.deposit_amount || 1500}€</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Kilométrage : {vehicle.unlimited_mileage ? 'Illimité' : `${vehicle.mileage_included || 200}km/jour inclus`}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Autorisations</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            {vehicle.pets_allowed ? (
                              <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-red-600 mt-0.5" />
                            )}
                            <span>Animaux {vehicle.pets_allowed ? 'autorisés' : 'non autorisés'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            {vehicle.smoking_allowed ? (
                              <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-red-600 mt-0.5" />
                            )}
                            <span>Fumeurs {vehicle.smoking_allowed ? 'autorisé' : 'non autorisé'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            {vehicle.festival_friendly ? (
                              <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-red-600 mt-0.5" />
                            )}
                            <span>Festivals {vehicle.festival_friendly ? 'autorisés' : 'non autorisés'}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Politique d'annulation</h4>
                        <p className="text-sm text-gray-600">
                          {vehicle.cancellation_policy === 'flexible' && 'Annulation gratuite jusqu\'à 24h avant le départ'}
                          {vehicle.cancellation_policy === 'moderate' && 'Annulation gratuite jusqu\'à 7 jours avant le départ'}
                          {vehicle.cancellation_policy === 'strict' && 'Annulation gratuite jusqu\'à 30 jours avant le départ'}
                          {!vehicle.cancellation_policy && 'Conditions d\'annulation standards appliquées'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold">{vehicle.price_per_day || 100}€</span>
                    <span className="text-gray-600">/jour</span>
                  </div>
                  {vehicle.instant_booking && (
                    <Badge variant="success">
                      Réservation instantanée
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dates de location</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Départ
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Prix de base</span>
                      <span>-€</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Frais de service</span>
                      <span>-€</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>-€</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Vérifier la disponibilité
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Vous ne serez débité qu'après confirmation
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Partner Info */}
            {vehicle.partners && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Loueur professionnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{vehicle.partners.company_name}</p>
                      <p className="text-sm text-gray-600">
                        Membre depuis {new Date(vehicle.partners.created_at).getFullYear()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}