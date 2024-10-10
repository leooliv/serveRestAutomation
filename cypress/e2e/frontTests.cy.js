import loginPage from '../pages/loginPage'
import registerPage from '../pages/registerPage'
import homePage from '../pages/homePage'

const { faker } = require('@faker-js/faker')

const nome = faker.person.fullName()
const email = faker.internet.email()
const password = faker.internet.password()

describe('', () => {
  it('Deveria criar uma nova conta', () => {
    cy.visit(`${Cypress.env('FRONT_URL')}`)
    loginPage.goToRegisterPage()
    registerPage.createNewValidAccount(nome, email, password)
    registerPage.clickRegisterButton()
    homePage.checkIfLoggedIn()
  })

  it('Deveria realizar o login da conta e deslogar', () => {
    cy.visit(`${Cypress.env('FRONT_URL')}`)
    loginPage.typeValidLogin(email, password)
    loginPage.clickSignInButton()
    homePage.checkIfLoggedIn()
  })

  it('Deveria tentar logar sem email e senha', () => {
    cy.visit(`${Cypress.env('FRONT_URL')}`)
    loginPage.typeValidLogin(' ', ' ')
    loginPage.clickSignInButton()
  })
})
