import { API } from "@/lib/constants"

export interface SendMessagePayload {
  message: string
  sessionId?: string
  userId?: string
  source?: string
}

export async function sendMessageToBackend({ message, sessionId, userId, source }: SendMessagePayload): Promise<string> {
  try {
    const apiUrl = API.chatBaseUrl

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`${apiUrl}/api/chat/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionId || `web-session-${Date.now()}`,
        userId: userId || `web-user-${Date.now()}`,
        source: source || "website-widget",
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`)
    }

    const data = (await response.json()) as { response?: string; message?: string }
    return data.response || data.message || "Gracias por tu mensaje. Un asesor te contactará pronto."
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string }
    if (err?.name === "AbortError") {
      return "La conexión tardó demasiado tiempo. Por favor, intenta nuevamente."
    }
    if (typeof err?.message === "string" && err.message.includes("Failed to fetch")) {
      return "No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente."
    }
    return `Error de conexión: ${err?.message || "desconocido"}. Por favor, intenta usar WhatsApp o el formulario de contacto.`
  }
}


