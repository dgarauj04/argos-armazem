'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, Loader2, Send, RotateCcw, PackagePlus, Info } from 'lucide-react'
import FormField from '@/components/form/FormField'
import StyledInput from '@/components/form/StyledInput'
import StyledSelect from '@/components/form/StyledSelect'
import FormToast from '@/components/form/FormToast'
import { validateAll } from '@/lib/containerValidation'
import { submitContainerForm, type SugestaoIA } from '@/lib/containerApiService'

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

const ARMADORES = ['MSC', 'Maersk', 'CMA CGM', 'Hapag-Lloyd', 'Outro']

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
  'Camilly Victoria - Op. 0003',
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

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
      <span className="w-1 h-5 bg-[var(--gold)] rounded-full" />
      {title}
    </h3>
  )
}

interface NovoContainerProps {
  onSuccess: (result: SugestaoIA) => void
  onReset?: () => void
}

export function NovoContainer({ onSuccess, onReset }: NovoContainerProps) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const set = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const getError = (field: string) => (touched[field] ? errors[field] : undefined)

  const handleBlur = () => setErrors(validateAll(form))

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
      onSuccess(res)
      setSubmitted(true)
    } catch {
      setToastMessage('Não foi possível comunicar com o sistema de alocação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setTouched({})
    setSubmitted(false)
    onReset?.()
  }

  const isValid = Object.keys(validateAll(form)).length === 0

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
      <div className="px-5 py-5 bg-[var(--navy)]">
        <div className="flex items-center gap-2.5 mb-2">
          <PackagePlus size={20} className="text-[var(--gold)]" />
          <h2 className="text-base font-bold text-white">Novo Contêiner</h2>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">
          Registre a carga para obter a sugestão automática de vaga no pátio.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-5 space-y-6">
        <div className="flex items-start gap-2 bg-[var(--navy-light)]/10 border border-[var(--navy-light)]/20 rounded-lg p-3 text-[var(--navy)]">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            Cargas IMO exigem classe de risco e número ONU.
          </p>
        </div>

        <section className="space-y-4">
          <SectionHeader title="Identificação" />

          <FormField label="Número do Contêiner" required error={getError('numeroContainer')}>
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
            <StyledSelect value={form.armador} onChange={(e) => set('armador', e.target.value)} onBlur={handleBlur} error={getError('armador')}>
              <option value="">Selecione</option>
              {ARMADORES.map((a) => <option key={a} value={a}>{a}</option>)}
            </StyledSelect>
          </FormField>

          {form.armador === 'Outro' && (
            <FormField label="Nome do armador" required error={getError('armadorOutro')}>
              <StyledInput
                type="text"
                placeholder="Nome do armador/cliente"
                value={form.armadorOutro}
                onChange={(e) => set('armadorOutro', e.target.value)}
                onBlur={handleBlur}
                error={getError('armadorOutro')}
              />
            </FormField>
          )}

          <FormField label="Tipo e Tamanho" required error={getError('tipoContainer')}>
            <StyledSelect value={form.tipoContainer} onChange={(e) => set('tipoContainer', e.target.value)} onBlur={handleBlur} error={getError('tipoContainer')}>
              <option value="">Selecione</option>
              {TIPO_CONTAINER_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </StyledSelect>
          </FormField>

          <FormField label="Altura do Contêiner" required error={getError('alturaContainer')}>
            <div className="flex gap-4">
              {[{ label: 'Standard', value: 'Standard' }, { label: 'High Cube', value: 'High Cube' }].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="radio" name="alturaContainer" value={value} checked={form.alturaContainer === value} onChange={() => set('alturaContainer', value)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.alturaContainer === value ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                      {form.alturaContainer === value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-foreground">{label}</span>
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
        </section>

        <section className="space-y-4">
          <SectionHeader title="Classificação de Risco" />

          <FormField label="Carga Perigosa (IMO)?" required error={getError('imo')}>
            <div className="flex gap-4">
              {['Sim', 'Não'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="radio" name="imo" value={opt} checked={form.imo === opt} onChange={() => set('imo', opt)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.imo === opt ? 'border-[var(--navy)] bg-[var(--navy)]' : 'border-border group-hover:border-[var(--navy)]/50'}`}>
                      {form.imo === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-foreground">{opt}</span>
                </label>
              ))}
            </div>
          </FormField>

          {form.imo === 'Sim' && (
            <div className="space-y-4 p-3 bg-amber-50 border border-amber-200 rounded-xl animate-in slide-in-from-top-2 fade-in duration-300">
              <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <span>⚠</span> Obrigatório para cargas perigosas
              </p>
              <FormField label="Classe IMO" required error={getError('classeIMO')}>
                <StyledSelect value={form.classeIMO} onChange={(e) => set('classeIMO', e.target.value)} onBlur={handleBlur} error={getError('classeIMO')}>
                  <option value="">Selecione a classe</option>
                  {IMO_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </StyledSelect>
              </FormField>
              <FormField label="Número ONU" required error={getError('numeroONU')}>
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
        </section>

        <section className="space-y-4">
          <SectionHeader title="Logística" />
          <FormField label="Chegada prevista" required error={getError('chegada')}>
            <StyledInput type="datetime-local" value={form.chegada} onChange={(e) => set('chegada', e.target.value)} onBlur={handleBlur} error={getError('chegada')} />
          </FormField>
          <FormField label="Saída prevista" required error={getError('saida')}>
            <StyledInput type="datetime-local" value={form.saida} onChange={(e) => set('saida', e.target.value)} onBlur={handleBlur} error={getError('saida')} />
          </FormField>
          <FormField label="Navio / Destino" required error={getError('navioDestino')}>
            <StyledInput type="text" placeholder="Ex: MSC Argentina / Santos" value={form.navioDestino} onChange={(e) => set('navioDestino', e.target.value)} onBlur={handleBlur} error={getError('navioDestino')} />
          </FormField>
        </section>

        <section className="space-y-4">
          <SectionHeader title="Operação" />
          <FormField label="Operador responsável" required error={getError('operador')}>
            <StyledSelect value={form.operador} onChange={(e) => set('operador', e.target.value)} onBlur={handleBlur} error={getError('operador')}>
              <option value="">Selecione</option>
              {OPERADORES.map((o) => <option key={o} value={o}>{o}</option>)}
            </StyledSelect>
          </FormField>
          <FormField label="Equipamento utilizado" required error={getError('equipamento')}>
            <StyledSelect value={form.equipamento} onChange={(e) => set('equipamento', e.target.value)} onBlur={handleBlur} error={getError('equipamento')}>
              <option value="">Selecione</option>
              {EQUIPAMENTOS.map((eq) => <option key={eq} value={eq}>{eq}</option>)}
            </StyledSelect>
          </FormField>
        </section>

        <div className="pt-2 border-t border-border">
          {submitted ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Enviado! Veja a sugestão abaixo.
              </div>
              <button type="button" onClick={handleReset} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                <RotateCcw className="w-4 h-4" /> Novo Registro
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--navy)] text-white font-semibold text-sm shadow-md hover:bg-[var(--navy-dark)] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Analisando…</>) : (<><Send className="w-4 h-4" /> Solicitar Melhor Posição</>)}
            </button>
          )}
        </div>
      </form>

      <FormToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  )
}