type ElevenHandlers = {
  onConnect: () => void
  onDisconnect: () => void
  onMessage: (message: unknown) => void
  onError: (error: unknown) => void
  onStatusChange?: (status: string) => void
  onModeChange?: (mode: string) => void
}

interface ElevenLabsSession {
  conversation: any
  websocket: WebSocket | null
  agentId: string
  token: string
  reconnectAttempts: number
  maxReconnectAttempts: number
  reconnectTimeout: ReturnType<typeof setTimeout> | null
  isConnected: boolean
  isInitialized: boolean
}

export async function startElevenLabsSession({
  agentId,
  token,
  handlers,
}: {
  agentId: string
  token: string
  handlers: ElevenHandlers
}): Promise<ElevenLabsSession> {
  const { Conversation } = await import("@elevenlabs/client")
  
  // Start WebRTC conversation
  const conversation = await Conversation.startSession({
    agentId,
    conversationToken: token,
    connectionType: "webrtc",
    onConnect: handlers.onConnect,
    onDisconnect: handlers.onDisconnect,
    onMessage: handlers.onMessage,
    onError: handlers.onError,
    onStatusChange: handlers.onStatusChange,
    onModeChange: handlers.onModeChange,
  })

  // Use the WebSocket from the existing conversation instead of creating a new one
  let websocket: WebSocket | null = null
  let isConnected = false
  let isInitialized = true // WebRTC conversation is already initialized

  // Try to access the WebSocket from the conversation object
  if (conversation && typeof conversation === 'object') {
    // Look for WebSocket in various possible locations
    websocket = conversation._ws || conversation.websocket || conversation.connection?.ws || null
    
    if (websocket) {
      console.log("[v0] Found existing WebSocket from conversation")
      isConnected = websocket.readyState === WebSocket.OPEN
    } else {
      console.log("[v0] No WebSocket found in conversation object")
    }
  }

  return {
    conversation,
    websocket,
    agentId,
    token,
    reconnectAttempts: 0,
    maxReconnectAttempts: 0,
    reconnectTimeout: null,
    isConnected,
    isInitialized
  }
}

export function sendTextToElevenLabs(session: ElevenLabsSession, text: string): boolean {
  console.log("[v0] Attempting to send text:", text)

  // Primary path for WebRTC ConvAI sessions
  if (session.conversation && typeof session.conversation.sendUserMessage === 'function') {
    try {
      session.conversation.sendUserActivity?.()
      session.conversation.sendUserMessage(text.trim())
      console.log("[v0] Text sent via conversation.sendUserMessage")
      return true
    } catch (error) {
      console.error("[v0] Error with conversation.sendUserMessage:", error)
      // continue to optional websocket path if applicable
    }
  }

  // Optional websocket path only if caller opened a WS session explicitly
  if (session.websocket && session.websocket.readyState === WebSocket.OPEN) {
    try {
      const payload = { type: "user_message", text: text.trim() }
      session.websocket.send(JSON.stringify(payload))
      console.log("[v0] Text sent via session WebSocket")
      return true
    } catch (error) {
      console.error("[v0] Error sending via session WebSocket:", error)
    }
  }

  console.warn("[v0] No available method to send text in current session mode")
  return false
}

export function safeEndSession(session: ElevenLabsSession | any) {
  try {
    // Handle new session format
    if (session && typeof session === 'object' && 'conversation' in session) {
      // Clear reconnect timeout
      if (session.reconnectTimeout) {
        clearTimeout(session.reconnectTimeout)
        session.reconnectTimeout = null
      }
      
      // Close WebSocket gracefully
      if (session.websocket) {
        session.websocket.close(1000, "Session ended by user")
        session.websocket = null
      }
      
      // End conversation session
      session.conversation?.endSession && session.conversation.endSession()
      session.conversation?.disconnect && session.conversation.disconnect()
    } 
    // Handle legacy format (direct conversation object)
    else {
      session?.endSession && session.endSession()
      session?.disconnect && session.disconnect()
    }
  } catch (e) {
    console.error("[v0] Error ending ElevenLabs session:", e)
  }
}


