export type SlotStatus = 'free' | 'occupied' | 'imo' | 'ai-suggested'

export type ContainerCategory = 'Padrão' | 'IMO'
export type ContainerPriority = 'Alta' | 'Média' | 'Baixa'
export type ContainerStatus = 'No Pátio' | 'Saída em 48h' | 'Agendado' | 'Em Trânsito'

export interface ContainerSlot {
  id: string // e.g. "A1"
  baia: string // A-H
  altura: number // 1-7
  status: SlotStatus
  container?: ContainerDetail
}

export interface ContainerDetail {
  id: string
  peso: number // toneladas
  alturaPilha: number
  categoria: ContainerCategory
  dataSaida: string
  armador: string
  prioridade: ContainerPriority
  statusGeral: ContainerStatus
}

export const BAIAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export const ALTURAS = [1, 2, 3, 4, 5, 6, 7]

const slotConfigs: Record<string, { status: SlotStatus; container?: ContainerDetail }> = {
  'A1': {
    status: 'occupied',
    container: {
      id: 'MSCU7430812',
      peso: 22.4,
      alturaPilha: 1,
      categoria: 'Padrão',
      dataSaida: '2026-07-16T08:00:00',
      armador: 'MSC',
      prioridade: 'Alta',
      statusGeral: 'Saída em 48h',
    },
  },
  'A2': {
    status: 'occupied',
    container: {
      id: 'CMAU3812945',
      peso: 18.7,
      alturaPilha: 2,
      categoria: 'Padrão',
      dataSaida: '2026-07-17T14:00:00',
      armador: 'CMA CGM',
      prioridade: 'Média',
      statusGeral: 'No Pátio',
    },
  },
  'A3': { status: 'free' },
  'A4': { status: 'free' },
  'A5': { status: 'free' },
  'A6': { status: 'free' },
  'A7': { status: 'free' },

  'B1': {
    status: 'occupied',
    container: {
      id: 'HLXU5921037',
      peso: 26.1,
      alturaPilha: 1,
      categoria: 'Padrão',
      dataSaida: '2026-07-18T10:00:00',
      armador: 'Hapag-Lloyd',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'B2': {
    status: 'occupied',
    container: {
      id: 'EVGU4156700',
      peso: 14.3,
      alturaPilha: 2,
      categoria: 'Padrão',
      dataSaida: '2026-07-20T09:00:00',
      armador: 'Evergreen',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'B3': {
    status: 'imo',
    container: {
      id: 'OOLU8830241',
      peso: 19.5,
      alturaPilha: 3,
      categoria: 'IMO',
      dataSaida: '2026-07-16T06:00:00',
      armador: 'OOCL',
      prioridade: 'Alta',
      statusGeral: 'Saída em 48h',
    },
  },
  'B4': { status: 'imo' },
  'B5': { status: 'free' },
  'B6': { status: 'free' },
  'B7': { status: 'free' },

  'C1': {
    status: 'occupied',
    container: {
      id: 'MAEU2984501',
      peso: 30.2,
      alturaPilha: 1,
      categoria: 'Padrão',
      dataSaida: '2026-07-16T16:00:00',
      armador: 'Maersk',
      prioridade: 'Alta',
      statusGeral: 'Em Trânsito',
    },
  },
  'C2': { status: 'ai-suggested' },
  'C3': { status: 'free' },
  'C4': { status: 'free' },
  'C5': {
    status: 'occupied',
    container: {
      id: 'COSU3419078',
      peso: 16.8,
      alturaPilha: 5,
      categoria: 'Padrão',
      dataSaida: '2026-07-22T11:00:00',
      armador: 'COSCO',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'C6': { status: 'free' },
  'C7': { status: 'free' },

  'D1': {
    status: 'occupied',
    container: {
      id: 'YMLU7723001',
      peso: 21.0,
      alturaPilha: 1,
      categoria: 'Padrão',
      dataSaida: '2026-07-17T07:00:00',
      armador: 'Yang Ming',
      prioridade: 'Alta',
      statusGeral: 'Agendado',
    },
  },
  'D2': {
    status: 'occupied',
    container: {
      id: 'WHLC5019234',
      peso: 17.2,
      alturaPilha: 2,
      categoria: 'Padrão',
      dataSaida: '2026-07-19T15:00:00',
      armador: 'WHL',
      prioridade: 'Média',
      statusGeral: 'No Pátio',
    },
  },
  'D3': { status: 'free' },
  'D4': { status: 'free' },
  'D5': { status: 'free' },
  'D6': {
    status: 'imo',
    container: {
      id: 'ZIMU9018450',
      peso: 23.7,
      alturaPilha: 6,
      categoria: 'IMO',
      dataSaida: '2026-07-16T12:00:00',
      armador: 'ZIM',
      prioridade: 'Alta',
      statusGeral: 'Agendado',
    },
  },
  'D7': { status: 'imo' },

  'E1': { status: 'free' },
  'E2': {
    status: 'occupied',
    container: {
      id: 'PCIU4302811',
      peso: 12.5,
      alturaPilha: 2,
      categoria: 'Padrão',
      dataSaida: '2026-07-21T10:00:00',
      armador: 'PIL',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'E3': { status: 'free' },
  'E4': { status: 'free' },
  'E5': {
    status: 'occupied',
    container: {
      id: 'APLU3876520',
      peso: 20.0,
      alturaPilha: 5,
      categoria: 'Padrão',
      dataSaida: '2026-07-23T09:00:00',
      armador: 'APL',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'E6': { status: 'free' },
  'E7': { status: 'free' },

  'F1': { status: 'free' },
  'F2': { status: 'free' },
  'F3': {
    status: 'occupied',
    container: {
      id: 'TGHU8190023',
      peso: 25.4,
      alturaPilha: 3,
      categoria: 'Padrão',
      dataSaida: '2026-07-18T13:00:00',
      armador: 'MSC',
      prioridade: 'Média',
      statusGeral: 'No Pátio',
    },
  },
  'F4': { status: 'free' },
  'F5': { status: 'free' },
  'F6': { status: 'free' },
  'F7': { status: 'free' },

  'G1': {
    status: 'occupied',
    container: {
      id: 'CRXU5509812',
      peso: 28.9,
      alturaPilha: 1,
      categoria: 'Padrão',
      dataSaida: '2026-07-16T18:00:00',
      armador: 'CMA CGM',
      prioridade: 'Alta',
      statusGeral: 'Em Trânsito',
    },
  },
  'G2': { status: 'free' },
  'G3': { status: 'free' },
  'G4': {
    status: 'occupied',
    container: {
      id: 'SEGU4412301',
      peso: 15.1,
      alturaPilha: 4,
      categoria: 'Padrão',
      dataSaida: '2026-07-25T14:00:00',
      armador: 'Maersk',
      prioridade: 'Baixa',
      statusGeral: 'No Pátio',
    },
  },
  'G5': { status: 'free' },
  'G6': { status: 'free' },
  'G7': { status: 'free' },

  'H1': { status: 'free' },
  'H2': { status: 'free' },
  'H3': { status: 'free' },
  'H4': { status: 'free' },
  'H5': { status: 'free' },
  'H6': { status: 'free' },
  'H7': { status: 'free' },
}

export function generateYardSlots(): ContainerSlot[] {
  const slots: ContainerSlot[] = []
  for (const baia of BAIAS) {
    for (const altura of ALTURAS) {
      const id = `${baia}${altura}`
      const config = slotConfigs[id] ?? { status: 'free' as SlotStatus }
      slots.push({
        id,
        baia,
        altura,
        status: config.status,
        container: config.container,
      })
    }
  }
  return slots
}

export const CONTAINERS_HISTORY: ContainerDetail[] = [
  {
    id: 'MSCU7430812',
    peso: 22.4,
    alturaPilha: 1,
    categoria: 'Padrão',
    dataSaida: '2026-07-16T08:00:00',
    armador: 'MSC',
    prioridade: 'Alta',
    statusGeral: 'Saída em 48h',
  },
  {
    id: 'OOLU8830241',
    peso: 19.5,
    alturaPilha: 3,
    categoria: 'IMO',
    dataSaida: '2026-07-16T06:00:00',
    armador: 'OOCL',
    prioridade: 'Alta',
    statusGeral: 'Saída em 48h',
  },
  {
    id: 'ZIMU9018450',
    peso: 23.7,
    alturaPilha: 6,
    categoria: 'IMO',
    dataSaida: '2026-07-16T12:00:00',
    armador: 'ZIM',
    prioridade: 'Alta',
    statusGeral: 'Saída em 48h',
  },
  {
    id: 'MAEU2984501',
    peso: 30.2,
    alturaPilha: 1,
    categoria: 'Padrão',
    dataSaida: '2026-07-16T16:00:00',
    armador: 'Maersk',
    prioridade: 'Alta',
    statusGeral: 'Agendado',
  },
  {
    id: 'CRXU5509812',
    peso: 28.9,
    alturaPilha: 1,
    categoria: 'Padrão',
    dataSaida: '2026-07-16T18:00:00',
    armador: 'CMA CGM',
    prioridade: 'Alta',
    statusGeral: 'Agendado',
  },
  {
    id: 'CMAU3812945',
    peso: 18.7,
    alturaPilha: 2,
    categoria: 'Padrão',
    dataSaida: '2026-07-17T14:00:00',
    armador: 'CMA CGM',
    prioridade: 'Média',
    statusGeral: 'No Pátio',
  },
  {
    id: 'YMLU7723001',
    peso: 21.0,
    alturaPilha: 1,
    categoria: 'Padrão',
    dataSaida: '2026-07-17T07:00:00',
    armador: 'Yang Ming',
    prioridade: 'Alta',
    statusGeral: 'Em Trânsito',
  },
  {
    id: 'HLXU5921037',
    peso: 26.1,
    alturaPilha: 1,
    categoria: 'Padrão',
    dataSaida: '2026-07-18T10:00:00',
    armador: 'Hapag-Lloyd',
    prioridade: 'Baixa',
    statusGeral: 'No Pátio',
  },
  {
    id: 'TGHU8190023',
    peso: 25.4,
    alturaPilha: 3,
    categoria: 'Padrão',
    dataSaida: '2026-07-18T13:00:00',
    armador: 'MSC',
    prioridade: 'Média',
    statusGeral: 'No Pátio',
  },
  {
    id: 'WHLC5019234',
    peso: 17.2,
    alturaPilha: 2,
    categoria: 'Padrão',
    dataSaida: '2026-07-19T15:00:00',
    armador: 'WHL',
    prioridade: 'Média',
    statusGeral: 'Agendado',
  },
  {
    id: 'EVGU4156700',
    peso: 14.3,
    alturaPilha: 2,
    categoria: 'Padrão',
    dataSaida: '2026-07-20T09:00:00',
    armador: 'Evergreen',
    prioridade: 'Baixa',
    statusGeral: 'No Pátio',
  },
  {
    id: 'PCIU4302811',
    peso: 12.5,
    alturaPilha: 2,
    categoria: 'Padrão',
    dataSaida: '2026-07-21T10:00:00',
    armador: 'PIL',
    prioridade: 'Baixa',
    statusGeral: 'Saída em 48h',
  },
  {
    id: 'COSU3419078',
    peso: 16.8,
    alturaPilha: 5,
    categoria: 'Padrão',
    dataSaida: '2026-07-22T11:00:00',
    armador: 'COSCO',
    prioridade: 'Baixa',
    statusGeral: 'No Pátio',
  },
  {
    id: 'APLU3876520',
    peso: 20.0,
    alturaPilha: 5,
    categoria: 'Padrão',
    dataSaida: '2026-07-23T09:00:00',
    armador: 'APL',
    prioridade: 'Baixa',
    statusGeral: 'Em Trânsito',
  },
  {
    id: 'SEGU4412301',
    peso: 15.1,
    alturaPilha: 4,
    categoria: 'Padrão',
    dataSaida: '2026-07-25T14:00:00',
    armador: 'Maersk',
    prioridade: 'Baixa',
    statusGeral: 'Em Trânsito',
  },
]

export function getKPIs() {
  const totalSlots = BAIAS.length * ALTURAS.length // 56
  const occupiedSlots = Object.values(slotConfigs).filter(
    (s) => s.status === 'occupied' || s.status === 'imo'
  ).length
  const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100)

  const now = new Date('2026-07-15T12:00:00')
  const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000)

  const exiting48h = CONTAINERS_HISTORY.filter((c) => {
    const saida = new Date(c.dataSaida)
    return saida >= now && saida <= in48h
  }).length

  const imoAlerts = CONTAINERS_HISTORY.filter((c) => c.categoria === 'IMO').length

  return {
    totalContainers: occupiedSlots,
    occupancyRate,
    exiting48h,
    imoAlerts,
    totalSlots,
  }
}

export const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL

export async function sendToMake(data: Record<string, unknown>) {
  try {
    const res = await fetch(makeWebhookUrl || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  } catch (err) {
    console.error('[Argos] Erro ao enviar para Make.com:', err)
    return false
  }
}
