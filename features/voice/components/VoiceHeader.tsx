"use client"

import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { RotateCcw, Mic, User } from "lucide-react"

interface VoiceHeaderProps {
  getStatusColor: () => string
  getStatusText: () => string
  variant?: "sheet" | "embed"
  onClearHistory?: () => void
  showClearButton?: boolean
  voiceStatus?: "idle" | "asking-mic" | "creating-call" | "connecting" | "connected" | "error"
  isAgentTalking?: boolean
}

export function VoiceHeader({ getStatusColor, getStatusText, variant = "sheet", onClearHistory, showClearButton = false, voiceStatus = "idle", isAgentTalking = false }: VoiceHeaderProps) {
  const baseContent = (
    <div className="flex items-center justify-between gap-2 font-sans">
      <div className="flex-1 min-w-0">
        <p className="text-base md:text-lg font-semibold text-white">Asistente Americana</p>
        <div className="flex items-center gap-2">
          <p className="text-white/90 text-xs md:text-sm">
            {voiceStatus === "connected" ? "En conversación" : "Elige como quieres comunicarte"}
          </p>
          {/* Indicador sutil de quién está hablando */}
          {voiceStatus === "connected" && (
            <span className="flex items-center gap-1 text-white/80 text-xs italic">
              {isAgentTalking ? (
                <>
                  <Mic className="h-3 w-3 animate-pulse" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Asesor hablando</span>
                </>
              ) : (
                <>
                  <User className="h-3 w-3" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Tu turno</span>
                </>
              )}
            </span>
          )}
        </div>
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
    <SheetHeader className="p-4 border-b border-black/10 text-white flex-shrink-0 font-sans" style={{ background: 'linear-gradient(to right, var(--unab-primary), var(--unab-primary-hover))' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <SheetTitle className="text-base md:text-lg text-white font-sans">Asistente Americana</SheetTitle>
          <div className="flex items-center gap-2">
            <SheetDescription className="text-white/90 text-xs md:text-sm font-sans">
              {voiceStatus === "connected" ? "En conversación" : "Elige como quieres comunicarte"}
            </SheetDescription>
            {/* Indicador sutil de quién está hablando */}
            {voiceStatus === "connected" && (
              <span className="flex items-center gap-1 text-white/80 text-xs italic font-sans">
                {isAgentTalking ? (
                  <>
                    <Mic className="h-3 w-3 animate-pulse" strokeWidth={2.5} />
                    <span className="hidden sm:inline">Asesor hablando</span>
                  </>
                ) : (
                  <>
                    <User className="h-3 w-3" strokeWidth={2.5} />
                    <span className="hidden sm:inline">Tu turno</span>
                  </>
                )}
              </span>
            )}
          </div>
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
    </SheetHeader>
  )
}
