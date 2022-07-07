<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue';

import { buttonGroupProps } from './button-group';

import { INJECTION_KEY_BUTTON_GROUP } from '~/tokens';

const props = defineProps(buttonGroupProps);

defineOptions({
  name: 'VButtonGroup',
});

provide(
  INJECTION_KEY_BUTTON_GROUP,
  reactive({
    type: toRef(props, 'type'),
  }),
);
</script>

<template>
  <div>
    <slot />
  </div>
</template>
