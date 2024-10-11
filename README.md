# Serve Rest Automation
Repositório para teste técnico

cypress/javascript project.

## Tools used

* NodeJS v18.16.0
* NPM 8.1.2
* Cypress 13.6.6

## Requirements

Faça o download das dependências do Node

* Tenha uma IDE instalada no seu computador, utilizada para o teste: VSCode.
* Rode o comando `npm install` na raiz do projeto para instalar todas as dependências.

### serveRestAutomation\cypress\e2e

|  Recurso                       |  Descrição                                       |
|--------------------------------|--------------------------------------------------|
| `apiLoginTest.cy.js`           | API tests para casos relacionados a login        |
| `apiTestsCart.cy.js`           | API tests para casos relacionado ao carrinho     |
| `apiTestsUser.cy.js`           | API tests para casos relacionado ao usuário      |
| `frontTests.cy.js`             | Testes para o frontend da aplicação              |

### serveRestAutomation\cypress\support

|  Recurso                       |  Descrição                                               |
|--------------------------------|----------------------------------------------------------|
| `commands.js`                  | Arquivo para adicionar comandos adicionais ao cypress    |
| `e2e.js`                       | Arquivo para importar comando globais do cypress         |
| `..\..\cypress.config.js`      | Arquivo para definir variáveis globais do cypress        |

### Rode os Testes

Na pasta raiz do projeto rode o seguinte comando no terminal para executar os cenários

| Tipo de Teste           | Linha de Comando                                          |
|-------------------------|-----------------------------------------------------------|
| API/Front Test          | `npm test`                                                |


### Resultado dos Testes

É possível conferir o resultado dos testes através do terminal e pelo GUI

