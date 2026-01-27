export type VoiceAuthor = "user" | "assistant"

export interface VoiceMessage {
  text: string
  timestamp: number
  type: VoiceAuthor
}

export type VoiceStatus =
  | "idle"
  | "asking-mic"
  | "getting-token"
  | "connecting"
  | "connected"
  | "error"


