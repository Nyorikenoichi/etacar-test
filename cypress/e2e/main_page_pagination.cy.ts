import '@percy/cypress';
import { sizes } from '../support/sizes';

describe('The Main Page Pagination', () => {
  sizes.forEach((size) => {
    it(`Should display table with working pagination on ${size} screen`, () => {
      cy.viewport(size);
      //wait to apply adaptive styles for different sizes
      cy.wait(500);

      cy.visit('/');
      //there are table and its pagination
      cy.get('[data-cy="crypto-table"]').should('be.visible');
      cy.get('[data-cy="pagination"]').should('be.visible');

      //create snapshot for visual testing
      cy.percySnapshot(`Main page on ${size}`);

      //left arrow is disabled on 1 page
      cy.get('[data-cy="pagination-arrow-left"]').parent().should('have.class', 'pagination__item_disabled');

      //right arrow is active on 1 page
      cy.get('[data-cy="pagination-arrow-right"]').parent().should('not.have.class', 'pagination__item_disabled');

      //after clicking right arrow page changed and left arrow is now active
      cy.get('[data-cy="pagination-arrow-right"]').click();
      cy.get('[data-cy="pagination-arrow-left"]').parent().should('not.have.class', 'pagination__item_disabled');
      cy.get('[data-cy="pagination-item"]').eq(1).should('have.class', 'pagination__item_selected');

      cy.wait(500);
      //after clicking last page, page changed and now right arrow is disabled
      cy.get('[data-cy="pagination-item"]').eq(-1).click();
      cy.get('[data-cy="pagination-item"]').eq(-1).should('have.class', 'pagination__item_selected');
      cy.get('[data-cy="pagination-arrow-right"]').parent().should('have.class', 'pagination__item_disabled');
    });
  })
})

