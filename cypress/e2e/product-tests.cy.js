const { faker } = require('@faker-js/faker')

describe('Serve Rest API - Testando os endpoints de Usuários', () => {
  let productId = 'BeeJh5lz3k6kSIzA'

  it('Deveria fazer a listagem de produtos na API', () => {
    cy.request('GET', 'https://serverest.dev/produtos').then((response) => {
      expect(response.body.quantidade).to.exist
      expect(response.body.produtos).to.exist
    })
  })

  it('Deveria realizar o login com sucesso', () => {
    cy.request('POST', 'https://serverest.dev/login', {
      email: 'fulano@qa.com',
      password: 'teste',
    })
      .its('body')
      .should('include', {
        message: 'Login realizado com sucesso',
      })
      .its('authorization')
      .should('exist')
  })

  it('Deveria encontrar um produto pelo iD com sucesso', () => {
    cy.request('GET', `https://serverest.dev/produtos/${productId}`).then(
      (response) => {
        expect(response.body.nome).to.exist
        expect(response.body.preco).to.exist
        expect(response.body.descricao).to.exist
        expect(response.body.quantidade).to.exist
        expect(response.body._id).to.exist
      },
    )
  })

  it('Deveria criar um produto com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InFhdGVzdGVAcWEuY29tIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTcxMDM0MzI2NiwiZXhwIjoxNzEwMzQzODY2fQ.ofk9aRIs4WC3aNcCeTT8Mh0AZvBSWkp3z2e2PUxqhSA',
      },
      body: {
        nome: 'Logitech MX Vertical',
        preco: 470,
        descricao: 'Mouse',
        quantidade: 381,
      },
    }).then((response) => {
      expect(response.body).to.include({
        message: 'Cadastro realizado com sucesso',
      })

      expect(response.body._id).to.exist

      productId = response.body._id
    })
  })
})
