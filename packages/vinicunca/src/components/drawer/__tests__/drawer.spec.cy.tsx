import VDrawer from '../src/drawer.vue';

describe('VDrawer', () => {
  it('render', () => {
    cy.mount(() => (
      <VDrawer />
    ));
  });
});
