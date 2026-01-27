"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Simple icon components to replace lucide-react
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const benefits = [
  "Modalidad en línea 100%",
  "5 licenciaturas disponibles",
  "Duración: 3 años 4 meses",
  "Titulación oficial",
  "Validez de estudios SEP",
  "Inscripción sin costo",
  "Mensualidades desde $2,000",
]

export function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToPrograms = () => {
    const programsSection = document.getElementById("programas")
    programsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 bg-slate-900">
      <div className="absolute inset-0 bg-slate-900 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 z-10"></div>

      {/* Background Image */}
      <div className="absolute inset-0 z-20">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NQfzOyW7pHzX9y2WIj3xyMvbjIT12Z.png"
          alt="Estudiantes de ULINEA Universidad"
          fill
          className="object-cover object-center opacity-20"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-blue-800/85" />
      </div>

      <div className="relative z-30 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium shadow-lg">
                Universidad en línea
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl text-shadow-lg">
                Tu futuro
                <br />
                <span className="text-white drop-shadow-2xl">comienza aquí</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-100 max-w-lg leading-relaxed drop-shadow-lg">
                Estudia una licenciatura 100% en línea con validez oficial. Elige entre 5 programas académicos diseñados
                para el éxito profesional.
              </p>
            </div>

            {/* CTA Buttons (desktop) */}
            <div className="hidden md:flex md:flex-row md:items-center md:gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold group shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToContact}
              >
                Solicitar información
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold bg-slate-800/70 backdrop-blur-sm shadow-lg"
                onClick={scrollToPrograms}
              >
                <Play className="mr-2 h-5 w-5" />
                Ver licenciaturas
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white drop-shadow-lg">Validez oficial SEP</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white drop-shadow-lg">5 licenciaturas</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white drop-shadow-lg">100% en línea</span>
              </div>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="bg-red-800 rounded-lg p-6 sm:p-8 shadow-2xl max-w-md border border-red-700">
              <h3 className="text-white font-bold text-xl mb-6 drop-shadow-lg">¿Por qué elegir ULINEA?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0 drop-shadow-md" />
                    <span className="text-sm leading-relaxed text-white drop-shadow-md font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA overlay */}
      <div className="md:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-1/2 z-40 w-full max-w-[min(520px,92vw)] -translate-x-1/2 px-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur-lg shadow-2xl ring-1 ring-white/40 px-4 py-3 flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={scrollToContact}
          >
            Solicitar información
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border border-slate-300 text-slate-900 hover:bg-slate-100 bg-white font-semibold"
            onClick={scrollToPrograms}
          >
            <Play className="mr-2 h-5 w-5" />
            Ver licenciaturas
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
