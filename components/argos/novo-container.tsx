'use client'

import { PackagePlus, Info } from 'lucide-react'

export function NovoContainer() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Registro de Novo Contêiner</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Preencha o formulário abaixo para registrar a entrada de carga no terminal.
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800">
        <Info size={18} className="shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-0.5">Instruções de preenchimento</p>
          <p>
            Informe corretamente o ID do contêiner (formato ISO 6346), peso bruto, categoria e
            data prevista de saída. Cargas classificadas como IMO exigem declaração de risco
            obrigatória.
          </p>
        </div>
      </div>

      {/* Google Forms card */}
      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        {/* Card header */}
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-[var(--navy)]">
          <PackagePlus size={20} className="text-[var(--gold)]" />
          <h2 className="font-semibold text-white">Formulário de Entrada de Carga</h2>
        </div>

        {/* Form wrapper */}
        <div
          className="w-full flex justify-center bg-white p-4 sm:p-6"
          style={{ minHeight: '80vh' }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '80vh',
              overflowY: 'auto',
            }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScNbCvtm7j0Y_p85mqo_UnbatckHYpW4EHH5_1MN1C3KWdhAA/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Formulário de Registro de Contêiner"
              className="rounded-lg"
            >
              Carregando…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
