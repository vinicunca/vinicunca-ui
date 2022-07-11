import type { MaybeRef } from '@vinicunca/vueuse';

import { INJECTION_ID } from '@vinicunca/tokens';
import { computed, inject, unref } from 'vue';
import { debugWarn } from '@vinicunca/utils/error';
import { isBrowser } from '@vinicunca/js-utilities';

export interface IDContext {
  prefix: number;
  current: number;
}

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};

export function useId(determineId?: MaybeRef<string>) {
  const idInjection = inject(INJECTION_ID, defaultIdInjection);

  if (!isBrowser && idInjection === defaultIdInjection) {
    debugWarn(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
        usage: app.provide(INJECTION_ID, {
          prefix: number,
          current: number,
        })
      `,
    );
  }

  return computed(
    () => unref(determineId) || `vin-id-${idInjection.prefix}-${idInjection.current++}`,
  );
}
