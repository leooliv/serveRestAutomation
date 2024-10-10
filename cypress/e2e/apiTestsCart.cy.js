const { faker } = require('@faker-js/faker')

describe('Validando o processo de criação de um carrinho para um novo usuário', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: '',
    id: '',
  }
  const product = {
    id1: '',
    id2: '',
    quantity1: faker.number.int({ min: 20, max: 1000 }),
    quantity2: faker.number.int({ min: 20, max: 1000 }),
  }

  it('Deveria criar um usuário com sucesso', () => {
    cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, {
      nome: `${user.name}`,
      email: `${user.email}`,
      password: `${user.password}`,
      administrador: 'true',
    }).then((response) => {
      expect(response.status).to.equal(201)

      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      user.id = response.body._id
    })
  })

  it('Deveria realizar o login desse usuário com sucesso', () => {
    cy.request('POST', `${Cypress.env('API_URL')}/login`, {
      email: `${user.email}`,
      password: `${user.password}`,
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Login realizado com sucesso',
      })

      expect(response.body.authorization).to.exist
      user.token = response.body.authorization
    })
  })

  it('Deveria criar o produto 1 com sucesso utilizando o token do novo usuário', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/produtos`,
      headers: {
        Authorization: `${user.token}`,
      },
      body: {
        nome: faker.commerce.productName(),
        preco: faker.number.int({ min: 20, max: 5000 }),
        descricao: faker.commerce.product(),
        quantidade: product.quantity1,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      product.id1 = response.body._id
    })
  })

  it('Deveria criar o produto 2 com sucesso utilizando o token do novo usuário', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/produtos`,
      headers: {
        Authorization: `${user.token}`,
      },
      body: {
        nome: faker.commerce.productName(),
        preco: faker.number.int({ min: 20, max: 5000 }),
        descricao: faker.commerce.product(),
        quantidade: product.quantity2,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      product.id2 = response.body._id
    })
  })

  it('Deveria criar um carrinho novo adicionando os 2 produtos novos', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/carrinhos`,
      headers: {
        Authorization: `${user.token}`,
      },
      body: {
        produtos: [
          {
            idProduto: `${product.id1}`,
            quantidade: 2,
          },
          {
            idProduto: `${product.id2}`,
            quantidade: 2,
          },
        ],
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })
    })
  })

  it('Deveria concluir a compra e finalizar o carrinho', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('API_URL')}/carrinhos/concluir-compra`,
      headers: {
        Authorization: `${user.token}`,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Registro excluído com sucesso',
      })
    })
  })

  it('Deveria encontrar um produto 1 pelo iD e confirmar o desconto na quantidade', () => {
    cy.request('GET', `${Cypress.env('API_URL')}/produtos/${product.id1}`).then(
      (response) => {
        expect(response.body._id).to.exist
        expect(response.body.quantidade).to.equal(product.quantity1 - 2)
      },
    )
  })

  it('Deveria encontrar um produto 2 pelo iD e confirmar o desconto na quantidade', () => {
    cy.request('GET', `${Cypress.env('API_URL')}/produtos/${product.id2}`).then(
      (response) => {
        expect(response.body._id).to.exist
        expect(response.body.quantidade).to.equal(product.quantity2 - 2)
      },
    )
  })

  it('Deveria deletar o produto 1 criado para o teste com sucesso', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('API_URL')}/produtos/${product.id1}`,
      headers: {
        Authorization: `${user.token}`,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Registro excluído com sucesso',
      })
    })
  })

  it('Deveria deletar o produto 2 criado para o teste com sucesso', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('API_URL')}/produtos/${product.id2}`,
      headers: {
        Authorization: `${user.token}`,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Registro excluído com sucesso',
      })
    })
  })

  it('Deveria deletar um usuário com sucesso', () => {
    cy.request('DELETE', `${Cypress.env('API_URL')}/usuarios/${user.id}`)
      .its('body')
      .should('include', {
        message: 'Registro excluído com sucesso',
      })
  })
})
