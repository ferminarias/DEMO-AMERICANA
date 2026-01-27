"use client"

import * as React from "react"

type AnimateOnScrollProps = {
  children: React.ReactNode
  className?: string
  offset?: number
  animation?: "fade-up" | "fade-in" | "slide-up"
  durationMs?: number
}

export function AnimateOnScroll({ children, className, offset = 0.15, animation = "fade-up", durationMs = 500 }: AnimateOnScrollProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { root: null, rootMargin: "0px", threshold: offset },
    )
    io.observe(element)
    return () => io.disconnect()
  }, [offset])

  const base = "transition-all will-change-transform will-change-opacity"
  const duration = `duration-[${durationMs}ms]`
  const hiddenByAnim = {
    "fade-up": "opacity-0 translate-y-4",
    "fade-in": "opacity-0",
    "slide-up": "opacity-0 translate-y-8",
  }[animation]
  const shown = "opacity-100 translate-y-0"

  return (
    <div ref={ref} className={`${base} ${duration} ${visible ? shown : hiddenByAnim} ${className || ""}`}>
      {children}
    </div>
  )
}


