"use client"

import { useState } from "react"
import { RoastMode } from "@/components/roast-mode"
import { StandupMode } from "@/components/standup-mode"
import { ModeToggle } from "@/components/mode-toggle"
import { ModeSelector } from "@/components/mode-selector"

export default function Home() {
  const [mode, setMode] = useState<"roast" | "standup">("roast")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{mode === "roast" ? "RoastMe 🔥" : "Stand-Up AI 🎭"}</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeSelector mode={mode} setMode={setMode} />
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 md:py-12">{mode === "roast" ? <RoastMode /> : <StandupMode />}</main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col gap-4 md:h-16 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built with AI. Use responsibly and keep it fun!
          </p>
        </div>
      </footer>
    </div>
  )
}
