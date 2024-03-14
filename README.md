# Serve Rest Automation
Repositório para teste técnico

cypress/javascript project.

## Tools used

* NVM 1.1.11
* NodeJS v18.16.0
* NPM 8.1.2
* Cypress 13.6.6

## Requirements

Faça o download das dependências do Node

* Tenha uma IDE instalada no seu computador, utilizada para o teste: VSCode.
* Rode o comando `npm install` na raiz do projeto para instalar todas as dependências.

### serveRestAutomation\cypress\e2e

|  Recurso                       |  Descrição                                               |
|-----------------------------|--------------------------------------------------|
| `cenario-1.cy.js`           | API tests para o primeiro cenário                |
| `cenario-2.cy.js`           | API tests para o segundo cenário                 |
| `login-tests.cy.js`         | Arquivo para testar alguns endpoints da API      |
| `product-tests.cy.js`       | Arquivo para testar alguns endpoints da API      |

### serveRestAutomation\cypress\support

|  Recurso                       |  Descrição                                               |
|--------------------------------|----------------------------------------------------------|
| `commands.js`                  | Arquivo para adicionar comandos adicionais ao cypress    |
| `e2e.js`                       | Arquivo para importar comando globais do cypress         |

### Rode os Testes

| Tipo de Teste     | Linha de Comando                                          |
|-------------------|-----------------------------------------------------------|
| API Test          | `npm test`                                                |


### Resultado dos Testes

É possível conferir o resultado dos testes através do terminal

