import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Calendar, Users, Shield, Star, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { HeroSpotlight } from '@/components/hero-spotlight'
import { SearchSection } from '@/components/search-section'
import { TopRatedVehicles } from '@/components/top-rated-vehicles'

// ISR - Revalidate every hour
export const revalidate = 3600

async function getFeaturedVehicles() {
  const supabase = await createClient()
  
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select(`
      *,
      partners (
        company_name,
        city
      ),
      vehicle_photos (
        photo_url,
        is_main
      )
    `)
    .eq('is_featured', true)
    .eq('status', 'active')
    .limit(6)

  return vehicles || []
}

async function getStats() {
  const supabase = await createClient()
  
  const [vehiclesCount, partnersCount, bookingsCount] = await Promise.all([
    supabase.from('vehicles').select('id', { count: 'exact', head: true }),
    supabase.from('partners').select('id', { count: 'exact', head: true }).eq('is_verified', true),
    supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'completed')
  ])

  return {
    vehicles: vehiclesCount.count || 0,
    partners: partnersCount.count || 0,
    bookings: bookingsCount.count || 0
  }
}

export default async function HomePage() {
  const [featuredVehicles, stats] = await Promise.all([
    getFeaturedVehicles(),
    getStats()
  ])

  return (
    <>
      {/* Premium Hero Section with Animated Vehicles */}
      <HeroSpotlight />

      {/* Search Section */}
      <SearchSection />

      {/* Top Rated Vehicles with Auto-Rotation */}
      <TopRatedVehicles />

      {/* Featured Vehicles */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Véhicules populaires</h2>
            <p className="text-xl text-gray-600">Découvrez notre sélection premium</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<VehicleCardSkeleton />}>
              {featuredVehicles.map((vehicle: any) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={vehicle.vehicle_photos?.[0]?.photo_url || '/placeholder-van.jpg'}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-4 left-4" variant="premium">
                      {vehicle.vehicle_type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{vehicle.brand} {vehicle.model}</CardTitle>
                    <CardDescription>
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {vehicle.partners?.city}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span><Users className="w-4 h-4 inline mr-1" />{vehicle.sleeping_capacity} pers.</span>
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">{vehicle.base_price_per_day}€</span>
                        <span className="text-gray-600 text-sm">/jour</span>
                      </div>
                      <Button asChild>
                        <Link href={`/vehicles/${vehicle.id}`}>
                          Voir détails
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Suspense>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/vehicles">
                Voir tous les véhicules
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pourquoi choisir VanBNB ?</h2>
            <p className="text-xl text-gray-600">Une expérience premium de bout en bout</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>100% Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Paiements sécurisés, assurance complète et assistance 24/7 pour voyager sereinement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                <CardTitle>Partenaires Vérifiés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tous nos loueurs sont des professionnels certifiés avec des véhicules entretenus.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle>Service Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Un accompagnement personnalisé du premier contact jusqu'à votre retour.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse">
      <Card>
        <div className="h-64 bg-gray-200" />
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
        </CardContent>
      </Card>
    </div>
  )
}
