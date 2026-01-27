"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/scroll-animate"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PROGRAMS } from "@/lib/constants"
import type { Program } from "@/lib/types"

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

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

interface ProgramDialogProps {
  program: Program
  onEnroll: (programId: string) => void
}

function ProgramDialog({ program, onEnroll }: ProgramDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm">
          Ver plan de estudios
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-ulinea-blue">{program.name}</DialogTitle>
          <DialogDescription className="text-lg">{program.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-ulinea-blue" />
              <div>
                <p className="font-medium">Duración</p>
                <p className="text-sm text-muted-foreground">{program.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-ulinea-blue" />
              <div>
                <p className="font-medium">Modalidad</p>
                <p className="text-sm text-muted-foreground capitalize">{program.modality}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-ulinea-blue" />
              <div>
                <p className="font-medium">Próximo inicio</p>
                <p className="text-sm text-muted-foreground">{program.nextCohort}</p>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-ulinea-blue">Plan de estudios</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {program.curriculum.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-ulinea-blue">Al graduarte podrás</h4>
            <div className="space-y-2">
              {program.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-ulinea-orange mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t">
            <Button
              className="w-full bg-ulinea-blue hover:bg-blue-800 text-white"
              onClick={() => {
                // Close the dialog first
                const closeButton = document.querySelector("[data-dialog-close]") as HTMLElement
                if (closeButton) {
                  closeButton.click()
                }
                // Then scroll to contact form
                setTimeout(() => {
                  onEnroll(program.id)
                }, 100)
              }}
            >
              Inscribirme a {program.name}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ProgramsSectionProps {
  onEnroll?: (programId: string) => void
}

export function ProgramsSection({ onEnroll }: ProgramsSectionProps) {
  const handleEnroll = (programId: string) => {
    if (onEnroll) {
      onEnroll(programId)
    } else {
      // Default behavior: scroll to contact form
      const contactSection = document.getElementById("contacto")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
        // Add program to URL params for form pre-filling
        const url = new URL(window.location.href)
        url.searchParams.set("programa", programId)
        window.history.replaceState({}, "", url.toString())
      }
    }
  }

  return (
    <section id="programas" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/professional-students-studying-in-modern-universit.jpg"
          alt="Estudiantes universitarios profesionales"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-700/85" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16" animation="fade-in">
          <Badge className="bg-orange-600 hover:bg-orange-700 text-white mb-4 px-4 py-2">Programas académicos</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">Descubre nuestros programas</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto drop-shadow-md">
            Formación de calidad con enfoque práctico y flexibilidad total para profesionales como tú
          </p>
        </AnimateOnScroll>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PROGRAMS.map((program, index) => (
            <div key={program.id}>
            <AnimateOnScroll animation="fade-up">
              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-0 shadow-xl bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={`${
                        program.modality === "online"
                          ? "bg-green-100 text-green-800"
                          : program.modality === "presencial"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {program.modality}
                    </Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{program.duration}</p>
                      {program.price && <p className="font-semibold text-orange-600">{program.price}</p>}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900 leading-tight">{program.name}</CardTitle>
                  <CardDescription className="text-gray-600">{program.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <span>Próximo inicio: {program.nextCohort}</span>
                    </div>

                    {/* Preview of curriculum */}
                    <div>
                      <p className="font-medium text-sm mb-2">Algunas materias:</p>
                      <div className="space-y-1">
                        {program.curriculum.slice(0, 3).map((subject, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                            <span className="text-sm text-gray-600">{subject}</span>
                          </div>
                        ))}
                        {program.curriculum.length > 3 && (
                          <p className="text-sm text-muted-foreground pl-3.5">
                            +{program.curriculum.length - 3} materias más
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="mt-auto flex flex-col space-y-2">
                  <ProgramDialog program={program} onEnroll={handleEnroll} />
                  <Button
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => handleEnroll(program.id)}
                  >
                    Inscribirme ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
              ¿No encuentras el programa que buscas?
            </h3>
            <p className="text-blue-100 mb-6 drop-shadow-md">
              Contáctanos y te ayudaremos a encontrar la opción perfecta para tu perfil profesional
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 bg-transparent backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
              onClick={() => handleEnroll("consulta-general")}
            >
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
