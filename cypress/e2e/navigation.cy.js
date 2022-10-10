/// <reference types="cypress" />

describe('testing navigation', () => {
  it('first opens functional components page', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/Calculator/');
  });

  it('has 3 navigation links', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-link]').should('have.length', 4);
  });

  it('navigated to paths', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-link="class"]').click({ force: true });
    cy.location('pathname').should('eq', '/calculator-class');

    cy.get('[data-link="settings-func"]').click({ force: true });
    cy.location('pathname').should('eq', '/settings-func');

    cy.get('[data-link="settings-class"]').click({ force: true });
    cy.location('pathname').should('eq', '/settings-class');

    cy.get('[data-link="functional"]').click({ force: true });
    cy.location('pathname').should('eq', '/Calculator/');
  });
});
