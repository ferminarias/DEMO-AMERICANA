"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface VoiceMessageItem {
  text: string
  timestamp: number
  type: "user" | "assistant"
}

export function VoiceMessages({ messages, isTyping }: { messages: VoiceMessageItem[]; isTyping: boolean }) {
  const bottomRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    try {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    } catch {
      // Ignoramos fallos de scroll en navegadores antiguos
    }
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-auto">
      <ScrollArea className="h-full">
        <div
          className="p-3 md:p-4 space-y-3 md:space-y-4 min-h-[160px] overscroll-contain focus:outline-none focus-visible:ring-2 focus-visible:ring-ulinea-blue/40"
          tabIndex={0}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-atomic="false"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-2.5 md:p-3 rounded-lg text-sm md:text-base leading-snug break-words whitespace-pre-wrap ${
                  message.type === "user" 
                    ? "bg-[#E9A427] text-white shadow-md" 
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className={message.type === "user" ? "font-medium" : ""}>{message.text}</p>
                <p className={`text-[10px] md:text-xs mt-1 ${
                  message.type === "user" ? "text-white/80" : "text-gray-500"
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-[70%] p-2.5 md:p-3 rounded-lg">
                <div className="flex space-x-1" aria-hidden="true">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </ScrollArea>
    </div>
  )
}
