import { NextResponse } from "next/server"

export async function GET() {
  const hasApiKey = !!process.env.ELEVENLABS_API_KEY
  const hasAgentId = !!process.env.ELEVENLABS_AGENT_ID
  const isConfigured = hasApiKey && hasAgentId

  return NextResponse.json({
    configured: isConfigured,
    details: {
      hasApiKey,
      hasAgentId,
      missing: [
        ...(!hasApiKey ? ['ELEVENLABS_API_KEY'] : []),
        ...(!hasAgentId ? ['ELEVENLABS_AGENT_ID'] : [])
      ]
    }
  })
}
