describe('Serve Rest API Login Teste', () => {
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
})
