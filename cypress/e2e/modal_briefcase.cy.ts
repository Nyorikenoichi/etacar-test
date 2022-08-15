import '@percy/cypress';
import { sizes } from '../support/sizes';

const currencyCount = '2.0502';

describe('Briefcase Modal', () => {
  sizes.forEach((size) => {
    it(`Should display currency information page on ${size} screen`, () => {
      cy.viewport(size);
      cy.visit('/')

      //briefcase menu exists
      cy.get('.header__briefcase').should('be.visible');

      //add some currency
      cy.get('.crypto-table__cell_button').first().click();
      cy.get('.number-input').focus().type(currencyCount).blur();
      cy.get('.button_add').click();

      //open briefcase modal
      cy.get('.header__briefcase').click();
      cy.get('.modal').should('be.visible');

      //compare currency amount
      cy.get('.briefcase-table>tbody>.crypto-table__row_body>.crypto-table__cell').eq(2).should('contain', currencyCount);

      //reload page and compare currency again
      cy.reload();
      cy.get('.header__briefcase').click();
      cy.get('.modal').should('be.visible');
      cy.wait(500);
      cy.get('.briefcase-table>tbody>.crypto-table__row_body>.crypto-table__cell').eq(2).should('contain', currencyCount);

      //create snapshot for visual testing
      cy.percySnapshot(`Briefcase modal on ${size}`);

      //delete currency
      cy.get('.briefcase-table>tbody>.crypto-table__row_body>.crypto-table__cell').eq(3).click();
      cy.get('.modal__error-message').should('be.visible');

      //close modal
      cy.get('.button_close').click();
    });
  })
})