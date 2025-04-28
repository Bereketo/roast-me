"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { RoastResult } from "@/components/roast-result"
import { Flame, Loader2 } from "lucide-react"

export function RoastMode() {
  const [inputType, setInputType] = useState<"text" | "photo">("text")
  const [textInput, setTextInput] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [severity, setSeverity] = useState<"mild" | "medium" | "savage">("medium")
  const [roastResult, setRoastResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (inputType === "text" && !textInput) return
    if (inputType === "photo" && !imageUrl) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        body: JSON.stringify({
          type: inputType,
          content: inputType === "text" ? textInput : imageUrl,
          severity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate roast")
      }

      const result = await response.text()
      setRoastResult(result)
    } catch (error) {
      console.error("Error generating roast:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          RoastMe <span className="text-red-500">🔥</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Get hilariously roasted by AI. Enter some details or upload a photo!
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <Tabs value={inputType} onValueChange={(value) => setInputType(value as "text" | "photo")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text">Text Description</TabsTrigger>
              <TabsTrigger value="photo">Upload Photo</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Describe yourself or what you want roasted</Label>
                <Textarea
                  id="description"
                  placeholder="I'm a software developer who spends too much time debugging and drinking coffee..."
                  className="min-h-[120px]"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="photo" className="space-y-4">
              <FileUploader onFileUpload={handleImageUpload} />
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Uploaded"
                    className="max-h-[200px] rounded-md mx-auto"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Roast Severity</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={severity === "mild" ? "default" : "outline"}
                  onClick={() => setSeverity("mild")}
                  className="flex-1"
                >
                  Mild
                </Button>
                <Button
                  variant={severity === "medium" ? "default" : "outline"}
                  onClick={() => setSeverity("medium")}
                  className="flex-1"
                >
                  Medium
                </Button>
                <Button
                  variant={severity === "savage" ? "default" : "outline"}
                  onClick={() => setSeverity("savage")}
                  className="flex-1"
                >
                  Savage
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || (inputType === "text" && !textInput) || (inputType === "photo" && !imageUrl)}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Roasting...
                </>
              ) : (
                <>
                  <Flame className="mr-2 h-4 w-4" />
                  Roast Me!
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {roastResult && <RoastResult content={roastResult} />}
    </div>
  )
}

