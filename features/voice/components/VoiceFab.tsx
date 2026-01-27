"use client"

import { Headphones } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import * as React from "react"

export function VoiceFab({ isOpen, setIsOpen, className, children, onClose }: { isOpen: boolean; setIsOpen: (v: boolean) => void; className?: string; children?: React.ReactNode; onClose: () => void }) {
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
            className="h-14 w-14 md:h-16 md:w-16 rounded-full text-white shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center"
            style={{ backgroundColor: 'var(--unab-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--unab-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--unab-primary)'}
          >
            <Headphones className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" strokeWidth={2.25} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[480px] md:w-[520px] lg:w-[560px] p-0 flex flex-col h-dvh max-h-screen overflow-auto bg-white">
          {children}
        </SheetContent>
      </Sheet>
    </div>
  )
}



