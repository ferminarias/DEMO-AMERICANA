"use client"
// import Link from "next/link"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const footerLinks = {
  programs: [
    { name: "Licenciaturas", href: "#programas" },
    { name: "Maestrías", href: "#programas" },
    { name: "Maestros Europeos", href: "#programas" },
    { name: "Educación Continua", href: "#programas" },
  ],
  university: [
    { name: "Acerca de ULINEA", href: "#universidad" },
    { name: "Metodología", href: "#beneficios" },
    { name: "Profesores", href: "#testimonios" },
    { name: "Acreditaciones", href: "#beneficios" },
  ],
  support: [
    { name: "Preguntas Frecuentes", href: "#faq" },
    { name: "Soporte Técnico", href: "#contacto" },
    { name: "Biblioteca Digital", href: "#contacto" },
    { name: "Campus Virtual", href: "#contacto" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "/terminos" },
    { name: "Política de Privacidad", href: "/privacidad" },
    { name: "Política de Cookies", href: "/cookies" },
    { name: "Aviso Legal", href: "/aviso-legal" },
  ],
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13 3h5a1 1 0 0 1 1 1v4h-4a1 1 0 0 0-1 1v3h4l-1 4h-3v8h-4v-8H8v-4h2V9a6 6 0 0 1 6-6Z" />
  </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.5 4h3.4l4.1 5.3L16.1 4H19.5l-6 7.7L20 20h-3.4l-4.2-5.4L8 20H4.5l6.4-8.3Z" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 5.6a1.8 1.8 0 1 0-1.8-1.8 1.8 1.8 0 0 0 1.8 1.8Zm5.05-7.55a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5ZM4.5 8.5H2v12h2.5Zm5 0H7.5V20H10v-6c0-2.3 2.9-2.5 2.9 0V20H15v-6.6c0-4.3-4.4-4.1-5.5-2Zm6 11.5V20Z" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.8 8.1a2.6 2.6 0 0 0-1.8-1.8C18 6 12 6 12 6s-6 0-8 .3a2.6 2.6 0 0 0-1.8 1.8A26.5 26.5 0 0 0 2 12a26.5 26.5 0 0 0 .2 3.9 2.6 2.6 0 0 0 1.8 1.8c2 .3 8 .3 8 .3s6 0 8-.3a2.6 2.6 0 0 0 1.8-1.8A26.5 26.5 0 0 0 22 12a26.5 26.5 0 0 0-.2-3.9ZM10 14.7V9.3l4.7 2.7Z" />
  </svg>
)

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!email) {
      alert("Por favor ingresa tu correo electrónico")
      return
    }

    setIsSubscribing(true)

    // Simulate API call
    setTimeout(() => {
      alert("¡Te has suscrito exitosamente! Recibirás noticias sobre programas y becas")
      setEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Mantente informado</h3>
            <p className="text-gray-300 mb-8">
              Recibe noticias sobre nuevos programas, becas y eventos académicos directamente en tu email
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e: { target: { value: string } }) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <button
                disabled={isSubscribing}
                className="px-6 py-2 rounded bg-ulinea-orange hover:bg-ulinea-orange/90 text-white"
              >
                {isSubscribing ? "Suscribiendo..." : "Suscribirme"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl font-bold text-white">ULINEA</div>
              <div className="text-sm text-gray-400">UNIVERSIDAD</div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Formación flexible, práctica y global. Transformamos profesionales con educación de calidad 100% en línea,
              conectando talento con oportunidades en todo el mundo.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="inline-block w-5 h-5 rounded-full bg-ulinea-orange" />
                <a href="tel:+525512345678" className="text-gray-300 hover:text-white transition-colors">
                  +52 55 1234 5678
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-block w-5 h-5 rounded-full bg-ulinea-orange" />
                <a href="mailto:admisiones@ulinea.edu.mx" className="text-gray-300 hover:text-white transition-colors">
                  admisiones@ulinea.edu.mx
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-block w-5 h-5 rounded-full bg-ulinea-orange" />
                <span className="text-gray-300">Ciudad de México, México</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com/ulinea.universidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook - ULINEA Universidad"
                className="w-10 h-10 bg-gray-800 hover:bg-ulinea-blue rounded-full flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/ulinea_universidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X (Twitter) - ULINEA Universidad"
                className="w-10 h-10 bg-gray-800 hover:bg-ulinea-blue rounded-full flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/ulinea.universidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram - ULINEA Universidad"
                className="w-10 h-10 bg-gray-800 hover:bg-ulinea-blue rounded-full flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/school/ulinea-universidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en LinkedIn - ULINEA Universidad"
                className="w-10 h-10 bg-gray-800 hover:bg-ulinea-blue rounded-full flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@ulinea_universidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en YouTube - ULINEA Universidad"
                className="w-10 h-10 bg-gray-800 hover:bg-ulinea-blue rounded-full flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-white mb-4">Programas</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-ulinea-orange transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* University */}
          <div>
            <h4 className="font-semibold text-white mb-4">Universidad</h4>
            <ul className="space-y-3">
              {footerLinks.university.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-ulinea-orange transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Soporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-ulinea-orange transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-ulinea-orange transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2025 Universidad ULINEA. Todos los derechos reservados.</div>
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/admin/login"
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors opacity-50 hover:opacity-100"
                title="Admin"
              >
                •
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
