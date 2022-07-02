import type { mount as cyMount } from 'cypress/vue';
import type { MountingOptions } from '@vue/test-utils';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof cyMount & ((component: JSX.Element, options?: MountingOptions<any>) => Cypress.Chainable);
    }
  }
}
