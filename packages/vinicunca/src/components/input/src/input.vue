<script lang="ts" setup>
import type { StyleValue } from 'vue';

import { computed, ref, useAttrs as useVueAttrs } from 'vue';

import { VIcon } from '~/components/icon';

import { inputEmits, inputProps } from './input';

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

defineOptions({
  name: 'ElInput',
  inheritAttrs: false,
});

const rawAttrs = useVueAttrs();

const attrsContainer = computed(() => {
  const attrsComboBox: Dictionary<unknown> = {};

  if (props.containerRole) {
    attrsComboBox['aria-haspopup'] = rawAttrs['aria-haspopup'];
    attrsComboBox['aria-owns'] = rawAttrs['aria-owns'];
    attrsComboBox['aria-expanded'] = rawAttrs['aria-expanded'];
  }

  return attrsComboBox;
});

const stylesContainer = computed<StyleValue>(() => [
  rawAttrs.style as StyleValue,
  props.inputStyle,
]);

const hovering = ref(false);

function handleMouseEnter(event: MouseEvent) {
  hovering.value = true;
  emit('mouseenter', event);
}

function handleMouseLeave(event: MouseEvent) {
  hovering.value = false;
  emit('mouseleave', event);
}
</script>

<template>
  <div
    v-show="type !== 'hidden'"
    v-bind="attrsContainer"
    :class="[$attrs.class]"
    :style="stylesContainer"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="type === 'textarea'">
      <textarea
        :id="inputId"
        ref="textarea"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span
        v-if="isWordLimitVisible"
        :style="countStyle"
      >
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>

    <template v-else>
      <!-- prepend slot -->
      <div v-if="$slots.prepend">
        <slot name="prepend" />
      </div>

      <div>
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon">
          <span>
            <slot name="prefix" />

            <VIcon v-if="prefixIcon" :name="prefixIcon" />
          </span>
        </span>

        <input
          :id="inputId"
          ref="input"
          v-bind="attrs"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="inputDisabled"
          :formatter="formatter"
          :parser="parser"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :tabindex="tabindex"
          :aria-label="label"
          :placeholder="placeholder"
          :style="inputStyle"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        />

        <!-- suffix slot -->
        <span v-if="suffixVisible">
          <span>
            <template
              v-if="!showClear || !showPwdVisible || !isWordLimitVisible"
            >
              <slot name="suffix" />
              <VIcon v-if="suffixIcon" :name="suffixIcon" />
            </template>

            <VIcon
              v-if="showClear"
              :name="iconClear"
              @mousedown.prevent="NOOP"
              @click="clear"
            />

            <VIcon
              v-if="showPwdVisible"
              :name="iconPassword"
              @click="handlePasswordVisible"
            />

            <span v-if="isWordLimitVisible">
              <span>
                {{ textLength }} / {{ attrs.maxlength }}
              </span>
            </span>

            <VIcon
              v-if="validateState && validateIcon && needStatusIcon"
              :name="iconValidate"
            />
          </span>
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>
