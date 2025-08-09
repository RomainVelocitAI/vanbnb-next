"use client"

import { motion } from "framer-motion"
import { MapPin, Star, Sun, Mountain, Trees, Waves, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Côte d'Azur",
    region: "Provence-Alpes-Côte d'Azur",
    description: "Soleil, plages et villages perchés",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600",
    rating: 4.9,
    vehicles: 127,
    highlights: ["Plages", "Soleil", "Villages"],
    icon: Sun,
    popularMonths: ["Juin", "Juillet", "Août"]
  },
  {
    id: 2,
    name: "Alpes",
    region: "Auvergne-Rhône-Alpes",
    description: "Montagnes majestueuses et lacs cristallins",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    rating: 4.8,
    vehicles: 89,
    highlights: ["Montagnes", "Randonnée", "Lacs"],
    icon: Mountain,
    popularMonths: ["Juillet", "Août", "Septembre"]
  },
  {
    id: 3,
    name: "Bretagne",
    region: "Bretagne",
    description: "Côtes sauvages et culture celtique",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600",
    rating: 4.7,
    vehicles: 156,
    highlights: ["Océan", "Culture", "Gastronomie"],
    icon: Waves,
    popularMonths: ["Mai", "Juin", "Septembre"]
  },
  {
    id: 4,
    name: "Landes",
    region: "Nouvelle-Aquitaine",
    description: "Forêts de pins et plages infinies",
    image: "https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=600",
    rating: 4.8,
    vehicles: 102,
    highlights: ["Forêts", "Surf", "Nature"],
    icon: Trees,
    popularMonths: ["Juin", "Juillet", "Août"]
  },
  {
    id: 5,
    name: "Alsace",
    region: "Grand Est",
    description: "Route des vins et villages de contes",
    image: "https://images.unsplash.com/photo-1583246787315-8fb8fa10e5e5?w=600",
    rating: 4.7,
    vehicles: 67,
    highlights: ["Vins", "Culture", "Gastronomie"],
    icon: Mountain,
    popularMonths: ["Mai", "Septembre", "Décembre"]
  },
  {
    id: 6,
    name: "Normandie",
    region: "Normandie",
    description: "Histoire, falaises et campagne verdoyante",
    image: "https://images.unsplash.com/photo-1596796693499-ba3c78e91589?w=600",
    rating: 4.6,
    vehicles: 94,
    highlights: ["Histoire", "Mer", "Campagne"],
    icon: Waves,
    popularMonths: ["Mai", "Juin", "Septembre"]
  }
]

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Explorez la France
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Destinations Populaires
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Découvrez les plus belles régions de France en van aménagé
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-medium">639 véhicules</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">4.8/5 moyenne</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Toute l'année</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => {
              const Icon = destination.icon
              return (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      
                      {/* Location */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {destination.name}
                        </h3>
                        <p className="text-white/90 text-sm">{destination.region}</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {destination.description}
                      </p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.map((highlight) => (
                          <span 
                            key={highlight}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">Véhicules disponibles</p>
                          <p className="font-semibold text-gray-900">{destination.vehicles} vans</p>
                        </div>
                        <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                          <Link href={`/vehicles?destination=${destination.name}`}>
                            Explorer
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Popular months */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500 mb-2">Meilleurs mois</p>
                        <div className="flex gap-2">
                          {destination.popularMonths.map((month) => (
                            <span key={month} className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {month}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Votre prochaine aventure vous attend
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Réservez votre van et partez explorer la France
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/vehicles">
                Voir tous les véhicules
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}