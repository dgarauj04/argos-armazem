'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTAINERS_HISTORY, type ContainerDetail, type ContainerPriority, type ContainerStatus } from '@/lib/mock-data'

const PRIORITY_COLORS: Record<ContainerPriority, string> = {
  Alta: 'bg-red-100 text-red-800',
  Média: 'bg-amber-100 text-amber-800',
  Baixa: 'bg-green-100 text-green-800',
}

const STATUS_COLORS: Record<ContainerStatus, string> = {
  'No Pátio': 'bg-blue-100 text-blue-800',
  'Saída Agendada': 'bg-amber-100 text-amber-800',
  Liberado: 'bg-green-100 text-green-800',
  Aguardando: 'bg-gray-100 text-gray-700',
}

export function Historico() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ContainerStatus | 'Todos'>('Todos')
  const [filterPriority, setFilterPriority] = useState<ContainerPriority | 'Todos'>('Todos')
  const [filterCategory, setFilterCategory] = useState<'Padrão' | 'IMO' | 'Todos'>('Todos')
  const [sortField, setSortField] = useState<keyof ContainerDetail>('dataSaida')
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let list = [...CONTAINERS_HISTORY]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.armador.toLowerCase().includes(q)
      )
    }

    if (filterStatus !== 'Todos') list = list.filter((c) => c.statusGeral === filterStatus)
    if (filterPriority !== 'Todos') list = list.filter((c) => c.prioridade === filterPriority)
    if (filterCategory !== 'Todos') list = list.filter((c) => c.categoria === filterCategory)

    list.sort((a, b) => {
      const va = a[sortField] as string | number
      const vb = b[sortField] as string | number
      if (va < vb) return sortAsc ? -1 : 1
      if (va > vb) return sortAsc ? 1 : -1
      return 0
    })

    return list
  }, [search, filterStatus, filterPriority, filterCategory, sortField, sortAsc])

  const handleSort = (field: keyof ContainerDetail) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Histórico de Contêineres</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Registros de todas as cargas operadas no terminal.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-md border border-border p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar por ID do contêiner ou armador…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)] text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-muted-foreground shrink-0" />

          {/* Status filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(['Todos', 'No Pátio', 'Saída Agendada', 'Liberado', 'Aguardando'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
                  filterStatus === s
                    ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                    : 'bg-background text-foreground border-border hover:border-[var(--navy)]'
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-border hidden sm:block" />

          {/* Priority filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as ContainerPriority | 'Todos')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-colors hover:border-[var(--gold)]"
          >
            <option value="Todos">Todas as Prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <div className="w-px h-5 bg-border hidden sm:block" />

          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(['Todos', 'Padrão', 'IMO'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
                  filterCategory === cat
                    ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                    : 'bg-background text-foreground border-border hover:border-[var(--navy)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-muted-foreground">
          {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--navy)] text-white">
                {(
                  [
                    { label: 'Status', field: 'statusGeral' },
                    { label: 'ID Contêiner', field: 'id' },
                    { label: 'Armador', field: 'armador' },
                    { label: 'Categoria', field: 'categoria' },
                    { label: 'Prioridade', field: 'prioridade' },
                    { label: 'Peso', field: 'peso' },
                    { label: 'Data de Saída', field: 'dataSaida' },
                  ] as { label: string; field: keyof ContainerDetail }[]
                ).map((col) => (
                  <th
                    key={col.field}
                    className="text-left px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none hover:bg-[var(--navy-light)] transition-colors"
                    onClick={() => handleSort(col.field)}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      <ArrowUpDown
                        size={12}
                        className={cn(
                          'opacity-50',
                          sortField === col.field && 'opacity-100 text-[var(--gold)]'
                        )}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    Nenhum contêiner encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className={cn(
                      'border-b border-border last:border-0 transition-colors hover:bg-muted/40',
                      i % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap',
                          STATUS_COLORS[c.statusGeral]
                        )}
                      >
                        {c.statusGeral}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-foreground whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{c.armador}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-semibold',
                          c.categoria === 'IMO'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        )}
                      >
                        {c.categoria}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-semibold',
                          PRIORITY_COLORS[c.prioridade]
                        )}
                      >
                        {c.prioridade}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{c.peso}t</td>
                    <td className="px-5 py-3.5 text-foreground whitespace-nowrap">
                      {new Date(c.dataSaida).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
