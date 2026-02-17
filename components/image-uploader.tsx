"use client"

import { useRef, useState, type ChangeEvent, type DragEvent } from "react"

interface ImageUploaderProps {
  onImageSelect: (file: File) => void
  isLoading: boolean
}

export default function ImageUploader({ onImageSelect, isLoading }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onImageSelect(file)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        onDrop={handleDrop}
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-96 ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
            : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="max-h-80 max-w-full object-contain rounded"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Upload Handwritten Text Image</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Drag and drop your image here or click to browse
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">Supported formats: JPEG, PNG</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={isLoading}
      />
      {isLoading && (
        <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Processing image...</span>
        </div>
      )}
    </div>
  )
}
