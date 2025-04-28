"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2, ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface RoastResultProps {
  content: string
}

export function RoastResult({ content }: RoastResultProps) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The roast has been copied to your clipboard",
    })
  }

  const handleLike = (value: boolean) => {
    setLiked(value)
    toast({
      title: value ? "Glad you liked it!" : "Sorry about that",
      description: value ? "We'll keep improving our roasts" : "We'll try to do better next time",
    })
  }

  return (
    <Card className="border-red-500/20 bg-gradient-to-b from-background to-red-950/10">
      <CardContent className="pt-6">
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-4xl">🔥</div>
          <blockquote className="italic text-xl border-l-4 border-red-500 pl-4 py-2">{content}</blockquote>
        </div>
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
            Good one
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLike(false)}
            className={liked === false ? "bg-red-500/20" : ""}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Too harsh
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

