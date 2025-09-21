"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Volume2 } from "lucide-react"
import { speakText, type Exercise } from "@/lib/api"

interface ExerciseComponentProps {
  exercise: Exercise
  onAnswerSubmit: (exerciseId: number, answer: string) => void
  feedback?: { correct: boolean; xp: number }
  userAnswer?: string
}

export function ExerciseComponent({ exercise, onAnswerSubmit, feedback, userAnswer }: ExerciseComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [inputAnswer, setInputAnswer] = useState<string>("")

  const handleSubmit = () => {
    const answer = exercise.type === "mcq" ? selectedAnswer : inputAnswer
    if (answer.trim()) {
      onAnswerSubmit(exercise.id, answer)
    }
  }

  const handlePlayAudio = () => {
    if (exercise.type === "listening" && exercise.audioUrl) {
      // In a real app, you would play the audio file
      // For demo purposes, we'll use text-to-speech
      speakText(exercise.correctAnswer)
    }
  }

  const isAnswered = !!feedback
  const currentAnswer = exercise.type === "mcq" ? selectedAnswer : inputAnswer

  return (
    <div className="space-y-6">
      {/* Question */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{exercise.question}</h3>

        {/* Audio button for listening exercises */}
        {exercise.type === "listening" && (
          <div className="mb-4">
            <Button onClick={handlePlayAudio} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Volume2 className="h-4 w-4" />
              Play Audio
            </Button>
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-4">
        {exercise.type === "mcq" && exercise.options && (
          <div className="grid grid-cols-1 gap-3">
            {exercise.options.map((option, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  selectedAnswer === option ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                } ${isAnswered ? "cursor-not-allowed" : ""}`}
                onClick={() => !isAnswered && setSelectedAnswer(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isAnswered && option === exercise.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {isAnswered && option === userAnswer && option !== exercise.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(exercise.type === "translate" || exercise.type === "listening") && (
          <div>
            <Input
              placeholder="Type your answer here..."
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={isAnswered}
              className="text-lg p-4"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={!currentAnswer.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          Submit Answer
        </Button>
      )}

      {/* Feedback */}
      {feedback && (
        <Card className={`${feedback.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {feedback.correct ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${feedback.correct ? "text-green-800" : "text-red-800"}`}>
                    {feedback.correct ? "Correct!" : "Try Again"}
                  </p>
                  {!feedback.correct && (
                    <p className="text-sm text-gray-600">
                      The correct answer is: <span className="font-medium">{exercise.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
              {feedback.correct && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  +{feedback.xp} XP
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
