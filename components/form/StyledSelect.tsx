'use client'

import { SelectHTMLAttributes } from 'react'

interface StyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export default function StyledSelect({ error, className = '', children, ...props }: StyledSelectProps) {
  return (
    <select
      className={`w-full h-12 px-4 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
