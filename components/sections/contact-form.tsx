"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Send, Loader2, Phone, Mail, MapPin, Clock, User, GraduationCap } from "lucide-react"
import { PROGRAMS } from "@/lib/constants"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface ContactFormSectionProps {
  preselectedProgram?: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  interestProgram: string
  message: string
  acceptsTerms: boolean
}

export function ContactFormSection({ preselectedProgram }: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    interestProgram: preselectedProgram || "consulta-general",
    message: "",
    acceptsTerms: false,
  })
  const [errors, setErrors] = React.useState<Partial<FormData>>({})
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    if (!formData.acceptsTerms) {
      newErrors.acceptsTerms = "Debes aceptar los términos y condiciones"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log("[v0] Form data being submitted:", formData)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el mensaje")
      }

      toast({
        title: "¡Enviado!",
        description: "Gracias por contactarnos. Te escribiremos en menos de 24 horas.",
      })
      router.push("/gracias")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        interestProgram: "consulta-general",
        message: "",
        acceptsTerms: false,
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "No se pudo enviar",
        description: "Intenta nuevamente en unos minutos o usa WhatsApp.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-ulinea-blue to-blue-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-white text-ulinea-blue mb-4 px-4 py-2 text-sm font-medium">
            <GraduationCap className="mr-2 h-4 w-4" />
            Solicita información
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Da el primer paso hacia tu futuro</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Completa el formulario y recibe información personalizada sobre nuestros programas académicos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-2xl bg-white backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-ulinea-blue flex items-center">
                  <User className="mr-3 h-6 w-6" />
                  Solicitar información
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Te contactaremos en menos de 24 horas para resolver todas tus dudas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-900">
                      Nombre completo *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Escribe tu nombre completo"
                      className={`h-12 text-gray-900 placeholder:text-gray-500 ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-400 focus:border-ulinea-blue focus:ring-blue-200"}`}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-sm text-red-600 font-medium flex items-center mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                        Correo electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                        className={`h-12 text-gray-900 placeholder:text-gray-500 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-400 focus:border-ulinea-blue focus:ring-blue-200"}`}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-sm text-red-600 font-medium">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                        Teléfono celular *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className={`h-12 text-gray-900 placeholder:text-gray-500 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-400 focus:border-ulinea-blue focus:ring-blue-200"}`}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && <p id="phone-error" className="text-sm text-red-600 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Program Interest */}
                  <div className="space-y-2">
                    <Label htmlFor="interestProgram" className="text-sm font-semibold text-gray-900">
                      Programa de interés *
                    </Label>
                    <Select
                      value={formData.interestProgram}
                      onValueChange={(value) => handleInputChange("interestProgram", value)}
                    >
                      <SelectTrigger
                        className={`h-12 bg-white text-black border-gray-300 focus:border-ulinea-blue ${errors.interestProgram ? "border-red-500" : ""}`}
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <SelectValue
                          placeholder="Selecciona un programa"
                          className="text-black"
                          style={{ color: "black" }}
                        />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-white border border-gray-200 shadow-lg z-50"
                        style={{ backgroundColor: "white" }}
                      >
                        <SelectItem
                          value="consulta-general"
                          className="text-black bg-white hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Consulta general
                        </SelectItem>
                        {PROGRAMS.map((program) => (
                          <SelectItem
                            key={program.id}
                            value={program.id}
                            className="text-black bg-white hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.interestProgram && <p className="text-sm text-red-500">{errors.interestProgram}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-900">
                      Mensaje (opcional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Cuéntanos sobre tus objetivos profesionales y cómo podemos ayudarte..."
                      rows={4}
                      className={`resize-none ${errors.message ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-ulinea-blue"}`}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {/* Terms Acceptance */}
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox
                      id="acceptsTerms"
                      checked={formData.acceptsTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptsTerms", checked as boolean)}
                      className={`mt-0.5 ${errors.acceptsTerms ? "border-red-500" : ""}`}
                    />
                    <Label htmlFor="acceptsTerms" className="text-sm leading-relaxed text-gray-700">
                      Acepto los{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const message = encodeURIComponent(
                            "Hola, me gustaría conocer los términos y condiciones de ULINEA Universidad.",
                          )
                          window.open(`https://wa.me/5491123456789?text=${message}`, "_blank")
                        }}
                        className="text-ulinea-blue hover:underline font-medium"
                      >
                        términos y condiciones
                      </button>{" "}
                      y autorizo el tratamiento de mis datos personales para fines académicos y comerciales.
                    </Label>
                  </div>
                  {errors.acceptsTerms && <p className="text-sm text-red-500 mt-2">{errors.acceptsTerms}</p>}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ulinea-blue hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 text-lg font-semibold h-14 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    aria-describedby="submit-help"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando información...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Solicitar información gratuita
                      </>
                      )}
                    </Button>
                    <p id="submit-help" className="text-xs text-gray-600 text-center mt-2">
                      Al enviar este formulario, aceptas nuestros términos y condiciones
                    </p>
                  </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card className="border-0 shadow-2xl bg-blue-900/90 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">Otras formas de contacto</CardTitle>
                <CardDescription className="text-blue-100">
                  También puedes comunicarte directamente con nosotros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-ulinea-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Teléfono</h4>
                    <a href="tel:+525512345678" className="text-blue-100 hover:text-white transition-colors">
                      +52 55 1234 5678
                    </a>
                    <p className="text-sm text-blue-200">Lunes a viernes, 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-ulinea-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Email</h4>
                    <a
                      href="mailto:admisiones@ulinea.edu.mx"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      admisiones@ulinea.edu.mx
                    </a>
                    <p className="text-sm text-blue-200">Respuesta en 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-ulinea-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Oficinas</h4>
                    <p className="text-blue-100">Ciudad de México, México</p>
                    <p className="text-sm text-blue-200">Modalidad 100% en línea</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-ulinea-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Horarios de atención</h4>
                    <p className="text-blue-100">Lun - Vie: 9:00 - 18:00</p>
                    <p className="text-blue-100">Sáb: 9:00 - 14:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="border-0 shadow-2xl bg-blue-900/90 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">Preguntas frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#faq" className="block text-blue-100 hover:text-white transition-colors">
                    → ¿Cómo funcionan las clases online?
                  </a>
                  <a href="#faq" className="block text-blue-100 hover:text-white transition-colors">
                    → ¿Los títulos tienen validez oficial?
                  </a>
                  <a href="#faq" className="block text-blue-100 hover:text-white transition-colors">
                    → ¿Ofrecen becas o financiamiento?
                  </a>
                  <a href="#faq" className="block text-blue-100 hover:text-white transition-colors">
                    → Ver todas las preguntas frecuentes
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
