describe('Validate Pages', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('validates Landing Page', () => {
        cy.url().should('include', '/');
    });

    // fix why beforeEach not working
    it('validates Favourites Page', () => {
        cy.visit('http://localhost:5173/favourites');
        cy.url().should('include', '/favourites');
    });

    // fix why beforeEach not working
    it('validates History Page', () => {
        cy.visit('http://localhost:5173/history');
        cy.url().should('include', '/history');
    });

    it('validates Selection Page', () => {
        cy.visit('http://localhost:5173/ingredients');
        cy.url().should('include', '/ingredients');
    });

    it('validates Recipe Overview Page', () => {
        // Log in
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
        cy.url().should('include', '/results');
    });

    it('validates Recipe Details Page', () => {
    });
});