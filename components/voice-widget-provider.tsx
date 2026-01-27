"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ClientVoiceWidget } from "@/components/client-voice-widget"

export function VoiceWidgetProvider() {
  const pathname = usePathname()
  // Ocultar el widget dentro de la ruta de embed para evitar duplicados en el iframe
  if (pathname?.startsWith("/voice/embed")) {
    return null
  }
  return <ClientVoiceWidget />
}


