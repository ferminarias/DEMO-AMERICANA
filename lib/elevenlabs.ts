// Utility functions for ElevenLabs integration

export interface VoiceConfig {
  apiKey: string
  voiceId: string
  baseUrl: string
}

export interface VoiceMessage {
  text: string
  timestamp: number
  type: "user" | "assistant"
}

export class VoiceAssistant {
  private config: VoiceConfig | null = null
  private isConnected = false
  private mediaRecorder: MediaRecorder | null = null
  private audioContext: AudioContext | null = null
  private stream: MediaStream | null = null

  async initialize(): Promise<boolean> {
    try {
      // Get configuration from API
      const response = await fetch("/api/elevenlabs/token")
      if (!response.ok) {
        throw new Error("Failed to get voice configuration")
      }

      this.config = await response.json()
      return true
    } catch (error) {
      console.error("Failed to initialize voice assistant:", error)
      return false
    }
  }

  async startRecording(): Promise<boolean> {
    try {
      // Request microphone permission
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      // Create audio context for processing
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create media recorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      return true
    } catch (error) {
      console.error("Failed to start recording:", error)
      return false
    }
  }

  async stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null)
        return
      }

      const chunks: Blob[] = []

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm;codecs=opus" })
        resolve(audioBlob)
      }

      this.mediaRecorder.stop()
    })
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    if (!this.config) {
      throw new Error("Voice assistant not initialized")
    }

    // Convert to the format expected by speech-to-text service
    const formData = new FormData()
    formData.append("audio", audioBlob, "audio.webm")

    try {
      // Use Web Speech API as fallback for transcription
      return await this.webSpeechTranscribe(audioBlob)
    } catch (error) {
      console.error("Transcription failed:", error)
      throw error
    }
  }

  private async webSpeechTranscribe(audioBlob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        reject(new Error("Speech recognition not supported"))
        return
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "es-ES"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }

      recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      // For this demo, we'll return a mock transcription
      // In a real implementation, you'd process the audio blob
      setTimeout(() => {
        resolve("Hola, me interesa información sobre los programas de ULINEA")
      }, 1000)
    })
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.config) {
      throw new Error("Voice assistant not initialized")
    }

    // Mock response generation - in production, integrate with your AI service
    const responses = [
      "¡Hola! Me da mucho gusto que te intereses en ULINEA. Somos una universidad 100% en línea con programas de alta calidad.",
      "Tenemos licenciaturas en Administración de Empresas, Marketing Digital e Ingeniería en Sistemas. ¿Cuál te interesa más?",
      "Nuestros programas tienen una empleabilidad del 95% y flexibilidad total para que puedas estudiar mientras trabajas.",
      "¿Te gustaría que te conecte con un asesor académico para que te brinde información más detallada?",
    ]

    // Simple keyword-based response selection
    const lowerMessage = userMessage.toLowerCase()
    let response = responses[0]

    if (lowerMessage.includes("programa") || lowerMessage.includes("carrera")) {
      response = responses[1]
    } else if (lowerMessage.includes("trabajo") || lowerMessage.includes("empleo")) {
      response = responses[2]
    } else if (lowerMessage.includes("asesor") || lowerMessage.includes("información")) {
      response = responses[3]
    }

    return response
  }

  async textToSpeech(text: string): Promise<Blob> {
    if (!this.config) {
      throw new Error("Voice assistant not initialized")
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/text-to-speech/${this.config.voiceId}`, {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": this.config.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Text-to-speech failed")
      }

      return await response.blob()
    } catch (error) {
      console.error("Text-to-speech error:", error)
      // Fallback to Web Speech API
      return this.webSpeechSynthesize(text)
    }
  }

  private async webSpeechSynthesize(text: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!("speechSynthesis" in window)) {
        reject(new Error("Speech synthesis not supported"))
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onend = () => {
        // For demo purposes, return empty blob
        // In real implementation, you'd capture the audio
        resolve(new Blob([], { type: "audio/mpeg" }))
      }

      utterance.onerror = (event) => {
        reject(new Error(`Speech synthesis error: ${event.error}`))
      }

      speechSynthesis.speak(utterance)
    })
  }

  cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }

    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }

    this.mediaRecorder = null
    this.isConnected = false
  }
}
