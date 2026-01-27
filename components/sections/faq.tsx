"use client"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-ulinea-blue text-white mb-4">Preguntas frecuentes</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resolvemos tus dudas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros programas y metodología
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="border border-gray-200 rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-ulinea-blue">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pt-2">{item.answer}</AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">¿No encontraste la respuesta que buscabas?</h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de asesores está disponible para resolver todas tus dudas personalmente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3 bg-ulinea-orange hover:bg-ulinea-orange/90 text-white font-semibold rounded-lg transition-colors"
              >
                Contactar asesor
              </a>
              <a
                href="tel:+525512345678"
                className="inline-flex items-center justify-center px-6 py-3 border border-ulinea-blue text-ulinea-blue hover:bg-ulinea-blue hover:text-white font-semibold rounded-lg transition-colors"
              >
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
