import type { ComputedRef } from 'vue';
import type { MaybeRef } from '@vinicunca/vueuse';

import { computed, getCurrentInstance, unref } from 'vue';

export function useProp<T>(name: string): ComputedRef<T | undefined> {
  const vm = getCurrentInstance()!;
  return computed(() => (vm.proxy?.$props as any)[name] ?? undefined);
}

export function useDisabled(fallback?: MaybeRef<boolean | undefined>) {
  const disabled = useProp<boolean>('disabled');

  return computed(
    () => disabled.value || unref(fallback) || false,
  );
}
