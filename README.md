# Argos Armazém

Interface web para apoiar a alocação de contêineres no pátio de um terminal portuário. O sistema recebe os dados operacionais de um formulário, aciona uma automação no **Make**, utiliza **IA** para recomendar a melhor vaga e posição de empilhamento e registra/atualiza as informações no **Google Sheets**.

## O que o projeto faz

- Coleta dados do contêiner: identificação, armador, tipo, altura, peso, chegada, saída, destino, operador e equipamento.
- Valida o código do contêiner (padrão ISO 6346), peso, datas e informações obrigatórias para carga perigosa (IMO/ONU).
- Exibe um mapa interativo do pátio com 8 baias e 7 níveis de altura, incluindo vagas livres, ocupadas, IMO e sugeridas pela IA.
- Envia os dados validados ao Make para análise e recomendação da vaga mais adequada.
- Apresenta a sugestão com vaga, baia, altura, justificativa, distância do portão, capacidade de peso e prioridade.
- Permite confirmar a alocação; a confirmação é enviada ao Make para persistir a decisão no fluxo integrado ao Google Sheets.

## Fluxo da automação

```text
Operador preenche o formulário
            ↓
Aplicação envia os dados ao webhook do Make
            ↓
Make consulta/atualiza dados no Google Sheets e aciona a IA
            ↓
IA analisa restrições e sugere a melhor posição no pátio
            ↓
Aplicação mostra a recomendação para confirmação
            ↓
Make registra a alocação confirmada no Google Sheets
```

> A regra de decisão da IA e as conexões com o Google Sheets ficam configuradas no cenário do Make. Esta interface consome o resultado da análise por webhooks.

## Tecnologias

- Next.js 16, React 19 e TypeScript
- Tailwind CSS
- Make (webhooks e orquestração)
- IA integrada ao cenário do Make
- Google Sheets como base operacional

## Como executar localmente

### Pré-requisitos

- Node.js 20 ou superior
- Um cenário ativo no Make, com os webhooks de sugestão e confirmação configurados

### Instalação

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_MAKE_WEBHOOK_REGISTRAR=https://hook.make.com/seu-webhook-de-registro
NEXT_PUBLIC_MAKE_WEBHOOK_CONFIRMAR=https://hook.make.com/seu-webhook-de-confirmacao
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Contrato dos webhooks

### Registro e solicitação de sugestão

`POST` para `NEXT_PUBLIC_MAKE_WEBHOOK_REGISTRAR`.

O formulário envia os dados do contêiner. O cenário deve responder em JSON com, no mínimo:

```json
{
  "numero_container": "MSCU1234567",
  "vaga_id": "C2",
  "baia": "C",
  "altura": 2,
  "justificativa": "Posição compatível com o perfil operacional.",
  "distancia_portao": 120,
  "capacidade_max_peso": 30,
  "prioridade": "Alta"
}
```

### Confirmação de alocação

`POST` para `NEXT_PUBLIC_MAKE_WEBHOOK_CONFIRMAR` com o corpo:

```json
{
  "numero_container": "MSCU1234567",
  "vaga_id": "C2"
}
```

O cenário deve atualizar o registro correspondente no Google Sheets e retornar uma resposta HTTP de sucesso (`2xx`).

## Scripts

```bash
npm run dev    # inicia o ambiente de desenvolvimento
npm run build  # gera a build de produção
npm run start  # executa a build de produção
npm run lint   # verifica o código
```

## Estrutura principal

```text
app/                       Página principal da aplicação
components/argos/          Formulário, mapa do pátio e painel de sugestão
lib/containerValidation.ts Regras de validação do formulário
lib/containerApiService.ts Integração com os webhooks do Make
lib/mock-data.ts           Dados demonstrativos do mapa do pátio
```

## Observações

- Os dados exibidos inicialmente no mapa são demonstrativos (`lib/mock-data.ts`). Para refletir a operação em tempo real, conecte essa camada ao seu cenário no Make/Google Sheets ou a uma API própria.
- Nunca versione `.env.local` nem URLs de webhook, pois elas permitem acionar seus cenários no Make.
