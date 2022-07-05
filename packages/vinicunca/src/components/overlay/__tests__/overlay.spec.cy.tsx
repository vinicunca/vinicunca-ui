import { ref } from 'vue';

import VOverlay from '../src/overlay';

const AXIOM = 'Humans are evil';

function mountWrapper(props: any = {}) {
  return cy.mount(() =>
    (
      <VOverlay data-test-id="overlay" { ...props }>
        { AXIOM }
      </VOverlay>
    ));
}

describe('VOverlay', () => {
  it('mount', () => {
    const testClass = 'test-class';
    mountWrapper({ class: testClass });
    cy.getBySel('overlay').should('have.text', AXIOM);
    cy.get(`.${testClass}`).should('exist');
  });

  it.only('should emit click event', () => {
    mountWrapper();
    // cy.getBySel('overlay').click();
    cy.vue().should((wrapper) => {
      const emits = wrapper.findComponent('[data-test-id=overlay]').emitted('click');
      expect(emits).to.have.length;
      expect(wrapper.emitted('change')).to.have.length;
    });
    // cy.get('@vue').should((wrapper) => {
    //   console.log('🚀 ~ cy.get ~ wrapper', wrapper.emitted('click'));
    //   expect(wrapper.emitted('click')).to.have.length;
    // });
    // cy.get('@onClickSpy').should('have.been.called');
  });

  it('no mask', async () => {
    const mask = ref(true);
    mountWrapper({ mask: mask.value });
    // const wrapper = mount(() => <Overlay mask={ mask.value }>{ AXIOM }</Overlay>);

    // const selector = '.el-overlay';
    // expect(wrapper.find(selector).exists()).toBe(true);

    // mask.value = false;

    // await nextTick();

    // expect(wrapper.find(selector).exists()).toBe(false);

    // mask.value = true;

    // await nextTick();

    // expect(wrapper.find(selector).exists()).toBe(true);
  });
});
