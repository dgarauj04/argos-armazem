import { ContainerForm } from './containerValidation'

const WEBHOOK_REGISTRAR = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_REGISTRAR
const WEBHOOK_CONFIRMAR = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_CONFIRMAR

export interface SugestaoIA {
  numero_container: string
  vaga_id: string
  baia: string
  altura: number
  justificativa: string
  distancia_portao: number
  capacidade_max_peso: number
  prioridade: string
}

export async function submitContainerForm(form: ContainerForm): Promise<SugestaoIA> {
  if (!WEBHOOK_REGISTRAR) {
    throw new Error('NEXT_PUBLIC_MAKE_WEBHOOK_REGISTRAR não configurada em .env.local')
  }

  const payload = {
    ...form,
    armadorCliente: form.armadorCliente === 'Outro' ? form.armadorOutro : form.armadorCliente,
  }

  const res = await fetch(WEBHOOK_REGISTRAR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Falha ao registrar contêiner (status ${res.status})`)
  }

  return res.json()
}

export async function confirmarAlocacao(numero_container: string, vaga_id: string): Promise<void> {
  if (!WEBHOOK_CONFIRMAR) {
    throw new Error('NEXT_PUBLIC_MAKE_CONFIRMAR não configurada em .env.local')
  }

  const res = await fetch(WEBHOOK_CONFIRMAR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numero_container, vaga_id }),
  })

  if (!res.ok) {
    throw new Error(`Falha ao confirmar alocação (status ${res.status})`)
  }
}