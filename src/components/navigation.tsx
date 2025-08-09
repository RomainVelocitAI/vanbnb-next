"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Search,
  MapPin,
  User,
  Heart,
  ChevronDown,
  Car,
  Calendar,
  Shield,
  Sparkles,
  Phone,
} from "lucide-react"

const navigationItems = [
  {
    label: "Véhicules",
    href: "/vehicles",
    icon: Car,
    dropdown: [
      { label: "Tous les véhicules", href: "/vehicles", description: "Explorer notre catalogue" },
      { label: "Vans aménagés", href: "/vehicles?type=van", description: "Compacts et pratiques" },
      { label: "Camping-cars", href: "/vehicles?type=campingcar", description: "Confort et espace" },
      { label: "Fourgons", href: "/vehicles?type=fourgon", description: "Grande capacité" },
    ]
  },
  {
    label: "Destinations",
    href: "/destinations",
    icon: MapPin,
    dropdown: [
      { label: "Top destinations", href: "/destinations", description: "Les plus populaires" },
      { label: "Côte d'Azur", href: "/destinations/cote-azur", description: "Soleil et mer" },
      { label: "Alpes", href: "/destinations/alpes", description: "Montagne et nature" },
      { label: "Bretagne", href: "/destinations/bretagne", description: "Côtes sauvages" },
    ]
  },
  {
    label: "Comment ça marche",
    href: "/how-it-works",
    icon: Sparkles,
  },
  {
    label: "Partenaires",
    href: "/partners",
    icon: Shield,
  },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                VanBNB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group",
                      pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className={cn(
                        "w-3 h-3 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {subItem.label}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 relative"
                aria-label="Favoris"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* User Account */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Compte utilisateur"
              >
                <User className="w-5 h-5" />
              </Button>

              {/* CTA Button */}
              <Button 
                className="ml-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Devenir partenaire
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5 opacity-70" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                    {item.dropdown && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                  >
                    <User className="w-5 h-5" />
                    Se connecter
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                  >
                    Devenir partenaire
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  )
}