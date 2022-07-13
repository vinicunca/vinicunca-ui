<script lang="ts" setup>
import { useVModel } from '@vinicunca/vueuse';

const props = defineProps<{
  modelValue: boolean;
}>();

const proxyValue = useVModel(props);
</script>

<template>
  <button type="button">
    <input
      id="menu-checkbox"
      v-model="proxyValue"
      type="checkbox"
      name="menu"
      class="peer hidden"
    />
    <label
      for="menu-checkbox"
      class="
        relative
        block
        w-5
        h-4
        peer-not-checked:-rotate-180
        peer-not-checked:children:(rotate-0 translate-y-0 scale-100 opacity-100)
        cursor-pointer
        transform duration-300 ease-in-out
      "
    >
      <div class="base-hamburger__line top-0 translate-y-1.8 rotate-45 duration-600" />
      <div class="base-hamburger__line top-48% scale-x-0 opacity-0 duration-400" />
      <div class="base-hamburger__line bottom-0 -translate-y-1.8 -rotate-45 duration-600" />
    </label>
  </button>
</template>

<style lang="postcss" scoped>
.base-hamburger__line {
  @apply absolute h-0.5 w-full bg-black rounded ease-in-out delay-100;
}
</style>
