import '@percy/cypress';
import { sizes } from '../support/sizes';

const currencyCount = '2.0502';

describe('Briefcase Modal', () => {
  sizes.forEach((size) => {
    it(`Should display currency information page on ${size} screen`, () => {
      cy.viewport(size);
      cy.visit('/')

      //briefcase menu exists
      cy.get('[data-cy="header-briefcase"]').should('be.visible');

      //add some currency
      cy.get('[data-cy="button-table-add"]').first().click();
      cy.get('[data-cy="number-input"]').focus().type(currencyCount).blur();
      cy.get('[data-cy="button-add"]').click();

      //open briefcase modal
      const modalBriefcase = () => cy.get('[data-cy="modal-briefcase"]');
      cy.get('[data-cy="header-briefcase"]').click();
      modalBriefcase().should('be.visible');

      //compare currency amount
      modalBriefcase().find('[data-cy="crypto-table-body-cell"]').eq(2).should('contain', currencyCount);

      //reload page and compare currency again
      cy.reload();
      cy.get('[data-cy="header-briefcase"]').click();
      modalBriefcase().should('be.visible');
      cy.wait(500);
      modalBriefcase().find('[data-cy="crypto-table-body-cell"]').eq(2).should('contain', currencyCount);

      //create snapshot for visual testing
      cy.percySnapshot(`Briefcase modal on ${size}`);

      //delete currency
      modalBriefcase().find('[data-cy="crypto-table-body-cell"]').eq(3).click();
      cy.get('[data-cy="modal-error-message"]').should('be.visible');
    });
  })
})