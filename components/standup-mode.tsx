"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StandupResult } from "@/components/standup-result"
import { Mic, Loader2 } from "lucide-react"

// List of comedian styles
const comedianStyles = [
  { id: "chapelle", name: "Dave Chappelle" },
  { id: "burr", name: "Bill Burr" },
  { id: "schumer", name: "Amy Schumer" },
  { id: "rock", name: "Chris Rock" },
  { id: "seinfeld", name: "Jerry Seinfeld" },
  { id: "wong", name: "Ali Wong" },
  { id: "burnham", name: "Bo Burnham" },
  { id: "mulaney", name: "John Mulaney" },
  { id: "silverman", name: "Sarah Silverman" },
  { id: "hedberg", name: "Mitch Hedberg" },
]

export function StandupMode() {
  const [topic, setTopic] = useState("")
  const [comedianStyle, setComedianStyle] = useState("chapelle")
  const [standupResult, setStandupResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!topic) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/standup", {
        method: "POST",
        body: JSON.stringify({
          topic,
          comedianStyle,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate standup")
      }

      const result = await response.text()
      setStandupResult(result)
    } catch (error) {
      console.error("Error generating standup:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedComedian = comedianStyles.find((c) => c.id === comedianStyle)?.name || "Dave Chappelle"

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Stand-Up AI <span className="text-purple-500">🎭</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Generate a stand-up comedy bit in the style of your favorite comedian
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">What should the comedy be about?</Label>
              <Input
                id="topic"
                placeholder="Dating, technology, air travel, social media..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comedian">Comedian Style</Label>
              <Select value={comedianStyle} onValueChange={setComedianStyle}>
                <SelectTrigger id="comedian">
                  <SelectValue placeholder="Select a comedian style" />
                </SelectTrigger>
                <SelectContent>
                  {comedianStyles.map((comedian) => (
                    <SelectItem key={comedian.id} value={comedian.id}>
                      {comedian.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSubmit} disabled={isLoading || !topic} className="w-full" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Writing comedy...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Generate Stand-Up
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {standupResult && <StandupResult content={standupResult} comedian={selectedComedian} />}
    </div>
  )
}

