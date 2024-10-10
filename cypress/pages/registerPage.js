import loginPage from '../pages/loginPage'

class registerPage {
  elements = {
    nameField: () => cy.get('[data-testid="nome"]'),
    isAdminCheckBox: () => cy.get('[data-testid="checkbox"]'),
    registerButton: () => cy.xpath("//button[@data-testid='cadastrar']"),
    signInLink: () => cy.xpath("//a[@data-testid='entrar']"),
    emailField: () => cy.get('[data-testid="email"]'),
    passwordField: () => cy.get('[data-testid="password"]'),
  }

  createNewValidAccount(name, email, password) {
    this.elements.nameField().type(name)
    this.elements.emailField().type(email)
    this.elements.passwordField().type(password)
  }

  clickRegisterButton() {
    this.elements.registerButton().click()
  }
}

module.exports = new registerPage()
