"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { startRetellSession, endRetellSession } from "@/lib/services/retell"
import { generateMessageId } from "@/lib/voice/types"
import type { VoiceMessage } from "@/lib/voice/types"

type VoiceStatus = "idle" | "asking-mic" | "creating-call" | "connecting" | "connected" | "error"

interface UseRetellSessionProps {
  onTranscriptUpdate: (transcript: any[], isAgentTalking: boolean) => void
  onAgentStoppedTalking: () => void
  onCallEnded: () => void
  onError: (error: any) => void
}

/**
 * Hook para manejar la sesión de Retell AI
 */
export function useRetellSession({ 
  onTranscriptUpdate, 
  onAgentStoppedTalking,
  onCallEnded,
  onError,
}: UseRetellSessionProps) {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle")
  const [hasRetellConfig, setHasRetellConfig] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isAgentTalking, setIsAgentTalking] = useState(false)
  
  const sessionRef = useRef<any>(null)
  const sessionActiveRef = useRef(false)
  const isAgentTalkingRef = useRef(false)

  // Verificar configuración de Retell
  useEffect(() => {
    const checkRetellConfig = async () => {
      try {
        const response = await fetch("/api/retell/check-config")
        const { configured } = await response.json()
        setHasRetellConfig(configured)
      } catch (error) {
        console.log("[Retell] Config check failed:", error)
        setHasRetellConfig(false)
      }
    }

    checkRetellConfig()
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        if (sessionRef.current) {
          endRetellSession(sessionRef.current)
        }
      } catch {}
      sessionActiveRef.current = false
    }
    
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      handleBeforeUnload()
    }
  }, [])

  const createWebCall = useCallback(async () => {
    setVoiceStatus("creating-call")
    console.log("[Retell] Creating web call...")

    const response = await fetch("/api/retell/create-web-call", {
      method: "POST",
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error("Web call creation failed (" + response.status + "): " + errorText)
    }

    const callData = await response.json()
    console.log("[Retell] Call response:", { 
      ...callData, 
      access_token: callData.access_token ? "[REDACTED]" : undefined 
    })

    if (!callData.configured) {
      throw new Error("Retell AI not configured")
    }

    return callData
  }, [])

  const startSession = useCallback(async (accessToken: string) => {
    setVoiceStatus("connecting")
    console.log("[Retell] Initializing Retell session...")

    try {
      const session = await startRetellSession({
        accessToken,
        handlers: {
          onCallStarted: () => {
            console.log("[Retell] Call started")
            setVoiceStatus("connected")
            sessionActiveRef.current = true
          },
          onCallEnded: () => {
            console.log("[Retell] Call ended")
            sessionActiveRef.current = false
            setVoiceStatus("idle")
            onCallEnded()
          },
          onAgentStartTalking: () => {
            console.log("[Retell] Agent started talking")
            isAgentTalkingRef.current = true
            setIsAgentTalking(true)
          },
          onAgentStopTalking: () => {
            console.log("[Retell] Agent stopped talking")
            isAgentTalkingRef.current = false
            setIsAgentTalking(false)
            onAgentStoppedTalking()
          },
          onUpdate: (update: any) => {
            console.log("[Retell] Update received:", update)

            if (!sessionActiveRef.current) {
              console.log("[Retell] Ignoring update because session is not active")
              return
            }

            if (update.transcript && Array.isArray(update.transcript) && update.transcript.length > 0) {
              onTranscriptUpdate(update.transcript, isAgentTalkingRef.current)
            }
          },
          onError: (error: any) => {
            console.error("[Retell] Session error:", error)
            
            try {
              sessionActiveRef.current = false
              endRetellSession(sessionRef.current)
            } catch (e) {
              console.error("[Retell] Error while forcing session end after onError:", e)
            }
            
            setVoiceStatus("error")
            onError(error)
          },
          onMetadata: (metadata: any) => {
            console.log("[Retell] Metadata received:", metadata)
          },
        },
      })

      sessionRef.current = session
      console.log("[Retell] Session started successfully")
    } catch (sdkError) {
      console.error("[Retell] SDK error:", sdkError)
      setVoiceStatus("error")
      throw sdkError
    }
  }, [onTranscriptUpdate, onAgentStoppedTalking, onCallEnded, onError])

  const stopSession = useCallback(() => {
    console.log("[Retell] Stopping session...")
    try {
      if (sessionRef.current) {
        endRetellSession(sessionRef.current)
        sessionRef.current = null
      }
    } catch (error) {
      console.error("[Retell] Error stopping session:", error)
    }
    sessionActiveRef.current = false
    setVoiceStatus("idle")
    setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    if (!sessionRef.current?.client) {
      console.warn("[Retell] toggleMute called without active session")
      return
    }

    setIsMuted((prev) => !prev)
  }, [])

  return {
    voiceStatus,
    setVoiceStatus,
    hasRetellConfig,
    isMuted,
    isAgentTalking,
    sessionRef,
    createWebCall,
    startSession,
    stopSession,
    toggleMute,
  }
}
