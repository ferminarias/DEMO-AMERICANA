"use client"

import * as React from "react"
import { toast } from "@/hooks/use-toast"
import { VoiceHeader } from "@/features/voice/components/VoiceHeader"
import { VoiceMessages } from "@/features/voice/components/VoiceMessages"
import { VoiceControls } from "@/features/voice/components/VoiceControls"
import { VoiceFab } from "@/features/voice/components/VoiceFab"
import { CONTACT } from "@/lib/constants"
import { sendMessageToBackend } from "@/lib/services/chat"
import type { VoiceMessage } from "@/lib/voice/types"

// Custom hooks
import { useMediaStream } from "@/features/voice/hooks/useMediaStream"
import { useVoiceMessages } from "@/features/voice/hooks/useVoiceMessages"
import { useRetellSession } from "@/features/voice/hooks/useRetellSession"

interface VoiceWidgetProps {
  className?: string
  variant?: "default" | "embed"
}

export const VoiceWidget = ({ className, variant = "default" }: VoiceWidgetProps) => {
  const isEmbedMode = variant === "embed"
  const [isOpen, setIsOpen] = React.useState(isEmbedMode)

  // State para chat de texto (modo alternativo)
  const [textMessages, setTextMessages] = React.useState<VoiceMessage[]>([])
  const [inputMessage, setInputMessage] = React.useState("")
  const [isTextChatActive, setIsTextChatActive] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const [textInput, setTextInput] = React.useState("")
  const [currentTranscription, setCurrentTranscription] = React.useState("")
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false)
  const SHOW_TRANSCRIPTION_BAR = false

  // Custom hooks
  const { requestMicrophone, stopMicrophone, toggleMute: muteAudio, mediaStreamRef } = useMediaStream()
  const { messages, syncWithTranscript, updatePendingTranscript, addMessage, clearMessages } = useVoiceMessages()
  const { 
    voiceStatus, 
    setVoiceStatus,
    hasRetellConfig, 
    isMuted, 
    createWebCall, 
    startSession,
    stopSession, 
    toggleMute 
  } = useRetellSession({
    onTranscriptUpdate: syncWithTranscript,
    onAgentStoppedTalking: updatePendingTranscript,
    onCallEnded: () => {
      const lastMessage = messages[messages.length - 1]
      if (!lastMessage?.text.includes("Gracias por conversar")) {
        addMessage({
          text: "¡Gracias por tu tiempo! Si necesitas algo más, no dudes en iniciar una nueva conversación o contactarnos por WhatsApp. 😊",
          timestamp: Date.now(),
          type: "assistant",
        })
      }
    },
    onError: (error) => {
      stopMicrophone()
      addMessage({
        text: "Error de conexión. La llamada se terminó. Puedes volver a intentar o usar WhatsApp.",
        timestamp: Date.now(),
        type: "assistant",
      })
    },
  })

  // Detectar apertura del teclado en móviles para adaptar el layout
  React.useEffect(() => {
    if (typeof window === "undefined" || !(window as any).visualViewport) return
    const viewport = (window as any).visualViewport as VisualViewport

    const handler = () => {
      const heightRatio = viewport.height / window.innerHeight
      setIsKeyboardOpen(heightRatio < 0.8)
    }

    handler()
    viewport.addEventListener("resize", handler)
    viewport.addEventListener("scroll", handler)
    return () => {
      viewport.removeEventListener("resize", handler)
      viewport.removeEventListener("scroll", handler)
    }
  }, [])

  // Iniciar llamada de voz
  const startVoiceCall = async () => {
    if (!hasRetellConfig) {
      toast({
        title: "Asistente de voz no disponible",
        description: "Usa el chat de texto, WhatsApp o el formulario de contacto mientras terminamos la configuración.",
      })
      return
    }

    try {
      clearMessages()
      setVoiceStatus("asking-mic")
      console.log("[VoiceWidget] Starting voice call...")

      // Solicitar acceso al micrófono
      try {
        await requestMicrophone()
      } catch (micError) {
        console.error("[VoiceWidget] Microphone access denied:", micError)
        setVoiceStatus("error")
        addMessage({
          text: "Necesito acceso al micrófono para poder conversar contigo. Por favor, permite el acceso y vuelve a intentar.",
          timestamp: Date.now(),
          type: "assistant",
        })
        return
      }

      // Crear llamada web
      const callData = await createWebCall()

      if (!callData.callCreated || !callData.access_token) {
        throw new Error("No access token available")
      }

      // Iniciar sesión con Retell
      await startSession(callData.access_token)

    } catch (error) {
      console.error("[VoiceWidget] Voice call error:", error)
      setVoiceStatus("error")
      stopMicrophone()
      addMessage({
        text: "Lo siento, no pude establecer la conexión de voz. Por favor, intenta usar WhatsApp o el formulario de contacto.",
        timestamp: Date.now(),
        type: "assistant",
      })
    }
  }

  // Detener llamada de voz
  const stopVoiceCall = () => {
    console.log("[VoiceWidget] Stopping voice call...")
    stopSession()
    stopMicrophone()
    
    // Agregar mensaje de despedida
    addMessage({
      text: "¡Gracias por conversar conmigo! Si necesitas más información, puedes iniciar una nueva llamada o contactarnos por WhatsApp. 😊",
      timestamp: Date.now(),
      type: "assistant",
    })
    
    toast({
      title: "✓ Llamada finalizada",
      description: "Espero haber sido de ayuda. ¡Hasta pronto!",
      duration: 4000,
    })
  }

  // Toggle mute con integración de ambos hooks
  const handleToggleMute = () => {
    toggleMute()
    muteAudio(isMuted)
  }

  // Función auxiliar para enviar mensajes al backend
  const sendMessage = (text: string) =>
    sendMessageToBackend({ message: text, source: "website-widget" })

  // Manejar envío de input de texto durante llamada
  const handleTextInputSubmit = async () => {
    if (!textInput.trim()) return

    const messageText = textInput.trim()
    console.log("[VoiceWidget] Sending text input:", messageText)
    
    addMessage({
      text: messageText,
      timestamp: Date.now(),
      type: "user",
    })
    
    setTextInput("")
    setCurrentTranscription("")

    try {
      const response = await sendMessage(messageText)
      addMessage({
        text: response,
        timestamp: Date.now(),
        type: "assistant",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      addMessage({
        text: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
        timestamp: Date.now(),
        type: "assistant",
      })
    }
  }

  // Limpiar historial
  const clearHistory = () => {
    clearMessages()
    setTextMessages([])
    setCurrentTranscription("")
    toast({
      title: "Historial limpiado",
      description: "¡Listo para una nueva conversación!",
      duration: 1000,
    })
  }

  // Abrir WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent(CONTACT.whatsappDefaultMessage)
    const whatsappUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
    if (!isEmbedMode) {
      setIsOpen(false)
    }
  }

  // Manejar cierre del widget
  const handleWidgetClose = () => {
    try {
      if (voiceStatus === "connected") {
        stopVoiceCall()
      }
      setIsTextChatActive(false)
    } catch (e) {
      console.error("[VoiceWidget] Error cleaning up on close:", e)
    }
  }

  // Funciones de status
  const getStatusColor = () => {
    if (voiceStatus === "connected") return "bg-green-500"
    if (voiceStatus === "connecting" || voiceStatus === "creating-call") return "bg-yellow-500"
    if (voiceStatus === "error") return "bg-red-500"
    return "bg-gray-500"
  }

  const getStatusText = () => {
    switch (voiceStatus) {
      case "connected":
        return "Conversación activa"
      case "connecting":
        return "Conectando con Retell AI..."
      case "creating-call":
        return "Creando llamada..."
      case "asking-mic":
        return "Solicitando permisos..."
      case "error":
        return "Error de conexión"
      default:
        return hasRetellConfig ? "Listo para conversar" : "Configuración pendiente"
    }
  }

  // Contenido del chat
  const chatContent = (
    <div className="flex flex-col h-full bg-white overflow-auto">
      <VoiceHeader
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        variant={isEmbedMode ? "embed" : "sheet"}
        onClearHistory={clearHistory}
        showClearButton={messages.length > 0 && voiceStatus === "idle"}
      />

      <div className="flex-1 relative overflow-y-auto">
        <VoiceMessages messages={isTextChatActive ? textMessages : messages} isTyping={isTyping} />
      </div>

      {/* Input de teclado para conversación durante llamada */}
      {voiceStatus === "connected" && (
        <div className="border-t bg-white p-2.5 md:p-3 flex-shrink-0 sticky bottom-0 z-20 font-sans">
          {SHOW_TRANSCRIPTION_BAR && currentTranscription && currentTranscription !== "Escribe tu mensaje aquí..." && (
            <div className="mb-2 md:mb-3 sticky top-0 z-10">
              <div className="flex items-center gap-2 border border-black/10 rounded-md px-2 py-1.5 shadow-sm font-sans" style={{ backgroundColor: 'rgba(0, 102, 204, 0.1)' }}>
                <span className="text-[11px] md:text-xs font-semibold whitespace-nowrap font-sans" style={{ color: 'rgb(0, 82, 163)' }}>Transcripción en vivo:</span>
                <div className="flex-1 min-h-[20px] max-h-[72px] md:max-h-[96px] overflow-y-auto pr-1">
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-snug font-sans" style={{ color: 'rgb(0, 72, 143)' }}>
                    {currentTranscription}
                  </p>
                </div>
                <button
                  onClick={() => {
                    try { navigator.clipboard.writeText(currentTranscription) } catch {}
                  }}
                  className="text-xs md:text-sm font-medium px-1 hover:underline whitespace-nowrap font-sans"
                  style={{ color: 'rgb(0, 82, 163)' }}
                  aria-label="Copiar transcripción"
                >
                  Copiar
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleTextInputSubmit()
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none text-gray-900 placeholder-gray-500 text-sm md:text-base font-sans"
              onFocus={(e) => { e.target.style.borderColor = 'rgb(0, 102, 204)'; e.target.style.boxShadow = '0 0 0 1px rgb(0, 102, 204)' }}
              onBlur={(e) => { e.target.style.borderColor = ''; e.target.style.boxShadow = '' }}
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={handleTextInputSubmit}
              disabled={!textInput.trim()}
              className="px-4 py-2 text-white rounded-md text-sm md:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap border border-black/10 font-sans"
              style={{ backgroundColor: 'rgb(0, 102, 204)' }}
              onMouseEnter={(e) => !textInput.trim() || (e.currentTarget.style.backgroundColor = 'rgb(0, 82, 163)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(0, 102, 204)'}
            >
              Enviar
            </button>
          </div>

          {!currentTranscription && (
            <div className="mt-2 text-center">
              <button
                onClick={() => setCurrentTranscription("Escribe tu mensaje aquí...")}
                className="text-xs text-gray-500 hover:text-gray-700 underline font-sans"
              >
                ¿Prefieres escribir en lugar de hablar?
              </button>
            </div>
          )}
        </div>
      )}

      {!isKeyboardOpen && (
        <VoiceControls
          voiceStatus={voiceStatus}
          isMuted={isMuted}
          toggleMute={handleToggleMute}
          stopVoiceCall={stopVoiceCall}
          startVoiceCall={startVoiceCall}
          openWhatsApp={openWhatsApp}
          goToForm={() => {
            const contactSection = document.getElementById("contacto")
            contactSection?.scrollIntoView({ behavior: "smooth" })
            if (!isEmbedMode) {
              setIsOpen(false)
            }
          }}
          hasElevenLabsConfig={hasRetellConfig}
        />
      )}
    </div>
  )

  if (isEmbedMode) {
    const embedContainerClassName = ["flex flex-col h-full min-h-screen w-full bg-white", className].filter(Boolean).join(" ")
    return <div className={embedContainerClassName}>{chatContent}</div>
  }

  return (
    <VoiceFab
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={className}
      onClose={handleWidgetClose}
    >
      {chatContent}
    </VoiceFab>
  )
}
