import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import VOverlay from '../src/overlay';

const AXIOM = 'Humans are evil';

function mountWrapper(props: any = {}) {
  return mount(() =>
    (
      <VOverlay data-test-id="overlay" { ...props }>
        { AXIOM }
      </VOverlay>
    ));
}

describe('VOverlay', () => {
  test('render test', async () => {
    const wrapper = mountWrapper();
    expect(wrapper.text()).toEqual(AXIOM);
    const testClass = 'test-class';
    await wrapper.setProps({
      classOverlay: testClass,
    });

    expect(wrapper.find(`.${testClass}`)).toBeTruthy();
  });

  test('should emit click event', async () => {
    const wrapper = mountWrapper();
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toBeTruthy();
  });
});
