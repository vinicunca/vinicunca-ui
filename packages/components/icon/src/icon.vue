<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

import { iconProps } from './icon';

defineOptions({
  name: 'VIcon',
  inheritAttrs: false,
});
const props = defineProps(iconProps);
const ns = {};

const style = computed<CSSProperties>(() => {
  return {};
});
</script>

<template>
  <i>hehe</i>
</template>
