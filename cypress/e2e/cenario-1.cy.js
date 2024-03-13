const { faker } = require('@faker-js/faker')

describe('Serve Rest API - Validando os endpoints de Usuários', () => {
  let userId

  it('Deveria criar um usuário com sucesso', () => {
    cy.request('POST', `${Cypress.env('API_URL')}/usuarios`, {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
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

  it('Deveria fazer a listagem de usuários na API', () => {
    cy.request('GET', `${Cypress.env('API_URL')}/usuarios`).then((response) => {
      expect(response.body.quantidade).to.exist
      expect(response.body.usuarios).to.exist
    })
  })

  it('Deveria encontrar um usuário pelo iD com sucesso', () => {
    cy.request('GET', `https://serverest.dev/usuarios/${userId}`).then(
      (response) => {
        expect(response.body.nome).to.exist
        expect(response.body.email).to.exist
        expect(response.body.password).to.exist
        expect(response.body.administrador).to.exist
        expect(response.body._id).to.exist
      },
    )
  })

  it('Deveria editar o registro de um usuário com sucesso', () => {
    cy.request('PUT', `https://serverest.dev/usuarios/${userId}`, {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'false',
    }).then((response) => {
      expect(response.status).to.equal(200)

      expect(response.body).to.include({
        message: 'Registro alterado com sucesso',
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
