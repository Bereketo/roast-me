"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'

interface FileUploaderProps {
  onFileUpload: (url: string) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // In a real app, you would upload this to a server or cloud storage
    // For this demo, we'll create a local URL
    const url = URL.createObjectURL(file)
    onFileUpload(url)
  }

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg ${
        dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      } transition-colors duration-200`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
        <p className="mb-2 text-sm text-muted-foreground">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (Max 5MB)</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleChange}
      />
      <Button type="button" variant="ghost" size="sm" onClick={onButtonClick} className="mt-2">
        Select File
      </Button>
    </div>
  )
}
