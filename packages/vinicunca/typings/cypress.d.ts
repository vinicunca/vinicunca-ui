import type { mount as cyMount } from 'cypress/vue';
import type { MountingOptions } from '@vue/test-utils';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof cyMount & ((component: JSX.Element, options?: MountingOptions<any>) => Cypress.Chainable);
      setProps (props: Record<string, unknown>): Cypress.Chainable;
      getBySel (selector: string, args?: any): Chainable<JQuery<Element>>;
      vue (): Cypress.Chainable<VueWrapper<any>>;
      emitted (selector: string, event: string): Cypress.Chainable<unknown[]>;
    }
  }
}
