"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Filter, MapPin, Users, Star, Heart, Fuel, Settings, Wifi, Coffee, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchSection } from "@/components/search-section"
import Link from "next/link"

interface Vehicle {
  id: string
  name: string
  type: string
  location: string
  price_per_day: number
  capacity: number
  rating: number
  reviews_count: number
  images: string[]
  features: string[]
  fuel_type: string
  transmission: string
  available: boolean
}

const vehicleFeatures = {
  wifi: { icon: Wifi, label: "WiFi" },
  coffee: { icon: Coffee, label: "Machine à café" },
  bed: { icon: Bed, label: "Lit confortable" },
  kitchen: { icon: Coffee, label: "Cuisine équipée" },
  shower: { icon: Settings, label: "Douche" },
  wc: { icon: Settings, label: "WC" },
  heating: { icon: Settings, label: "Chauffage" }
}

export default function VehiclesClient({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const searchParams = useSearchParams()
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(initialVehicles)
  const [filters, setFilters] = useState({
    type: "all",
    priceSort: "asc",
    location: "",
    startDate: "",
    endDate: "",
    capacity: ""
  })
  const [favorites, setFavorites] = useState<string[]>([])

  // Initialize filters from URL parameters on mount
  useEffect(() => {
    const locationParam = searchParams.get('location')
    const typeParam = searchParams.get('type')
    const capacityParam = searchParams.get('capacity')
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    
    setFilters(prev => ({
      ...prev,
      location: locationParam || "",
      type: typeParam || "all",
      capacity: capacityParam || "",
      startDate: startDateParam || "",
      endDate: endDateParam || ""
    }))
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    let filtered = [...vehicles]

    // Apply type filter
    if (filters.type !== "all" && filters.type) {
      filtered = filtered.filter(v => v.type === filters.type)
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(v => 
        v.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Apply capacity filter
    if (filters.capacity && filters.capacity !== "all") {
      const minCapacity = parseInt(filters.capacity)
      filtered = filtered.filter(v => v.capacity >= minCapacity)
    }

    // Apply price sorting
    if (filters.priceSort === "asc") {
      filtered.sort((a, b) => a.price_per_day - b.price_per_day)
    } else {
      filtered.sort((a, b) => b.price_per_day - a.price_per_day)
    }

    setFilteredVehicles(filtered)
  }, [filters, vehicles])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Véhicules
            </h1>
            <p className="text-xl opacity-90">
              {filteredVehicles.length} véhicules disponibles à la location
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <div className="-mt-4">
        <SearchSection onSearch={(params) => {
          setFilters(prev => ({
            ...prev,
            location: params.location || "",
            type: params.vehicleType || "all"
          }))
        }} />
      </div>

      {/* Filters Bar */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type de véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="van">Van aménagé</SelectItem>
                  <SelectItem value="camping_car">Camping-car</SelectItem>
                  <SelectItem value="fourgon">Fourgon</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priceSort} onValueChange={(value) => setFilters({...filters, priceSort: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Prix croissant</SelectItem>
                  <SelectItem value="desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Plus de filtres
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              {filteredVehicles.length} résultats
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={vehicle.images[0]} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(vehicle.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.includes(vehicle.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                      />
                    </button>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-2xl font-bold text-gray-900">
                          {vehicle.price_per_day}€
                          <span className="text-sm font-normal text-gray-600">/jour</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {vehicle.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {vehicle.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{vehicle.rating}</span>
                        <span className="text-xs text-gray-500">({vehicle.reviews_count})</span>
                      </div>
                    </div>
                    
                    {/* Specs */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vehicle.capacity} places
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        {vehicle.fuel_type === "diesel" ? "Diesel" : "Essence"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4" />
                        {vehicle.transmission === "automatic" ? "Auto" : "Manuel"}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.features.slice(0, 3).map((feature) => {
                        const featureData = vehicleFeatures[feature as keyof typeof vehicleFeatures]
                        if (!featureData) return null
                        const Icon = featureData.icon
                        return (
                          <div key={feature} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                            <Icon className="w-3 h-3 text-gray-600" />
                            <span className="text-xs text-gray-700">{featureData.label}</span>
                          </div>
                        )
                      })}
                      {vehicle.features.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{vehicle.features.length - 3} autres
                        </span>
                      )}
                    </div>
                    
                    {/* CTA */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      asChild
                    >
                      <Link href={`/vehicles/${vehicle.id}`}>
                        Voir les détails
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      {filteredVehicles.length > 0 && (
        <section className="pb-12">
          <div className="container mx-auto px-4 text-center">
            <Button variant="outline" size="lg">
              Charger plus de véhicules
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}