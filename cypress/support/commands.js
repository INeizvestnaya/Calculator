Cypress.Commands.add('checkKeypadButton', (type) => {
  cy.get(`[data-text="${type}"]`).click({ force: true });
  cy.get('[data-type="cur-exp"]').should('have.text', type);
});

Cypress.Commands.add('buttonsClick', (buttons) => {
  buttons.forEach((button) =>
    cy.get(`[data-text="${button}"]`).click({ force: true })
  );
});

Cypress.Commands.add('checkTheme', (theme, color) => {
  cy.get('select').select(theme, { force: true });
  cy.get('[data-check-theme]').should('have.css', 'background-color', color);
  cy.get('[data-link="functional"]').click({ force: true });
  cy.get('[data-calc-func]').should('have.css', 'background-color', color);
  cy.get('[data-link="class"]').click({ force: true });
  cy.get('[data-calc-class]').should('have.css', 'background-color', color);
});
