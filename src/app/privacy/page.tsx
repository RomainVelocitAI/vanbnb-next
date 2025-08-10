"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/auth">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              VanBNB s'engage à protéger la vie privée de ses utilisateurs et partenaires. Cette politique de 
              confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données 
              personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nous collectons les types de données suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Informations d'identification :</strong> nom, prénom, email, téléphone</li>
              <li><strong>Données de l'entreprise :</strong> nom de société, SIRET, adresse professionnelle</li>
              <li><strong>Informations bancaires :</strong> IBAN pour les virements (stocké de manière sécurisée)</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
              <li><strong>Données de véhicules :</strong> informations sur votre flotte, photos, disponibilités</li>
              <li><strong>Historique des transactions :</strong> réservations, paiements, communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation des données</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Gérer votre compte partenaire et vos véhicules</li>
              <li>Traiter les réservations et les paiements</li>
              <li>Communiquer avec vous concernant votre activité</li>
              <li>Améliorer nos services et votre expérience</li>
              <li>Respecter nos obligations légales et fiscales</li>
              <li>Prévenir la fraude et assurer la sécurité</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base légale du traitement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données repose sur plusieurs bases légales :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li><strong>Contrat :</strong> nécessaire à l'exécution du contrat de partenariat</li>
              <li><strong>Consentement :</strong> pour l'envoi de communications marketing</li>
              <li><strong>Intérêt légitime :</strong> pour améliorer nos services et prévenir la fraude</li>
              <li><strong>Obligation légale :</strong> pour la conformité fiscale et réglementaire</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partage des données</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Locataires :</strong> informations nécessaires à la réservation</li>
              <li><strong>Prestataires de services :</strong> paiement (Stripe), hébergement (Vercel), base de données (Supabase)</li>
              <li><strong>Partenaires d'assurance :</strong> AXA pour la couverture des locations</li>
              <li><strong>Autorités légales :</strong> si requis par la loi</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sécurité des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
              <li>Stockage sécurisé des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue et audits de sécurité</li>
              <li>Formation du personnel sur la protection des données</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Conservation des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous conservons vos données selon les durées suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li><strong>Données du compte :</strong> pendant toute la durée du partenariat + 3 ans</li>
              <li><strong>Données de transaction :</strong> 10 ans (obligation comptable)</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              <li><strong>Cookies :</strong> 13 mois maximum</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certains cas</li>
              <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer à certains traitements</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements basés sur le consentement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pour exercer ces droits, contactez notre DPO à : dpo@vanbnb.fr
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous utilisons des cookies pour :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li>Maintenir votre session de connexion</li>
              <li>Mémoriser vos préférences</li>
              <li>Analyser l'utilisation de notre plateforme</li>
              <li>Améliorer nos services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Vous pouvez gérer vos préférences de cookies depuis les paramètres de votre navigateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Transferts internationaux</h2>
            <p className="text-gray-700 leading-relaxed">
              Certains de nos prestataires peuvent traiter vos données en dehors de l'UE. Dans ce cas, nous 
              nous assurons que des garanties appropriées sont en place (clauses contractuelles types, 
              Privacy Shield, ou décision d'adéquation).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Cette politique peut être mise à jour périodiquement. Nous vous informerons de tout changement 
              substantiel par email ou via votre dashboard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant cette politique ou vos données :
              <br />
              <strong>Délégué à la Protection des Données (DPO)</strong>
              <br />
              Email : dpo@vanbnb.fr
              <br />
              Adresse : VanBNB, 123 rue de la République, 75001 Paris
              <br />
              <br />
              Vous pouvez également contacter la CNIL :
              <br />
              Site web : www.cnil.fr
              <br />
              Téléphone : 01 53 73 22 22
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <Link href="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700">
                J'ai compris
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}