<script lang="ts" setup>
import { computed, ref } from 'vue';
import { convertToUnit } from '@vinicunca/js-utilities';

import { drawerProps } from './drawer';

import VOverlay from '~/components/overlay';
import VFocusTrap from '~/components/focus-trap';
import VIcon from '~/components/icon';

const props = defineProps(drawerProps);

defineOptions({
  name: 'VDrawer',
});

const refDrawer = ref<HTMLElement>();
const refFocusStart = ref<HTMLElement>();

const isHorizontal = computed(
  () => ['RTL', 'LTR'].includes(props.direction),
);
const drawerSize = computed(() => convertToUnit(props.size));
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody"></Teleport>
</template>
