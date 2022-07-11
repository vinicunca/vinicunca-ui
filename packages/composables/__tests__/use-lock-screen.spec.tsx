import { hasClass } from '@vinicunca/utils';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, onMounted, ref } from 'vue';

import { useLockScreen } from '../use-lock-screen';

const Component = defineComponent({
  setup() {
    const flag = ref(false);
    useLockScreen(flag);
    onMounted(() => {
      flag.value = true;
    });

    return () => undefined;
  },
});

const cls = 'overflow-hidden';

describe('useLockscreen', () => {
  it('should lock screen when trigger is true', async () => {
    const wrapper = mount({
      setup: () => () => <Component />,
    });

    await nextTick();
    expect(hasClass({ el: document.body, cls })).toBe(true);

    wrapper.unmount();
    await nextTick();
    expect(hasClass({ el: document.body, cls })).toBe(false);
  });

  it('should cleanup when unmounted', async () => {
    const shouldRender = ref(true);
    mount({
      setup: () => () => shouldRender.value ? <Component /> : undefined,
    });

    await nextTick();

    expect(hasClass({ el: document.body, cls })).toBe(true);

    shouldRender.value = false;
    await nextTick();

    expect(hasClass({ el: document.body, cls })).toBe(false);
  });
});
