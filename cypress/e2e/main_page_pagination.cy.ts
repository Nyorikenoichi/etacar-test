import { sizes } from '../support/sizes';

describe('The Main Page Pagination', () => {
  sizes.forEach((size) => {
    it(`Should display table with working pagination on ${size} screen`, () => {
      cy.viewport(size);
      //wait to apply adaptive styles for different sizes
      cy.wait(1000);

      cy.visit('/');
      //there are table and its pagination
      cy.get('.crypto-table').should('be.visible');
      cy.get('.pagination').should('be.visible');

      //left arrow is disabled on 1 page
      cy.get('.pagination__arrow_left').parent().should('have.class', 'pagination__item_disabled');

      //right arrow is active on 1 page
      cy.get('.pagination__arrow_right').parent().should('not.have.class', 'pagination__item_disabled');

      //after clicking right arrow page changed and left arrow is now active
      cy.get('.pagination__arrow_right').click();
      cy.get('.pagination__arrow_left').parent().should('not.have.class', 'pagination__item_disabled');
      cy.get('.pagination>.pagination__item').eq(2).should('have.class', 'pagination__item_selected');

      //after clicking last page, page changed and now right arrow is disabled
      cy.get('.pagination>.pagination__item').eq(-2).click();
      cy.get('.pagination>.pagination__item').eq(-2).should('have.class', 'pagination__item_selected');
      cy.get('.pagination__arrow_right').parent().should('have.class', 'pagination__item_disabled');
    });
  })
})

