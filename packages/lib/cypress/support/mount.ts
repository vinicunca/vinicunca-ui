import { mount as cyMount } from '@cypress/vue';
import { mergeDeep } from '@praburangki/web-utilities';
import { createVinicunca } from '../../src/entry';

import type { VueWrapper } from '@vue/test-utils';

/**
 * @example
 * cy.mount(<VButton>My button</VButton>)
 */
Cypress.Commands.add('mount', (component, options) => {
  const vinicunca = createVinicunca({});
  const defaultOptions = {
    global: {
      stubs: {
        'transition': false,
        'transition-group': false,
      },
      plugins: [vinicunca],
    },
  };

  return cyMount(component, mergeDeep(defaultOptions, options)).as('wrapper');
});

/**
 * Update the props and wait for Vue to re-render.
 * Must be chained of a chain that starts with `cy.mount`.
 *
 * @example
 * cy.mount(<VBtn>My button</VBtn>)
 *   .get('button').
 *   .should('not.have.class', 'v-btn--disabled')
 *   .setProps({ disabled: true }).
 *   .get('button')
 *   .should('have.class', 'v-btn--disabled')
 */

Cypress.Commands.add('setProps', (props: Record<string, unknown> = {}) => {
  return cy.get('@wrapper').then(async (wrapper) => {
    // `wrapper` in inferred as JQuery<HTMLElement> since custom commands
    // generally receive a Cypress.Chainable as the first arg (the "subject").
    // the custom `mount` command defined above returns a
    // Test Utils' `VueWrapper`, so we need to cast this as `unknown` first.
    const vueWrapper = (wrapper || Cypress.vueWrapper) as unknown as VueWrapper<any>;
    await vueWrapper.setProps(props);

    return vueWrapper;
  });
});
