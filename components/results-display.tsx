"use client"

import { useState } from "react"

interface ResultsDisplayProps {
  results: {
    raw_text: string
    simplified_text: string
  }
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [copiedRaw, setCopiedRaw] = useState(false)
  const [copiedSimplified, setCopiedSimplified] = useState(false)

  const copyToClipboard = (text: string, isRaw: boolean) => {
    navigator.clipboard.writeText(text)
    if (isRaw) {
      setCopiedRaw(true)
      setTimeout(() => setCopiedRaw(false), 2000)
    } else {
      setCopiedSimplified(true)
      setTimeout(() => setCopiedSimplified(false), 2000)
    }
  }

  return (
    <div className="space-y-6 h-full">
      {/* Raw Text */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-xl">📝</span> Extracted Text
          </h3>
          <button
            onClick={() => copyToClipboard(results.raw_text, true)}
            className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {copiedRaw ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded p-4 min-h-40 max-h-60 overflow-y-auto">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {results.raw_text || "No text detected"}
          </p>
        </div>
      </div>

      {/* Simplified Text */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-xl">✨</span> Simplified Notes
          </h3>
          <button
            onClick={() => copyToClipboard(results.simplified_text, false)}
            className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-700 dark:text-blue-300 rounded hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800 transition-colors"
          >
            {copiedSimplified ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded p-4 min-h-40 max-h-60 overflow-y-auto border border-blue-100 dark:border-blue-900">
          <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {results.simplified_text || "No simplification generated"}
          </p>
        </div>
      </div>
    </div>
  )
}
