'use client'

import { useState } from 'react'
import { Anchor, Activity } from 'lucide-react'
import { NovoContainer } from '@/components/argos/novo-container'
import { MapaPatio } from '@/components/argos/mapa-patio'
import { SugestaoPainel } from '@/components/argos/sugestao-painel'
import type { SugestaoIA } from '@/lib/containerApiService'

export default function ArgosArmazem() {
  const [resultado, setResultado] = useState<SugestaoIA | null>(null)
  const [vagaConfirmada, setVagaConfirmada] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[var(--navy)] border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Anchor size={20} className="text-[var(--gold)]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Argos Armazém</h1>
              <p className="text-white/50 text-xs">Gêmeo Digital Portuário — Terminal Wilson Sons</p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
            <Activity size={12} />
            Sistema Online
          </span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] gap-6 items-start">
          <MapaPatio />

          <aside className="xl:sticky xl:top-6">
            <NovoContainer
              onSuccess={(r) => {
                setResultado(r)
                setVagaConfirmada(false)
              }}
              onReset={() => {
                setResultado(null)
                setVagaConfirmada(false)
              }}
            />
          </aside>
        </div>

        {resultado && (
          <SugestaoPainel
            resultado={resultado}
            confirmada={vagaConfirmada}
            onConfirmada={() => setVagaConfirmada(true)}
          />
        )}
      </main>
    </div>
  )
}