"use client"

import { useState } from "react"
import ImageUploader from "@/components/image-uploader"
import ResultsDisplay from "@/components/results-display"
import Header from "@/components/header"

export default function Home() {
  const [results, setResults] = useState<{
    raw_text: string
    simplified_text: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageProcess = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.statusText}`)
      }

      setResults(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process image"
      setError(errorMessage)
      console.error("[v0] Error processing image:", errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:from-background dark:via-background dark:to-slate-950">
      <Header />
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <div className="flex flex-col">
            <ImageUploader onImageSelect={handleImageProcess} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="flex flex-col">
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <p className="text-red-800 dark:text-red-200 text-sm font-medium">{error}</p>
              </div>
            )}
            {results && <ResultsDisplay results={results} />}
            {!results && !isLoading && !error && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center flex items-center justify-center min-h-96">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Upload an image to get started</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">Results will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
