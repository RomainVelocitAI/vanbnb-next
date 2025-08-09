"use client"

import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState, memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Users, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// Véhicules premium pour l'animation
const premiumVehicles = [
  // VÉHICULES PRINCIPAUX - qui seront affichés au centre (1-5)
  { 
    id: 1, 
    name: "Mercedes Marco Polo", 
    price: "189€", 
    score: 95, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 2, 
    name: "Volkswagen California Ocean", 
    price: "159€", 
    score: 92, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1533591380348-14193f1de18f?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 3, 
    name: "Ford Transit Custom Nugget", 
    price: "145€", 
    score: 88, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1543965170-4c01a586684e?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 4, 
    name: "Fiat Ducato Hymer", 
    price: "175€", 
    score: 90, 
    capacity: "6 pers",
    image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 5, 
    name: "Citroën SpaceTourer Camper", 
    price: "135€", 
    score: 86, 
    capacity: "5 pers",
    image: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?q=80&w=1760&auto=format&fit=crop"
  },

  // VÉHICULES EN ARRIÈRE-PLAN (6-20)
  { 
    id: 6, 
    name: "Peugeot Boxer Aménagé", 
    price: "125€", 
    score: 84, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 7, 
    name: "Renault Trafic SpaceClass", 
    price: "115€", 
    score: 82, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 8, 
    name: "Nissan Primastar Camper", 
    price: "120€", 
    score: 83, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 9, 
    name: "Opel Vivaro Life", 
    price: "110€", 
    score: 80, 
    capacity: "5 pers",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 10, 
    name: "Toyota Proace Verso", 
    price: "130€", 
    score: 85, 
    capacity: "6 pers",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 11, 
    name: "Iveco Daily Camper", 
    price: "165€", 
    score: 87, 
    capacity: "6 pers",
    image: "https://images.unsplash.com/photo-1489686995744-f47e995ffe61?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 12, 
    name: "Man TGE Camper Van", 
    price: "155€", 
    score: 89, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 13, 
    name: "Volkswagen Crafter", 
    price: "170€", 
    score: 91, 
    capacity: "5 pers",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 14, 
    name: "Mercedes Vito Marco Polo", 
    price: "140€", 
    score: 86, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=1760&auto=format&fit=crop"
  },
  { 
    id: 15, 
    name: "Citroën Jumpy Camper", 
    price: "105€", 
    score: 79, 
    capacity: "4 pers",
    image: "https://images.unsplash.com/photo-1519885277449-12eee5564d68?q=80&w=1760&auto=format&fit=crop"
  },
]

// Véhicules principaux qui auront une animation spéciale
const keyVehicles = premiumVehicles.slice(0, 5)
const backgroundVehicles = premiumVehicles.slice(5)

interface VehicleMetadata {
  name: string
  price: string
  score: number
  capacity: string
}

// Helper function pour générer des points d'entrée/sortie aléatoires
function getRandomEdgePoint(containerSize: { width: number; height: number }, edge: 'top' | 'bottom' | 'left' | 'right') {
  const margin = 100
  switch (edge) {
    case 'top':
      return { x: Math.random() * containerSize.width, y: -margin }
    case 'bottom':
      return { x: Math.random() * containerSize.width, y: containerSize.height + margin }
    case 'left':
      return { x: -margin, y: Math.random() * containerSize.height }
    case 'right':
      return { x: containerSize.width + margin, y: Math.random() * containerSize.height }
  }
}

// Helper function pour créer un chemin courbé
function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }, containerSize: { width: number; height: number }) {
  const curveVariation = 30 + Math.random() * 60
  const midX = (start.x + end.x) / 2 + (Math.random() - 0.5) * curveVariation
  const midY = (start.y + end.y) / 2 + (Math.random() - 0.5) * curveVariation
  
  return [
    start,
    { x: midX, y: midY },
    end
  ]
}

interface AnimatedVehicleProps {
  vehicle: typeof premiumVehicles[0]
  isKeyVehicle?: boolean
  containerSize: { width: number; height: number }
  onReachCenter?: (metadata: VehicleMetadata) => void
  onComplete?: () => void
}

function AnimatedVehicle({ vehicle, isKeyVehicle = false, containerSize, onReachCenter, onComplete }: AnimatedVehicleProps) {
  const controls = useAnimation()

  useEffect(() => {
    const animateVehicle = async () => {
      if (isKeyVehicle) {
        // Véhicule principal : chemin courbé vers le centre, pause, puis sortie
        const edges: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right']
        const entryEdge = edges[Math.floor(Math.random() * edges.length)]
        
        const startPoint = getRandomEdgePoint(containerSize, entryEdge)
        const centerPoint = { x: containerSize.width / 2 - 40, y: containerSize.height / 2 - 40 }

        // Position initiale (hors du conteneur, flou)
        await controls.set({
          x: startPoint.x,
          y: startPoint.y,
          scale: 0.7,
          filter: "blur(4px)",
          opacity: 0.8
        })

        // Animation vers le centre
        await controls.start({
          x: centerPoint.x,
          y: centerPoint.y,
          scale: 1.8, // Agrandissement au centre
          filter: "blur(0px)",
          opacity: 1,
          transition: {
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
            type: "tween"
          }
        })

        // Afficher les métadonnées
        onReachCenter?.({
          name: vehicle.name,
          price: vehicle.price,
          score: vehicle.score,
          capacity: vehicle.capacity,
        })

        // Pause de 3 secondes
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Sortie vers un bord aléatoire
        const exitEdges: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right']
        const randomExitEdge = exitEdges[Math.floor(Math.random() * exitEdges.length)]
        const randomExitPoint = getRandomEdgePoint(containerSize, randomExitEdge)

        // Animation de sortie
        await controls.start({
          x: randomExitPoint.x,
          y: randomExitPoint.y,
          scale: 0.7,
          filter: "blur(4px)",
          opacity: 0.5,
          transition: {
            duration: 2.5 + Math.random() * 1,
            ease: "easeInOut",
            type: "tween"
          }
        })

      } else {
        // Véhicule en arrière-plan : mouvement continu
        const animateLoop = async () => {
          while (true) {
            const edges: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right']
            const entryEdge = edges[Math.floor(Math.random() * edges.length)]
            const exitEdge = edges[Math.floor(Math.random() * edges.length)]
            
            const startPoint = getRandomEdgePoint(containerSize, entryEdge)
            const endPoint = getRandomEdgePoint(containerSize, exitEdge)
            const path = createCurvedPath(startPoint, endPoint, containerSize)

            // Position initiale
            await controls.set({
              x: startPoint.x,
              y: startPoint.y,
              scale: 0.5 + Math.random() * 0.4,
              filter: "blur(2px)",
              opacity: 0.6 + Math.random() * 0.4
            })

            // Animation à travers le chemin
            for (let i = 1; i < path.length; i++) {
              await controls.start({
                x: path[i].x,
                y: path[i].y,
                transition: {
                  duration: 2 + Math.random() * 2,
                  ease: "linear",
                  type: "tween"
                }
              })
            }

            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }

        animateLoop()
      }

      if (isKeyVehicle) {
        onComplete?.()
      }
    }

    animateVehicle()
  }, [isKeyVehicle, containerSize, controls, vehicle, onReachCenter, onComplete])

  return (
    <motion.div
      className="absolute w-16 h-16 md:w-20 md:h-20"
      animate={controls}
      initial={{
        scale: 0.5 + Math.random() * 0.4,
        filter: "blur(2px)",
        opacity: 0.6 + Math.random() * 0.4
      }}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden border border-border/30 shadow-lg">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 64px, 80px"
          priority={isKeyVehicle}
          quality={isKeyVehicle ? 90 : 75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </motion.div>
  )
}

interface CircularProgressProps {
  value: number
  size?: number
  className?: string
}

function CircularProgress({ value, size = 32, className }: CircularProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100)
  
  return (
    <div 
      className={cn("relative flex items-center justify-center", className)} 
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute inset-0 rounded-full border-[2.5px] border-gray-200 dark:border-gray-700"
        style={{ borderColor: 'hsl(var(--muted))' }}
      />
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, hsl(142 76% 36%) 0deg ${(percentage * 3.6)}deg, transparent ${(percentage * 3.6)}deg 360deg)`,
          mask: `radial-gradient(circle at center, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`,
          WebkitMask: `radial-gradient(circle at center, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`
        }}
      />
      <span className="relative text-xs font-bold text-green-600 dark:text-green-400 z-10">
        {value}
      </span>
    </div>
  )
}

interface MetadataDisplayProps {
  metadata: VehicleMetadata
}

const MetadataDisplay = memo(function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        {/* Prix - gauche */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 15 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-lg p-2.5 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Prix/jour</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{metadata.price}</div>
            </div>
          </div>
        </motion.div>

        {/* Score - droite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -15 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-lg p-2.5 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <CircularProgress value={metadata.score} size={32} />
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Score</div>
              <div className="text-sm font-bold text-green-600 dark:text-green-400">{metadata.score}/100</div>
            </div>
          </div>
        </motion.div>

        {/* Nom du véhicule - haut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.0, duration: 0.3 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-lg p-3 shadow-lg min-w-[200px] max-w-[280px]"
        >
          <div className="text-sm font-semibold text-gray-900 dark:text-white text-center line-clamp-2 leading-tight">
            {metadata.name}
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Users className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">{metadata.capacity}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
})

export function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [currentMetadata, setCurrentMetadata] = useState<VehicleMetadata | null>(null)
  const [keyVehicleIndex, setKeyVehicleIndex] = useState(0)
  const [isKeyVehicleAnimating, setIsKeyVehicleAnimating] = useState(true)
  const [backgroundVehicleInstances] = useState(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: `bg-stable-${index}`,
      vehicle: backgroundVehicles[index % backgroundVehicles.length]
    }))
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    const updateSize = () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setContainerSize({ width: rect.width, height: rect.height })
        }
      }, 100)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  const handleKeyVehicleComplete = useCallback(() => {
    setIsKeyVehicleAnimating(false)
    setTimeout(() => {
      setKeyVehicleIndex((prev) => (prev + 1) % keyVehicles.length)
      setIsKeyVehicleAnimating(true)
    }, 100)
  }, [])

  const handleVehicleReachCenter = useCallback((metadata: VehicleMetadata) => {
    setCurrentMetadata(metadata)
    setTimeout(() => {
      setCurrentMetadata(null)
    }, 3000)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Gradient de fond premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-amber-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Colonne gauche - Contenu texte */}
          <motion.div 
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              <MapPin className="w-4 h-4" />
              Plateforme N°1 en France
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                L'aventure commence
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                avec le van parfait
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Découvrez notre sélection premium de vans aménagés et camping-cars. 
              Des véhicules d'exception vérifiés et entretenus par des professionnels passionnés.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                asChild
              >
                <Link href="/vehicles">
                  Explorer les véhicules
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto font-semibold border-2"
              >
                Comment ça marche ?
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Véhicules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Partenaires</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Voyageurs</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Véhicules animés */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div 
              ref={containerRef}
              className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08), transparent 60%),
                  radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.08), transparent 60%),
                  linear-gradient(135deg, #ffffff, #f9fafb)
                `,
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {/* Véhicules en arrière-plan */}
              {backgroundVehicleInstances.map((item) => (
                <AnimatedVehicle
                  key={item.id}
                  vehicle={item.vehicle}
                  isKeyVehicle={false}
                  containerSize={containerSize}
                />
              ))}
              
              {/* Véhicule principal */}
              {isKeyVehicleAnimating && (
                <AnimatedVehicle
                  key={`key-${keyVehicles[keyVehicleIndex].id}-${keyVehicleIndex}`}
                  vehicle={keyVehicles[keyVehicleIndex]}
                  isKeyVehicle={true}
                  containerSize={containerSize}
                  onReachCenter={handleVehicleReachCenter}
                  onComplete={handleKeyVehicleComplete}
                />
              )}
              
              {/* Affichage des métadonnées */}
              <AnimatePresence mode="wait">
                {currentMetadata && (
                  <MetadataDisplay metadata={currentMetadata} />
                )}
              </AnimatePresence>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}