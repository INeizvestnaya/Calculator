/// <reference types="cypress" />

describe('testing control panel in functional components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/calculator-functional');
  });

  it('button always exists', () => {
    cy.get('[data-show-hide]').should('exist');
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-show-hide]').should('exist');
  });

  it('button hides history', () => {
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-hist-wrapper]').should('not.exist');
  });

  it('button shows history', () => {
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-hist-wrapper]').should('exist');
  });
});

describe('testing control panel in class components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/calculator-class');
  });

  it('button always exists', () => {
    cy.get('[data-show-hide]').should('exist');
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-show-hide]').should('exist');
  });

  it('button hides history', () => {
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-hist-wrapper]').should('not.exist');
  });

  it('button shows history', () => {
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-show-hide]').click({ force: true });
    cy.get('[data-hist-wrapper]').should('exist');
  });
});
