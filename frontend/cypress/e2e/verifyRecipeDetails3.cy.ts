describe('Verify Recipe Overview with user session Yes User login With Edit Search ', () => {
  let userID: string | undefined;

  beforeEach(() => {
      cy.visit('http://localhost:5173/');
  
      // Log in
      cy.get('[data-testid="username-btn"]').click();
      cy.url().should('include', '/login');
      cy.get('[data-testid="username-input"]').type('123456789');
      cy.get('[data-testid="login-btn"]').click();
      cy.url().should('match', /\/ingredients\/\w+/);
      cy.get('[data-testid="username-btn"]').should('contain.text', '123456789');
  
      // Extract userID from URL
      cy.url().then(url => {
          userID = url.split('/').pop();
      });
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
          cy.url().should('eq', `http://localhost:5173/results/${userID}`);
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

    cy.url().should('include', `/ingredients/${userID}`);
    cy.contains('[data-test1="ingredient-button"]', 'Pasta')
    cy.contains('[data-test1="ingredient-button"]', 'Angelica')
    cy.contains('[data-test1="ingredient-button"]', 'Sweet orange')
  });
});
