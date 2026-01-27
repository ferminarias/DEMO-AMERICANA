"use client"
import { CheckCircle, ArrowLeft, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ulinea-blue via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Main Message */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¡Gracias por tu interés en ULINEA!</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Hemos recibido tu solicitud de información correctamente. Nuestro equipo de asesores académicos se
                pondrá en contacto contigo dentro de las próximas <strong>24 horas</strong> para brindarte información
                personalizada sobre nuestros programas.
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-ulinea-blue mb-4">¿Qué sigue ahora?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-ulinea-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Te llamaremos</p>
                    <p className="text-gray-600">En las próximas 24 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-ulinea-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Información detallada</p>
                    <p className="text-gray-600">Por email y WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-ulinea-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Sesión informativa</p>
                    <p className="text-gray-600">Opcional y personalizada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-ulinea-blue hover:bg-blue-700">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-ulinea-blue text-ulinea-blue hover:bg-ulinea-blue hover:text-white bg-transparent"
              >
                <Link href="/#programas">Ver programas</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">¿Necesitas ayuda inmediata?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a href="tel:+525512345678" className="text-ulinea-blue hover:underline">
                  📞 +52 55 1234 5678
                </a>
                <a href="mailto:admisiones@ulinea.edu.mx" className="text-ulinea-blue hover:underline">
                  ✉️ admisiones@ulinea.edu.mx
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
