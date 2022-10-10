/// <reference types="cypress" />

import { PLUS, MULTIPLY, EQUAL } from './../../src/constants/calculatorSigns';

describe('testing history', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Calculator/');
    cy.buttonsClick(['1', PLUS, '2', EQUAL, MULTIPLY, '3', EQUAL]);
  });

  it('adds history items', () => {
    cy.get('[data-hist-item]').should('have.length', 2);
  });

  it('history items are correct', () => {
    cy.get('[data-hist-item="1+2=3"]').should('have.text', '1+2=3');
    cy.get('[data-hist-item="3*3=9"]').should('have.text', '3*3=9');
  });

  it("history items don't get lost", () => {
    cy.get('[data-link="class"]').click({ force: true });
    cy.get('[data-hist-item="1+2=3"]').should('have.text', '1+2=3');
    cy.get('[data-hist-item="3*3=9"]').should('have.text', '3*3=9');

    cy.get('[data-link="functional"]').click({ force: true });
    cy.get('[data-hist-item="1+2=3"]').should('have.text', '1+2=3');
    cy.get('[data-hist-item="3*3=9"]').should('have.text', '3*3=9');
  });

  it('button clears the history from functional settings', () => {
    cy.get('[data-link="settings-func"]').click({ force: true });
    cy.get('[data-clear-hist]').click({ force: true });
    cy.get('[data-link="functional"]').click({ force: true });
    cy.get('[data-hist-item]').should('have.length', 0);
    cy.get('[data-type="cur-exp"]').should('have.text', '');
  });

  it('button clears the history from class settings', () => {
    cy.get('[data-link="settings-class"]').click({ force: true });
    cy.get('[data-clear-hist]').click({ force: true });
    cy.get('[data-link="functional"]').click({ force: true });
    cy.get('[data-hist-item]').should('have.length', 0);
    cy.get('[data-type="cur-exp"]').should('have.text', '');
  });
});
