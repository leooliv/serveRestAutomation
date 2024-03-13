const { faker } = require('@faker-js/faker')

describe('Validar o processo de criação de um carrinho para um novo usuário', () => {
  let userEmail = faker.internet.email()
  let userPassword = faker.internet.password()
  let userToken = ''
  let userId
  let productId1
  let productId2
  let product1Quantity = faker.number.int({ min: 20, max: 1000 })
  let product2Quantity = faker.number.int({ min: 20, max: 1000 })

  it('Deveria criar um usuário com sucesso', () => {
    cy.request('POST', 'https://serverest.dev/usuarios', {
      nome: faker.person.fullName(),
      email: `${userEmail}`,
      password: `${userPassword}`,
      administrador: 'true',
    }).then((response) => {
      expect(response.status).to.equal(201)

      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      userId = response.body._id
    })
  })

  it('Deveria realizar o login desse usuário com sucesso', () => {
    cy.request('POST', 'https://serverest.dev/login', {
      email: `${userEmail}`,
      password: `${userPassword}`,
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Login realizado com sucesso',
      })

      expect(response.body.authorization).to.exist
      userToken = response.body.authorization
    })
  })

  it('Deveria criar o produto 1 com sucesso utilizando o token do novo usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: `${userToken}`,
      },
      body: {
        nome: faker.commerce.productName(),
        preco: faker.number.int({ min: 20, max: 5000 }),
        descricao: faker.commerce.product(),
        quantidade: product1Quantity,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      productId1 = response.body._id
    })
  })

  it('Deveria criar o produto 2 com sucesso utilizando o token do novo usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: `${userToken}`,
      },
      body: {
        nome: faker.commerce.productName(),
        preco: faker.number.int({ min: 20, max: 5000 }),
        descricao: faker.commerce.product(),
        quantidade: product2Quantity,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist
      productId2 = response.body._id
    })
  })

  it('Deveria criar um carrinho novo adicionando os 2 produtos novos', () => {
    cy.request({
      method: 'POST',
      url: `https://serverest.dev/carrinhos`,
      headers: {
        Authorization: `${userToken}`,
      },
      body: {
        produtos: [
          {
            idProduto: `${productId1}`,
            quantidade: 2,
          },
          {
            idProduto: `${productId2}`,
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
      url: `https://serverest.dev/carrinhos/concluir-compra`,
      headers: {
        Authorization: `${userToken}`,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Registro excluído com sucesso',
      })
    })
  })

  it('Deveria encontrar um produto 1 pelo iD e confirmar o desconto na quantidade', () => {
    cy.request('GET', `https://serverest.dev/produtos/${productId1}`).then(
      (response) => {
        expect(response.body._id).to.exist
        expect(response.body.quantidade).to.equal(product1Quantity - 2)
      },
    )
  })

  it('Deveria encontrar um produto 2 pelo iD e confirmar o desconto na quantidade', () => {
    cy.request('GET', `https://serverest.dev/produtos/${productId2}`).then(
      (response) => {
        expect(response.body._id).to.exist
        expect(response.body.quantidade).to.equal(product2Quantity - 2)
      },
    )
  })

  it('Deveria deletar o produto 1 criado para o teste com sucesso', () => {
    cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/produtos/${productId1}`,
      headers: {
        Authorization: `${userToken}`,
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
      url: `https://serverest.dev/produtos/${productId2}`,
      headers: {
        Authorization: `${userToken}`,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Registro excluído com sucesso',
      })
    })
  })

  it('Deveria deletar um usuário com sucesso', () => {
    cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`)
      .its('body')
      .should('include', {
        message: 'Registro excluído com sucesso',
      })
  })
})
