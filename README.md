# posgraduacao-aula-prog-04

Um pequeno projeto de gestão de pedidos de cafeteria, usado como exercício prático na pós-graduação de **Integração Contínua / Testes Automatizados**. Inclui uma função utilitária testada e uma pipeline de CI/CD construída com GitHub Actions, cobrindo disparos manual, agendado e por push.

## Stack Técnica

- **Node.js** (24.x)
- **Yarn** como gerenciador de pacotes
- **Playwright** (`@playwright/test`) para execução dos testes
- **GitHub Actions** para CI/CD

## Estrutura do Projeto

```
posgraduacao-aula-prog-04/
├── .github/workflows/
│   └── pipeline-exec.yaml        # Pipeline de CI (manual + agendada + push)
├── src/
│   └── startbucks.js             # Lógica principal (contabilizarQuantidadedeItems)
├── test/
│   └── startbucks_playwright.spec.js
├── playwright.config.js
├── package.json
└── yarn.lock
```

## Executando Localmente

```bash
# instalar dependências
yarn install

# instalar os browsers do Playwright (apenas na primeira vez)
npx playwright install --with-deps

# rodar a suíte de testes
npx playwright test

# visualizar o relatório HTML após a execução
npx playwright show-report
```

## Casos de Teste

A suíte de testes valida a função `contabilizarQuantidadedeItems`, que conta quantos itens de uma lista de pedidos correspondem a um item pesquisado (sem diferenciar maiúsculas/minúsculas).

| ID | Descrição | Resultado Esperado |
|----|------------|---------------------|
| TC 1 | Ao menos 1 café na lista | Retorna `1` |
| TC 2 | Não ter nenhum café na lista | Retorna `0` |
| TC 3 | Ter 2 ou mais itens correspondentes na lista | Retorna `5` |
| TC 4 | Lista de pedidos vazia | Retorna `0` |
| TC 5 | Lista de pedidos `null` | Lança erro `"Informe a lista de pedidos"` |
| TC 6 | Itens de café com variações de maiúsculas (`CAFÉ`, `CaFé`, `cafe`) | Retorna `5` (correspondência sem diferenciar caixa) |
| TC 7 | Buscar um item sem ocorrências em uma lista pequena | Retorna `1` |

Todos os casos de teste seguem o **padrão AAA** (Arrange, Act, Assert).

## Pipeline de CI/CD

A pipeline é definida em um único arquivo de workflow e roda em três disparos diferentes:

| Disparo | Configuração | Comportamento |
|---|---|---|
| **Manual** | `workflow_dispatch` | Executado sob demanda pela aba Actions |
| **Agendado** | `schedule: cron('20 20 * * *')` | Roda diariamente às 17:20 BRT (20:20 UTC) |
| **Push** | `push: branches: [main]` | Roda automaticamente a cada push na branch `main` |

### Etapas da Pipeline

1. Clone do repositório
2. Instalação do Node.js 24.x
3. Instalação do Yarn
4. Instalação das dependências do projeto
5. Instalação dos browsers do Playwright (via `npx`, ver observação abaixo)
6. Execução dos testes E2E (`continue-on-error: true`, garantindo que as etapas seguintes rodem mesmo em caso de falha)
7. Upload do relatório HTML do Playwright como artefato (retido por 7 dias)

### Observações

- **Fuso horário**: o job define `TZ: America/Sao_Paulo` para que os timestamps dos logs correspondam ao horário de Brasília, já que os runners do GitHub usam UTC por padrão.
- **Por que `npx playwright install` em vez de `yarn playwright install`**: nos runners `ubuntu-latest` hospedados pelo GitHub, o Yarn não conseguia resolver o binário do Playwright mesmo com o pacote corretamente instalado, gerando o erro `error Command "playwright" not found`. A troca para `npx` resolve o binário diretamente em `node_modules/.bin`, contornando o problema.

## Registro de Troubleshooting: Action do CTRF Reporter

Como parte da exploração de actions do GitHub Marketplace, a action [`ctrf-io/github-actions-test-reporter`](https://github.com/marketplace/actions/publish-ctrf-test-results-report) foi avaliada para publicar um sumário de testes diretamente na aba Summary do GitHub Actions.

**Problema observado**: após o Playwright executar com sucesso e reportar os 7 testes passando, o log da pipeline mostrava um `Error: No tests found` adicional logo em seguida, mesmo sem o job falhar de fato.

**Investigação da causa raiz**:
1. Confirmado que a mesma suíte de testes rodava limpa, sem nenhum erro, ao ser executada localmente (`npx playwright test`).
2. Verificado que `package.json`, `yarn.lock` e `playwright.config.js` estavam corretamente commitados e sincronizados com o repositório remoto.
3. Descartada a hipótese de arquivos de teste duplicados ou configuração conflitante de `testDir`.
4. Isolado o problema comentando inteiramente o step da action do CTRF reporter — o erro espúrio desapareceu por completo, restando uma execução limpa dos 7 testes E2E.

**Conclusão**: a action `ctrf-io/github-actions-test-reporter` aparenta invocar o Playwright internamente para coletar os dados do relatório. Essa segunda invocação interna não roda em um contexto onde consegue encontrar os arquivos de teste, gerando um erro `No tests found` enganoso que aparece visualmente anexado ao log do step anterior na interface do GitHub — sem, no entanto, falhar o job de fato.

**Resolução**: a action foi removida da pipeline. O mesmo objetivo (disponibilizar um relatório de testes) já é alcançado pelo reporter HTML nativo do Playwright combinado com `actions/upload-artifact`, que funciona corretamente e evita a saída de erro enganosa.

## Autor

Ismael Cabrera Martin
