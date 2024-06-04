describe('Verify Recipe Overview No User Login With Edit Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="get-started-btn"]').click();
    cy.url().should('include', '/ingredients');
  });

  const selectIngredients = () => {
    cy.get('[data-testid="searchIngredient"]').type('Pasta');
    cy.get('[data-testid="searchIngredient"]').should('have.value', 'Pasta');
    cy.contains('.block.cursor-pointer', 'Pasta').click();
    cy.get('[data-testid="searchSubmit"]').click();

    cy.get('[data-testid="searchIngredient"]').clear();
    cy.get('[data-testid="searchIngredient"]').type('ang');
    cy.get('[data-testid="searchIngredient"]').should('have.value', 'ang');
    cy.contains('.block.cursor-pointer', 'Angelica').click();
    cy.get('[data-testid="searchSubmit"]').click();

    cy.get('[data-testid="searchIngredient"]').clear();
    cy.get('[data-testid="searchIngredient"]').type('ang');
    cy.get('[data-testid="searchIngredient"]').should('have.value', 'ang');
    cy.contains('.block.cursor-pointer', 'Sweet orange').click();
    cy.get('[data-testid="searchSubmit"]').click();

    cy.intercept('POST', '**/recipe').as('submitForm');

    cy.get('[data-testid="submitIngredientForm"]').click();

    cy.wait('@submitForm').then(() => {
      cy.url().should('eq', 'http://localhost:5173/results');
    });
  }

  it('Checks if recipes are present', () => {
    selectIngredients();
    cy.get('[data-testid="recipe-card"]').should('have.length.gt', 0);

    cy.get('[data-testid="recipe-card"]').each($recipeCard => {
      cy.wrap($recipeCard).find('[data-testid="recipe-name"]').should('exist');
      cy.wrap($recipeCard).find('[data-testid="recipe-image"]').should('exist');
      cy.wrap($recipeCard).find('[data-testid="no-restrictions"]').should('exist');
      cy.wrap($recipeCard).find('[data-testid="recipe-prep-time"]').should('exist');
      cy.wrap($recipeCard).find('[data-testid="recipe-cook-time"]').should('exist');
    });
    
    cy.contains('Edit Search').click();

    cy.url().should('include', '/ingredients');
    cy.contains('[data-test1="ingredient-button"]', 'Pasta')
    cy.contains('[data-test1="ingredient-button"]', 'Angelica')
    cy.contains('[data-test1="ingredient-button"]', 'Sweet orange')
  });
});
