"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Mic } from 'lucide-react'

interface ModeSelectorProps {
  mode: "roast" | "standup"
  setMode: (mode: "roast" | "standup") => void
}

export function ModeSelector({ mode, setMode }: ModeSelectorProps) {
  return (
    <Tabs value={mode} onValueChange={(value) => setMode(value as "roast" | "standup")}>
      <TabsList className="grid w-[200px] grid-cols-2">
        <TabsTrigger value="roast" className="flex items-center gap-1">
          <Flame className="h-4 w-4" />
          <span>RoastBot</span>
        </TabsTrigger>
        <TabsTrigger value="standup" className="flex items-center gap-1">
          <Mic className="h-4 w-4" />
          <span>Stand-Up</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
