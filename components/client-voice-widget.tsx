"use client"

import dynamic from "next/dynamic"

// Load voice widget dynamically to avoid SSR issues
const DynamicVoiceWidget = dynamic(
  () => import("@/features/voice/internal/voice-widget").then((mod) => ({ default: mod.VoiceWidget })),
  { ssr: false },
)

interface ClientVoiceWidgetProps {
  className?: string
  variant?: "default" | "embed"
}

export function ClientVoiceWidget({ className, variant = "default" }: ClientVoiceWidgetProps) {
  return <DynamicVoiceWidget className={className} variant={variant} />
}
