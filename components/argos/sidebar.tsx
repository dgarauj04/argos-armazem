'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  PackagePlus,
  Map,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Anchor,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type NavTab = 'dashboard' | 'novo-container' | 'mapa' | 'historico'

interface SidebarProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: 'novo-container',
    label: 'Novo Contêiner',
    icon: <PackagePlus size={20} />,
  },
  {
    id: 'mapa',
    label: 'Mapa do Pátio',
    icon: <Map size={20} />,
  },
  {
    id: 'historico',
    label: 'Histórico',
    icon: <ClipboardList size={20} />,
  },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleTabChange = (tab: NavTab) => {
    onTabChange(tab)
    setMobileOpen(false)
  }

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[var(--navy)] shadow-md">
        <div className="flex items-center gap-2">
          <Anchor size={22} className="text-[var(--gold)]" />
          <span className="text-white font-bold text-lg tracking-wide">Argos</span>
        </div>
        <button
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
          className="text-white p-2 rounded-md hover:bg-[var(--navy-light)] transition-colors"
        >
          <Menu size={22} />
        </button>
      </header>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[var(--navy)] flex flex-col transition-transform duration-300 shadow-2xl',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Anchor size={22} className="text-[var(--gold)]" />
            <span className="text-white font-bold text-lg tracking-wide">Argos Armazém</span>
          </div>
          <button
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="text-white p-1 rounded hover:bg-[var(--navy-light)]"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-3.5 rounded-lg text-sm font-medium transition-colors text-left',
                activeTab === item.id
                  ? 'bg-[var(--gold)] text-[var(--navy-dark)] font-semibold'
                  : 'text-white/80 hover:bg-[var(--navy-light)] hover:text-white'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/40 text-xs">Terminal Wilson Sons</p>
          <p className="text-white/30 text-xs">Porto de Santos — SP</p>
        </div>
      </aside>

      <aside
        className={cn(
          'hidden lg:flex flex-col fixed top-0 left-0 h-full bg-[var(--navy)] z-30 transition-all duration-300 shadow-xl',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <div className={cn('flex items-center h-16 border-b border-white/10 px-4', collapsed ? 'justify-center' : 'gap-3')}>
          <Anchor size={24} className="text-[var(--gold)] shrink-0" />
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-base leading-tight">Argos Armazém</p>
              <p className="text-white/50 text-[10px]">Gêmeo Digital Portuário</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-3.5 rounded-lg text-sm font-medium transition-colors',
                collapsed ? 'justify-center' : '',
                activeTab === item.id
                  ? 'bg-[var(--gold)] text-[var(--navy-dark)] font-semibold shadow-md'
                  : 'text-white/80 hover:bg-[var(--navy-light)] hover:text-white cursor-pointer'
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="flex justify-center mb-8">
          <a href="https://daraujodb-dev-frontend.vercel.app/" className='text-white/30'>
            <img src="/fox-icon.svg" alt="Douglas Logo" className="w-14 h-14 opacity-25 hover:opacity-80 transition-opacity" />
          </a>
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-t border-white/10">
            
            <p className="text-white/40 text-xs">Terminal Wilson Sons</p>
            <p className="text-white/30 text-xs">Porto de Santos — SP</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          className="flex items-center justify-center h-10 border-t border-white/10 text-white/50 cursor-pointer hover:text-white hover:bg-[var(--navy-light)] transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>

      <div className={cn('hidden lg:block shrink-0 transition-all duration-300', collapsed ? 'w-16' : 'w-60')} />
    </>
  )
}
