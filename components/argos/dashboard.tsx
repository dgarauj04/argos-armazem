'use client'

import { Package, Warehouse, Clock, AlertTriangle, TrendingUp, Ship, Activity } from 'lucide-react'
import { getKPIs } from '@/lib/mock-data'

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

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          icon={<Package size={20} className="text-stone-700" />}
          label="CONTÊINERES NO PÁTIO"
          value={21}
          sub="31 vagas disponíveis"
          color="bg-slate-500/20"
        />
        <KPICard
          icon={<Warehouse size={20} className="text-cyan-800" />}
          label="TAXA DE OCUPAÇÃO"
          value="40%"
          color="bg-sky-300/25"
          progress={40}
        />
        <KPICard
          icon={<Clock size={20} className="text-orange-600" />}
          label="SAÍDA EM 48H"
          value={21}
          sub="Contêineres com saída urgente"
          color="bg-amber-500/35"
        />
        <KPICard
          icon={<AlertTriangle size={20} className="text-red-700" />}
          label="ALERTAS IMO"
          value={kpis.imoAlerts}
          sub="Cargas perigosas no pátio"
          color="bg-red-400/35"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-md border border-border lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Ship size={18} className="text-[var(--navy)]" />
            <h2 className="font-semibold text-foreground">Contêineres por Armador</h2>
          </div>
          <div className="space-y-3">
            {[
              { armador: 'MSC', count: 2, color: '#0B2D54' },
              { armador: 'Maersk', count: 2, color: '#1A7A78' },
              { armador: 'CMA CGM', count: 2, color: '#2563EB' },
              { armador: 'Hapag-Lloyd', count: 1, color: '#F0A500' },
              { armador: 'Outros', count: 8, color: '#9ea686' },
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

      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Activity size={18} className="text-[var(--navy)]" />
          <h2 className="font-semibold text-foreground">Distribuição por Baia</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { baia: 'Baia A', ocupadas: 2, total: 7, percentual: 28.6, cor: '#0B2D54' },
            { baia: 'Baia B', ocupadas: 4, total: 7, percentual: 57.1, cor: '#1A7A78' },
            { baia: 'Baia C', ocupadas: 2, total: 7, percentual: 28.6, cor: '#2563EB' },
            { baia: 'Baia D', ocupadas: 4, total: 7, percentual: 57.1, cor: '#F0A500' },
            { baia: 'Baia E', ocupadas: 2, total: 7, percentual: 28.6, cor: '#0B2D54' },
            { baia: 'Baia F', ocupadas: 1, total: 7, percentual: 14.3, cor: '#1A7A78' },
            { baia: 'Baia G', ocupadas: 2, total: 7, percentual: 28.6, cor: '#2563EB' },
            { baia: 'Baia H', ocupadas: 4, total: 7, percentual: 57.1, cor: '#F0A500' },
          ].map((item) => (
            <div key={item.baia} className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground w-20 shrink-0">{item.baia}</span>
              <div className="flex-1 h-7 bg-muted rounded overflow-hidden relative">
                <div
                  className="h-full rounded transition-all duration-700 flex items-center justify-center"
                  style={{
                    width: `${item.percentual}%`,
                    backgroundColor: item.cor,
                    minWidth: item.percentual > 0 ? '30px' : '0px',
                  }}
                >
                  {item.percentual > 10 && (
                    <span className="text-white text-xs font-bold">{item.ocupadas}</span>
                  )}
                </div>
                {item.percentual <= 10 && item.ocupadas > 0 && (
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground text-xs font-bold">
                    {item.ocupadas}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground w-20 text-right">
                {item.ocupadas}/{item.total} ({item.percentual.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
