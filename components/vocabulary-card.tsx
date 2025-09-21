"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"
import { speakText, type VocabularyItem } from "@/lib/api"

interface VocabularyCardProps {
  vocabulary: VocabularyItem
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSpeak = () => {
    // Handle both field naming conventions for compatibility
    const textToSpeak = vocabulary.french || (vocabulary as any).fr
    if (!textToSpeak) {
      console.error('No French text found in vocabulary item:', vocabulary)
      return
    }

    setIsPlaying(true)
    speakText(textToSpeak)
    // Reset the playing state after a short delay
    setTimeout(() => setIsPlaying(false), 2000)
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {vocabulary.french || (vocabulary as any).fr}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSpeak}
                className={`h-8 w-8 p-0 ${isPlaying ? 'bg-blue-100' : ''}`}
                disabled={isPlaying}
              >
                <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-blue-800' : 'text-blue-600'}`} />
              </Button>
            </div>
            <p className="text-gray-600">{vocabulary.english || (vocabulary as any).en}</p>
            {vocabulary.pronunciation && (
              <p className="text-sm text-gray-500 mt-1 italic">/{vocabulary.pronunciation}/</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
