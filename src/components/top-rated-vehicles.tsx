"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Users, Fuel, Settings, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTopRatedVehicles, type Vehicle } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export function TopRatedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [likedVehicles, setLikedVehicles] = useState<Set<string>>(new Set())

  // Charger les véhicules les mieux notés
  useEffect(() => {
    async function loadVehicles() {
      try {
        const topVehicles = await getTopRatedVehicles(10)
        setVehicles(topVehicles)
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // Rotation automatique
  useEffect(() => {
    if (!isAutoPlaying || vehicles.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicles.length)
    }, 5000) // Change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [isAutoPlaying, vehicles.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % vehicles.length)
  }

  const toggleLike = (vehicleId: string) => {
    setLikedVehicles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(vehicleId)) {
        newSet.delete(vehicleId)
      } else {
        newSet.add(vehicleId)
      }
      return newSet
    })
  }

  // Obtenir les 3 véhicules visibles
  const getVisibleVehicles = () => {
    if (vehicles.length === 0) return []
    const visible = []
    for (let i = 0; i < 3 && i < vehicles.length; i++) {
      const index = (currentIndex + i) % vehicles.length
      visible.push({ vehicle: vehicles[index], position: i })
    }
    return visible
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">
                Les mieux notés par nos clients
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Véhicules d'exception
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection exclusive des 10 véhicules les mieux notés
            </p>
          </div>
          
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse text-gray-400">Chargement des véhicules...</div>
          </div>
        </div>
      </section>
    )
  }

  if (vehicles.length === 0) {
    return null
  }

  const visibleVehicles = getVisibleVehicles()

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4"
          >
            <Star className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-700">
              Les mieux notés par nos clients
            </span>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Véhicules d'exception
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive des 10 véhicules les mieux notés, 
            plébiscités par des centaines de voyageurs
          </p>
        </motion.div>

        {/* Vehicle Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 lg:-translate-x-12"
            aria-label="Véhicule précédent"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </div>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 lg:translate-x-12"
            aria-label="Véhicule suivant"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </div>
          </button>

          {/* Vehicle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleVehicles.map(({ vehicle, position }) => (
                <motion.div
                  key={`${vehicle.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: position === 1 ? 1 : 0.7,
                    x: 0,
                    scale: position === 1 ? 1.05 : 1,
                    zIndex: position === 1 ? 10 : 1
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={cn(
                    "relative group",
                    position === 1 && "md:col-start-2"
                  )}
                >
                  <div className={cn(
                    "bg-white rounded-2xl overflow-hidden transition-all duration-300",
                    position === 1 
                      ? "shadow-2xl ring-2 ring-amber-400/50" 
                      : "shadow-lg hover:shadow-xl"
                  )}>
                    {/* Best Rating Badge */}
                    {position === 1 && (
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Top #{currentIndex + 1}
                        </Badge>
                      </div>
                    )}

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(vehicle.id)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Ajouter aux favoris"
                    >
                      <Heart 
                        className={cn(
                          "w-5 h-5 transition-colors",
                          likedVehicles.has(vehicle.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600"
                        )}
                      />
                    </button>

                    {/* Vehicle Image */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                      {vehicle.vehicle_photos?.[0]?.photo_url ? (
                        <Image
                          src={vehicle.vehicle_photos[0].photo_url}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Settings className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Price Tag */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {vehicle.price_per_day}€
                        </div>
                        <div className="text-xs text-gray-600">par jour</div>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vehicle.pickup_location_address}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                i < Math.floor(vehicle.average_rating || 0)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {vehicle.average_rating?.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({vehicle.total_reviews} avis)
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{vehicle.capacity_sleep} places</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="w-4 h-4" />
                          <span>Diesel</span>
                        </div>
                        <Badge variant="secondary">
                          {vehicle.year}
                        </Badge>
                      </div>

                      {/* CTA */}
                      <Link href={`/vehicles/${vehicle.id}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
                          Voir les détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {vehicles.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={cn(
                  "transition-all duration-300",
                  index === currentIndex
                    ? "w-8 h-2 bg-blue-600 rounded-full"
                    : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                )}
                aria-label={`Aller au véhicule ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Lecture automatique"}
            </Button>
          </div>
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/vehicles?sort=rating">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Voir tous les véhicules
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}