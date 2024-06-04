describe('Verify Ingredient Selection, no user login and no submission', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="get-started-btn"]').click();
    cy.url().should('include', '/ingredients');
  });

  it('Selects ingredients', () => {
    const ingredientSelectors = ['Beef', 'Apple', 'Butter', 'Beans'];

    ingredientSelectors.forEach(ingredientName => {
      cy.contains('[data-test1="ingredient-button"]', ingredientName).click();
    });
  });

  it('Selects checkboxes for dietary restrictions', () => {
    cy.get('[data-testid="dietary-checkbox"]').each($checkbox => {
      cy.wrap($checkbox).should('not.have.attr', 'data-state', 'checked');
    });

    cy.get('[data-testid="dietary-checkbox"]').each($checkbox => {
      cy.wrap($checkbox).click();
      cy.wrap($checkbox).should('have.attr', 'data-state', 'checked');
    });
  });
 
  it('Search ingredient', () => {
    cy.get('[data-testid="searchIngredient"]').type('Pasta');
    cy.get('[data-testid="searchIngredient"]').should('have.value', 'Pasta');
    cy.contains('.block.cursor-pointer', 'Pasta').click();
    cy.get('[data-testid="searchSubmit"]').click();
  });

  it('Search ingredients', () => {
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
  });
});

describe('Verify Ingredient Selection, no user login and yes submission', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="get-started-btn"]').click();
    cy.url().should('include', '/ingredients');
  });

  it('Selects ingredients', () => {
    const ingredientSelectors = ['Beef', 'Apple', 'Butter', 'Beans'];

    ingredientSelectors.forEach(ingredientName => {
      cy.contains('[data-test1="ingredient-button"]', ingredientName).click();
    });

    cy.intercept('POST', '**/recipe').as('submitForm');

    cy.get('[data-testid="submitIngredientForm"]').click();

    cy.wait('@submitForm').then(() => {
      cy.url().should('eq', 'http://localhost:5173/results');
    });
  });

  it('Selects checkboxes for dietary restrictions', () => {
    cy.get('[data-testid="dietary-checkbox"]').each($checkbox => {
      cy.wrap($checkbox).should('not.have.attr', 'data-state', 'checked');
    });

    cy.get('[data-testid="dietary-checkbox"]').each($checkbox => {
      cy.wrap($checkbox).click();
      cy.wrap($checkbox).should('have.attr', 'data-state', 'checked');
    });

    cy.intercept('POST', '**/recipe').as('submitForm');

    cy.get('[data-testid="submitIngredientForm"]').click();

    cy.wait('@submitForm').then(() => {
      cy.url().should('eq', 'http://localhost:5173/results');
    });
  });

  it('Search ingredients', () => {
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
  });
});