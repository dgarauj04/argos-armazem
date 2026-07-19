'use client'

import { useState } from 'react'
import { X, CheckCircle2, XCircle, Brain, Package, Weight, Layers, Calendar, ShipWheel } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateYardSlots, type ContainerSlot, type SlotStatus, sendToMake, BAIAS, ALTURAS } from '@/lib/mock-data'

const slots = generateYardSlots()

function getSlotBg(status: SlotStatus): string {
  switch (status) {
    case 'free':
      return 'bg-[var(--slot-free)] hover:brightness-85'
    case 'occupied':
      return 'bg-[var(--slot-occupied)] hover:brightness-200'
    case 'imo':
      return 'bg-[var(--slot-imo)] hover:brightness-85'
    case 'ai-suggested':
      return 'bg-[var(--slot-ai)] slot-ai-pulse hover:brightness-85'
    default:
      return 'bg-muted'
  }
}

function SlotDetailModal({
  slot,
  onClose,
}: {
  slot: ContainerSlot
  onClose: () => void
}) {
  const c = slot.container

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Detalhes da Vaga ${slot.id}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[var(--navy)] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Vaga</p>
            <p className="text-white text-2xl font-bold">{slot.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-bold uppercase',
                slot.status === 'free'
                  ? 'bg-green-500 text-white'
                  : slot.status === 'imo'
                  ? 'bg-amber-500 text-white'
                  : slot.status === 'ai-suggested'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-white'
              )}
            >
              {slot.status === 'free'
                ? 'Livre'
                : slot.status === 'imo'
                ? 'IMO'
                : slot.status === 'ai-suggested'
                ? 'Sugerida IA'
                : 'Ocupada'}
            </span>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          {c ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Package size={18} className="text-[var(--navy)]" />
                <div>
                  <p className="text-xs text-muted-foreground">ID do Contêiner</p>
                  <p className="font-mono font-bold text-foreground">{c.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Weight size={18} className="text-[var(--navy)]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Peso Bruto</p>
                    <p className="font-bold text-foreground">{c.peso}t</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Layers size={18} className="text-[var(--navy)]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Altura da Pilha</p>
                    <p className="font-bold text-foreground">Nível {c.alturaPilha}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <ShipWheel size={18} className="text-[var(--navy)]" />
                <div>
                  <p className="text-xs text-muted-foreground">Armador</p>
                  <p className="font-bold text-foreground">{c.armador}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Categoria</p>
                  <span
                    className={cn(
                      'inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold',
                      c.categoria === 'IMO'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    )}
                  >
                    {c.categoria}
                  </span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Prioridade</p>
                  <span
                    className={cn(
                      'inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold',
                      c.prioridade === 'Alta'
                        ? 'bg-red-100 text-red-800'
                        : c.prioridade === 'Média'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    )}
                  >
                    {c.prioridade}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Calendar size={18} className="text-[var(--navy)]" />
                <div>
                  <p className="text-xs text-muted-foreground">Saída Prevista</p>
                  <p className="font-bold text-foreground">
                    {new Date(c.dataSaida).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Vaga disponível</p>
              <p className="text-xs mt-1">Nenhum contêiner alocado nesta posição</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AIPanel() {
  const [confirmed, setConfirmed] = useState<null | boolean>(null)

  const handleConfirm = async () => {
    setConfirmed(true)
    await sendToMake({
      event: 'alocacao_confirmada',
      vaga: 'C2',
      justificativa: 'Peso da carga exige altura nível 1 ou 2',
      timestamp: new Date().toISOString(),
    })
  }

  const handleReject = () => {
    setConfirmed(false)
  }

  return (
    <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
      <div className="bg-[var(--navy)] px-5 py-3 flex items-center gap-2">
        <Brain size={18} className="text-[var(--gold)]" />
        <h2 className="font-semibold text-white text-sm">Sugestão do Sistema</h2>
      </div>

      {confirmed === null && (
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <Brain size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-blue-900 mb-0.5">
                IA recomenda a Vaga{' '}
                <span className="text-blue-600 font-extrabold">C2</span>
              </p>
              <p className="text-blue-700">
                Justificativa: Peso da carga (28,9t) exige posição em altura nível 1 ou 2. Vaga C2
                encontra-se livre, estruturalmente apta e próxima à saída principal.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--navy)] text-white font-semibold py-3 px-4 rounded-lg shadow cursor-pointer hover:bg-[var(--navy-light)] active:scale-95 transition-all text-sm"
            >
              <CheckCircle2 size={16} />
              Confirmar Alocação
            </button>
            <button
              onClick={handleReject}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[var(--navy)] font-semibold py-3 px-4 rounded-lg shadow border border-border cursor-pointer hover:bg-[#fa6555] active:scale-95 transition-all text-sm"
            >
              <XCircle size={16} />
              Rejeitar / Outra Vaga
            </button>
          </div>
        </div>
      )}

      {confirmed === true && (
        <div className="p-4 flex items-center gap-3 bg-green-50 border-t border-green-200">
          <CheckCircle2 size={20} className="text-green-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-green-800">Alocação Confirmada!</p>
            <p className="text-xs text-green-700">Contêiner alocado na Vaga C2. Registro enviado ao sistema.</p>
          </div>
        </div>
      )}

      {confirmed === false && (
        <div className="p-4 flex items-center gap-3 bg-amber-50 border-t border-amber-200">
          <XCircle size={20} className="text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-800">Sugestão Rejeitada</p>
            <p className="text-xs text-amber-700">Selecione manualmente uma vaga disponível no mapa.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function MapaPatio() {
  const [selectedSlot, setSelectedSlot] = useState<ContainerSlot | null>(null)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mapa Interativo do Pátio</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Gêmeo Digital — clique em qualquer vaga para ver detalhes ou alocar um contêiner.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          { color: 'bg-[var(--slot-free)]', label: 'Vaga Livre' },
          { color: 'bg-[var(--slot-occupied)]', label: 'Vaga Ocupada' },
          { color: 'bg-[var(--slot-imo)]', label: 'Zona IMO' },
          { color: 'bg-[var(--slot-ai)] slot-ai-pulse', label: 'Sugerida pela IA' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={cn('w-4 h-4 rounded', item.color)} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Yard grid */}
        <div className="xl:col-span-2 bg-card rounded-xl shadow-md border border-border overflow-hidden">
          <div className="bg-[var(--navy)] px-5 py-3 flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm">Pátio de Contêineres — Terminal PS01</h2>
            <span className="text-white/60 text-xs">{BAIAS.length} Baias × {ALTURAS.length} Alturas</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="min-w-[480px]">
              <div className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: `2rem repeat(${BAIAS.length}, 1fr)` }}>
                <div />
                {BAIAS.map((b) => (
                  <div key={b} className="text-center text-xs font-bold text-muted-foreground">
                    {b}
                  </div>
                ))}
              </div>

              {ALTURAS.map((altura) => (
                <div
                  key={altura}
                  className="grid gap-1.5 mb-1.5"
                  style={{ gridTemplateColumns: `2rem repeat(${BAIAS.length}, 1fr)` }}
                >
                  <div className="flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {altura}
                  </div>
                  {BAIAS.map((baia) => {
                    const slot = slots.find((s) => s.baia === baia && s.altura === altura)!
                    return (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        title={`Vaga ${slot.id}${slot.container ? ` — ${slot.container.id}` : ''}`}
                        className={cn(
                          'aspect-square rounded-md transition-all duration-150 flex items-center justify-center text-[9px] font-bold text-white cursor-pointer shadow-sm active:scale-95',
                          getSlotBg(slot.status)
                        )}
                        aria-label={`Vaga ${slot.id}, status: ${slot.status}`}
                      >
                        {slot.id}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Panel */}
        <div className="flex flex-col gap-4">
          <AIPanel />

          {/* Quick stats */}
          <div className="bg-card rounded-xl shadow-md border border-border p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Resumo do Pátio</h3>
            {[
              { label: 'Vagas Livres', value: slots.filter((s) => s.status === 'free').length, color: 'text-green-600' },
              { label: 'Vagas Ocupadas', value: slots.filter((s) => s.status === 'occupied').length, color: 'text-gray-600' },
              { label: 'Zona IMO', value: slots.filter((s) => s.status === 'imo').length, color: 'text-amber-600' },
              { label: 'Sugestão IA', value: slots.filter((s) => s.status === 'ai-suggested').length, color: 'text-blue-600' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={cn('font-bold', item.color)}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slot detail modal */}
      {selectedSlot && (
        <SlotDetailModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  )
}
