import { ref } from 'vue';
import { describe, expect, it, vitest } from 'vitest';

import { promiseTimeout } from '../utils';

import { useTimeoutFn } from '.';

describe('useTimeoutFn', () => {
  it('supports reactive intervals', async () => {
    const callback = vitest.fn();
    const interval = ref(0);
    const { start } = useTimeoutFn({
      cb: callback,
      interval,
    });

    start();
    await promiseTimeout({ ms: 1 });
    expect(callback).toBeCalled();

    callback.mockReset();
    interval.value = 50;

    start();
    await promiseTimeout({ ms: 1 });
    expect(callback).not.toBeCalled();
    await promiseTimeout({ ms: 100 });
    expect(callback).toBeCalled();
  });
});
