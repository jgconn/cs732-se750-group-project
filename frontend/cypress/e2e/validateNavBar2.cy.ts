
describe('Validate Navigation Bar yes user login', () => {
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

  const checkNavbarExists2 = () => {
    cy.get('nav').should('exist');
    cy.get('a[href="/"]').should('exist').contains('Home');
    cy.get(`a[href="/ingredients/${userID}"]`).should('exist').contains('Recipe Generation');
    cy.get(`a[href="/favourites/${userID}"]`).should('exist').contains('Favourites');
    cy.get(`a[href="/history/${userID}"]`).should('exist').contains('History');
    cy.get('[data-testid="username-btn"]').should('exist');
  };
  
  const checkNavbarNotExists2 = () => {
    cy.get('nav').should('not.exist');
  };

  it('Checks if navbar exists in the home page', () => {
    cy.visit('http://localhost:5173/');

    checkNavbarExists2();
  });

  it('Checks if navbar exists in the favourites page ', () => {
    cy.visit('http://localhost:5173/favourites');
    checkNavbarExists2();
  });
  
  it('Checks if navbar exists in the history page', () => {
    cy.visit('http://localhost:5173/history');
    checkNavbarExists2();
  });

  it('Checks if navbar exists in the ingredients page', () => {
    cy.visit('http://localhost:5173/ingredients');
    checkNavbarExists2();
  });

  it('Checks if navbar not exists in the login page', () => {
    cy.visit('http://localhost:5173/login');
    cy.url().should('include', '/login');
    checkNavbarNotExists2();
  });

  it('Checks if navbar exists in the recipe overview page', () => {
    cy.visit('http://localhost:5173/');
    let userID: string | undefined;

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

    cy.visit(`http://localhost:5173/results/${userID}`);
    checkNavbarNotExists2();
  });

  it('Checks if navbar exists in the recipe details page', () => {

  });
});
