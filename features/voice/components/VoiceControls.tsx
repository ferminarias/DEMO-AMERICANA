"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Mic, MicOff, MessageSquare, Volume2 } from "lucide-react"

export function VoiceControls({
  voiceStatus,
  isMuted,
  toggleMute,
  stopVoiceCall,
  startVoiceCall,
  openWhatsApp,
  goToForm,
  hasElevenLabsConfig,
}: {
  voiceStatus: "idle" | "asking-mic" | "getting-token" | "connecting" | "connected" | "error"
  isMuted: boolean
  toggleMute: () => void
  stopVoiceCall: () => void
  startVoiceCall: () => void
  openWhatsApp: () => void
  goToForm: () => void
  hasElevenLabsConfig: boolean
}) {
  const isCallInProgress = voiceStatus === "connected"
  const isBusy = voiceStatus === "asking-mic" || voiceStatus === "getting-token" || voiceStatus === "connecting"
  const callDisabled = (!hasElevenLabsConfig && !isCallInProgress) || isBusy
  const callLabel = isCallInProgress
    ? "Terminar"
    : voiceStatus === "connecting"
      ? "Conectando..."
      : voiceStatus === "getting-token"
        ? "Obteniendo token..."
        : voiceStatus === "asking-mic"
          ? "Permitir micrófono"
          : "Iniciar llamada"
  const callTitle = !hasElevenLabsConfig && !isCallInProgress
    ? "El asistente de voz estará disponible pronto. Usa el chat, WhatsApp o el formulario."
    : undefined

  return (
    <div className="border-t bg-gray-50 flex-shrink-0 max-h-[55vh] overflow-y-auto">
      <div className="p-3 md:p-4 space-y-3">
        <Card className="border-black/10" style={{ backgroundColor: 'var(--unab-primary-light)' }}>
          <CardContent className="p-4">
            {/* Layout responsivo: horizontal en desktop, columna en móvil */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex items-center space-x-2" style={{ color: 'rgb(181, 123, 27)' }}>
                {voiceStatus === "connected"
                  ? (isMuted ? <MicOff className="h-5 w-5" strokeWidth={2.5} /> : <Mic className="h-5 w-5" strokeWidth={2.5} />)
                  : <Volume2 className="h-5 w-5" strokeWidth={2.5} />}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base">Conversación por voz</p>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--unab-primary-hover)' }}>Habla directamente con el asistente IA</p>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0 self-center sm:self-auto">
                {voiceStatus === "connected" && (
                  <button
                    onClick={toggleMute}
                    aria-pressed={isMuted}
                    aria-label={isMuted ? "Activar micrófono" : "Silenciar micrófono"}
                    className="h-9 px-3 rounded-md border border-black/10 bg-white/60 hover:bg-white focus:outline-none focus-visible:ring-2 whitespace-nowrap text-xs sm:text-sm"
                    style={{ color: 'var(--unab-primary-hover)', borderColor: 'var(--unab-primary-border)' }}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" strokeWidth={2.5} /> : <Mic className="h-4 w-4" strokeWidth={2.5} />}
                  </button>
                )}
                <button
                  onClick={voiceStatus === "connected" ? stopVoiceCall : startVoiceCall}
                  disabled={callDisabled}
                  aria-label={voiceStatus === "connected" ? "Terminar llamada" : "Iniciar llamada"}
                  title={callTitle}
                  className={`h-9 px-3 sm:px-4 rounded-md text-white font-semibold shadow-sm whitespace-nowrap text-xs sm:text-sm ${voiceStatus === "connected" ? "bg-red-600 hover:bg-red-700" : ""} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed border border-black/10`}
                  style={voiceStatus !== "connected" ? { backgroundColor: 'var(--unab-primary)' } : undefined}
                  onMouseEnter={(e) => { if (voiceStatus !== "connected") e.currentTarget.style.backgroundColor = 'var(--unab-primary-hover)' }}
                  onMouseLeave={(e) => { if (voiceStatus !== "connected") e.currentTarget.style.backgroundColor = 'var(--unab-primary)' }}
                >
                  <span className="inline-flex items-center">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" strokeWidth={2.5} />
                    <span className="hidden xs:inline">{callLabel}</span>
                    <span className="xs:hidden">{isCallInProgress ? "Terminar" : "Llamar"}</span>
                  </span>
                </button>
              </div>
            </div>
            {!hasElevenLabsConfig && !isCallInProgress && (
              <p className="mt-3 text-xs bg-white/70 border border-black/10 rounded-md px-3 py-2" style={{ color: 'rgb(181, 123, 27)' }}>
                El asistente de voz estará disponible en breve. Mientras tanto puedes usar el chat de texto, WhatsApp o el formulario de contacto.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

