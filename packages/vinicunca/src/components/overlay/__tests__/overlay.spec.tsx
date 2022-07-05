// import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import VOverlay from '../src/overlay';

const AXIOM = 'Humans are evil';

describe('VOverlay', () => {
  test('render test', async () => {
    const wrapper = mount(() => <VOverlay>{ AXIOM }</VOverlay>);
    expect(wrapper.text()).toEqual(AXIOM);
    const testClass = 'test-class';
    await wrapper.setProps({
      overlayClass: testClass,
    });

    expect(wrapper.find(`.${testClass}`)).toBeTruthy();
  });
});
