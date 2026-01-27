import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies | ULINEA University",
  description: "Información sobre el uso de cookies en ULINEA University",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Política de Cookies</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Qué son las Cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro
                sitio web. Nos ayudan a mejorar su experiencia de navegación y a proporcionar servicios personalizados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tipos de Cookies que Utilizamos</h2>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Cookies Esenciales</h3>
                <p className="text-gray-600 leading-relaxed">
                  Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.
                  Incluyen cookies de sesión y de seguridad.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Cookies de Rendimiento</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionando
                  información sobre las páginas visitadas y los errores encontrados.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Cookies de Funcionalidad</h3>
                <p className="text-gray-600 leading-relaxed">
                  Permiten que el sitio web recuerde las elecciones que hace (como su idioma preferido) y proporcione
                  características mejoradas y personalizadas.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Puede controlar y gestionar las cookies de varias maneras. Tenga en cuenta que eliminar o bloquear
                cookies puede afectar su experiencia de usuario y es posible que partes del sitio web no funcionen
                completamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Configuración del Navegador</h2>
              <p className="text-gray-600 leading-relaxed">
                La mayoría de los navegadores web le permiten controlar las cookies a través de su configuración. Puede
                configurar su navegador para rechazar cookies o para alertarle cuando se envíen cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies de Terceros</h2>
              <p className="text-gray-600 leading-relaxed">
                Algunos de nuestros socios pueden establecer cookies en su dispositivo cuando visita nuestro sitio.
                Estas cookies están sujetas a las políticas de privacidad respectivas de estos terceros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Actualizaciones de esta Política</h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos actualizar esta política de cookies ocasionalmente. Le recomendamos que revise esta página
                periódicamente para mantenerse informado sobre cómo utilizamos las cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Si tiene preguntas sobre nuestra política de cookies, puede contactarnos en info@ulinea.com.
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
