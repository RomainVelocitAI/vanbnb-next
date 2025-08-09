import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "VanBNB - Location de véhicules de camping premium",
    template: "%s | VanBNB"
  },
  description: "Plateforme de location de vans aménagés, camping-cars et véhicules de loisirs entre professionnels et particuliers.",
  keywords: ["location van", "camping-car", "van aménagé", "road trip", "voyage", "location véhicule"],
  authors: [{ name: "VanBNB" }],
  creator: "VanBNB",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://vanbnb.fr",
    siteName: "VanBNB",
    title: "VanBNB - Location de véhicules de camping premium",
    description: "Trouvez le véhicule parfait pour votre aventure",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VanBNB"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VanBNB - Location de véhicules de camping",
    description: "Trouvez le véhicule parfait pour votre aventure",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
