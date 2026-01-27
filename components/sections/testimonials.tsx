"use client"

import * as React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TESTIMONIALS } from "@/lib/constants"


const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M14 8h-6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h4" />
    <path d="M28 8h-6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h4" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <polygon points="12 2 14.9453 8.36396 22 9.2718 17 14.0902 18.4727 21 12 17.7639 5.52727 21 7 14.0902 2 9.2718 9.0547 8.36396" />
  </svg>
)

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonios" className="py-20 bg-blue-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-ulinea-orange hover:bg-ulinea-orange/90 text-white mb-4 px-4 py-2">Testimonios</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Lo que dicen nuestros graduados
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto drop-shadow-md">
            Historias reales de éxito de profesionales que transformaron su carrera con ULINEA
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            key={currentIndex}
            className="relative transition-opacity duration-500"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Testimonial Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <Image
                        src={TESTIMONIALS[currentIndex].image || "/placeholder.svg"}
                        alt={TESTIMONIALS[currentIndex].name}
                        fill
                        className="object-cover rounded-full shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <QuoteIcon className="h-8 w-8 text-red-600 mb-4 mx-auto md:mx-0" />

                    <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                      "{TESTIMONIALS[currentIndex].quote}"
                    </blockquote>

                    <div className="space-y-2">
                      <div className="font-bold text-xl text-gray-900">{TESTIMONIALS[currentIndex].name}</div>

                      <div className="text-blue-700 font-medium">
                        {TESTIMONIALS[currentIndex].role}
                        {TESTIMONIALS[currentIndex].company && (
                          <span className="text-gray-600"> en {TESTIMONIALS[currentIndex].company}</span>
                        )}
                      </div>

                      <div className="text-sm text-gray-500">
                        Graduado de {TESTIMONIALS[currentIndex].program} • Cohorte {TESTIMONIALS[currentIndex].cohort}
                      </div>

                      {/* Star Rating */}
                      <div className="flex justify-center md:justify-start space-x-1 pt-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-white/20"
            onClick={prevTestimonial}
            aria-label="Testimonio anterior"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-white/20"
            onClick={nextTestimonial}
            aria-label="Siguiente testimonio"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-red-500" : "bg-white/50"
                }`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Únete a nuestra comunidad de éxito</h3>
            <p className="text-blue-100 mb-6 drop-shadow-md">
              Más de 15,000 profesionales han transformado su carrera con ULINEA
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-blue-200">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 en satisfacción</span>
              </div>
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <span>95% empleabilidad</span>
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <span>50+ países</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
