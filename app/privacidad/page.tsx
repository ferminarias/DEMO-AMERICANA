import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | ULINEA University",
  description: "Política de privacidad y protección de datos de ULINEA University",
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Política de Privacidad</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-600 leading-relaxed">
                En ULINEA University recopilamos información personal que usted nos proporciona voluntariamente, como
                nombre, correo electrónico, número de teléfono y otra información de contacto cuando se registra en
                nuestros servicios o se comunica con nosotros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Cómo Utilizamos su Información</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios educativos,
                comunicarnos con usted, personalizar su experiencia de aprendizaje y cumplir con nuestras obligaciones
                legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Compartir Información</h2>
              <p className="text-gray-600 leading-relaxed">
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea
                necesario para proporcionar nuestros servicios, cumplir con la ley o proteger nuestros derechos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Seguridad de los Datos</h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información
                personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-800 mb-4">5. Sus Derechos</h2>
              <p className="text-gray-600 leading-relaxed">
                Usted tiene derecho a acceder, rectificar, eliminar o limitar el procesamiento de sus datos personales.
                También puede oponerse al procesamiento y solicitar la portabilidad de sus datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, analizar el
                tráfico y personalizar el contenido. Puede gestionar sus preferencias de cookies en la configuración de
                su navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Retención de Datos</h2>
              <p className="text-gray-600 leading-relaxed">
                Conservamos su información personal durante el tiempo necesario para cumplir con los fines para los que
                fue recopilada y para cumplir con nuestras obligaciones legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, puede contactarnos en
                info@ulinea.com o a través de nuestro formulario de contacto.
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
