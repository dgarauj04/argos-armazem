'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, Loader2, Send, RotateCcw, PackagePlus, Info } from 'lucide-react'
import FormField from '@/components/form/FormField'
import StyledInput from '@/components/form/StyledInput'
import StyledSelect from '@/components/form/StyledSelect'
import ResultCard from '@/components/form/ResultCard'
import FormToast from '@/components/form/FormToast'
import { validateAll } from '@/lib/containerValidation'
import { submitContainerForm } from '@/lib/containerApiService'

const INITIAL_FORM = {
  numeroContainer: '',
  armador: '',
  armadorOutro: '',
  tipoContainer: '',
  alturaContainer: '',
  pesoBruto: '',
  imo: '',
  classeIMO: '',
  numeroONU: '',
  chegada: '',
  saida: '',
  navioDestino: '',
  operador: '',
  equipamento: '',
}

const TIPO_CONTAINER_OPTIONS = [
  "Dry 20'", "Dry 40'", "Dry 20' HC", "Dry 40' HC", "Dry 45' HC",
  "Reefer 20'", "Reefer 40'", 'ISO Tank', 'Open Top', 'Flat Rack',
]

const IMO_CLASSES = [
  'Classe 1: Explosivos',
  'Classe 2: Gases',
  'Classe 3: Líquidos Inflamáveis',
  'Classe 4: Sólidos Inflamáveis',
  'Classe 5: Substâncias Oxidantes e Peróxidos Orgânicos',
  'Classe 6: Substâncias Tóxicas e Infecciosas',
  'Classe 7: Material Radioativo',
  'Classe 8: Substâncias Corrosivas',
  'Classe 9: Substâncias e Artigos Perigosos Diversos',
]

const OPERADORES = [
  'Kleber Matos - Op. 0001',
  'Carol Oliveira - Op. 0002',
  'Camille Victoria - Op. 0003',
  'Douglas Araujo - Op. 0004',
]

const EQUIPAMENTOS = [
  'Reach Stacker',
  'Straddle Carrier',
  'RTG (Rubber Tyred Gantry Crane)',
  'STS (Ship-to-Shore Crane)',
  'Top Loader / Forklift',
  'Terminal Tractor (Yard Truck)',
  'Chassis (Carreta)',
]

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <span className="w-1 h-6 bg-[var(--gold)] rounded-full" />
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 ml-3">{subtitle}</p>
    </div>
  )
}

export function NovoContainer() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [toastMessage, setToastMessage] = useState('')

  const set = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const getError = (field: string) => (touched[field] ? errors[field] : undefined)

  const handleBlur = () => {
    const errs = validateAll(form)
    setErrors(errs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const errs = validateAll(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      const res = await submitContainerForm(form)
      setResult(res)
      setSuccess(true)
    } catch (err) {
      setToastMessage('Não foi possível comunicar com o sistema de alocação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setTouched({})
    setSuccess(false)
    setResult(null)
  }

  const isValid = Object.keys(validateAll(form)).length === 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Registro de Novo Contêiner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestão Logística e Alocação Inteligente de Cargas
        </p>
      </div>

      <div className="flex items-start gap-3 bg-[var(--navy-light)]/20 border border-[var(--navy-light)]/30 rounded-xl p-4 text-[var(--navy)]">
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

      <div className="flex justify-center rounded-2xl">
        <div className="w-full max-w-[1000px] bg-card rounded-2xl shadow-lg">
          <div className="px-6 lg:px-8 pt-8 pb-5 border-b border-border bg-[var(--navy)]">
            <div className="flex items-center gap-3 mb-3">
              <PackagePlus size={24} className="text-[var(--gold)]" />
              <h2 className="text-xl font-bold text-white">Formulário de Entrada de Carga</h2>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Registre os dados de chegada do contêiner para obter sugestões automatizadas de alocação
              no pátio. O algoritmo prioriza eficiência energética, segurança em cargas IMO e
              otimização do espaço disponível.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-6 lg:px-8 py-8 space-y-8 bg-white">
            <section>
              <SectionHeader title="Identificação do Contêiner" subtitle="Registre os dados únicos e características físicas da unidade." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

                <FormField label="Número do Contêiner" required error={getError('numeroContainer')} className="sm:col-span-2">
                  <StyledInput
                    type="text"
                    placeholder="MSCU1234567"
                    value={form.numeroContainer}
                    onChange={(e) => set('numeroContainer', e.target.value.toUpperCase())}
                    onBlur={handleBlur}
                    error={getError('numeroContainer')}
                    maxLength={11}
                  />
                </FormField>

                <FormField label="Armador / Cliente" required error={getError('armador')}>
                  <div className="space-y-2">
                    {['MSC', 'Maersk', 'CMA CGM', 'Hapag-Lloyd', 'Outro'].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="radio"
                            name="armador"
                            value={opt}
                            checked={form.armador === opt}
                            onChange={() => set('armador', opt)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.armador === opt ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                            {form.armador === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm text-foreground">{opt}</span>
                      </label>
                    ))}
                    {form.armador === 'Outro' && (
                      <div className="mt-2 animate-in slide-in-from-top-1 fade-in duration-200">
                        <StyledInput
                          type="text"
                          placeholder="Nome do armador/cliente"
                          value={form.armadorOutro}
                          onChange={(e) => set('armadorOutro', e.target.value)}
                          onBlur={handleBlur}
                          error={getError('armadorOutro')}
                        />
                        {getError('armadorOutro') && <p className="text-xs text-red-500 mt-1">⚠ {getError('armadorOutro')}</p>}
                      </div>
                    )}
                  </div>
                </FormField>

                <FormField label="Tipo e Tamanho do Contêiner" required error={getError('tipoContainer')}>
                  <div className="space-y-2">
                    {TIPO_CONTAINER_OPTIONS.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input type="radio" name="tipoContainer" value={opt} checked={form.tipoContainer === opt} onChange={() => set('tipoContainer', opt)} className="sr-only" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.tipoContainer === opt ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                            {form.tipoContainer === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField label="Altura do Contêiner" required error={getError('alturaContainer')}>
                  <div className="space-y-2">
                    {[{ label: 'Standard (2,59m)', value: 'Standard' }, { label: 'High Cube (2,90m)', value: 'High Cube' }].map(({ label, value }) => (
                      <label key={value} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input type="radio" name="alturaContainer" value={value} checked={form.alturaContainer === value} onChange={() => set('alturaContainer', value)} className="sr-only" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.alturaContainer === value ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                            {form.alturaContainer === value && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm text-foreground">{label}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField label="Peso Bruto (toneladas)" required error={getError('pesoBruto')}>
                  <StyledInput
                    type="number"
                    placeholder="Ex: 25.5"
                    step="0.1"
                    min="0"
                    value={form.pesoBruto}
                    onChange={(e) => set('pesoBruto', e.target.value)}
                    onBlur={handleBlur}
                    error={getError('pesoBruto')}
                  />
                </FormField>
              </div>
            </section>

            <section>
              <SectionHeader title="Classificação de Risco (Segurança)" subtitle="Identifique o tipo de material transportado. Estas informações são críticas para o isolamento seguro de cargas perigosas." />
              <div className="mt-5 space-y-5">
                <FormField label="Carga Perigosa (IMO)?" required error={getError('imo')}>
                  <div className="flex gap-6">
                    {['Sim', 'Não'].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input type="radio" name="imo" value={opt} checked={form.imo === opt} onChange={() => set('imo', opt)} className="sr-only" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.imo === opt ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                            {form.imo === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                {form.imo === 'Sim' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-amber-50 border border-amber-200 rounded-xl animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold text-amber-700 mb-3 flex items-center gap-2">
                        <span>⚠</span> Campos obrigatórios para cargas perigosas
                      </p>
                    </div>
                    <FormField label="Classe IMO" required error={getError('classeIMO')}>
                      <StyledSelect value={form.classeIMO} onChange={(e) => set('classeIMO', e.target.value)} onBlur={handleBlur} error={getError('classeIMO')}>
                        <option value="">Selecione a classe</option>
                        {IMO_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </StyledSelect>
                    </FormField>
                    <FormField label="Número ONU (UN Number)" required error={getError('numeroONU')}>
                      <StyledInput
                        type="text"
                        placeholder="1234"
                        value={form.numeroONU}
                        onChange={(e) => set('numeroONU', e.target.value)}
                        onBlur={handleBlur}
                        error={getError('numeroONU')}
                        maxLength={4}
                      />
                    </FormField>
                  </div>
                )}
              </div>
            </section>

            <section>
              <SectionHeader title="Logística e Prioridade de Saída" subtitle="Informe os prazos e a destinação da carga para calcular a melhor posição de empilhamento." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <FormField label="Data/Hora prevista de Chegada" required error={getError('chegada')}>
                  <StyledInput type="datetime-local" value={form.chegada} onChange={(e) => set('chegada', e.target.value)} onBlur={handleBlur} error={getError('chegada')} />
                </FormField>
                <FormField label="Data/Hora prevista de Saída" required error={getError('saida')}>
                  <StyledInput type="datetime-local" value={form.saida} onChange={(e) => set('saida', e.target.value)} onBlur={handleBlur} error={getError('saida')} />
                </FormField>
                <FormField label="Navio / Destino" required error={getError('navioDestino')} className="sm:col-span-2">
                  <StyledInput type="text" placeholder="Ex: MSC Argentina / Santos" value={form.navioDestino} onChange={(e) => set('navioDestino', e.target.value)} onBlur={handleBlur} error={getError('navioDestino')} />
                </FormField>
              </div>
            </section>

            <section>
              <SectionHeader title="Identificação do Operador" subtitle="Insira sua identificação funcional para registro no log de atividades e rastreabilidade da operação." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <FormField label="Operador responsável" required error={getError('operador')}>
                  <StyledSelect value={form.operador} onChange={(e) => set('operador', e.target.value)} onBlur={handleBlur} error={getError('operador')}>
                    <option value="">Selecione o operador</option>
                    {OPERADORES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </StyledSelect>
                </FormField>
                <FormField label="Equipamento utilizado" required error={getError('equipamento')}>
                  <StyledSelect value={form.equipamento} onChange={(e) => set('equipamento', e.target.value)} onBlur={handleBlur} error={getError('equipamento')}>
                    <option value="">Selecione o equipamento</option>
                    {EQUIPAMENTOS.map((eq) => <option key={eq} value={eq}>{eq}</option>)}
                  </StyledSelect>
                </FormField>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-border">
              {success ? (
                <>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    Dados enviados com sucesso!
                  </div>
                  <button type="button" onClick={handleReset} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                    <RotateCcw className="w-4 h-4" /> Novo Registro
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isValid}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[var(--navy)] text-white font-semibold text-sm shadow-md
                    hover:bg-[var(--navy-dark)] active:scale-95 transition-all duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analisando melhor posição...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Solicitar Melhor Posição
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {result && (
            <div className="px-6 lg:px-8 pb-8">
              <ResultCard result={result} />
            </div>
          )}
        </div>
      </div>

      <FormToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  )
}
