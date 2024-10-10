class homePage {
  elements = {
    homePageButton: () => cy.get('[data-testid="home"]'),
    logoutButton: () => cy.get('[data-testid="logout"]'),
    searchProductField: () => cy.get('[data-testid="pesquisar"]'),
    searchProductButton: () => cy.get('[data-testid="botaoPesquisar"]'),
    shoppingListButton: () => cy.get('[data-testid="lista-de-compras"]'),
    shoppingCartButton: () => cy.get('[data-testid="carrinho"]'),
  }

  checkIfLoggedIn() {
    this.elements.homePageButton().should('be.visible')
  }

  logOut() {
    this.elements.logoutButton().click()
  }
}

module.exports = new homePage()
