/// <reference types="../../../../types/cypress" />

import { VButton } from '../v-button';

describe('VButton', () => {
  describe('plain', () => {
    it('should have the plain class when variant is plain', () => {
      cy.mount(<VButton variant="plain">Plain</VButton>)
        .get('button')
        .should('have.class', 'v-btn--variant-plain');
    });
  });
});
