<script lang="ts" setup>
import { computed, inject, ref } from 'vue';

import { buttonEmits, buttonProps } from './button';

import { VIcon } from '~/components/icon';
import { INJECTION_KEY_BUTTON_GROUP_CONTEXT } from '~/tokens';
import { useDisabled, useTheme } from '~/composables';

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

defineOptions({
  name: 'VButton',
});

const buttonGroupContext = inject(INJECTION_KEY_BUTTON_GROUP_CONTEXT, undefined);

const { getThemeClasses } = useTheme('button');
const _disabled = useDisabled();
const _ref = ref<HTMLButtonElement>();

const _type = computed(() => props.type || buttonGroupContext?.type || '');

function handleClick(event: MouseEvent) {
  if (props.nativeType === 'reset') {
    // TODO: implement
  }

  emit('click', event);
}

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
});
</script>

<template>
  <button
    ref="_ref"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[getThemeClasses()]"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <VIcon v-else :name="loadingIcon" />
    </template>

    <VIcon v-else-if="icon" :name="icon" />

    <slot v-else-if="$slots.icon" name="icon" />

    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>
