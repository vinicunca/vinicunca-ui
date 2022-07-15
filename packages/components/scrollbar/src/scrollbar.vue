<script lang="ts" setup>
import type { ScrollbarBarInstance } from './scrollbar-bar';
import type { CSSProperties, StyleValue } from 'vue';

import { computed, nextTick, onMounted, onUpdated, provide, reactive, ref, watch } from 'vue';
import { convertToUnit, isNumber, isObject } from '@vinicunca/js-utilities';
import { useEventListener, useResizeObserver } from '@vinicunca/vueuse';
import { INJECTION_SCROLLBAR } from '@vinicunca/tokens';

import { scrollbarEmits, scrollbarProps } from './scrollbar';
import { GAP } from './utils';

const props = defineProps(scrollbarProps);
const emit = defineEmits(scrollbarEmits);

defineOptions({
  name: 'VScrollbar',
});

const refScrollbar = ref<HTMLDivElement>();
const refWrap = ref<HTMLDivElement>();
const refResize = ref<HTMLElement>();

const sizeWidth = ref('0');
const sizeHeight = ref('0');
const refBar = ref<ScrollbarBarInstance>();
const ratioY = ref(1);
const ratioX = ref(1);

const style = computed<StyleValue>(() => {
  const style: CSSProperties = {};
  if (props.height) {
    style.height = convertToUnit(props.height);
  }
  if (props.maxHeight) {
    style.maxHeight = convertToUnit(props.maxHeight);
  }

  return [props.styleWrap, style];
});

function handleScroll() {
  if (refWrap.value) {
    refBar.value?.handleScroll(refWrap.value);

    emit('scroll', {
      scrollTop: refWrap.value.scrollTop,
      scrollLeft: refWrap.value.scrollLeft,
    });
  }
}

function scrollTo(options: ScrollToOptions): void;
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    refWrap.value!.scrollTo(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    refWrap.value!.scrollTo(arg1, arg2);
  }
}

function setScrollTop(value: number) {
  refWrap.value!.scrollTop = value;
}

function setScrollLeft(value: number) {
  refWrap.value!.scrollLeft = value;
}

function update() {
  if (!refWrap.value) {
    return;
  }

  const offsetHeight = refWrap.value.offsetHeight - GAP;
  const offsetWidth = refWrap.value.offsetWidth - GAP;

  const originalHeight = offsetHeight ** 2 / refWrap.value.scrollHeight;
  const originalWidth = offsetWidth ** 2 / refWrap.value.scrollWidth;
  const height = Math.max(originalHeight, props.minSize);
  const width = Math.max(originalWidth, props.minSize);

  ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
  ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : '';
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : '';
}

let stopResizeObserver: (() => void) | undefined;
let stopResizeListener: (() => void) | undefined;

watch(
  () => props.noresize,
  (_noresize) => {
    if (_noresize) {
      stopResizeObserver?.();
      stopResizeListener?.();
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver({ target: refResize.value, callback: update }));
      stopResizeListener = useEventListener('resize', update);
    }
  },
  { immediate: true },
);

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native) {
      nextTick(() => {
        update();
        if (refWrap.value) {
          refBar.value?.handleScroll(refWrap.value);
        }
      });
    }
  },
);

provide(
  INJECTION_SCROLLBAR,
  reactive({
    elScrollbar: refScrollbar,
    elWrapper: refWrap,
  }),
);

onMounted(() => {
  if (!props.native) {
    nextTick(() => {
      update();
    });
  }
});

onUpdated(() => update());

defineExpose({
  /** @description scrollbar wrap ref */
  refWrap,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
});
</script>

<template>
  <div ref="refScrollbar">
    <div
      ref="refWrap"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="refResize"
        :class="classContent"
        :style="styleContent"
      >
        <slot />
      </component>
    </div>

    <template v-if="!native">
      <VScrollbarBar
        ref="refBar"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>
