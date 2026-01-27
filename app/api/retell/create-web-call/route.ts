import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { retellCallLimiter } from "@/lib/ratelimit"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for basic tracking
    const headersList = headers()
    const forwarded = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwarded?.split(",")[0] || realIp || "unknown"

    // Rate limiting para prevenir abuso
    try {
      await retellCallLimiter.consume(clientIp)
    } catch (rateLimitError: any) {
      const waitSeconds = Math.ceil((rateLimitError.msBeforeNext || 0) / 1000)
      console.warn(`[RATE_LIMIT] IP ${clientIp} exceeded limit, wait ${waitSeconds}s`)
      return NextResponse.json(
        {
          error: `Demasiadas solicitudes. Por favor, espera ${waitSeconds} segundos.`,
          configured: false,
        },
        { 
          status: 429,
          headers: {
            "Retry-After": waitSeconds.toString(),
          }
        },
      )
    }

    // Validación de origen más robusta (servidor)
    const origin = headersList.get("origin") || headersList.get("referer") || ""
    const userAgent = headersList.get("user-agent") || ""

    // Lista de dominios autorizados
    const allowedDomains = [
      "localhost",
      "127.0.0.1",
      "demo-americana.vercel.app",
      "americana.edu.py",
      "www.americana.edu.py",
      "vercel.app",
    ]

    // Validar si el origen está en la lista de dominios autorizados
    const isAuthorized = allowedDomains.some((domain) => origin.includes(domain))

    // Log para debugging
    console.log(`[RETELL] Request from: ${origin || "direct"}, Authorized: ${isAuthorized}`)

    if (!isAuthorized && origin) {
      console.warn(`[SECURITY] Blocked origin: ${origin}`)
      return NextResponse.json(
        {
          error: "Acceso denegado desde este dominio",
          configured: false,
        },
        { status: 403 },
      )
    }

    const retellApiKey = process.env.RETELL_API_KEY
    const agentId = process.env.RETELL_AGENT_ID

    if (!retellApiKey || !agentId) {
      return NextResponse.json(
        {
          error:
            "Retell AI no está configurado. El asistente de voz estará disponible una vez completada la configuración.",
          configured: false,
        },
        { status: 200 },
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

        return NextResponse.json({
          agentId: agentId,
          configured: true,
          callCreated: false,
          error: `Web call creation failed: ${errorText}`,
        })
      }

      const callData = await retellResponse.json()

      return NextResponse.json({
        access_token: callData.access_token,
        call_id: callData.call_id,
        agentId: agentId,
        configured: true,
        callCreated: true,
        clientIp: clientIp, // For debugging purposes
      })
    } catch (callError) {
      console.error("Web call creation error:", callError)
      return NextResponse.json({
        agentId: agentId,
        configured: true,
        callCreated: false,
        error: callError instanceof Error ? callError.message : "Unknown error",
      })
    }
  } catch (error) {
    console.error("Retell API error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        configured: false,
      },
      { status: 500 },
    )
  }
}
