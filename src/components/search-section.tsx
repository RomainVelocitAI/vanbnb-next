"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Search, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function SearchSection({ onSearch }: { onSearch?: (params: any) => void }) {
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [vehicleType, setVehicleType] = useState<string>("")
  const [capacity, setCapacity] = useState<string>("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleSearch = () => {
    const params = {
      location,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      vehicleType,
      capacity: capacity ? parseInt(capacity) : undefined,
    }
    onSearch?.(params)
  }

  return (
    <section className="relative py-16 -mt-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Recherche intelligente
              </span>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trouvez votre véhicule idéal
            </h2>
            <p className="text-gray-600">
              Plus de 500 véhicules disponibles partout en France
            </p>
          </div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Main Search Bar */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Location Input */}
                <div className="lg:col-span-3 relative">
                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                    Destination
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Où partez-vous ?"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div className="lg:col-span-2">
                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                    Date de départ
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal rounded-xl",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "P", { locale: fr }) : "Choisir"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="lg:col-span-2">
                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                    Date de retour
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal rounded-xl",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "P", { locale: fr }) : "Choisir"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        locale={fr}
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Vehicle Type */}
                <div className="lg:col-span-2">
                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                    Type de véhicule
                  </Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="van">Van aménagé</SelectItem>
                      <SelectItem value="camping_car">Camping-car</SelectItem>
                      <SelectItem value="fourgon">Fourgon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Capacity */}
                <div className="lg:col-span-1">
                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                    Places
                  </Label>
                  <Select value={capacity} onValueChange={setCapacity}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <Users className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="2+" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="6">6+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-2">
                  <Label className="text-xs font-medium text-transparent mb-2 block">
                    Action
                  </Label>
                  <Button 
                    onClick={handleSearch}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showAdvancedFilters ? "Masquer" : "Afficher"} les filtres avancés
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100 bg-gray-50/50 p-6 lg:p-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-2 block">
                      Prix max/jour
                    </Label>
                    <Select>
                      <SelectTrigger className="h-10 rounded-lg">
                        <SelectValue placeholder="Illimité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50€</SelectItem>
                        <SelectItem value="100">100€</SelectItem>
                        <SelectItem value="150">150€</SelectItem>
                        <SelectItem value="200">200€</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-2 block">
                      Transmission
                    </Label>
                    <Select>
                      <SelectTrigger className="h-10 rounded-lg">
                        <SelectValue placeholder="Toutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manuelle</SelectItem>
                        <SelectItem value="automatic">Automatique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-2 block">
                      Carburant
                    </Label>
                    <Select>
                      <SelectTrigger className="h-10 rounded-lg">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="essence">Essence</SelectItem>
                        <SelectItem value="hybrid">Hybride</SelectItem>
                        <SelectItem value="electric">Électrique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-2 block">
                      Équipements
                    </Label>
                    <Select>
                      <SelectTrigger className="h-10 rounded-lg">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kitchen">Cuisine</SelectItem>
                        <SelectItem value="shower">Douche</SelectItem>
                        <SelectItem value="wc">WC</SelectItem>
                        <SelectItem value="heating">Chauffage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-sm text-gray-500">Recherches populaires:</span>
            {["Côte d'Azur", "Bretagne", "Alpes", "Van California", "Camping-car famille"].map((term) => (
              <Button
                key={term}
                variant="ghost"
                size="sm"
                className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-3 py-1"
                onClick={() => setLocation(term)}
              >
                {term}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}