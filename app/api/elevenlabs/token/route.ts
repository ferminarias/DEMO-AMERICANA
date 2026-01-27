import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Get client IP for basic tracking
    const headersList = headers()
    const forwarded = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwarded?.split(",")[0] || realIp || "unknown"
    
    // Validación de origen más robusta (servidor)
    const origin = headersList.get("origin") || headersList.get("referer") || ""
    const userAgent = headersList.get("user-agent") || ""
    
    // Lista de dominios autorizados
    const allowedDomains = [
      'localhost',
      '127.0.0.1',
      'v0-ulinea-website-build.vercel.app', // Tu propio dominio
      'bot.dominiodepruebas.online',
      'bot.ddev.site',
      'wordpress.com',
      'wordpress.org',
        'unab.dominiodepruebas.online',
        'agente-unab-demo-3h9y2vpud-ferminariasml-gmailcoms-projects.vercel.app',
        'https://agente-unab-demo-3h9y2vpud-ferminariasml-gmailcoms-projects.vercel.app/',
        'https://agente-unab-demo.vercel.app/',
        'agente-unab-demo.vercel.app'
    ]
    
    // Validar si el origen está en la lista de dominios autorizados
    const isAuthorized = allowedDomains.some(domain => origin.includes(domain))
    
    // Log para debugging
    console.log(`[TOKEN] Request from: ${origin || 'direct'}, Authorized: ${isAuthorized}`)
    
    if (!isAuthorized && origin) {
      console.warn(`[SECURITY] Blocked origin: ${origin}`)
      return NextResponse.json({
        error: "Acceso denegado desde este dominio",
        configured: false,
      }, { status: 403 })
    }

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY
    const agentId = process.env.ELEVENLABS_AGENT_ID

    if (!elevenLabsApiKey || !agentId) {
      return NextResponse.json(
        {
          error:
            "ElevenLabs no está configurado. El asistente de voz estará disponible una vez completada la configuración.",
          configured: false,
        },
        { status: 200 },
      )
    }

    try {
      const tokenResponse = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${agentId}`, {
        method: "GET",
        headers: {
          "xi-api-key": elevenLabsApiKey,
          "Content-Type": "application/json",
        },
      })

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text()
        console.error("ElevenLabs token generation failed:", errorText)

        return NextResponse.json({
          agentId: agentId,
          configured: true,
          tokenGenerated: false,
          fallbackMode: true,
          error: `Token generation failed: ${errorText}`,
        })
      }

      const tokenData = await tokenResponse.json()

      return NextResponse.json({
        token: tokenData.token,
        agentId: agentId,
        configured: true,
        tokenGenerated: true,
        clientIp: clientIp, // For debugging purposes
      })
    } catch (tokenError) {
      console.error("Token generation error:", tokenError)
      return NextResponse.json({
        agentId: agentId,
        configured: true,
        tokenGenerated: false,
        fallbackMode: true,
        error: tokenError instanceof Error ? tokenError.message : "Unknown error",
      })
    }
  } catch (error) {
    console.error("ElevenLabs token error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        configured: false,
      },
      { status: 500 },
    )
  }
}
