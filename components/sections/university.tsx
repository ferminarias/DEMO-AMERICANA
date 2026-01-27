"use client"
import { AnimateOnScroll } from "@/components/ui/scroll-animate"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Simple icon components
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
)

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const values = [
  {
    id: "excelencia",
    title: "Excelencia Académica",
    description: "Comprometidos con los más altos estándares educativos y la mejora continua.",
    icon: Award,
  },
  {
    id: "innovacion",
    title: "Innovación",
    description: "Utilizamos tecnología de vanguardia para crear experiencias de aprendizaje únicas.",
    icon: Target,
  },
  {
    id: "inclusion",
    title: "Inclusión",
    description: "Educación accesible para todos, sin barreras geográficas ni socioeconómicas.",
    icon: Heart,
  },
  {
    id: "global",
    title: "Visión Global",
    description: "Formamos profesionales con perspectiva internacional y competencias globales.",
    icon: Globe,
  },
]

const achievements = [
  "Reconocimiento SEP como institución de educación superior",
  "Más de 15,000 graduados exitosos en toda Latinoamérica",
  "Alianzas estratégicas con universidades europeas",
  "Certificación ISO 9001 en procesos educativos",
  "95% de empleabilidad de nuestros graduados",
  "Presencia en más de 50 países",
]

export function UniversitySection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="universidad" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-ulinea-blue text-white mb-4 px-4 py-2">Conoce ULINEA</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transformando la educación superior</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos una universidad innovadora que combina la flexibilidad del aprendizaje en línea con la calidad
            académica tradicional, formando profesionales preparados para los desafíos del siglo XXI.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Fundada con la visión de democratizar la educación superior, ULINEA nació para romper las barreras
                tradicionales del aprendizaje. Desde nuestros inicios, hemos estado comprometidos con ofrecer programas
                académicos de excelencia que se adapten a las necesidades de profesionales en activo.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hoy somos una institución reconocida que ha graduado a miles de profesionales exitosos, manteniendo
                siempre nuestro compromiso con la innovación educativa y la calidad académica.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Formar profesionales competentes y éticos a través de programas educativos innovadores, flexibles y de
                calidad, que contribuyan al desarrollo personal, profesional y social de nuestros estudiantes y de la
                sociedad en general.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser la universidad en línea líder en Latinoamérica, reconocida por la excelencia académica, la
                innovación tecnológica y el impacto positivo de nuestros graduados en el mundo profesional.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/modern-university-campus-with-students-and-tech.jpg"
                alt="Campus universitario moderno con estudiantes y tecnología"
                fill
                className="object-cover object-center"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-6 border">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-ulinea-blue">15k+</div>
                  <div className="text-sm text-gray-600">Graduados</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-ulinea-blue">50+</div>
                  <div className="text-sm text-gray-600">Países</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-ulinea-blue">95%</div>
                  <div className="text-sm text-gray-600">Empleabilidad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <AnimateOnScroll className="text-center mb-12" animation="fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en nuestra institución
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <AnimateOnScroll key={value.id} animation="fade-up">
              <Card className="text-center hover:shadow-lg transition-shadow border border-gray-200 shadow-md bg-white">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-ulinea-blue rounded-full flex items-center justify-center mb-4 shadow">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 leading-relaxed">{value.description}</CardDescription>
                </CardContent>
              </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Nuestros Logros</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reconocimientos y resultados que avalan nuestra trayectoria educativa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">{achievement}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 shadow-lg"
              onClick={scrollToContact}
            >
              Conoce más sobre nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
