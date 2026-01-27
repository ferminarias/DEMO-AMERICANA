"use client"

import { Headphones } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import * as React from "react"

interface VoiceFabProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  className?: string
  children?: React.ReactNode
  onClose: () => void
  voiceStatus?: "idle" | "asking-mic" | "creating-call" | "connecting" | "connected" | "error"
}

export function VoiceFab({ isOpen, setIsOpen, className, children, onClose, voiceStatus = "idle" }: VoiceFabProps) {
  return (
    <div
      className={`fixed right-6 z-50 gpu-boost ${className || ""}`}
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <Sheet
        open={isOpen}
        onOpenChange={(open: boolean) => {
          if (!open) onClose()
          setIsOpen(open)
        }}
      >
        <SheetTrigger asChild>
          <button
            aria-label="Abrir asistente de voz"
            className={`
              h-14 w-14 md:h-16 md:w-16 rounded-full text-white shadow-2xl hover:shadow-3xl 
              transition-all duration-300 group border-2 focus:outline-none 
              focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center
              relative
              ${voiceStatus === "connected" ? "ring-4 ring-green-500/30 border-green-500/50" : "border-black/20"}
            `}
            style={{ backgroundColor: 'var(--unab-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--unab-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--unab-primary)'}
          >
            <Headphones className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" strokeWidth={2.25} />
            
            {/* Indicador sutil de llamada activa */}
            {voiceStatus === "connected" && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[480px] md:w-[520px] lg:w-[560px] p-0 flex flex-col h-dvh max-h-screen overflow-auto bg-white">
          {children}
        </SheetContent>
      </Sheet>
    </div>
  )
}



