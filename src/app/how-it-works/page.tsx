"use client"

import { motion } from "framer-motion"
import { Search, Calendar, CreditCard, MapPin, Key, MessageCircle, Shield, Phone, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stepsForRenters = [
  {
    icon: Search,
    title: "Recherchez votre van",
    description: "Parcourez notre sélection de véhicules selon vos dates et destination",
    details: ["Filtres avancés", "Photos HD", "Avis vérifiés", "Disponibilité en temps réel"]
  },
  {
    icon: Calendar,
    title: "Sélectionnez vos dates",
    description: "Vérifiez la disponibilité et calculez le prix de votre location",
    details: ["Calendrier interactif", "Prix transparent", "Options flexibles", "Assurance incluse"]
  },
  {
    icon: CreditCard,
    title: "Réservez en ligne",
    description: "Paiement sécurisé et confirmation immédiate de votre réservation",
    details: ["Paiement 3D Secure", "Acompte de 30%", "Annulation gratuite", "Confirmation instantanée"]
  },
  {
    icon: Key,
    title: "Récupérez votre van",
    description: "Rencontrez le propriétaire et prenez possession de votre véhicule",
    details: ["État des lieux", "Remise des clés", "Explications détaillées", "Check-list fournie"]
  }
]

const stepsForOwners = [
  {
    icon: MessageCircle,
    title: "Créez votre annonce",
    description: "Listez votre véhicule avec photos et équipements en quelques minutes",
    details: ["Interface intuitive", "Photos illimitées", "Description guidée", "Tarification assistée"]
  },
  {
    icon: Shield,
    title: "Validation et vérification",
    description: "Notre équipe vérifie votre annonce et vos documents sous 24h",
    details: ["Documents requis", "Vérification identité", "Contrôle qualité", "Activation rapide"]
  },
  {
    icon: Calendar,
    title: "Gérez vos réservations",
    description: "Acceptez ou refusez les demandes selon votre planning",
    details: ["Calendrier synchronisé", "Notifications instantanées", "Gestion simplifiée", "Historique complet"]
  },
  {
    icon: CreditCard,
    title: "Recevez vos paiements",
    description: "Virements automatiques 48h après le début de chaque location",
    details: ["Paiements sécurisés", "Commission 15%", "Relevés mensuels", "Support comptable"]
  }
]

const guarantees = [
  {
    icon: Shield,
    title: "Assurance tous risques",
    description: "Protection complète avec notre partenaire AXA"
  },
  {
    icon: Phone,
    title: "Assistance 24/7",
    description: "Support téléphonique disponible à tout moment"
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description: "Transactions protégées et cryptées"
  },
  {
    icon: MessageCircle,
    title: "Messagerie intégrée",
    description: "Communication directe et sécurisée"
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Comment ça marche ?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Location de van simple, sécurisée et sans surprise
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/vehicles">
                  Je veux louer un van
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/partners">
                  Je veux louer mon van
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Pour les voyageurs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Louez un van en 4 étapes
            </h2>
            <p className="text-xl text-gray-600">
              De la recherche à la prise en main, tout est simple
            </p>
          </motion.div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {stepsForRenters.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {step.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < stepsForRenters.length - 1 && (
                    <div className="hidden lg:flex items-center">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Key className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Pour les propriétaires</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Louez votre van facilement
            </h2>
            <p className="text-xl text-gray-600">
              Rentabilisez votre véhicule en toute sécurité
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stepsForOwners.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos garanties
            </h2>
            <p className="text-xl text-gray-600">
              Location en toute confiance avec VanBNB
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-gray-600">
                    {guarantee.description}
                  </p>
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
              Prêt à partir à l'aventure ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Commencez votre voyage dès aujourd'hui
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/vehicles">
                  Trouver un van
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/partners">
                  Louer mon van
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}