const APP_URL = process.env.APP_URL || 'http://localhost:8080';

describe('Home', () => {
  it('should render create account modal when on cta create account button', () => {
    cy.visit(APP_URL);

    cy.get('#cta-create-account-button').click();

    cy.get('#modal-create-account');
  });

  it('should render create account modal when on header create account button', () => {
    cy.visit(APP_URL);

    cy.get('#header-create-account-button').click();

    cy.get('#modal-create-account');
  });

  it('should render create login modal when on header login button', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click();

    cy.get('#modal-login');
  });

  it('should login with email and password', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click();
    cy.get('#modal-login');

    cy.get('#email-field').type('igor@igor.mee');
    cy.get('#password-field').type('1234');
    cy.get('#submit-button').click();

    cy.url().should('include', '/feedbacks');
  });

  it('should show an error when an invalid email is provided', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click();
    cy.get('#modal-login');

    cy.get('#email-field').type('igor.com');
    cy.get('#password-field').type('1234');
    cy.get('#submit-button').click();

    cy.get('#email-error');
  });

  it('should logout button works correctly', () => {
    cy.visit(APP_URL);

    // open login modal
    cy.get('#header-login-button').click();
    cy.get('#modal-login');

    // Login
    cy.get('#email-field').type('igor@igor.me');
    cy.get('#password-field').type('1234');
    cy.get('#submit-button').click();
    cy.url().should('include', '/feedbacks');

    // do logout
    cy.get('#logout-button').click();
    cy.url().should('include', '/');
  });
});
