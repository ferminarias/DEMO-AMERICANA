import { type NextRequest, NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/validators"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for tracking
    const headersList = headers()
    const forwarded = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwarded?.split(",")[0] || realIp || "unknown"

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Get additional tracking data
    const userAgent = headersList.get("user-agent") || ""
    const referer = headersList.get("referer") || ""

    // Crear objeto con los datos del lead
    const leadData = {
      id: crypto.randomUUID(),
      full_name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      interest_program: validatedData.interestProgram,
      message: validatedData.message,
      utm_source: validatedData.utmSource,
      utm_medium: validatedData.utmMedium,
      utm_campaign: validatedData.utmCampaign,
      utm_term: validatedData.utmTerm,
      utm_content: validatedData.utmContent,
      referrer: referer,
      path: validatedData.path,
      status: "new",
      priority: "medium",
      created_at: new Date().toISOString(),
      client_ip: clientIp,
      user_agent: userAgent,
    }

    // Log los datos (en producción podrías enviarlos a un servicio externo)
    console.log("[contact] Nuevo lead recibido:", leadData)

    // Aquí puedes integrar con servicios como:
    // - SendGrid/Mailgun para enviar emails
    // - Google Sheets API
    // - Airtable
    // - Notion API
    // - Webhook a Zapier/Make
    // - etc.

    return NextResponse.json(
      {
        message: "Mensaje enviado correctamente. Te contactaremos pronto.",
        id: leadData.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[contact] Contact form error:", error)

    // ZodError detection without direct import
    if (typeof error === "object" && error !== null && (error as any).name === "ZodError") {
      return NextResponse.json({ error: "Datos inválidos. Verifica la información ingresada." }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Error interno del servidor. Intenta nuevamente.", detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
