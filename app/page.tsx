'use client'

import { useState } from 'react'
import { Sidebar, type NavTab } from '@/components/argos/sidebar'
import { Dashboard } from '@/components/argos/dashboard'
import { NovoContainer } from '@/components/argos/novo-container'
import { MapaPatio } from '@/components/argos/mapa-patio'
import { Historico } from '@/components/argos/historico'

export default function ArgosArmazem() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard')

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'novo-container' && <NovoContainer />}
          {activeTab === 'mapa' && <MapaPatio />}
          {activeTab === 'historico' && <Historico />}
        </div>
      </main>
    </div>
  )
}
