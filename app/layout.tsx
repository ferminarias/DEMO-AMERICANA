import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { VoiceWidgetProvider } from "@/components/voice-widget-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Universidad Americana de Paraguay - Asistente Virtual",
  description:
    "Asistente virtual inteligente de la Universidad Americana de Paraguay. Más de 30 años de orgullo, liderazgo, innovación, prestigio y trayectoria.",
  keywords: "Universidad Americana, Paraguay, asistente virtual, chatbot, educación superior",
  authors: [{ name: "Universidad Americana" }],
  creator: "Universidad Americana",
  publisher: "Universidad Americana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Universidad Americana de Paraguay - Asistente Virtual",
    description:
      "Asistente virtual inteligente de la Universidad Americana de Paraguay.",
    url: "/",
    siteName: "Universidad Americana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Universidad Americana de Paraguay",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universidad Americana de Paraguay - Asistente Virtual",
    description:
      "Asistente virtual inteligente de la Universidad Americana de Paraguay.",
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
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-PY" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <VoiceWidgetProvider />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
