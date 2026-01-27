"use client"

import * as React from "react"
import { ClientVoiceWidget } from "@/components/client-voice-widget"

export default function VoiceEmbedPage() {
  // Detectar si está siendo usado en iframe
  const [isInIframe, setIsInIframe] = React.useState(false)
  const [isAuthorized, setIsAuthorized] = React.useState(true)

  React.useEffect(() => {
    setIsInIframe(window.self !== window.top)
    
    // Validar origen cuando se usa en iframe
    if (window.self !== window.top) {
      try {
        const parentOrigin = document.referrer
        const allowedDomains = [
          'localhost',
          '127.0.0.1',
          'unab.dominiodepruebas.online',
          'agente-unab-demo',
          'vercel.app',
          'bot.dominiodepruebas.online',
          'bot.ddev.site',
          'wordpress.com',
          'wordpress.org',
          'unab.edu.co',
          'www.unab.edu.co',
          'agente-unab-demo.vercel.app'

        ]
        
        const isAllowed = allowedDomains.some(domain => 
          parentOrigin.includes(domain) || 
          parentOrigin.includes('localhost') || 
          parentOrigin.includes('127.0.0.1')
        )
        
        if (!isAllowed && parentOrigin) {
          setIsAuthorized(false)
          console.warn('[SECURITY] Widget usado desde dominio no autorizado:', parentOrigin)
        }
      } catch (error) {
        // Si no podemos verificar el origen, permitimos por compatibilidad
        console.log('[SECURITY] No se pudo verificar origen:', error)
      }
    }
  }, [])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, rgba(221, 163, 67, 0.1), rgba(221, 163, 67, 0.2))' }}>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center border-2 border-black/10">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(221, 163, 67)' }}>
            Acceso No Autorizado
          </h2>
          <p className="text-gray-600 mb-4">
            Este widget solo puede usarse en sitios autorizados.
          </p>
          <p className="text-sm text-gray-500">
            Contacta con UNAB para obtener acceso.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isInIframe ? 'min-h-[500px] h-screen' : 'min-h-screen'} bg-transparent overflow-hidden`}>
      <ClientVoiceWidget className={isInIframe ? "iframe-optimized" : ""} variant="embed" />
      
      {/* Estilos específicos para iframe */}
      {isInIframe && (
        <style jsx global>{`
          body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          
          html, body {
            height: 100%;
          }

          .iframe-optimized {
            position: static !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            max-width: 100% !important;
          }

          .iframe-optimized > div {
            height: 100%;
          }
        `}</style>
      )}
    </div>
  )
}
