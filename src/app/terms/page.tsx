"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/auth">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions d'utilisation partenaires</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme VanBNB 
              par les partenaires professionnels proposant des véhicules à la location. En créant un compte partenaire, 
              vous acceptez sans réserve l'ensemble de ces conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Conditions d'accès</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pour devenir partenaire VanBNB, vous devez :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Être une entreprise légalement constituée</li>
              <li>Disposer des autorisations nécessaires à l'activité de location de véhicules</li>
              <li>Fournir des documents d'identification valides</li>
              <li>Maintenir une assurance professionnelle adéquate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Obligations du partenaire</h2>
            <p className="text-gray-700 leading-relaxed mb-4">En tant que partenaire, vous vous engagez à :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Maintenir vos véhicules en parfait état de fonctionnement</li>
              <li>Respecter toutes les réglementations en vigueur</li>
              <li>Fournir des informations exactes et à jour sur vos véhicules</li>
              <li>Honorer toutes les réservations confirmées</li>
              <li>Traiter les locataires avec professionnalisme</li>
              <li>Maintenir un taux de réponse d'au moins 90%</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Commission et paiements</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VanBNB prélève une commission de 15% sur chaque location réalisée via la plateforme. 
              Les paiements sont effectués sous 48h ouvrées après la fin de chaque location, 
              déduction faite de la commission et d'éventuels frais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Politique d'annulation</h2>
            <p className="text-gray-700 leading-relaxed">
              Les partenaires doivent respecter la politique d'annulation choisie lors de la création 
              de leur annonce. Toute annulation abusive peut entraîner des pénalités ou la suspension 
              du compte partenaire.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Responsabilité et assurance</h2>
            <p className="text-gray-700 leading-relaxed">
              Les partenaires sont responsables de maintenir une assurance adéquate pour leurs véhicules. 
              VanBNB propose une assurance complémentaire via notre partenaire AXA, mais celle-ci ne 
              remplace pas l'assurance principale du véhicule.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Protection des données</h2>
            <p className="text-gray-700 leading-relaxed">
              VanBNB s'engage à protéger les données personnelles et professionnelles de ses partenaires 
              conformément au RGPD. Les données sont utilisées uniquement dans le cadre de la fourniture 
              du service et ne sont jamais vendues à des tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Suspension et résiliation</h2>
            <p className="text-gray-700 leading-relaxed">
              VanBNB se réserve le droit de suspendre ou résilier un compte partenaire en cas de 
              non-respect des présentes CGU, de comportement frauduleux, ou de réclamations répétées 
              des locataires.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modification des conditions</h2>
            <p className="text-gray-700 leading-relaxed">
              VanBNB peut modifier ces conditions à tout moment. Les partenaires seront informés 
              par email de toute modification substantielle avec un préavis de 30 jours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
              <br />
              Email : partners@vanbnb.fr
              <br />
              Téléphone : 01 23 45 67 89
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <Link href="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700">
                J'accepte les conditions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}