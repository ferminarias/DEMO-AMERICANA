"use client"

import * as React from "react"
import { toast } from "@/hooks/use-toast"
import { VoiceHeader } from "@/features/voice/components/VoiceHeader"
import { VoiceMessages } from "@/features/voice/components/VoiceMessages"
import { VoiceControls } from "@/features/voice/components/VoiceControls"
import { VoiceFab } from "@/features/voice/components/VoiceFab"
import type { VoiceMessage as VoiceMessageType } from "@/lib/voice/types"
import { CONTACT } from "@/lib/constants"
import { sendMessageToBackend } from "@/lib/services/chat"
import { startElevenLabsSession, safeEndSession, sendTextToElevenLabs } from "@/lib/services/elevenlabs"

type VoiceMessage = VoiceMessageType

interface VoiceWidgetProps {
  className?: string
  variant?: "default" | "embed"
}

export const VoiceWidget = ({ className, variant = "default" }: VoiceWidgetProps) => {
  const isEmbedMode = variant === "embed"
  const [isOpen, setIsOpen] = React.useState(isEmbedMode)
  const [messages, setMessages] = React.useState([] as VoiceMessage[])
  const [voiceStatus, setVoiceStatus] = React.useState(
    "idle" as "idle" | "asking-mic" | "getting-token" | "connecting" | "connected" | "error"
  )
  const [hasElevenLabsConfig, setHasElevenLabsConfig] = React.useState(false as boolean)
  const [isMuted, setIsMuted] = React.useState(false as boolean)
  const sessionRef = React.useRef(null as any)
  const mediaStreamRef = React.useRef(null as MediaStream | null)
  const sessionActiveRef = React.useRef(false as boolean)
  const transcriptionTimeoutRef = React.useRef(null as number | null)
  const simulationTimeoutsRef = React.useRef([] as number[])

  const [textMessages, setTextMessages] = React.useState([] as VoiceMessage[])
  const [inputMessage, setInputMessage] = React.useState("" as string)
  const [isTextChatActive, setIsTextChatActive] = React.useState(false as boolean)
  const [isTyping, setIsTyping] = React.useState(false as boolean)
  const [textInput, setTextInput] = React.useState("" as string)
  const [currentTranscription, setCurrentTranscription] = React.useState("" as string)
  const [showFullTranscription, setShowFullTranscription] = React.useState(false as boolean)
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false as boolean)
  const SHOW_TRANSCRIPTION_BAR = false

  React.useEffect(() => {
    const checkElevenLabsConfig = async () => {
      try {
        const response = await fetch("/api/elevenlabs/check-config")
        const { configured } = await response.json()
        setHasElevenLabsConfig(configured)
      } catch (error) {
        console.log("[v0] ElevenLabs config check failed:", error)
        setHasElevenLabsConfig(false)
      }
    }

    checkElevenLabsConfig()
  }, [])

  // Detectar apertura del teclado en móviles para adaptar el layout
  React.useEffect(() => {
    if (typeof window === "undefined" || !(window as any).visualViewport) return
    const viewport = (window as any).visualViewport as VisualViewport

    const handler = () => {
      // Consideramos teclado abierto si la altura visual se reduce de forma significativa
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

  const clearSimulationTimers = () => {
    if (transcriptionTimeoutRef.current) {
      clearTimeout(transcriptionTimeoutRef.current)
      transcriptionTimeoutRef.current = null
    }
    if (simulationTimeoutsRef.current.length) {
      simulationTimeoutsRef.current.forEach((timeoutId: number) => clearTimeout(timeoutId))
      simulationTimeoutsRef.current = []
    }
  }

  const scheduleTranscriptionDemo = () => {
    const simulateTranscription = () => {
      const phrases = [
        "Este viernes a las 3",
        "Mañana por la tarde",
        "El 19 de septiembre",
        "juan punto perez arroba gmail punto com",
        "Quiero información sobre la carrera de administración",
      ]
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      setCurrentTranscription(randomPhrase)
    }

    if (transcriptionTimeoutRef.current) {
      clearTimeout(transcriptionTimeoutRef.current)
    }
    transcriptionTimeoutRef.current = window.setTimeout(simulateTranscription, 5000)
  }


  const startVoiceCall = async () => {
    if (!hasElevenLabsConfig) {
      toast({
        title: "Asistente de voz no disponible",
        description: "Usa el chat de texto, WhatsApp o el formulario de contacto mientras terminamos la configuración.",
      })
      return
    }

    try {
      clearSimulationTimers()
      setMessages([])
      setVoiceStatus("asking-mic")
      console.log("[v0] Starting voice call...")

      try {
        // Ensure previous stream is fully stopped before requesting a new one
        try {
          if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
            mediaStreamRef.current = null
            console.log("[v0] Previous microphone stream stopped before requesting a new one")
          }
        } catch {}

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 44100,
            sampleSize: 16,
          },
        })
        mediaStreamRef.current = stream
        console.log("[v0] Microphone access granted")
        try {
          stream.getAudioTracks().forEach((t: MediaStreamTrack) => {
            t.applyConstraints({
              echoCancellation: { ideal: true },
              noiseSuppression: { ideal: true },
              autoGainControl: { ideal: true },
              channelCount: { ideal: 1 },
            } as MediaTrackConstraints).catch(() => {})
          })
        } catch {}
      } catch (micError) {
        console.error("[v0] Microphone access denied:", micError)
        setVoiceStatus("error")
        setMessages([
          {
            text: "Necesito acceso al micrófono para poder conversar contigo. Por favor, permite el acceso y vuelve a intentar.",
            timestamp: Date.now(),
            type: "assistant",
          },
        ])
        return
      }

      setVoiceStatus("getting-token")
      console.log("[v0] Getting conversation token...")

      const response = await fetch("/api/elevenlabs/token")
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error("Token request failed (" + response.status + "): " + errorText)
      }

      const tokenData = await response.json()
      console.log("[v0] Token response:", { ...tokenData, token: tokenData.token ? "[REDACTED]" : undefined })

      if (!tokenData.configured) {
        throw new Error("ElevenLabs not configured")
      }

      setVoiceStatus("connecting")
      console.log("[v0] Initializing WebRTC session...")

      if (tokenData.tokenGenerated && tokenData.token) {
        try {
          const conversation = await startElevenLabsSession({
            agentId: tokenData.agentId,
            token: tokenData.token,
            handlers: {
              onConnect: () => {
                console.log("[v0] ElevenLabs WebRTC connected")
                setVoiceStatus("connected")
                sessionActiveRef.current = true
              },
              onDisconnect: () => {
                console.log("[v0] ElevenLabs session disconnected")
                sessionActiveRef.current = false
                setVoiceStatus("idle")
              },
              onMessage: (message: any) => {
                console.log("[v0] Received message - Full object:", JSON.stringify(message, null, 2))
                console.log("[v0] Message type:", typeof message)
                console.log("[v0] Message keys:", Object.keys(message))

                if (!sessionActiveRef.current) {
                  console.log("[v0] Ignoring message because session is not active")
                  return
                }

                let messageText = ""
                let messageType = "assistant"

                if (message.message && message.message.trim()) {
                  messageText = message.message
                  messageType = message.source === "user" ? "user" : "assistant"
                } else if (message.text && message.text.trim()) {
                  messageText = message.text
                  messageType = message.type === "user" ? "user" : "assistant"
                } else if (message.content && message.content.trim()) {
                  messageText = message.content
                  messageType = message.role === "user" ? "user" : "assistant"
                } else if (typeof message === "string" && message.trim()) {
                  messageText = message
                  messageType = "assistant"
                }

                if (messageText) {
                  console.log("[v0] Adding message to chat:", messageText, "Type:", messageType)
                  setMessages((prev: VoiceMessage[]) => [
                    ...prev,
                    {
                      text: messageText,
                      timestamp: Date.now(),
                      type: messageType as "user" | "assistant",
                    },
                  ])
                } else {
                  console.log("[v0] No valid message text found in:", message)
                }
              },
              onError: (error: any) => {
                console.error("[v0] ElevenLabs session error:", error)

                if (error?.message?.includes("WebSocket")) {
                  console.log("[v0] WebSocket error, allowing reconnection attempts")
                  setMessages((prev: VoiceMessage[]) => [
                    ...prev,
                    {
                      text: "Reconectando... Por favor espera un momento.",
                      timestamp: Date.now(),
                      type: "assistant",
                    },
                  ])
                  return
                }

                try {
                  sessionActiveRef.current = false
                  safeEndSession(sessionRef.current)
                } catch (e) {
                  console.error("[v0] Error while forcing session end after onError:", e)
                }
                if (mediaStreamRef.current) {
                  mediaStreamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
                  mediaStreamRef.current = null
                }
                setVoiceStatus("error")
                setMessages((prev: VoiceMessage[]) => [
                  ...prev,
                  {
                    text: "Error de conexión. La llamada se terminó. Puedes volver a intentar o usar WhatsApp.",
                    timestamp: Date.now(),
                    type: "assistant",
                  },
                ])
              },
              onStatusChange: (status: string) => {
                console.log("[v0] Status changed:", status)
              },
              onModeChange: (mode: string) => {
                console.log("[v0] Mode changed:", mode)
              },
            },
          })

          sessionRef.current = conversation
          console.log("[v0] Conversation session started successfully")
        } catch (sdkError) {
          console.error("[v0] ElevenLabs SDK error:", sdkError)
          scheduleTranscriptionDemo()
          simulateVoiceConversation()
        }
      } else {
        console.log("[v0] No token available, using simulation mode")
        scheduleTranscriptionDemo()
        simulateVoiceConversation()
      }
    } catch (error) {
      console.error("[v0] Voice call error:", error)
      setVoiceStatus("error")

      setMessages([
        {
          text: "Lo siento, no pude establecer la conexión de voz. Por favor, intenta usar WhatsApp o el formulario de contacto.",
          timestamp: Date.now(),
          type: "assistant",
        },
      ])
    }
  }

  const sendMessage = (text: string) =>
    sendMessageToBackend({ message: text, source: "website-widget" })

  const handleTextInputSubmit = () => {
    if (!textInput.trim()) return

    const messageText = textInput.trim()
    console.log("[v0] Sending text input to ElevenLabs:", messageText)
    
    // Add user message to chat immediately
    const userMessage: VoiceMessage = {
      text: messageText,
      timestamp: Date.now(),
      type: "user",
    }
    setTextMessages((prev: VoiceMessage[]) => [...prev, userMessage])
    setMessages((prev: VoiceMessage[]) => [...prev, userMessage])
    
    // Clear input and transcription
    setTextInput("")
    setCurrentTranscription("")

    // Primary method for WebRTC sessions: SDK helper
    if (sessionRef.current?.conversation && typeof sessionRef.current.conversation.sendUserMessage === 'function') {
      try {
        // Optional: notify activity while typing
        sessionRef.current.conversation.sendUserActivity?.()
        sessionRef.current.conversation.sendUserMessage(messageText)
        console.log("[v0] Text sent via conversation.sendUserMessage")
        return
      } catch (error) {
        console.error("[v0] Error with conversation.sendUserMessage:", error)
      }
    }

    // Fallback helper (may support websocket mode in the future)
    if (sessionRef.current) {
      const sentViaElevenLabs = sendTextToElevenLabs(sessionRef.current, messageText)
      if (sentViaElevenLabs) {
        console.log("[v0] Text sent successfully to ElevenLabs via fallback")
        return
      }
    }

    // Fallback to backend if all methods fail
    console.log("[v0] All ElevenLabs methods failed, using backend fallback")
    sendMessage(messageText).then((response) => {
      const assistantMessage: VoiceMessage = {
        text: response,
        timestamp: Date.now(),
        type: "assistant",
      }
      setTextMessages((prev: VoiceMessage[]) => [...prev, assistantMessage])
      setMessages((prev: VoiceMessage[]) => [...prev, assistantMessage])
    }).catch((error) => {
      console.error("Error sending message to backend:", error)
      const errorMessage: VoiceMessage = {
        text: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
        timestamp: Date.now(),
        type: "assistant",
      }
      setTextMessages((prev: VoiceMessage[]) => [...prev, errorMessage])
      setMessages((prev: VoiceMessage[]) => [...prev, errorMessage])
    })
  }


  const simulateVoiceConversation = async () => {
    clearSimulationTimers()
    setVoiceStatus("connected")
    setMessages([
      {
        text: "¡Hola! Soy tu asistente de UNAB. ¿En qué puedo ayudarte hoy?",
        timestamp: Date.now(),
        type: "assistant",
      },
    ])

    scheduleTranscriptionDemo()

    const firstTimeout = window.setTimeout(async () => {
      const userMessage = "Me interesa información sobre sus programas"
      setMessages((prev: VoiceMessage[]) => [
        ...prev,
        {
          text: userMessage,
          timestamp: Date.now(),
          type: "user",
        },
      ])

      const backendResponse = await sendMessage(userMessage)

      const responseTimeout = window.setTimeout(() => {
        setMessages((prev: VoiceMessage[]) => [
          ...prev,
          {
            text: backendResponse,
            timestamp: Date.now(),
            type: "assistant",
          },
        ])
      }, 1000)

      simulationTimeoutsRef.current.push(responseTimeout)
    }, 3000)

    simulationTimeoutsRef.current.push(firstTimeout)
  }


  const stopVoiceCall = () => {
    console.log("[v0] Stopping voice call...")
    try {
      if (sessionRef.current) {
        safeEndSession(sessionRef.current)
        sessionRef.current = null
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        mediaStreamRef.current = null
      }
    } catch (error) {
      console.error("[v0] Error stopping voice call:", error)
    }
    sessionActiveRef.current = false
    clearSimulationTimers()
    setVoiceStatus("idle")
    setMessages([])
    setIsMuted(false)
    const toastInstance = toast({
      title: "Llamada finalizada",
      description: "La conversación por voz se cerró correctamente.",
    })
    
    // Auto-dismiss después de 3 segundos
    setTimeout(() => {
      toastInstance.dismiss()
    }, 3000)
  }


  const toggleMute = () => {
    if (!sessionRef.current?.conversation) {
      console.warn("[v0] toggleMute called without active conversation")
      return
    }

    try {
      setIsMuted((prev: boolean) => {
        const next = !prev
        try {
          sessionRef.current!.conversation.setMicMuted(next)
        } catch (error) {
          console.error("[v0] Error reaching ElevenLabs mute control:", error)
          return prev
        }
        console.log("[v0] Microphone", next ? "muted" : "unmuted")
        return next
      })
    } catch (error) {
      console.error("[v0] Error toggling mute:", error)
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(CONTACT.whatsappDefaultMessage)
    const whatsappUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
    if (!isEmbedMode) {
      setIsOpen(false)
    }
  }

  const startTextChat = async () => {
    setIsTextChatActive(true)
    setTextMessages([
      {
        text: "¡Hola! Soy tu asistente de UNAB. ¿En qué puedo ayudarte hoy?",
        timestamp: Date.now(),
        type: "assistant",
      },
    ])
  }

  const sendTextMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setInputMessage("")

    setTextMessages((prev: VoiceMessage[]) => [
      ...prev,
      {
        text: userMessage,
        timestamp: Date.now(),
        type: "user",
      },
    ])

    setIsTyping(true)

    const backendResponse = await sendMessage(userMessage)

    setIsTyping(false)

    setTextMessages((prev: VoiceMessage[]) => [
      ...prev,
      {
        text: backendResponse,
        timestamp: Date.now(),
        type: "assistant",
      },
    ])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendTextMessage()
    }
  }

  const getStatusColor = () => {
    if (voiceStatus === "connected") return "bg-green-500"
    if (voiceStatus === "connecting" || voiceStatus === "getting-token") return "bg-yellow-500"
    if (voiceStatus === "error") return "bg-red-500"
    return "bg-gray-500"
  }

  const getStatusText = () => {
    switch (voiceStatus) {
      case "connected":
        return "Conversación activa"
      case "connecting":
        return "Conectando con ElevenLabs..."
      case "getting-token":
        return "Obteniendo token..."
      case "asking-mic":
        return "Solicitando permisos..."
      case "error":
        return "Error de conexión"
      default:
        return hasElevenLabsConfig ? "Listo para conversar" : "Configuración pendiente"
    }
  }

  React.useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        if (sessionRef.current) {
          safeEndSession(sessionRef.current)
        }
      } catch {}
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
        mediaStreamRef.current = null
      }
      sessionActiveRef.current = false
      clearSimulationTimers()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      handleBeforeUnload()
    }
  }, [])

  const handleWidgetClose = () => {
    try {
      stopVoiceCall()
      setTextMessages([])
      setMessages([])
      setIsTextChatActive(false)
    } catch (e) {
      console.error("[v0] Error cleaning up on close:", e)
    }
  }


  const chatContent = (
    <div className="flex flex-col h-full bg-white overflow-auto">
      <VoiceHeader
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        variant={isEmbedMode ? "embed" : "sheet"}
      />

      <div className="flex-1 relative overflow-y-auto">
        <VoiceMessages messages={isTextChatActive ? textMessages : messages} isTyping={isTyping} />
      </div>

      {/* Input de teclado para conversación */}
      {voiceStatus === "connected" && (
        <div className="border-t bg-white p-2.5 md:p-3 flex-shrink-0 sticky bottom-0 z-20">
          {SHOW_TRANSCRIPTION_BAR && currentTranscription && currentTranscription !== "Escribe tu mensaje aquí..." && (
            <div className="mb-2 md:mb-3 sticky top-0 z-10">
              <div className="flex items-center gap-2 border border-black/10 rounded-md px-2 py-1.5 shadow-sm" style={{ backgroundColor: 'rgba(221, 163, 67, 0.1)' }}>
                <span className="text-[11px] md:text-xs font-semibold whitespace-nowrap" style={{ color: 'rgb(181, 123, 27)' }}>Transcripción en vivo:</span>
                <div className="flex-1 min-h-[20px] max-h-[72px] md:max-h-[96px] overflow-y-auto pr-1">
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-snug" style={{ color: 'rgb(161, 103, 7)' }}>
                    {currentTranscription}
                  </p>
                </div>
                <button
                  onClick={() => {
                    try { navigator.clipboard.writeText(currentTranscription) } catch {}
                  }}
                  className="text-xs md:text-sm font-medium px-1 hover:underline whitespace-nowrap"
                  style={{ color: 'rgb(201, 143, 47)' }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTextInput(e.target.value)
                // notify activity while typing if available
                sessionRef.current?.conversation?.sendUserActivity?.()
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleTextInputSubmit()
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none text-gray-900 placeholder-gray-500 text-sm md:text-base"
              onFocus={(e) => { e.target.style.borderColor = 'rgb(221, 163, 67)'; e.target.style.boxShadow = '0 0 0 1px rgb(221, 163, 67)' }}
              onBlur={(e) => { e.target.style.borderColor = ''; e.target.style.boxShadow = '' }}
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={handleTextInputSubmit}
              disabled={!textInput.trim()}
              className="px-4 py-2 text-white rounded-md text-sm md:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap border border-black/10"
              style={{ backgroundColor: 'rgb(221, 163, 67)' }}
              onMouseEnter={(e) => !textInput.trim() || (e.currentTarget.style.backgroundColor = 'rgb(201, 143, 47)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(221, 163, 67)'}
            >
              Enviar
            </button>
          </div>

          {!currentTranscription && (
            <div className="mt-2 text-center">
              <button
                onClick={() => setCurrentTranscription("Escribe tu mensaje aquí...")}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                ¿Prefieres escribir en lugar de hablar?
              </button>
            </div>
          )}
        </div>
      )}

      {isTextChatActive && (
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputMessage(e.target.value)
                sessionRef.current?.conversation?.sendUserActivity?.()
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => { e.target.style.borderColor = 'rgb(221, 163, 67)'; e.target.style.boxShadow = '0 0 0 2px rgba(221, 163, 67, 0.2)' }}
              onBlur={(e) => { e.target.style.borderColor = ''; e.target.style.boxShadow = '' }}
              disabled={isTyping}
            />
            <button
              onClick={() => { void sendTextMessage() }}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 rounded-lg text-white disabled:opacity-50 border border-black/10"
              style={{ backgroundColor: 'rgb(221, 163, 67)' }}
              onMouseEnter={(e) => !inputMessage.trim() || isTyping || (e.currentTarget.style.backgroundColor = 'rgb(201, 143, 47)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(221, 163, 67)'}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {!isKeyboardOpen && (
        <VoiceControls
          voiceStatus={voiceStatus}
          isMuted={isMuted}
          toggleMute={toggleMute}
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
          hasElevenLabsConfig={hasElevenLabsConfig}
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
