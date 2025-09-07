"use client"

import { useEffect, useState } from "react"

export function LoadingPage() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/30" />

      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Primary loading spinner */}
        <div className="relative">
          {/* Outer ring with subtle glow */}
          <div className="w-20 h-20 rounded-full border-4 border-muted/20 relative">
            {/* Animated spinner */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin shadow-lg shadow-primary/20" />
            {/* Inner glow effect */}
            <div className="absolute inset-2 rounded-full bg-primary/5 animate-pulse" />
          </div>

          {/* Secondary ripple effect */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground font-sans">Loading{dots}</h2>
          <p className="text-muted-foreground text-sm max-w-xs text-balance">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Progress indicator */}
        <div className="w-64 h-1 bg-muted/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-pulse"
            style={{
              animation: "loading-progress 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; opacity: 0.5; }
          50% { width: 70%; opacity: 1; }
          100% { width: 100%; opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
