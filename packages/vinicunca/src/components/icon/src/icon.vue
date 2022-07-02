<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

import { iconProps } from './icon';

const props = defineProps(iconProps);
defineOptions({
  name: 'VIcon',
  inheritAttrs: false,
});
const ns = {};

const style = computed<CSSProperties>(() => {
  return {};
});
</script>

<template>
  <i class="block mt-47 text-red i-carbon-sun">hehe</i>
</template>
