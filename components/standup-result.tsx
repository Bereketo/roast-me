"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2, ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface StandupResultProps {
  content: string
  comedian: string
}

export function StandupResult({ content, comedian }: StandupResultProps) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The comedy bit has been copied to your clipboard",
    })
  }

  const handleLike = (value: boolean) => {
    setLiked(value)
    toast({
      title: value ? "Glad you liked it!" : "Not funny enough?",
      description: value ? "We'll keep the jokes coming" : "We'll try to be funnier next time",
    })
  }

  return (
    <Card className="border-purple-500/20 bg-gradient-to-b from-background to-purple-950/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          <span>In the style of {comedian}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line text-lg">{content}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLike(true)}
            className={liked === true ? "bg-green-500/20" : ""}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Funny
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLike(false)}
            className={liked === false ? "bg-red-500/20" : ""}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Not funny
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

