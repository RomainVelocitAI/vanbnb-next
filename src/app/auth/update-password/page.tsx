"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Lock, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    // Vérifier si l'utilisateur a un token de réinitialisation valide
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setMessage({
          type: 'error',
          text: "Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien."
        })
      }
    }
    
    checkSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwords.password !== passwords.confirmPassword) {
      setMessage({
        type: 'error',
        text: "Les mots de passe ne correspondent pas"
      })
      return
    }
    
    if (passwords.password.length < 6) {
      setMessage({
        type: 'error',
        text: "Le mot de passe doit contenir au moins 6 caractères"
      })
      return
    }
    
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      
      // Mettre à jour le mot de passe
      const { error } = await supabase.auth.updateUser({
        password: passwords.password
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Votre mot de passe a été mis à jour avec succès !'
      })
      
      // Rediriger vers le dashboard après 3 secondes
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
      
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || "Une erreur s'est produite lors de la mise à jour du mot de passe"
      })
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
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              VanBNB Partners
            </span>
          </Link>
          <p className="text-gray-600">Définissez votre nouveau mot de passe</p>
        </div>

        <Card className="shadow-xl border-0">
          <form onSubmit={handleUpdatePassword}>
            <CardHeader>
              <CardTitle>Nouveau mot de passe</CardTitle>
              <CardDescription>
                Choisissez un mot de passe sécurisé pour votre compte
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {message && (
                <Alert className={message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                    {message.type === 'success' && <CheckCircle className="inline-block h-4 w-4 mr-2" />}
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-9"
                    value={passwords.password}
                    onChange={(e) => setPasswords({...passwords, password: e.target.value})}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Conseils pour un mot de passe sécurisé :</strong>
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Au moins 6 caractères</li>
                  <li>• Mélangez lettres, chiffres et symboles</li>
                  <li>• Évitez les informations personnelles</li>
                </ul>
              </div>
            </CardContent>
            
            <div className="px-6 pb-6 space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500"
                disabled={loading || !passwords.password || !passwords.confirmPassword}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour en cours...
                  </>
                ) : (
                  "Mettre à jour le mot de passe"
                )}
              </Button>
              
              <Link href="/auth">
                <Button variant="outline" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          Le lien a expiré ?{" "}
          <Link href="/auth/reset-password" className="text-blue-600 hover:underline">
            Demander un nouveau lien
          </Link>
        </p>
      </motion.div>
    </div>
  )
}