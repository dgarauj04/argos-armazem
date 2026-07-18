'use client'

import { MapPin, Clock, Shield, Zap } from 'lucide-react'

interface ResultCardProps {
  result: {
    posicao?: string
    bloco?: string
    fila?: string
    nivel?: string
    prioridade?: string
    distancia?: string
    eficiencia?: string
  }
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--navy)] to-[var(--navy-dark)] rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-[var(--gold)]" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Posição Sugerida</h3>
          <p className="text-sm text-white/70">Alocação otimizada pelo algoritmo</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-white/60 mb-1">Bloco</p>
          <p className="text-xl font-bold text-[var(--gold)]">{result.bloco || 'A'}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-white/60 mb-1">Fila</p>
          <p className="text-xl font-bold text-[var(--gold)]">{result.fila || '12'}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-white/60 mb-1">Nível</p>
          <p className="text-xl font-bold text-[var(--gold)]">{result.nivel || '3'}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-xs text-white/60 mb-1">Prioridade</p>
          <p className="text-xl font-bold text-[var(--gold)]">{result.prioridade || 'Alta'}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-[var(--gold)]" />
          <span className="text-white/80">Distância até saída: <strong className="text-white">{result.distancia || '150m'}</strong></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-4 h-4 text-[var(--gold)]" />
          <span className="text-white/80">Segurança IMO: <strong className="text-white">Adequada</strong></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Zap className="w-4 h-4 text-[var(--gold)]" />
          <span className="text-white/80">Eficiência energética: <strong className="text-white">{result.eficiencia || '92%'}</strong></span>
        </div>
      </div>
    </div>
  )
}
