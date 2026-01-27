"use client"

import { useRef, useCallback } from "react"

/**
 * Hook para manejar el acceso al micrófono y MediaStream
 */
export function useMediaStream() {
  const mediaStreamRef = useRef<MediaStream | null>(null)

  const requestMicrophone = useCallback(async () => {
    try {
      // Limpiar stream anterior si existe
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
        mediaStreamRef.current = null
        console.log("[MediaStream] Previous microphone stream stopped")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 24000,
          sampleSize: 16,
        },
      })
      
      mediaStreamRef.current = stream
      console.log("[MediaStream] Microphone access granted")

      // Aplicar constraints adicionales
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

      return stream
    } catch (error) {
      console.error("[MediaStream] Microphone access denied:", error)
      throw error
    }
  }, [])

  const stopMicrophone = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      mediaStreamRef.current = null
      console.log("[MediaStream] Microphone stopped")
    }
  }, [])

  const toggleMute = useCallback((isMuted: boolean) => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted
      })
      console.log("[MediaStream] Microphone", isMuted ? "muted" : "unmuted")
    }
  }, [])

  return {
    mediaStreamRef,
    requestMicrophone,
    stopMicrophone,
    toggleMute,
  }
}
