import type { UnwrapRef } from 'vue';

import { computed, getCurrentInstance, ref, watch } from 'vue';
import { isDefined } from '@vinicunca/js-utilities';

export interface VModelOptions<T> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref.
   * Instead of relying on the `v-model` or `.sync` to work.
   *
   * @default false
   */
  passive?: boolean;
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string;
  /**
   * Attempting to check for changes of properties in a deeply nested object or array.
   * Apply only when `passive` option is set to `true`
   *
   * @default false
   */
  deep?: boolean;
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T;
}

export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options: VModelOptions<P[K]> = {},
) {
  const {
    passive = false,
    eventName,
    deep = false,
    defaultValue,
  } = options;

  const vm = getCurrentInstance();
  const _emit = emit || vm?.emit;
  let event: string | undefined = eventName;

  if (!key) {
    key = 'modelValue' as K;
  }

  event = eventName || event || `update:${key.toString()}`;

  function getValue() {
    return isDefined(props[key!]) ? props[key!] : defaultValue;
  }

  if (passive) {
    const proxy = ref<P[K]>(getValue()!);

    watch(() => props[key!], (v) => proxy.value = v as UnwrapRef<P[K]>);

    watch(proxy, (_proxy) => {
      if (_proxy !== props[key!] || deep) {
        _emit!(event as Name, _proxy);
      }
    }, { deep });

    return proxy;
  } else {
    return computed<P[K]>({
      get() {
        return getValue()!;
      },
      set(_value) {
        _emit!(event as Name, _value);
      },
    });
  }
}
