'use client'

import { useState } from 'react'
import { X, Package, Weight, Layers, Calendar, ShipWheel } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateYardSlots, type ContainerSlot, type SlotStatus, BAIAS, ALTURAS } from '@/lib/mock-data'

const slots = generateYardSlots()

function getSlotBg(status: SlotStatus): string {
  switch (status) {
    case 'free': return 'bg-[var(--slot-free)] hover:brightness-85'
    case 'occupied': return 'bg-[var(--slot-occupied)] hover:brightness-200'
    case 'imo': return 'bg-[var(--slot-imo)] hover:brightness-85'
    case 'ai-suggested': return 'bg-[var(--slot-ai)] slot-ai-pulse hover:brightness-85'
    default: return 'bg-muted'
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

export function MapaPatio() {
  const [selectedSlot, setSelectedSlot] = useState<ContainerSlot | null>(null)

  const livres = slots.filter((s) => s.status === 'free').length
  const ocupadas = slots.filter((s) => s.status === 'occupied').length
  const imo = slots.filter((s) => s.status === 'imo').length
  const sugeridas = slots.filter((s) => s.status === 'ai-suggested').length
  const ocupacao = Math.round(((ocupadas + imo) / slots.length) * 100)

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
      <div className="bg-[var(--navy)] px-5 py-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-white font-bold text-lg">Mapa Interativo do Pátio</h1>
          <span className="text-white/60 text-xs">{BAIAS.length} Baias × {ALTURAS.length} Alturas</span>
        </div>
        <p className="text-white/60 text-xs mb-3">Clique em qualquer vaga para ver detalhes.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
          <span className="text-white/90 font-semibold">{ocupacao}% ocupado</span>
          <span className="flex items-center gap-1.5 text-white/80"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--slot-free)]" />{livres} livres</span>
          <span className="flex items-center gap-1.5 text-white/80"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--slot-occupied)]" />{ocupadas} ocupadas</span>
          <span className="flex items-center gap-1.5 text-white/80"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--slot-imo)]" />{imo} IMO</span>
          <span className="flex items-center gap-1.5 text-white/80"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--slot-ai)]" />{sugeridas} sugerida</span>
        </div>
      </div>

      <div className="p-5 overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `2.5rem repeat(${BAIAS.length}, 1fr)` }}>
            <div />
            {BAIAS.map((b) => <div key={b} className="text-center text-xs font-bold text-muted-foreground">{b}</div>)}
          </div>
          {ALTURAS.map((altura) => (
            <div key={altura} className="grid gap-2 mb-2" style={{ gridTemplateColumns: `2.5rem repeat(${BAIAS.length}, 1fr)` }}>
              <div className="flex items-center justify-center text-xs font-bold text-muted-foreground">{altura}</div>
              {BAIAS.map((baia) => {
                const slot = slots.find((s) => s.baia === baia && s.altura === altura)!
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    title={`Vaga ${slot.id}${slot.container ? ` — ${slot.container.id}` : ''}`}
                    className={cn('aspect-square rounded-lg transition-all duration-150 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer shadow-sm active:scale-95', getSlotBg(slot.status))}
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

      {selectedSlot && <SlotDetailModal slot={selectedSlot} onClose={() => setSelectedSlot(null)} />}
    </div>
  )
}
