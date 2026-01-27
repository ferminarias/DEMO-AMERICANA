import { RetellWebClient } from "retell-client-js-sdk"

type RetellHandlers = {
  onCallStarted: () => void
  onCallEnded: () => void
  onAgentStartTalking: () => void
  onAgentStopTalking: () => void
  onUpdate: (update: any) => void
  onError: (error: any) => void
  onMetadata?: (metadata: any) => void
}

interface RetellSession {
  client: RetellWebClient
  callId: string | null
  accessToken: string
  isActive: boolean
}

/**
 * Inicia una sesión con Retell AI
 * @param accessToken - Token de acceso obtenido del backend
 * @param handlers - Manejadores de eventos
 * @returns Sesión de Retell
 */
export async function startRetellSession({
  accessToken,
  handlers,
}: {
  accessToken: string
  handlers: RetellHandlers
}): Promise<RetellSession> {
  const retellClient = new RetellWebClient()

  // Registrar manejadores de eventos
  retellClient.on("call_started", () => {
    console.log("[Retell] Llamada iniciada")
    handlers.onCallStarted()
  })

  retellClient.on("call_ended", () => {
    console.log("[Retell] Llamada finalizada")
    handlers.onCallEnded()
  })

  retellClient.on("agent_start_talking", () => {
    console.log("[Retell] Agente comenzó a hablar")
    handlers.onAgentStartTalking()
  })

  retellClient.on("agent_stop_talking", () => {
    console.log("[Retell] Agente dejó de hablar")
    handlers.onAgentStopTalking()
  })

  retellClient.on("update", (update) => {
    console.log("[Retell] Actualización recibida:", update)
    handlers.onUpdate(update)
  })

  retellClient.on("error", (error) => {
    console.error("[Retell] Error:", error)
    handlers.onError(error)
  })

  if (handlers.onMetadata) {
    retellClient.on("metadata", (metadata) => {
      console.log("[Retell] Metadata:", metadata)
      handlers.onMetadata!(metadata)
    })
  }

  // Iniciar la llamada
  try {
    await retellClient.startCall({
      accessToken,
      sampleRate: 24000,
      emitRawAudioSamples: false,
    })

    console.log("[Retell] Sesión iniciada exitosamente")

    return {
      client: retellClient,
      callId: null, // Retell maneja esto internamente
      accessToken,
      isActive: true,
    }
  } catch (error) {
    console.error("[Retell] Error iniciando sesión:", error)
    throw error
  }
}

/**
 * Finaliza una sesión de Retell
 * @param session - Sesión activa de Retell
 */
export function endRetellSession(session: RetellSession | null): void {
  if (!session || !session.isActive) {
    console.log("[Retell] No hay sesión activa para finalizar")
    return
  }

  try {
    session.client.stopCall()
    session.isActive = false
    console.log("[Retell] Sesión finalizada correctamente")
  } catch (error) {
    console.error("[Retell] Error finalizando sesión:", error)
  }
}
