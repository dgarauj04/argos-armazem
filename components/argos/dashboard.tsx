'use client'

import { Package, Warehouse, Clock, AlertTriangle, TrendingUp, Ship, Activity } from 'lucide-react'
import { getKPIs, CONTAINERS_HISTORY } from '@/lib/mock-data'

function KPICard({
  icon,
  label,
  value,
  sub,
  color,
  progress,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
  color: string
  progress?: number
}) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-md border border-border flex flex-col gap-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      {progress !== undefined && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>21 de 52 vagas</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded transition-all duration-700"
              style={{
                width: `${progress}%`,
                backgroundColor: '#27547c',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function Dashboard() {
  const kpis = getKPIs()

  const recent = CONTAINERS_HISTORY.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Terminal Porto de Santos — atualizado em{' '}
            {new Date().toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          <Activity size={12} />
          Sistema Online
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          icon={<Package size={20} className="text-white" />}
          label="CONTÊINERES NO PÁTIO"
          value={21}
          sub="31 vagas disponíveis"
          color="bg-[var(--navy)]"
        />
        <KPICard
          icon={<Warehouse size={20} className="text-white" />}
          label="TAXA DE OCUPAÇÃO"
          value="40%"
          color="bg-blue-600"
          progress={40}
        />
        <KPICard
          icon={<Clock size={20} className="text-white" />}
          label="SAÍDA EM 48H"
          value={21}
          sub="Contêineres com saída urgente"
          color="bg-amber-500"
        />
        <KPICard
          icon={<AlertTriangle size={20} className="text-white" />}
          label="ALERTAS IMO"
          value={kpis.imoAlerts}
          sub="Cargas perigosas no pátio"
          color="bg-red-600"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Distribuição por armador */}
        <div className="bg-card rounded-xl p-5 shadow-md border border-border lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Ship size={18} className="text-[var(--navy)]" />
            <h2 className="font-semibold text-foreground">Contêineres por Armador</h2>
          </div>
          <div className="space-y-3">
            {[
              { armador: 'MSC', count: 2, color: '#0B2D54' },
              { armador: 'Maersk', count: 2, color: '#1A4A7A' },
              { armador: 'CMA CGM', count: 2, color: '#2563EB' },
              { armador: 'Hapag-Lloyd', count: 1, color: '#F0A500' },
              { armador: 'Outros', count: 8, color: '#94A3B8' },
            ].map((item) => (
              <div key={item.armador} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-28 shrink-0">{item.armador}</span>
                <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                  <div
                    className="h-full rounded flex items-center justify-end pr-2 transition-all duration-700"
                    style={{
                      width: `${(item.count / kpis.totalContainers) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  >
                    <span className="text-white text-xs font-semibold">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-card rounded-xl p-5 shadow-md border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[var(--navy)]" />
            <h2 className="font-semibold text-foreground">Status do Pátio</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Vagas Livres', value: 31, color: 'bg-green-500' },
              { label: 'Ocupadas', value: 21, color: 'bg-[var(--slot-occupied)]' },
              { label: 'Zona IMO', value: kpis.imoAlerts, color: 'bg-amber-500' },
              { label: 'Sugerida (IA)', value: 1, color: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                <span className="font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Activity size={18} className="text-[var(--navy)]" />
          <h2 className="font-semibold text-foreground">Atividade Recente</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">ID Contêiner</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Armador</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Categoria</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Peso</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Saída Prevista</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-5 py-3 font-mono font-semibold text-foreground">{c.id}</td>
                  <td className="px-5 py-3 text-foreground">{c.armador}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        c.categoria === 'IMO'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {c.categoria}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-foreground">{c.peso}t</td>
                  <td className="px-5 py-3 text-foreground">
                    {new Date(c.dataSaida).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        c.statusGeral === 'Saída Agendada'
                          ? 'bg-amber-100 text-amber-800'
                          : c.statusGeral === 'No Pátio'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {c.statusGeral}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
