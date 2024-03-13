describe('Serve Rest API - Testando os endpoints de Login', () => {
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

  it('Deveria falhar o login - Email e senha brancos', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: '',
        password: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)

      expect(response.body).to.include({
        email: 'email não pode ficar em branco',
        password: 'password não pode ficar em branco',
      })
    })
  })

  it('Deveria falhar o login - Email e/ou senha incorretos', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: 'test@test.com',
        password: '.',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401)

      expect(response.body).to.include({
        message: 'Email e/ou senha inválidos',
      })
    })
  })

  it('Deveria falhar o login - Email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: 'test',
        password: '.',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)

      expect(response.body).to.include({
        email: 'email deve ser um email válido',
      })
    })
  })
})
