"use client"

import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { RotateCcw } from "lucide-react"

interface VoiceHeaderProps {
  getStatusColor: () => string
  getStatusText: () => string
  variant?: "sheet" | "embed"
  onClearHistory?: () => void
  showClearButton?: boolean
}

export function VoiceHeader({ getStatusColor, getStatusText, variant = "sheet", onClearHistory, showClearButton = false }: VoiceHeaderProps) {
  const baseContent = (
    <div className="flex items-center justify-between gap-2 font-sans">
      <div className="flex-1 min-w-0">
        <p className="text-base md:text-lg font-semibold text-white">Asistente Americana</p>
        <p className="text-white/90 text-xs md:text-sm">Elige como quieres comunicarte</p>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {showClearButton && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            title="Nueva conversación"
            aria-label="Limpiar historial y empezar nueva conversación"
          >
            <RotateCcw className="h-4 w-4 text-white" />
          </button>
        )}
        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
        <span className="text-xs md:text-sm text-white whitespace-nowrap">{getStatusText()}</span>
      </div>
    </div>
  )

  if (variant === "embed") {
    return <div className="p-4 border-b border-black/10 text-white flex-shrink-0" style={{ background: 'linear-gradient(to right, var(--unab-primary), var(--unab-primary-hover))' }}>{baseContent}</div>
  }

  return (
    < className="p-4 border-b border-black/10 text-white flex-shrink-0 font-sans" style={{ background: 'linear-gradient(to right, var(--unab-primary), var(--unab-primary-hover))' }}>SheetHeader
      <div className="flex items-center justify-between">
        <div>
          <SheetTitle className="text-base md:text-lg text-white font-sans">Asistente Americana</SheetTitle>
          <SheetDescription className="text-white/90 text-xs md:text-sm font-sans">Elige como quieres comunicarte</SheetDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
          <span className="text-xs md:text-sm">{getStatusText()}</span>
        </div>
      </div>
    </SheetHeader>
  )
}
