<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import { INJECTION_TOOLTIP_CONTENT } from '@vinicunca/tokens';
import { computed, inject } from 'vue';

import { tooltipArrowProps, tooltipArrowSideProps } from './arrow';

const props = defineProps({
  ...tooltipArrowProps,
  ...tooltipArrowSideProps,
});

defineOptions({
  name: 'VTooltipArrow',
});

const { refArrow } = inject(INJECTION_TOOLTIP_CONTENT)!;

const styleArrow = computed<CSSProperties>(() => {
  const { style, width, height } = props;

  return {
    '--vin-tooltip-arrow-width': `${width}px`,
    '--vin-tooltip-arrow-height': `${height}px`,
    '--vin-tooltip-arrow-border-width': `${width / 2}px`,
    ...(style || {}),
  };
});
</script>

<template>
  <span ref="refArrow" :style="styleArrow" />
</template>
