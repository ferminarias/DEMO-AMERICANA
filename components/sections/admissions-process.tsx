"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, CreditCard, GraduationCap, ArrowRight, CheckCircle } from "lucide-react"

const admissionSteps = [
  {
    id: 1,
    title: "Aplicación",
    description: "Completa tu solicitud online con tus datos académicos y profesionales",
    icon: FileText,
    details: ["Formulario online", "Documentos digitales", "Sin costo de aplicación"],
    duration: "5 minutos",
  },
  {
    id: 2,
    title: "Entrevista",
    description: "Conversación con nuestro equipo académico para conocer tus objetivos",
    icon: Users,
    details: ["Entrevista virtual", "Evaluación de perfil", "Orientación académica"],
    duration: "30 minutos",
  },
  {
    id: 3,
    title: "Inscripción",
    description: "Formaliza tu inscripción y accede a nuestras opciones de financiamiento",
    icon: CreditCard,
    details: ["Proceso 100% digital", "Múltiples formas de pago", "Becas disponibles"],
    duration: "1 día",
  },
  {
    id: 4,
    title: "Inicio",
    description: "Comienza tu experiencia académica con nuestra plataforma de aprendizaje",
    icon: GraduationCap,
    details: ["Onboarding completo", "Acceso a plataforma", "Comunidad estudiantil"],
    duration: "Inmediato",
  },
]

export function AdmissionsProcessSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="admision" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-ulinea-orange text-white mb-4">Proceso de admisión</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tu camino hacia ULINEA</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un proceso simple y transparente diseñado para que puedas comenzar tu formación lo antes posible
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="h-full border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-ulinea-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-ulinea-blue to-ulinea-orange rounded-full flex items-center justify-center mx-auto mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ulinea-blue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                    {/* Duration */}
                    <div className="bg-ulinea-orange text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {step.duration}
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow connector (hidden on mobile and last item) */}
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-ulinea-blue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline for mobile */}
        <div className="lg:hidden mt-12 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ulinea-blue"></div>
            {admissionSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-center mb-8 last:mb-0">
                <div className="w-8 h-8 bg-ulinea-blue text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {step.id}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-ulinea-blue to-blue-700 rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para comenzar tu transformación profesional?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              El proceso de admisión es gratuito y sin compromiso. Da el primer paso hacia tu futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-ulinea-orange hover:bg-ulinea-orange/90 text-white px-8 py-4 text-lg font-semibold"
              >
                Solicitar información
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ulinea-blue px-8 py-4 text-lg font-semibold bg-blue-900/20 backdrop-blur-sm"
                onClick={() => {
                  const message = encodeURIComponent(
                    "¡Hola! Me interesa conocer más sobre el proceso de admisión en ULINEA. ¿Podrían brindarme información?",
                  )
                  window.open(`https://wa.me/5491123456789?text=${message}`, "_blank")
                }}
              >
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
