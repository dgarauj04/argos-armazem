export interface ContainerForm {
  numeroContainer: string
  armador: string
  armadorOutro: string
  tipoContainer: string
  alturaContainer: string
  pesoBruto: string
  imo: string
  classeIMO: string
  numeroONU: string
  chegada: string
  saida: string
  navioDestino: string
  operador: string
  equipamento: string
}

export function validateAll(form: ContainerForm): Record<string, string> {
  const errors: Record<string, string> = {}

  // Validar número do contêiner (ISO 6346: 4 letras + 7 dígitos)
  if (!form.numeroContainer) {
    errors.numeroContainer = 'Número do contêiner é obrigatório'
  } else if (!/^[A-Z]{4}\d{7}$/.test(form.numeroContainer)) {
    errors.numeroContainer = 'Formato inválido. Use 4 letras seguidas de 7 números (ex: MSCU1234567)'
  }

  // Validar armador
  if (!form.armador) {
    errors.armador = 'Selecione um armador'
  } else if (form.armador === 'Outro' && !form.armadorOutro) {
    errors.armadorOutro = 'Informe o nome do armador'
  }

  // Validar tipo de contêiner
  if (!form.tipoContainer) {
    errors.tipoContainer = 'Selecione o tipo de contêiner'
  }

  // Validar altura
  if (!form.alturaContainer) {
    errors.alturaContainer = 'Selecione a altura do contêiner'
  }

  // Validar peso bruto
  if (!form.pesoBruto) {
    errors.pesoBruto = 'Peso bruto é obrigatório'
  } else {
    const peso = parseFloat(form.pesoBruto)
    if (isNaN(peso) || peso <= 0 || peso > 50) {
      errors.pesoBruto = 'Peso deve ser entre 0.1 e 50 toneladas'
    }
  }

  // Validar IMO
  if (!form.imo) {
    errors.imo = 'Informe se a carga é perigosa'
  } else if (form.imo === 'Sim') {
    if (!form.classeIMO) {
      errors.classeIMO = 'Selecione a classe IMO'
    }
    if (!form.numeroONU) {
      errors.numeroONU = 'Número ONU é obrigatório para cargas perigosas'
    } else if (!/^\d{4}$/.test(form.numeroONU)) {
      errors.numeroONU = 'Número ONU deve ter 4 dígitos'
    }
  }

  // Validar datas
  if (!form.chegada) {
    errors.chegada = 'Data de chegada é obrigatória'
  }
  if (!form.saida) {
    errors.saida = 'Data de saída é obrigatória'
  } else if (form.chegada && new Date(form.saida) <= new Date(form.chegada)) {
    errors.saida = 'Data de saída deve ser posterior à chegada'
  }

  // Validar navio/destino
  if (!form.navioDestino) {
    errors.navioDestino = 'Informe o navio ou destino'
  }

  // Validar operador
  if (!form.operador) {
    errors.operador = 'Selecione o operador responsável'
  }

  // Validar equipamento
  if (!form.equipamento) {
    errors.equipamento = 'Selecione o equipamento utilizado'
  }

  return errors
}
