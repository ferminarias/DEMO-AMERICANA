import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Headers para prevenir cache del navegador
const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for basic tracking
    const headersList = headers()
    const forwarded = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwarded?.split(",")[0] || realIp || "unknown"

    console.log(`[RETELL] Create web call request from IP: ${clientIp}`)

    // Log del origen para debugging
    const origin = headersList.get("origin") || headersList.get("referer") || "direct"
    console.log(`[RETELL] Request from origin: ${origin}`)

    const retellApiKey = process.env.RETELL_API_KEY
    const agentId = process.env.RETELL_AGENT_ID

    if (!retellApiKey || !agentId) {
      return NextResponse.json(
        {
          error:
            "Retell AI no está configurado. El asistente de voz estará disponible una vez completada la configuración.",
          configured: false,
        },
        { 
          status: 200,
          headers: NO_CACHE_HEADERS,
        },
      )
    }

    try {
      // Llamar a la API de Retell para crear una web call
      const retellResponse = await fetch("https://api.retellai.com/v2/create-web-call", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${retellApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      })

      if (!retellResponse.ok) {
        const errorText = await retellResponse.text()
        console.error("Retell web call creation failed:", errorText)

        return NextResponse.json(
          {
            agentId: agentId,
            configured: true,
            callCreated: false,
            error: `Web call creation failed: ${errorText}`,
          },
          {
            headers: NO_CACHE_HEADERS,
          }
        )
      }

      const callData = await retellResponse.json()

      return NextResponse.json(
        {
          access_token: callData.access_token,
          call_id: callData.call_id,
          agentId: agentId,
          configured: true,
          callCreated: true,
          clientIp: clientIp, // For debugging purposes
        },
        {
          headers: NO_CACHE_HEADERS,
        }
      )
    } catch (callError) {
      console.error("Web call creation error:", callError)
      return NextResponse.json(
        {
          agentId: agentId,
          configured: true,
          callCreated: false,
          error: callError instanceof Error ? callError.message : "Unknown error",
        },
        {
          headers: NO_CACHE_HEADERS,
        }
      )
    }
  } catch (error) {
    console.error("Retell API error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        configured: false,
      },
      { 
        status: 500,
        headers: NO_CACHE_HEADERS,
      },
    )
  }
}
