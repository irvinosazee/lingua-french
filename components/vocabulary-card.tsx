"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"
import { speakText, type VocabularyItem } from "@/lib/api"

interface VocabularyCardProps {
  vocabulary: VocabularyItem
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  const handleSpeak = () => {
    speakText(vocabulary.french)
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{vocabulary.french}</h3>
              <Button variant="ghost" size="sm" onClick={handleSpeak} className="h-8 w-8 p-0">
                <Volume2 className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
            <p className="text-gray-600">{vocabulary.english}</p>
            {vocabulary.pronunciation && (
              <p className="text-sm text-gray-500 mt-1 italic">/{vocabulary.pronunciation}/</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
