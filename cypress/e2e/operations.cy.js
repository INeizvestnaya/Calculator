/// <reference types="cypress" />

import {
  PLUS,
  MINUS,
  MULTIPLY,
  REMAINDER,
  EQUAL,
  DOT,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  PLUS_MINUS
} from './../../src/constants/calculatorSigns';

const firstExp = [
  '2',
  MULTIPLY,
  LEFT_BRACKET,
  '3',
  PLUS_MINUS,
  PLUS,
  '5',
  RIGHT_BRACKET,
  PLUS,
  '8',
  REMAINDER,
  '3',
  EQUAL
];
const secondExp = [MINUS, DOT, '5', PLUS, '1', DOT, '5', EQUAL];
const thirdExp = ['7', '\\\\', '3', EQUAL];

describe('testing operations on functional calculator', () => {
  before(() => {
    cy.visit('http://localhost:3000/Calculator/');
  });

  it('calculates long expression with brackets', () => {
    cy.buttonsClick(firstExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '6');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('calculates expression after another expression', () => {
    cy.buttonsClick(secondExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '7');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('calculates expression overwriting previous result', () => {
    cy.buttonsClick(thirdExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '2.333');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });
});

describe('testing operations on class calculator', () => {
  before(() => {
    cy.visit('http://localhost:3000/calculator-class');
  });

  it('calculates long expression with brackets', () => {
    cy.buttonsClick(firstExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '6');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('calculates expression after another expression', () => {
    cy.buttonsClick(secondExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '7');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });

  it('calculates expression overwriting previous result', () => {
    cy.buttonsClick(thirdExp);
    cy.get('[data-type="cur-exp"]').should('have.text', '2.333');
    cy.get('[data-type="cur-hist"]').should('have.text', '');
  });
});
