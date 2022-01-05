/// <reference types="../../../../types/cypress" />

import { VButton } from '../v-button';

describe('VButton', () => {
  describe('tag', () => {
    it('renders the proper tag instead of a button', () => {
      cy.mount(<VButton tag="custom-tag">Click me</VButton>)
        .get('button')
        .should('not.exist')
        .get('custom-tag')
        .should('have.text', 'Click me');
    });
  });

  describe('events', () => {
    it('emits native click events', () => {
      const click = cy.stub().as('click');
      cy.mount(<VButton onClick={click}>Click me</VButton>)
        .get('button')
        .click()
        .get('@click')
        .should('have.been.called', 1)
        .setProps({ href: undefined, to: '#my-anchor' })
        .get('@click')
        .should('have.been.called', 2);
    });

    // Pending test, is "toggle" even going to be emitted anymore?
    it.skip('emits toggle when used within a button group', () => {
      // const register = jest.fn()
      // const unregister = jest.fn()
      // const toggle = jest.fn()
      // const wrapper = mountFunction({
      //   provide: {
      //     btnToggle: { register, unregister },
      //   },
      //   methods: { toggle },
      // })
      // wrapper.trigger('click')
      // expect(toggle).toHaveBeenCalled()
    });
  });

  describe.skip('loading', () => {
    it('when using the loader slot, do not show the progress indicator', () => {
      cy.mount(() => <VButton loading v-slots={{ loader: () => <span>{loadingText}</span> }} />)
        .get('button')
        .should('contain.text', loadingText)
        .get('role[progressbar]')
        .should('not.exist');
    });

    // custom loaders are not yet implemented
    it('when loading is true, show the progress indicator', () => {
      cy.mount(<VButton loading>{loadingText}</VButton>)
        .get('button')
        .should('contain.text', loadingText)
        .get('role[progressbar]')
        .should('be.visible');
    });
  });

  describe.skip('value', () => {
    // none of the "value" props are implemented yet
    it('should stringify non string|number values', () => {
      const objectValue = { value: { hello: 'world' } };
      const numberValue = { value: 2 };

      cy.mount(<VButton value={objectValue}></VButton>)
        .get('button')
        .should('contain.text', JSON.stringify(objectValue, null, 0))
        .mount(<VButton value={numberValue} />)
        .get('button')
        .should('contain.text', numberValue.value);
    });
  });

  describe('href', () => {
    it('should render an <a> tag when using href prop', () => {
      cy.mount(<VButton href={anchor.href}>Click me</VButton>)
        .get('.v-btn')
        .click()
        .get('a') // currently not rendering the <a> tag at all
        .should('contain.text', 'Click me')
        .should('have.focus')
        .hash()
        .should('contain', anchor.hash);
    });
  });

  describe('Reactivity', () => {
    // tile is not implemented.
    it.skip('tile', () => {
      cy.mount(<VButton tile>My button</VButton>)
        .get('button')
        .should('contain.class', 'v-btn--tile')
        .setProps({ tile: false })
        .should('not.contain.class', 'v-btn--tile');
    });

    it('disabled', () => {
      cy.mount(<VButton color="success" disabled></VButton>)
        .get('button')
        .should('have.class', 'v-btn--disabled')
        .setProps({ disabled: false })
        .get('button')
        .should('not.have.class', 'v-btn--disabled');
    });

    it('activeClass', () => {
      cy.mount(<VButton activeClass="my-active-class">Active Class</VButton>)
        .setProps({ activeClass: 'different-class' })
        .get('.different-class')
        .should('not.exist');
    });

    it('plain', () => {
      cy.mount(<VButton variant="plain">Plain</VButton>)
        .get('button')
        .should('have.class', 'v-btn--variant-plain')
        .setProps({ variant: 'default' })
        .get('button')
        .should('not.have.class', 'v-btn--variant-plain');
    });
  });
});
