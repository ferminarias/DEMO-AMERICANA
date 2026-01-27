"use client"

import { useState, useRef, useCallback } from "react"
import type { VoiceMessage } from "@/lib/voice/types"
import { generateMessageId } from "@/lib/voice/types"

/**
 * Hook para manejar mensajes de voz y sincronización con transcript de Retell
 */
export function useVoiceMessages() {
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const lastTranscriptRef = useRef<string>("")
  const pendingTranscriptRef = useRef<any[]>([])

  const syncWithTranscript = useCallback((transcript: any[], isAgentTalking: boolean) => {
    // Crear una firma única del transcript para detectar cambios reales
    const transcriptSignature = transcript
      .map((item: any) => `${item.role}:${item.content?.trim() || ''}`)
      .join('|')
    
    // Si el transcript no cambió desde el último update, ignorar
    if (transcriptSignature === lastTranscriptRef.current) {
      console.log("[VoiceMessages] Transcript unchanged, skipping update")
      return false
    }
    
    lastTranscriptRef.current = transcriptSignature
    pendingTranscriptRef.current = transcript
    
    // Si el agente está hablando, NO actualizar la UI aún
    // Esperamos a que termine de hablar
    if (isAgentTalking) {
      console.log("[VoiceMessages] Agent is talking, deferring UI update")
      return false
    }
    
    // El agente NO está hablando, actualizar la UI
    console.log("[VoiceMessages] Syncing messages with transcript, items:", transcript.length)
    
    // Convertir el transcript completo a mensajes
    const transcriptMessages: VoiceMessage[] = transcript
      .filter((item: any) => item.content && item.content.trim())
      .map((item: any, index: number) => ({
        id: generateMessageId(),
        text: item.content.trim(),
        timestamp: Date.now() - (transcript.length - index) * 1000,
        type: item.role === "user" ? "user" : "assistant",
      }))

    setMessages(transcriptMessages)
    return true
  }, [])

  const updatePendingTranscript = useCallback(() => {
    if (pendingTranscriptRef.current.length > 0) {
      const transcript = pendingTranscriptRef.current
      const transcriptMessages: VoiceMessage[] = transcript
        .filter((item: any) => item.content && item.content.trim())
        .map((item: any, index: number) => ({
          id: generateMessageId(),
          text: item.content.trim(),
          timestamp: Date.now() - (transcript.length - index) * 1000,
          type: item.role === "user" ? "user" : "assistant",
        }))
      
      console.log("[VoiceMessages] Updating messages after agent stopped talking")
      setMessages(transcriptMessages)
    }
  }, [])

  const addMessage = useCallback((message: Omit<VoiceMessage, "id">) => {
    const newMessage: VoiceMessage = {
      id: generateMessageId(),
      ...message,
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    lastTranscriptRef.current = ""
    pendingTranscriptRef.current = []
  }, [])

  return {
    messages,
    setMessages,
    syncWithTranscript,
    updatePendingTranscript,
    addMessage,
    clearMessages,
  }
}
