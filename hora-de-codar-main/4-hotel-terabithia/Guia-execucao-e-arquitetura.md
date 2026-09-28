# Hotel Terabithia — Guia de Execução e Documentação da Arquitetura

Este documento cobre os itens 1 e 2 dos Entregáveis do enunciado: instruções de execução e documentação da arquitetura modular adotada.

> **Status da interface (importante para quem for avaliar):** o sistema está em transição de uma interface baseada em `prompt()`/`alert()` para uma interface HTML real (formulários e botões). No momento, **Login e Menu Principal já usam a interface HTML**; os Subprogramas 1 a 6 ainda usam `prompt()`/`alert()` enquanto são convertidos, um de cada vez. A seção 2.6 detalha os dois padrões.

---

## 1. Instruções de Execução

### 1.1 Requisitos

Nenhuma instalação é necessária. O sistema roda inteiramente no navegador (Google Chrome, Firefox ou Edge), usando apenas HTML, CSS e JavaScript puro, sem frameworks ou servidor.

### 1.2 Estrutura de pastas

```
projeto-hotel/
├── html/
│   └── Hotel.html          → arquivo principal, abrir este no navegador
├── js/
│   ├── utils.js             → funções auxiliares reutilizáveis + renderTela (interface)
│   ├── estado.js             → dados em memória compartilhados
│   ├── auth.js               → login (tela HTML)
│   ├── menu.js               → menu principal (tela HTML)
│   ├── reservas.js           → Subprograma 1 (prompt/alert)
│   ├── hospedes.js           → Subprograma 2 (prompt/alert)
│   ├── eventos.js            → Subprograma 3 (prompt/alert)
│   ├── ar_condicionado.js    → Subprograma 4 (prompt/alert)
│   ├── abastecimento.js      → Subprograma 5 (prompt/alert)
│   └── relatorios.js         → Subprograma 6 (prompt/alert)
└── css/
    └── estilo.css            → estilo visual das telas HTML (login, menu)
```

### 1.3 Como executar

1. Abra a pasta `projeto-hotel/html/`.
2. Dê duplo clique em `Hotel.html`. Ele abre no navegador padrão do sistema.
3. **Recomendação:** teste em uma janela anônima do navegador (Ctrl+Shift+N no Chrome). Extensões instaladas no navegador podem gerar mensagens de erro no Console sem relação nenhuma com o sistema — testar em janela anônima evita essa confusão.

### 1.4 Fluxo de uso

1. **Login:** aparece um cartão com campos de nome e senha (`2678`), com até 3 tentativas. Na 3ª tentativa incorreta, o acesso é bloqueado e a página precisa ser recarregada (F5) para tentar de novo.
2. **Menu principal:** após o login, aparecem 7 botões (Reservas, Hóspedes, Eventos, Ar-Condicionado, Abastecimento, Relatórios, Sair). Clicar num botão dos Subprogramas 1 a 6 ainda abre uma sequência de caixas de diálogo (`prompt`/`alert`), já que esses módulos aguardam conversão para HTML.
3. **Encerrar:** o botão "7. Sair" exibe uma mensagem de despedida na própria tela.

### 1.5 Observação sobre os dados

Todos os dados (quartos ocupados, hóspedes cadastrados, eventos e receitas) ficam guardados apenas na memória do navegador enquanto a página está aberta. **Ao recarregar ou fechar a página, os dados voltam ao estado inicial.** Para testar o Subprograma 6 (Relatórios) com dados relevantes, é necessário primeiro realizar operações nos Subprogramas 1, 2 e 3 dentro da mesma sessão (sem recarregar a página entre elas).

---

## 2. Documentação da Arquitetura Modular

### 2.1 Visão geral

O sistema é dividido em 10 arquivos `.js` e 1 arquivo `.css`, cada um com uma responsabilidade única, carregados por um único `Hotel.html`. Não é usado nenhum sistema de módulos como `import`/`require` (próprios de Node.js ou de bundlers), porque o projeto roda direto no navegador via tags `<script>`. Nesse ambiente, o mecanismo de modularização é a **separação por arquivo**, com todos os arquivos compartilhando o mesmo escopo global do navegador.

### 2.2 Ordem de carregamento

```html
<script src="../js/utils.js"></script>
<script src="../js/estado.js"></script>
<script src="../js/auth.js"></script>
<script src="../js/menu.js"></script>
<script src="../js/reservas.js"></script>
<script src="../js/hospedes.js"></script>
<script src="../js/eventos.js"></script>
<script src="../js/ar_condicionado.js"></script>
<script src="../js/abastecimento.js"></script>
<script src="../js/relatorios.js"></script>
<script>
    window.onload = function () {
        login();
    };
</script>
```

Cada `<script src="...">` é carregado e executado em sequência. Os 10 primeiros apenas **declaram** funções e variáveis — não executam nenhuma ação sozinhos. A última tag não chama `login()` diretamente: ela registra `login` para rodar somente quando o evento `window.onload` disparar, ou seja, quando o navegador terminar de montar a página inteira, incluindo o `<body>`. Isso é necessário porque, desde a introdução da interface HTML, `login()` já não usa `prompt()` — ele escreve HTML dentro de uma `<div>` do `body` (via `renderTela`), e essa `<div>` só existe depois que o `<body>` foi processado. Sem o `window.onload`, o script do `<head>` tentaria escrever na `<div>` antes dela existir, e o navegador acusa `Cannot set properties of null (setting 'innerHTML')`.

### 2.3 Por que os arquivos "se enxergam" sem import/export

No navegador, todo `<script>` carregado numa mesma página roda no **mesmo escopo global** — é como se o navegador colasse o conteúdo de todos os arquivos num único arquivo, na ordem em que foram carregados. Por isso, uma função declarada em `reservas.js` pode chamar livremente uma função declarada em `utils.js` ou uma variável declarada em `estado.js`, sem nenhuma sintaxe especial de importação.

### 2.4 Tabela de responsabilidades dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `utils.js` | Funções genéricas reaproveitadas por todos os subprogramas: leitura de entrada, validação de números (`estaEntre`, `ehNumeroPositivo`), formatação monetária (`paraReal`) e `renderTela` (troca o conteúdo exibido na tela) |
| `estado.js` | Único ponto de armazenamento dos dados em memória: quartos, hóspedes, reservas confirmadas, eventos confirmados e receitas acumuladas |
| `auth.js` | Login: tela HTML de nome/senha, controle de até 3 tentativas |
| `menu.js` | Menu principal: tela HTML com botões, um por subprograma |
| `reservas.js` | Subprograma 1 — Reservas de Quartos (ainda via prompt/alert) |
| `hospedes.js` | Subprograma 2 — Cadastro de Hóspedes (ainda via prompt/alert) |
| `eventos.js` | Subprograma 3 — Eventos (ainda via prompt/alert) |
| `ar_condicionado.js` | Subprograma 4 — Comparativo de orçamentos de manutenção (ainda via prompt/alert) |
| `abastecimento.js` | Subprograma 5 — Comparativo de postos de combustível (ainda via prompt/alert) |
| `relatorios.js` | Subprograma 6 — Consolidação de dados dos demais módulos, somente leitura (ainda via prompt/alert) |
| `estilo.css` | Aparência visual das telas HTML: cartão centralizado, campos de formulário, botões |

### 2.5 Estado compartilhado (`estado.js`)

Em vez de cada subprograma manter sua própria variável solta, os dados ficam centralizados em `estado.js`:

```javascript
var quartos = new Array(20).fill(null);
var hospedes = [];
var reservasConfirmadas = [];
var eventosConfirmados = [];
var receitaHospedagem = 0;
var receitaEventos = 0;
```

Isso atende ao padrão obrigatório do enunciado (seção 10.2) de não usar variáveis globais soltas sem justificativa: aqui a "justificativa" é que múltiplos subprogramas precisam ler e escrever os mesmos dados (por exemplo, `relatorios.js` só lê o que `reservas.js`, `hospedes.js` e `eventos.js` escreveram), e centralizar evita duplicação e inconsistência.

**Fluxo de dados entre módulos:**

- `reservas.js` **escreve** em `quartos`, `reservasConfirmadas` e `receitaHospedagem`.
- `hospedes.js` **escreve** em `hospedes`.
- `eventos.js` **escreve** em `eventosConfirmados` e `receitaEventos`.
- `ar_condicionado.js` e `abastecimento.js` não persistem dados em `estado.js` — cada orçamento existe apenas durante a execução daquele subprograma.
- `relatorios.js` apenas **lê** os dados acima; não modifica nada.

### 2.6 Duas camadas de interação: interface HTML vs. prompt/alert

O sistema hoje convive com dois padrões diferentes de interação, resultado de uma migração em andamento:

**Padrão novo — interface HTML (`auth.js`, `menu.js`):** a tela é construída como uma string de HTML e injetada dentro de uma única `<div id="app">` do `body`, através da função `renderTela(html)` (definida em `utils.js`). Botões e campos disparam funções por meio do atributo `onclick`, que leem os valores digitados com `document.getElementById(id).value`. Não há mais recursão nesse padrão: cada tela fica esperando uma ação do usuário (clique), e quem decide o que fazer a seguir é a função ligada ao botão (ex.: `tentarLogin()`), não uma nova chamada da função que desenhou a tela.

```javascript
function renderTela(html) {
    document.getElementById('app').innerHTML = html;
}
```

Esse padrão também eliminou a necessidade de uma função de "opção inválida" no menu: como a navegação agora é por botões (não por número digitado), não existe mais entrada fora do intervalo esperado.

**Padrão antigo — prompt/alert (`reservas.js`, `hospedes.js`, `eventos.js`, `ar_condicionado.js`, `abastecimento.js`, `relatorios.js`):** ainda em uso nos Subprogramas 1 a 6, aguardando conversão. Usa `prompt()`/`alert()` diretamente, com **recursão** para repetir perguntas ou retornar ao menu — por exemplo, `escolherQuarto()` (em `reservas.js`) chama a si mesma até o usuário escolher um quarto válido e livre, e `sistema_cadastrar_hospedes()` chama a si mesma ao final de cada operação, mantendo o submenu ativo até a opção "Voltar". Uma exceção dentro desse padrão é `sistema_ar_condicionado()`, que usa um laço `while` em vez de recursão, por lidar com uma lista que cresce a cada rodada.

A conversão dos Subprogramas 1 a 6 para o padrão novo será feita nas próximas etapas do desenvolvimento, um subprograma por vez, reaproveitando as funções de cálculo e validação já existentes (elas não dependem de `prompt`/`alert`, então continuam válidas mesmo depois da conversão da interface).

### 2.7 Controle de erros sem encerramento abrupto

Seguindo o padrão obrigatório do enunciado (seção 10.2), nenhuma validação encerra o programa.

No padrão prompt/alert:
```javascript
if (/* entrada inválida */) {
    alert('Mensagem de erro');
    inicio();
    return;
}
```

No padrão HTML, o equivalente é atualizar a mensagem de erro na própria tela sem recarregar nada, como em `tentarLogin()`:
```javascript
document.getElementById('mensagem-login').textContent = 'Senha incorreta. Tentativa ' + tentativasLogin + ' de 3.';
```

### 2.8 Reaproveitamento de validações comuns

As validações genéricas ficam em `utils.js` e são usadas por múltiplos subprogramas, evitando duplicação de lógica:

| Função | Usada em |
|---|---|
| `estaEntre(valor, min, max)` | Reservas (dias, número do quarto), Eventos (duração), Hóspedes (índice da listagem) |
| `ehNumeroPositivo(valor)` | Reservas (diária) |
| `paraReal(valor)` | Reservas, Eventos, Ar-Condicionado, Abastecimento, Relatórios |
| `renderTela(html)` | Login, Menu Principal (e futuramente todos os subprogramas convertidos) |

### 2.9 Aderência à estrutura sugerida (seção 10.1 do enunciado)

| Sugerido no enunciado | Implementado como |
|---|---|
| `main` / `inicio` | `menu.js` (função `inicio`) + `window.onload` em `Hotel.html` |
| `auth` | `auth.js` |
| `menu` | `menu.js` |
| `reservas` | `reservas.js` |
| `hospedes` | `hospedes.js` |
| `eventos` | `eventos.js` |
| `ar_condicionado` | `ar_condicionado.js` |
| `abastecimento` | `abastecimento.js` |
| `relatorios` | `relatorios.js` |
| `utils` (entrada, validação, formatação) | `utils.js` |

O arquivo `estilo.css` é uma adição além da estrutura sugerida pelo enunciado, dedicada exclusivamente à aparência da interface HTML.

### 2.10 Observação sobre o exemplo de execução de Eventos

O exemplo de execução da seção 6.6 do enunciado mostra um custo de buffet de R$ 540,96 para 192 convidados. Aplicando as fórmulas exatamente como descritas nas seções 6.3 e 6.4, o valor calculado é R$ 526,08 (total do evento R$ 2.206,08, em vez de R$ 2.220,96). A implementação segue fielmente as regras escritas no texto; a divergência parece ser um erro de digitação no exemplo do enunciado.

---

## 3. Pendências para a entrega

- **Conversão da interface:** os Subprogramas 1 a 6 ainda usam `prompt()`/`alert()` e precisam ser migrados para o padrão HTML (telas com formulário), seguindo o mesmo modelo usado em Login e Menu Principal.
- **Item 3 dos Entregáveis — Evidências de teste:** capturas de tela ou registros da execução de cada subprograma, incluindo os casos de erro testados durante o desenvolvimento.
- **Revisão final:** remover eventuais `console.log` de depuração deixados nos arquivos durante os testes.