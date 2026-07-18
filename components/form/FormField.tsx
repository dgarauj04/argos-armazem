'use client'

import { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export default function FormField({ label, required, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
