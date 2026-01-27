import type { Metadata } from "next"

export const siteConfig = {
  name: "Universidad ULINEA",
  description: "Formación flexible, práctica y global. Descubre nuestras licenciaturas y maestrías en línea.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/ulinea",
    facebook: "https://facebook.com/ulinea",
    instagram: "https://instagram.com/ulinea",
    linkedin: "https://linkedin.com/company/ulinea",
  },
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
}): Metadata {
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const seoDescription = description || siteConfig.description
  const seoImage = image || siteConfig.ogImage
  const seoUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "universidad en línea",
      "licenciaturas online",
      "maestrías virtuales",
      "educación superior",
      "ULINEA",
      "formación profesional",
      "estudios universitarios",
      "educación flexible",
    ],
    authors: [{ name: "Universidad ULINEA" }],
    creator: "Universidad ULINEA",
    publisher: "Universidad ULINEA",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      type,
      locale: "es_AR",
      url: seoUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: "@ulinea",
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
  }
}

// JSON-LD structured data
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Universidad ULINEA",
  alternateName: "ULINEA",
  description: "Universidad en línea con formación flexible, práctica y global",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/og-image.jpg`,
  sameAs: [siteConfig.links.facebook, siteConfig.links.twitter, siteConfig.links.instagram, siteConfig.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressCountry: "MX",
    addressLocality: "Ciudad de México",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-55-1234-5678",
    contactType: "Admissions",
    availableLanguage: "Spanish",
  },
  offers: {
    "@type": "Offer",
    category: "Education",
    description: "Programas de licenciatura y maestría en línea",
  },
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo funcionan las clases online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestras clases son 100% online con sesiones en vivo y contenido grabado. Puedes acceder desde cualquier dispositivo con internet.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los títulos tienen validez oficial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, todos nuestros programas están acreditados y tienen validez oficial en México y reconocimiento internacional.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo trabajar mientras estudio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutamente. Nuestros programas están diseñados para profesionales que trabajan, con horarios flexibles y clases grabadas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofrecen becas o financiamiento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, contamos con diferentes opciones de becas académicas y planes de financiamiento sin intereses.",
      },
    },
  ],
}
