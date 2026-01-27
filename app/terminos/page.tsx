import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones | ULINEA University",
  description: "Términos y condiciones de uso de ULINEA University",
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Términos y Condiciones</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-600 leading-relaxed">
                Al acceder y utilizar los servicios de ULINEA University, usted acepta estar sujeto a estos términos y
                condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros
                servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University es una plataforma educativa que ofrece cursos, programas de formación y servicios de
                consultoría en diversas áreas del conocimiento. Nuestros servicios incluyen contenido educativo,
                herramientas de aprendizaje y asistencia personalizada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Registro y Cuenta de Usuario</h2>
              <p className="text-gray-600 leading-relaxed">
                Para acceder a ciertos servicios, es posible que deba crear una cuenta. Usted es responsable de mantener
                la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Uso Aceptable</h2>
              <p className="text-gray-600 leading-relaxed">
                Usted se compromete a utilizar nuestros servicios únicamente para fines legítimos y de acuerdo con estos
                términos. No debe utilizar nuestros servicios para actividades ilegales, dañinas o que violen los
                derechos de terceros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Propiedad Intelectual</h2>
              <p className="text-gray-600 leading-relaxed">
                Todo el contenido disponible en ULINEA University, incluyendo textos, gráficos, logos, imágenes y
                software, está protegido por derechos de autor y otras leyes de propiedad intelectual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University no será responsable por daños directos, indirectos, incidentales, especiales o
                consecuentes que resulten del uso o la imposibilidad de usar nuestros servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Modificaciones</h2>
              <p className="text-gray-600 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán
                en vigor inmediatamente después de su publicación en nuestro sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de nuestro formulario
                de contacto o enviando un correo electrónico a info@ulinea.com.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
