import VOverlay from '../src/overlay';

const AXIOM = 'Humans are evil';

describe('VOverlay', () => {
  it('mount', () => {
    const testClass = 'test-class';

    cy.mount(() => (
      <VOverlay data-test-id="overlay" class={ testClass }>
        { AXIOM }
      </VOverlay>
    )).then(async (wrapper) => {
      expect(wrapper.text()).to.equal(AXIOM);

      cy.get(`.${testClass}`).should('exist');
    });
  });

  it('should emit click event', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(() => <VOverlay data-test-id="overlay" onClick={ onClickSpy }>{ AXIOM }</VOverlay>);
    cy.get('[data-test-id=overlay]').click();
    cy.get('@onClickSpy').should('have.been.called');
  });

  // it('no mask', async () => {
  //   const mask = ref(true)
  //   const wrapper = mount(() => <Overlay mask={mask.value}>{AXIOM}</Overlay>)

  //   const selector = '.el-overlay'
  //   expect(wrapper.find(selector).exists()).toBe(true)

  //   mask.value = false

  //   await nextTick()

  //   expect(wrapper.find(selector).exists()).toBe(false)

  //   mask.value = true

  //   await nextTick()

  //   expect(wrapper.find(selector).exists()).toBe(true)
  // })
});
