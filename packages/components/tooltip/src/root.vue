<script lang="ts" setup>
import { useId } from '@vinicunca/composables';
import { isNumber, isUnset } from '@vinicunca/js-utilities';
import { INJECTION_TOOLTIP_ROOT } from '@vinicunca/tokens';
import { TOOLTIP_OPEN } from '@vinicunca/tokens/tooltip';
import { useTimeoutFn } from '@vinicunca/vueuse';
import { computed, onBeforeUnmount, onMounted, provide, ref, unref, watch } from 'vue';

import { tooltipRootProps } from './root';

const props = defineProps(tooltipRootProps);

defineOptions({
  name: 'VTooltipRoot',
});

/**
 * internal open state, when no model value was provided, use this as indicator instead
 */
const _open = ref(props.defaultOpen);
const refTrigger = ref<HTMLElement | null>(null);

const isOpen = computed<boolean>({
  get: () => (isUnset(props.open) ? _open.value : props.open),
  set: (open) => {
    _open.value = open;
    props['onUpdate:open']?.(open);
  },
});

const isOpenDelayed = computed(
  () => isNumber(props.delayDuration) && props.delayDuration > 0,
);

const { start: onOpenDelayed, stop: clearTimer } = useTimeoutFn({
  cb: () => {
    isOpen.value = true;
  },
  interval: computed(() => props.delayDuration),
  options: { immediate: false },
});

const idContent = useId();

function onOpenNormal() {
  clearTimer();
  isOpen.value = true;
}

function onOpenDelay() {
  unref(isOpenDelayed) ? onOpenDelayed() : onOpenNormal();
}

function onClose() {
  clearTimer();
  isOpen.value = false;
}

function onChange(_open: boolean) {
  if (_open) {
    document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
    onOpenNormal();
  }

  props.onOpenChange?.(_open);
}

watch(isOpen, onChange);

onMounted(() => {
  // Keeps only 1 tooltip open at a time
  document.addEventListener(TOOLTIP_OPEN, onClose);
});

onBeforeUnmount(() => {
  clearTimer();
  document.removeEventListener(TOOLTIP_OPEN, onClose);
});

provide(INJECTION_TOOLTIP_ROOT, {
  idContent,
  refTrigger,
  onClose,
  onOpenDelay,
  onOpen: onOpenNormal,
});

defineExpose({
  /**
   * @description open tooltip programmatically
   */
  onOpen: onOpenNormal,

  /**
   * @description close tooltip programmatically
   */
  onClose,
});
</script>

<template>
  <slot :is-open="isOpen" />
</template>
