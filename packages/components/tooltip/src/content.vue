<script lang="ts" setup>
import type { Middleware } from '@floating-ui/dom';
import type { CSSProperties } from 'vue';
import type { TOOLTIP_SIDES } from '@vinicunca/tokens/tooltip';

import { computed, inject, onMounted, provide, ref, unref, watch } from 'vue';
import { offset } from '@floating-ui/dom';
import { useFloating, useFloatingArrowMiddleware, useZIndex } from '@vinicunca/composables';
import { INJECTION_TOOLTIP_CONTENT, INJECTION_TOOLTIP_ROOT } from '@vinicunca/tokens';
import { tooltipBaseProps } from '@vinicunca/tokens/tooltip';
import { VVisuallyHidden } from '@vinicunca/components/visually-hidden';

import { tooltipContentProps } from './content';

const props = defineProps({
  ...tooltipContentProps,
  ...tooltipBaseProps,
});

defineOptions({
  name: 'VTooltipContent',
});

const { refTrigger, idContent } = inject(INJECTION_TOOLTIP_ROOT)!;

const placement = ref(props.placement);
const strategy = ref(props.strategy);
const refArrow = ref<HTMLElement | null>(null);

const { refReference, refContent, middlewareData, x, y, update } = useFloating({
  placement,
  strategy,
  middleware: computed(() => {
    const middleware: Middleware[] = [offset(props.offset)];

    if (props.showArrow) {
      middleware.push(useFloatingArrowMiddleware({ refArrow }));
    }

    return middleware;
  }),
});

const zIndex = useZIndex().nextZIndex();

const side = computed(() => {
  return placement.value.split('-')[0] as TOOLTIP_SIDES;
});

const styleContent = computed<CSSProperties>(() => {
  return {
    position: unref(strategy),
    top: `${unref(y) || 0}px`,
    left: `${unref(x) || 0}px`,
    zIndex,
  };
});

const styleArrow = computed<CSSProperties>(() => {
  if (!props.showArrow) {
    return {};
  }

  const { arrow } = unref(middlewareData);

  return {
    '--vin-tooltip-arrow-x': `${arrow?.x}px` || '',
    '--vin-tooltip-arrow-y': `${arrow?.y}px` || '',
  };
});

watch(refArrow, () => update());

watch(
  () => props.placement,
  (_placement) => {
    placement.value = _placement;
  });

onMounted(() => {
  watch(
    () => props.reference || refTrigger.value,
    (_ref) => {
      refReference.value = _ref || undefined;
    },
    { immediate: true },
  );
});

provide(INJECTION_TOOLTIP_CONTENT, { refArrow });
</script>

<template>
  <div ref="refContent" :style="styleContent">
    <div v-if="!nowrap" :data-side="side" :class="classContent">
      <slot :content-style="styleContent" :content-class="classContent" />

      <VVisuallyHidden :id="idContent" role="tooltip">
        <template v-if="ariaLabel">
          {{ ariaLabel }}
        </template>
        <slot v-else />
      </VVisuallyHidden>

      <slot name="arrow" :style="styleArrow" :side="side" />
    </div>
  </div>
</template>
