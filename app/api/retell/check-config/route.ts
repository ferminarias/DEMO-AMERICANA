import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const retellApiKey = process.env.RETELL_API_KEY
    const agentId = process.env.RETELL_AGENT_ID

    const configured = Boolean(retellApiKey && agentId)

    return NextResponse.json({
      configured,
      message: configured
        ? "Retell AI está configurado correctamente"
        : "Retell AI no está configurado. Por favor, configura RETELL_API_KEY y RETELL_AGENT_ID en las variables de entorno.",
    })
  } catch (error) {
    console.error("Error checking Retell config:", error)
    return NextResponse.json(
      {
        configured: false,
        error: "Error al verificar la configuración",
      },
      { status: 500 },
    )
  }
}
