'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface FormToastProps {
  message: string
  onClose: () => void
}

export default function FormToast({ message, onClose }: FormToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl shadow-lg flex items-start gap-3 max-w-md">
        <span className="text-lg">⚠</span>
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
