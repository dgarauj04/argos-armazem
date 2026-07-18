'use client'

import { InputHTMLAttributes } from 'react'

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export default function StyledInput({ error, className = '', ...props }: StyledInputProps) {
  return (
    <input
      className={`w-full h-12 px-4 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        ${className}`}
      {...props}
    />
  )
}
