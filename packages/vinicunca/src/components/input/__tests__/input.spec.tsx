import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import VInput from '../src/input.vue';

describe('VInput', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('create', async () => {
    const input = ref('input');
    const handleFocus = vi.fn();

    const wrapper = mount(() => (
      <VInput
        minlength={ 3 }
        maxlength={ 5 }
        placeholder="place text"
        onFocus={ handleFocus }
        modelValue={ input.value }
      />
    ));

    const inputElm = wrapper.find('input');
    const nativeInput = inputElm.element;

    await inputElm.trigger('focus');

    expect(inputElm.exists()).toBe(true);
    expect(handleFocus).toHaveBeenCalled();
    expect(nativeInput.placeholder).toMatchInlineSnapshot('"place text"');
    expect(nativeInput.value).toMatchInlineSnapshot('"input"');
    expect(nativeInput.minLength).toMatchInlineSnapshot('3');

    input.value = 'text';
    await nextTick();
    expect(inputElm.element.value).toMatchInlineSnapshot('"text"');
  });
});
