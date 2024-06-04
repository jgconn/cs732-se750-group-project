describe('Verify Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Verifies landing page content', () => {
    cy.get('[data-testid="landing-page-hero"]').should('exist')
      .contains('Meet Pal, Your Very Own Pantry Chef!');
  });

  it('Submits the form with username less than 8 characters', () => {
    cy.get('[data-testid="username-btn"]').click();
    cy.url().should('include', '/login');

    cy.get('[data-testid="username-input"]').type('1234567');
    cy.get('[data-testid="username-input"]').should('have.value', '1234567');
    cy.get('[data-testid="login-btn"]').click();
    cy.url().should('not.include', '/ingredients');
  });

  it('Submits the form with valid username', () => {
    cy.get('[data-testid="username-btn"]').click();
    cy.url().should('include', '/login');

    cy.get('[data-testid="username-input"]').type('12345678');
    cy.get('[data-testid="username-input"]').should('have.value', '12345678');

    cy.get('[data-testid="login-btn"]').click();
    cy.url().should('match', /\/ingredients\/\w+/);
  });

  it('Submits the form with valid username and checks username in NavBar', () => {
    cy.get('[data-testid="username-btn"]').click();
    cy.url().should('include', '/login');

    cy.get('[data-testid="username-input"]').type('12345678');
    cy.get('[data-testid="username-input"]').should('have.value', '12345678');

    cy.get('[data-testid="login-btn"]').click();
    cy.url().should('match', /\/ingredients\/\w+/);

    cy.get('[data-testid="username-btn"]').should('contain.text', '12345678');
  });

  it('Submits the form with valid username and checks username in NavBar in all pages', () => {
    cy.get('[data-testid="username-btn"]').click();
    cy.url().should('include', '/login');

    cy.get('[data-testid="username-input"]').type('123456789');
    cy.get('[data-testid="username-input"]').should('have.value', '123456789');

    cy.get('[data-testid="login-btn"]').click();
    cy.url().should('match', /\/ingredients\/\w+/);

    cy.get('[data-testid="username-btn"]').should('contain.text', '123456789');

    const paths = ['favourites', 'history', '', 'ingredients'];

    cy.url().then(url => {
        const userID = url.split('/').pop();

        paths.forEach(path => {
            const pageURL = path ? `http://localhost:5173/${path}/${userID}` : `http://localhost:5173/`;
            cy.visit(pageURL);
            cy.get('[data-testid="username-btn"]').should('contain.text', '123456789');
        });
    });
  });
});