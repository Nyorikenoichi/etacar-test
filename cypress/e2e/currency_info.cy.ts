import '@percy/cypress';
import { sizes } from '../support/sizes';

describe('Currency Info Page', () => {
  sizes.forEach((size) => {
    it(`Should display currency information page on ${size} screen`, () => {
      cy.viewport(size);

      cy.visit('/');
      //click on currency row in table
      cy.get('.crypto-table__row_body').first().click();

      //page should change to info page with plot and add button
      cy.location().should((loc) => {
        expect(loc.host).to.eq('localhost:3000');
        expect(loc.pathname).to.eq('/info');
        expect(loc.search).to.eq('?id=bitcoin');
      })
      cy.get('.currency-info').should('be.visible');
      cy.get('.area-chart').should('be.visible');
      cy.get('.button_add').should('be.visible');

      //create snapshot for visual testing
      cy.percySnapshot(`Currency info page on ${size}`);

      //modal should show when clicking add button
      cy.get('.button_add').click();
      cy.get('.modal').should('be.visible');

      //go back returns to main page
      cy.go('back');
      cy.location().should((loc) => {
        expect(loc.host).to.eq('localhost:3000');
        expect(loc.pathname).to.eq('/');
        expect(loc.search).to.eq('');
      })
      cy.get('.crypto-table').should('be.visible');
    });
  })
})