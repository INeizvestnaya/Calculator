/// <reference types="cypress" />
import { LIGHT, DARK, COLORED } from './../../src/constants/themes';

describe('testing themes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/calculator-functional');
    cy.get('[data-link="settings"]').click({ force: true });
  });

  it('changes to dark theme', () => {
    cy.checkTheme(DARK, 'rgb(48, 48, 48)');
  });

  it('changes to colored theme', () => {
    cy.checkTheme(COLORED, 'rgb(246, 242, 255)');
  });

  it('changes to light theme', () => {
    cy.checkTheme(LIGHT, 'rgb(255, 255, 255)');
  });
});
