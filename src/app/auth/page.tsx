"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    fullName: "",
    phone: "",
    addressStreet: "",
    addressCity: "",
    addressPostalCode: "",
    addressCountry: "France"
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      })

      if (error) throw error

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Une erreur s'est produite lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (signupData.password !== signupData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            company_name: signupData.companyName,
            phone: signupData.phone,
            address_street: signupData.addressStreet,
            address_city: signupData.addressCity,
            address_postal_code: signupData.addressPostalCode,
            address_country: signupData.addressCountry,
            role: 'partner'
          }
        }
      })

      if (authError) throw authError

      // After signup, check if email confirmation is required
      if (authData.user) {
        // Try to sign in to check if email confirmation is needed
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: signupData.email,
          password: signupData.password
        })

        if (signInError && signInError.message === 'Email not confirmed') {
          // Email confirmation required - show success message
          setSuccessMessage("🎉 Compte créé avec succès ! Veuillez vérifier votre boîte mail pour confirmer votre adresse email.")
          setError(null)
          // Reset form
          setSignupData({
            email: "",
            password: "",
            confirmPassword: "",
            companyName: "",
            fullName: "",
            phone: "",
            addressStreet: "",
            addressCity: "",
            addressPostalCode: "",
            addressCountry: "France"
          })
          return
        } else if (signInError) {
          console.error('Sign in error after signup:', signInError)
          throw signInError
        }

        // If sign in successful, create partner profile
        const { error: profileError } = await supabase
          .from('partners')
          .insert({
            user_id: authData.user.id,
            email: signupData.email,
            email_contact: signupData.email,
            company_name: signupData.companyName,
            full_name: signupData.fullName,
            phone_primary: signupData.phone,
            // Add individual address fields
            address_street: signupData.addressStreet,
            address_city: signupData.addressCity,
            address_postal_code: signupData.addressPostalCode,
            address_country: signupData.addressCountry,
            // Also store as JSON for future use
            address: {
              street: signupData.addressStreet,
              city: signupData.addressCity,
              postal_code: signupData.addressPostalCode,
              country: signupData.addressCountry
            },
            siret: 'PENDING', // Temporaire, sera mis à jour plus tard
            status: 'pending'
          })

        if (profileError) {
          console.error('Partner profile creation error:', profileError)
          throw profileError
        }

        // If everything successful and no email confirmation needed, redirect
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setError(error.message || "Une erreur s'est produite lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              VanBNB Partners
            </span>
          </Link>
          <p className="text-gray-600">Gérez votre flotte de véhicules</p>
        </div>

        <Card className="shadow-xl border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Connexion</CardTitle>
                  <CardDescription>
                    Accédez à votre espace partenaire
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="vous@exemple.com"
                        className="pl-9"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                  <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardHeader>
                  <CardTitle>Inscription</CardTitle>
                  <CardDescription>
                    Créez votre compte partenaire
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  {successMessage && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-200">
                      {successMessage}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Jean Dupont"
                          className="pl-9"
                          value={signupData.fullName}
                          onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Entreprise</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="VanLocation SARL"
                          className="pl-9"
                          value={signupData.companyName}
                          onChange={(e) => setSignupData({...signupData, companyName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email professionnel</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="contact@entreprise.com"
                        className="pl-9"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="pl-9"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressStreet">Rue</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="addressStreet"
                          type="text"
                          placeholder="123 Rue de la République"
                          className="pl-9"
                          value={signupData.addressStreet}
                          onChange={(e) => setSignupData({...signupData, addressStreet: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressCity">Ville</Label>
                      <Input
                        id="addressCity"
                        type="text"
                        placeholder="Paris"
                        value={signupData.addressCity}
                        onChange={(e) => setSignupData({...signupData, addressCity: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressPostalCode">Code postal</Label>
                      <Input
                        id="addressPostalCode"
                        type="text"
                        placeholder="75001"
                        value={signupData.addressPostalCode}
                        onChange={(e) => setSignupData({...signupData, addressPostalCode: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressCountry">Pays</Label>
                      <Input
                        id="addressCountry"
                        type="text"
                        placeholder="France"
                        value={signupData.addressCountry}
                        onChange={(e) => setSignupData({...signupData, addressCountry: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-9"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-9"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Inscription...
                      </>
                    ) : (
                      "Créer mon compte partenaire"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          En vous inscrivant, vous acceptez nos{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            politique de confidentialité
          </Link>
        </p>
      </motion.div>
    </div>
  )
}