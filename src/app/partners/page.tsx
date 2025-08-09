"use client"

import { motion } from "framer-motion"
import { Building2, Check, Shield, TrendingUp, Users, Calendar, CreditCard, HeadphonesIcon, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const benefits = [
  {
    icon: TrendingUp,
    title: "Augmentez vos revenus",
    description: "Rentabilisez votre flotte avec une commission de seulement 15%"
  },
  {
    icon: Shield,
    title: "Assurance complète",
    description: "Protection totale de vos véhicules avec notre partenaire AXA"
  },
  {
    icon: Users,
    title: "Clients vérifiés",
    description: "Système de vérification d'identité et historique des locations"
  },
  {
    icon: Calendar,
    title: "Gestion simplifiée",
    description: "Calendrier intelligent et synchronisation multi-plateformes"
  },
  {
    icon: CreditCard,
    title: "Paiements sécurisés",
    description: "Virements automatiques sous 48h après chaque location"
  },
  {
    icon: HeadphonesIcon,
    title: "Support dédié",
    description: "Équipe disponible 7j/7 pour vous accompagner"
  }
]

const steps = [
  {
    number: "01",
    title: "Inscription gratuite",
    description: "Créez votre compte professionnel en 5 minutes"
  },
  {
    number: "02",
    title: "Ajoutez vos véhicules",
    description: "Listez votre flotte avec photos et équipements"
  },
  {
    number: "03",
    title: "Validation rapide",
    description: "Notre équipe vérifie vos documents sous 24h"
  },
  {
    number: "04",
    title: "Commencez à louer",
    description: "Recevez vos premières réservations immédiatement"
  }
]

const testimonials = [
  {
    name: "Pierre Dubois",
    company: "Bretagne Vans",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    text: "Grâce à VanBNB, j'ai doublé mon chiffre d'affaires en 6 mois. La plateforme est intuitive et le support est excellent.",
    rating: 5,
    vehicles: 12
  },
  {
    name: "Marie Laurent",
    company: "Alpes Camping Cars",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    text: "La gestion des réservations est un jeu d'enfant. Je recommande VanBNB à tous les professionnels du secteur.",
    rating: 5,
    vehicles: 8
  },
  {
    name: "Thomas Martin",
    company: "Côte d'Azur Vans",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    text: "Commission juste, paiements rapides et clients de qualité. Que demander de plus ?",
    rating: 5,
    vehicles: 15
  }
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Building2 className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Devenez Partenaire
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Développez votre activité de location
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez la première plateforme de location de vans aménagés en France
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button 
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Télécharger la brochure
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
              <div className="text-white">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm opacity-90">Partenaires actifs</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">15%</p>
                <p className="text-sm opacity-90">Commission seulement</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">48h</p>
                <p className="text-sm opacity-90">Délai de paiement</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir VanBNB ?
            </h2>
            <p className="text-xl text-gray-600">
              Des avantages exclusifs pour nos partenaires professionnels
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Commencez à louer en 4 étapes simples
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-12 -right-4 w-8 h-8 text-gray-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos partenaires
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-3">"{testimonial.text}"</p>
                <p className="text-sm text-gray-500">
                  {testimonial.vehicles} véhicules en location
                </p>
              </motion.div>
            ))}
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
              Prêt à développer votre activité ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Inscription gratuite et sans engagement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Devenir partenaire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Planifier un appel
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Validation 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Support dédié</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}