import { DEFAULT_Z_INDEX } from '@vinicunca/tokens';
import { computed, ref } from 'vue';

import { useGlobalConfig } from './use-global-config';

const zIndex = ref(0);

export function useZIndex() {
  const initialZIndex = useGlobalConfig('zIndex', DEFAULT_Z_INDEX);
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);

  function nextZIndex() {
    zIndex.value++;

    return currentZIndex.value;
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  };
}
