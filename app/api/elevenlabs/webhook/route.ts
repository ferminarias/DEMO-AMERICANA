import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import crypto from "crypto"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("elevenlabs-signature")

    const webhookSecret = process.env.ELEVENLABS_WEBHOOK_SECRET
    if (webhookSecret && signature) {
      const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

      if (signature !== expectedSignature) {
        console.error("[v0] Invalid webhook signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event = JSON.parse(body)
    console.log("[v0] ElevenLabs webhook event:", event.type, event.data)

    switch (event.type) {
      case "voice_deletion_warning":
        console.log("[v0] Voice deletion warning:", event.data)
        break

      case "transcription_completed":
        console.log("[v0] Transcription completed - Full data:", JSON.stringify(event.data, null, 2))
        console.log("[v0] Transcription text:", event.data?.transcription || event.data?.text || "No text found")

        if (global.transcriptionController) {
          const encoder = new TextEncoder()
          const transcriptionText = event.data?.transcription || event.data?.text
          if (transcriptionText) {
            const data = encoder.encode(
              `data: ${JSON.stringify({
                type: "transcription",
                text: transcriptionText,
                timestamp: Date.now(),
                source: event.data?.source || "assistant",
              })}\n\n`,
            )
            global.transcriptionController.enqueue(data)
          }
        }
        break

      case "conversation_message":
        console.log("[v0] Conversation message:", JSON.stringify(event.data, null, 2))

        if (global.transcriptionController) {
          const encoder = new TextEncoder()
          const messageText = event.data?.message || event.data?.text
          if (messageText) {
            const data = encoder.encode(
              `data: ${JSON.stringify({
                type: "message",
                text: messageText,
                timestamp: Date.now(),
                source: event.data?.source || "assistant",
              })}\n\n`,
            )
            global.transcriptionController.enqueue(data)
          }
        }
        break

      case "agent_response":
        console.log("[v0] Agent response:", JSON.stringify(event.data, null, 2))

        if (global.transcriptionController) {
          const encoder = new TextEncoder()
          const responseText = event.data?.response || event.data?.text
          if (responseText) {
            const data = encoder.encode(
              `data: ${JSON.stringify({
                type: "response",
                text: responseText,
                timestamp: Date.now(),
                source: "assistant",
              })}\n\n`,
            )
            global.transcriptionController.enqueue(data)
          }
        }
        break

      default:
        console.log("[v0] Unknown webhook event type:", event.type, "Data:", JSON.stringify(event.data, null, 2))
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
