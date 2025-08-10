"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Après confirmation de l'email, rediriger vers la page de connexion
    const timer = setTimeout(() => {
      router.push("/auth?confirmed=true")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="text-xl font-semibold mb-2">Confirmation en cours...</h2>
        <p className="text-gray-600">Votre email a été confirmé. Redirection...</p>
      </div>
    </div>
  )
}