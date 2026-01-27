import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aviso Legal | ULINEA University",
  description: "Aviso legal e información corporativa de ULINEA University",
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Aviso Legal</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información General</h2>
              <p className="text-gray-600 leading-relaxed">
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico, le informamos de los siguientes datos:
              </p>

              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Denominación social:</strong> ULINEA University
                </p>
                <p className="text-gray-700">
                  <strong>Correo electrónico:</strong> info@ulinea.com
                </p>
                <p className="text-gray-700">
                  <strong>Sitio web:</strong> www.ulinea.com
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Objeto</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University tiene por objeto la prestación de servicios educativos, formación profesional,
                consultoría y desarrollo de programas de capacitación en diversas áreas del conocimiento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Condiciones de Uso</h2>
              <p className="text-gray-600 leading-relaxed">
                El acceso y uso de este sitio web implica la aceptación de las presentes condiciones generales de uso.
                Si no está de acuerdo con estas condiciones, no debe utilizar este sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Propiedad Intelectual e Industrial</h2>
              <p className="text-gray-600 leading-relaxed">
                Todos los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos,
                tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad
                pertenece a ULINEA University.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exclusión de Garantías y Responsabilidad</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier
                naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del
                portal o la transmisión de virus o programas maliciosos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modificaciones</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University se reserva el derecho de efectuar sin previo aviso las modificaciones que considere
                oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se
                presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enlaces</h2>
              <p className="text-gray-600 leading-relaxed">
                En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet,
                ULINEA University no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Derecho de Exclusión</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios
                ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que
                incumplan las presentes Condiciones Generales de Uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generalidades</h2>
              <p className="text-gray-600 leading-relaxed">
                ULINEA University perseguirá el incumplimiento de las presentes condiciones así como cualquier
                utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan
                corresponder en derecho.
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
