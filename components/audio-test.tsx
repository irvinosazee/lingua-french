"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, TestTube } from "lucide-react"

export function AudioTest() {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<string>("")

    const testSpeechSynthesis = () => {
        setIsLoading(true)
        setStatus("Testing...")

        if (!("speechSynthesis" in window)) {
            setStatus("❌ Speech synthesis not supported")
            setIsLoading(false)
            return
        }

        try {
            // Cancel any ongoing speech
            speechSynthesis.cancel()

            const utterance = new SpeechSynthesisUtterance("Bonjour")
            utterance.lang = "fr-FR"
            utterance.rate = 0.8
            utterance.volume = 1.0

            utterance.onstart = () => {
                setStatus("✅ Speech started successfully")
            }

            utterance.onend = () => {
                setStatus("✅ Speech completed successfully")
                setIsLoading(false)
            }

            utterance.onerror = (event) => {
                setStatus(`❌ Speech error: ${event.error}`)
                setIsLoading(false)
            }

            // Get available voices
            const voices = speechSynthesis.getVoices()
            console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`))

            // Try to find a French voice
            const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'))
            if (frenchVoice) {
                utterance.voice = frenchVoice
                console.log("Using French voice:", frenchVoice.name)
            }

            speechSynthesis.speak(utterance)

        } catch (error) {
            setStatus(`❌ Error: ${error}`)
            setIsLoading(false)
            console.error("Speech test error:", error)
        }
    }

    const checkBrowserSupport = () => {
        const voices = speechSynthesis.getVoices()
        const support = {
            speechSynthesis: "speechSynthesis" in window,
            speechSynthesisUtterance: "SpeechSynthesisUtterance" in window,
            voices: voices.length,
            frenchVoices: voices.filter(v => v.lang.startsWith('fr')).map(v => v.name),
            defaultVoice: voices.find(v => v.default)?.name || 'none',
            allVoices: voices.map(v => `${v.name} (${v.lang})`)
        }

        console.log("Full browser support:", support)
        setStatus(`Voices: ${support.voices}, French: ${support.frenchVoices.length}`)
        alert(JSON.stringify(support, null, 2))
    }

    const testSystemAudio = () => {
        setStatus("Testing system audio...")

        // Test with system beep first
        try {
            // Create a simple audio context test
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.value = 440
            gainNode.gain.value = 0.1

            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.2)

            setStatus("✅ System audio test completed")
        } catch (error) {
            setStatus(`❌ System audio error: ${error}`)
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Audio Test
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                    <Button
                        onClick={testSpeechSynthesis}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        <Volume2 className="h-4 w-4 mr-2" />
                        {isLoading ? "Testing..." : "Test Speech"}
                    </Button>
                    <Button
                        onClick={testSystemAudio}
                        variant="outline"
                    >
                        Test System Audio
                    </Button>
                    <Button
                        onClick={checkBrowserSupport}
                        variant="outline"
                    >
                        Check Support
                    </Button>
                </div>
                {status && (
                    <div className="p-2 bg-gray-100 rounded text-sm">
                        {status}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}