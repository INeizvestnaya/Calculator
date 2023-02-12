/// <reference types="cypress" />

import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  DOT,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  PLUS_MINUS,
  CE_SIGN,
  C_SIGN,
  ZERO
} from './../../src/constants/calculatorSigns';

const buttons = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ZERO,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  PLUS,
  MINUS,
  MULTIPLY,
  REMAINDER
];

describe('testing functional keypad', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Calculator/');
  });

  it('displays functional keypad buttons', () => {
    cy.get('[data-text]').should('have.length', 22);
  });

  it('clicks the buttons', () => {
    buttons.forEach((buttonText) => {
      cy.checkKeypadButton(buttonText);
      cy.get(`[data-text=${CE_SIGN}]`).click({ force: true });
    });

    cy.get('[data-text="\\\\"]').click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', DIVIDE);
  });

  it('correctly clicks change sign button', () => {
    cy.buttonsClick(['1', PLUS_MINUS]);
    cy.get('[data-type="cur-exp"]').should('have.text', '-1');
    cy.get(`[data-text="${PLUS_MINUS}"]`).click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', '1');
  });

  it('correctly clicks dot button', () => {
    cy.get(`[data-text="${DOT}"]`).click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', `${ZERO}${DOT}`);

    cy.get('[data-text="5"]').click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', '0.5');
  });

  it('correctly clicks CE button', () => {
    cy.buttonsClick(['1', PLUS, '2', CE_SIGN]);
    cy.get('[data-type="cur-exp"]').should('have.text', '+');
    cy.get('[data-type="cur-hist"]').should('have.text', '1');
  });

  it('correctly clicks C button', () => {
    cy.buttonsClick(['1', PLUS, '2', C_SIGN]);
    cy.get('[data-type="cur-exp"]').should('have.text', '');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('types only one first zero and one dot', () => {
    cy.buttonsClick([ZERO, ZERO, DOT, '5', DOT]);
    cy.get('[data-type="cur-exp"]').should('have.text', '0.5');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('changes operation if another was typed', () => {
    cy.buttonsClick(['1', PLUS, MULTIPLY]);
    cy.get('[data-type="cur-exp"]').should('have.text', MULTIPLY);
  });
});

describe('testing class keypad', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/calculator-class');
  });

  it('displays class keypad buttons', () => {
    cy.get('[data-text]').should('have.length', 22);
  });

  it('clicks the buttons', () => {
    buttons.forEach((buttonText) => {
      cy.checkKeypadButton(buttonText);
      cy.get(`[data-text=${CE_SIGN}]`).click({ force: true });
    });

    cy.get('[data-text="\\\\"]').click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', DIVIDE);
  });

  it('correctly clicks change sign button', () => {
    cy.buttonsClick(['1', PLUS_MINUS]);
    cy.get('[data-type="cur-exp"]').should('have.text', '-1');
    cy.get(`[data-text="${PLUS_MINUS}"]`).click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', '1');
  });

  it('correctly clicks dot button', () => {
    cy.get(`[data-text="${DOT}"]`).click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', `${ZERO}${DOT}`);

    cy.get('[data-text="5"]').click({ force: true });
    cy.get('[data-type="cur-exp"]').should('have.text', '0.5');
  });

  it('correctly clicks CE button', () => {
    cy.buttonsClick(['1', PLUS, '2', CE_SIGN]);
    cy.get('[data-type="cur-exp"]').should('have.text', '+');
    cy.get('[data-type="cur-hist"]').should('have.text', '1');
  });

  it('correctly clicks C button', () => {
    cy.buttonsClick(['1', PLUS, '2', C_SIGN]);
    cy.get('[data-type="cur-exp"]').should('have.text', '');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('types only one first zero and one dot', () => {
    cy.buttonsClick([ZERO, ZERO, DOT, '5', DOT]);
    cy.get('[data-type="cur-exp"]').should('have.text', '0.5');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('changes operation if another was typed', () => {
    cy.buttonsClick(['1', PLUS, MULTIPLY]);
    cy.get('[data-type="cur-exp"]').should('have.text', MULTIPLY);
  });
});
