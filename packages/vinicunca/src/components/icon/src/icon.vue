<script lang="ts" setup>
import { iconProps } from './icon';

defineProps(iconProps);

defineOptions({
  name: 'VIcon',
  inheritAttrs: false,
});
</script>

<template>
  <i :class="[name]" v-bind="$attrs" />
</template>
