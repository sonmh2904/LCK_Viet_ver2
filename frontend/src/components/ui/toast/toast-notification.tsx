"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"

export interface ToastProps {
  message: string
  type: "success" | "error"
  isVisible: boolean
  onClose: () => void
}

export function ToastNotification({ message, type, isVisible, onClose }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      // Allow exit animation to complete
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!shouldRender) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center justify-end">
      <div
        className={`
          flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-lg backdrop-blur-xl
          transform transition-all duration-300 ease-in-out
          ${isVisible 
            ? "translate-x-0 opacity-100 scale-100" 
            : "translate-x-full opacity-0 scale-95"
          }
          ${type === "success"
            ? "bg-green-500/90 border-green-400/50 text-white"
            : "bg-red-500/90 border-red-400/50 text-white"
          }
        `}
      >
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <p className="font-medium text-sm">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
