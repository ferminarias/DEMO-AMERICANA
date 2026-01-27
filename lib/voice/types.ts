export type VoiceAuthor = "user" | "assistant"

export interface VoiceMessage {
  id: string
  text: string
  timestamp: number
  type: VoiceAuthor
}

// Helper function to generate unique message IDs
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export type VoiceStatus =
  | "idle"
  | "asking-mic"
  | "getting-token"
  | "connecting"
  | "connected"
  | "error"


