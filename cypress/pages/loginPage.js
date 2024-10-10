class loginPage {
  elements = {
    emailField: () => cy.get('[data-testid="email"]'),
    passwordField: () => cy.get('[data-testid="senha"]'),
    signInButton: () => cy.xpath("//button[@data-testid='entrar']"),
    registerLink: () => cy.get('[data-testid="cadastrar"]'),
  }

  typeValidLogin(email, password) {
    this.elements.emailField().type(email)
    this.elements.passwordField().type(password)
  }

  clickSignInButton() {
    this.elements.signInButton().click()
  }

  goToRegisterPage() {
    this.elements.registerLink().click()
  }

  checkIfInLoginPage() {
    this.elements.signInButton().should('be.visible')
  }
}

module.exports = new loginPage()
