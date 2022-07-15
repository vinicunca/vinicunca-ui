<script lang="ts" setup>
import { ref } from 'vue';

import { GAP } from './utils';
import ScrollbarThumb from './scrollbar-thumb.vue';
import { barProps } from './scrollbar-bar';

const props = defineProps(barProps);

const moveX = ref(0);
const moveY = ref(0);

function handleScroll(wrap: HTMLDivElement) {
  if (wrap) {
    const offsetHeight = wrap.offsetHeight - GAP;
    const offsetWidth = wrap.offsetWidth - GAP;

    moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioY;
    moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioX;
  }
}

defineExpose({
  handleScroll,
});
</script>

<template>
  <ScrollbarThumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <ScrollbarThumb
    :move="moveY"
    :ratio="ratioY"
    :size="height"
    vertical
    :always="always"
  />
</template>
