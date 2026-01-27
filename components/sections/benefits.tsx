"use client"
import { AnimateOnScroll } from "@/components/ui/scroll-animate"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BENEFITS } from "@/lib/constants"

// Simple icon components to replace lucide-react
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const Briefcase = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const Network = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6" />
    <path d="m21 12-6-6-6 6-6-6" />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const Headphones = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)

const iconMap = {
  clock: Clock,
  users: Users,
  briefcase: Briefcase,
  network: Network,
  award: Award,
  "trending-up": TrendingUp,
}

// Additional benefits with more detailed info
const extendedBenefits = [
  {
    id: "support",
    title: "Soporte 24/7",
    description: "Asistencia académica y técnica disponible en todo momento.",
    icon: Headphones,
    color: "text-blue-600",
  },
  {
    id: "global",
    title: "Perspectiva Global",
    description: "Casos de estudio internacionales y networking mundial.",
    icon: Globe,
    color: "text-green-600",
  },
  {
    id: "resources",
    title: "Recursos Digitales",
    description: "Biblioteca digital, simuladores y herramientas profesionales.",
    icon: BookOpen,
    color: "text-purple-600",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/diverse-university-students-collaborating-in-moder.jpg"
          alt="Estudiantes universitarios colaborando"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-red-600 hover:bg-red-700 text-white mb-4 px-4 py-2">¿Por qué ULINEA?</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Beneficios que marcan la diferencia
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto drop-shadow-md">
            Descubre por qué miles de profesionales eligen ULINEA para impulsar su carrera
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BENEFITS.map((benefit) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || CheckCircle
            return (
              <div key={benefit.id}>
                <AnimateOnScroll animation="fade-up">
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-xl group hover:-translate-y-1 bg-white/95 backdrop-blur-sm hover:bg-white">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-600 leading-relaxed">{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </div>
            )
          })}
        </div>

        {/* Extended Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {extendedBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all border border-white/20 shadow-lg"
            >
              <div className="text-red-400 mt-1">
                <benefit.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 drop-shadow-md">{benefit.title}</h4>
                <p className="text-blue-100 text-sm leading-relaxed drop-shadow-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
              Resultados que hablan por sí solos
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto drop-shadow-md">
              Nuestros graduados logran resultados excepcionales en el mercado laboral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">95%</div>
              <div className="text-blue-200 drop-shadow-md">Empleabilidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">15k+</div>
              <div className="text-blue-200 drop-shadow-md">Graduados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">4.8/5</div>
              <div className="text-blue-200 drop-shadow-md">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">50+</div>
              <div className="text-blue-200 drop-shadow-md">Países</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
