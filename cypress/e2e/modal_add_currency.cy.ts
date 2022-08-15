import { sizes } from '../support/sizes';

const wrongInputs = ['abc', '1x', '1,1', 'one.01', '1.000a', 'x1.002'];
const correctInputs = ['1', '1.01', '0.0001'];

describe('Add Currency Modal', () => {
  sizes.forEach((size) => {
    it(`Should display currency information page on ${size} screen`, () => {
      cy.viewport(size);
      cy.visit('/')

      //click on add currency button in table
      cy.get('.crypto-table__cell_button').first().click();
      //add modal should open
      cy.get('.modal_add-currency').should('be.visible');

      //when submitting wrong input, error message shows
      wrongInputs.forEach((input) => {
        cy.get('.number-input').focus().type(input).blur();
        cy.get('.button_add').click();
        cy.get('.modal__error-message').should('be.visible');
        cy.get('.number-input').clear();
      })
      //close modal
      cy.get('.button_close').click();

      //input some correct values
      correctInputs.forEach((input) => {
        cy.get('.crypto-table__cell_button').first().click();
        cy.get('.number-input').focus().type(input).blur();
        cy.get('.button_add').click();
      })
    });
  })
})