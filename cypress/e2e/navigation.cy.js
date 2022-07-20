/// <reference types="cypress" />

describe('testing navigation', () => {
  it('first opens functional components page', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/calculator-functional');
  });

  it('has 3 navigation links', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-link]').should('have.length', 3);
  });

  it('navigated to paths', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-link="class"]').click({ force: true });
    cy.location('pathname').should('eq', '/calculator-class');

    cy.get('[data-link="settings"]').click({ force: true });
    cy.location('pathname').should('eq', '/settings');

    cy.get('[data-link="functional"]').click({ force: true });
    cy.location('pathname').should('eq', '/calculator-functional');
  });
});
