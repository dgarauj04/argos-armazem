'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import ResultCard from '@/components/form/ResultCard'
import { confirmarAlocacao, type SugestaoIA } from '@/lib/containerApiService'

interface SugestaoPainelProps {
  resultado: SugestaoIA
  confirmada: boolean
  onConfirmada: () => void
}

export function SugestaoPainel({ resultado, confirmada, onConfirmada }: SugestaoPainelProps) {
  const [confirmando, setConfirmando] = useState(false)
  const [erro, setErro] = useState('')

  const handleConfirmar = async () => {
    setConfirmando(true)
    setErro('')
    try {
      await confirmarAlocacao(resultado.numero_container, resultado.vaga_id)
      onConfirmada()
    } catch {
      setErro('Não foi possível confirmar a alocação. Tente novamente.')
    } finally {
      setConfirmando(false)
    }
  }

  return (
    <section className="animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-6 bg-[var(--gold)] rounded-full" />
        <h2 className="text-lg font-bold text-foreground">Sugestão de Alocação</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-stretch">
        <ResultCard result={resultado} />

        <div className="flex lg:flex-col justify-center gap-2 lg:w-64">
          {!confirmada ? (
            <button
              onClick={handleConfirmar}
              disabled={confirmando}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[var(--navy)] text-white font-semibold py-3 px-4 rounded-xl shadow hover:bg-[var(--navy-light)] active:scale-95 transition-all text-sm disabled:opacity-60"
            >
              {confirmando ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Confirmando…</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Confirmar Vaga {resultado.vaga_id}</>
              )}
            </button>
          ) : (
            <div className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold py-3 px-4 rounded-xl text-sm text-center">
              <CheckCircle2 className="w-4 h-4" /> Confirmada!
            </div>
          )}
          {erro && <p className="text-xs text-red-500 text-center">{erro}</p>}
        </div>
      </div>
    </section>
  )
}