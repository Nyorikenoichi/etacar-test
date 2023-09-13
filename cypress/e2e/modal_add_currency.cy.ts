import '@percy/cypress';
import { sizes } from '../support/sizes';

const wrongInputs = ['abc', '1x', '1,1', 'one.01', '1.000a', 'x1.002'];
const correctInputs = ['1', '1.01', '0.0001'];

describe('Add Currency Modal', () => {
  sizes.forEach((size) => {
    it(`Should display currency information page on ${size} screen`, () => {
      cy.viewport(size);
      cy.visit('/')

      //click on add currency button in table
      cy.get('[data-cy="button-table-add"]').first().click();
      //add modal should open
      cy.get('[data-cy="modal-add-currency"]').should('be.visible');

      //when submitting wrong input, error message shows
      wrongInputs.forEach((input) => {
        cy.get('[data-cy="number-input"]').focus().type(input).blur();
        cy.get('[data-cy="button-add"]').click();
        cy.get('[data-cy="modal-error-message"]').should('be.visible');
        cy.get('[data-cy="number-input"]').clear();
      })

      //create snapshot for visual testing
      cy.percySnapshot(`Add modal on ${size}`);
      //close modal
      cy.get('[data-cy="button-close"]').click();

      //input some correct values
      correctInputs.forEach((input) => {
        cy.get('[data-cy="button-table-add"]').first().click();
        cy.get('[data-cy="number-input"]').focus().type(input).blur();
        cy.get('[data-cy="button-add"]').click();
      })
    });
  })
})