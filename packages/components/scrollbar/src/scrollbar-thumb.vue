<script lang="ts" setup>
import { isBrowser } from '@vinicunca/js-utilities';
import { INJECTION_SCROLLBAR } from '@vinicunca/tokens';
import { throwError } from '@vinicunca/utils/error';
import { useEventListener } from '@vinicunca/vueuse';
import { computed, inject, onBeforeUnmount, ref, toRef } from 'vue';

import { scrollbarThumbProps } from './scrollbar-thumb';
import { BAR_MAP, renderThumbStyle } from './utils';

const props = defineProps(scrollbarThumbProps);

const COMPONENT_NAME = 'ScrollbarThumb';

const scrollbar = inject(INJECTION_SCROLLBAR);

if (!scrollbar) {
  throwError(COMPONENT_NAME, 'can not inject scrollbar context');
}

const refInstance = ref<HTMLDivElement>();
const refThumb = ref<HTMLDivElement>();

const stateThumb = ref<Partial<Record<'X' | 'Y', number>>>({});
const isVisible = ref(false);

const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']);

const styleThumb = computed(() =>
  renderThumbStyle({
    size: props.size,
    move: props.move,
    bar: bar.value,
  }),
);

const offsetRatio = computed(
  () =>
    // offsetRatioX = original width of thumb / current width of thumb / ratioX
    // offsetRatioY = original height of thumb / current height of thumb / ratioY
    // instance height = wrap height - GAP
    refInstance.value![bar.value.offset] ** 2
    / scrollbar.elWrapper![bar.value.scrollSize]
    / props.ratio
    / refThumb.value![bar.value.offset],
);

function clickThumbHandler(event: MouseEvent) {
  // prevent click event of middle and right button
  event.stopPropagation();

  if (event.ctrlKey || [1, 2].includes(event.button)) {
    return;
  }

  window.getSelection()?.removeAllRanges();
  startDrag(event);

  const _el = event.currentTarget as HTMLDivElement;
  if (!_el) {
    return;
  }

  stateThumb.value[bar.value.axis] = _el[bar.value.offset] - (event[bar.value.client] - _el.getBoundingClientRect()[bar.value.direction]);
}

let cursorDown = false;
let cursorLeave = false;
let originalOnSelectStart: ((this: GlobalEventHandlers, event: Event) => any) | null = isBrowser ? document.onselectstart : null;

function startDrag(event: MouseEvent) {
  event.stopImmediatePropagation();
  cursorDown = true;
  document.addEventListener('mousemove', mouseMoveDocumentHandler);
  document.addEventListener('mouseup', mouseUpDocumentHandler);
  originalOnSelectStart = document.onselectstart;
  document.onselectstart = () => false;
}

function mouseMoveDocumentHandler(event: MouseEvent) {
  if (!refInstance.value || !refThumb.value) {
    return;
  }

  if (!cursorDown) {
    return;
  }

  const prevPage = stateThumb.value[bar.value.axis];
  if (!prevPage) {
    return;
  }

  const offset = (refInstance.value.getBoundingClientRect()[bar.value.direction] - event[bar.value.client]) * -1;
  const thumbClickPosition = refThumb.value[bar.value.offset] - prevPage;
  const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 * offsetRatio.value) / refInstance.value[bar.value.offset];
  scrollbar!.elWrapper[bar.value.scroll] = (thumbPositionPercentage * scrollbar!.elWrapper[bar.value.scrollSize]) / 100;
}

function mouseUpDocumentHandler() {
  cursorDown = false;
  stateThumb.value[bar.value.axis] = 0;
  document.removeEventListener('mousemove', mouseMoveDocumentHandler);
  document.removeEventListener('mouseup', mouseUpDocumentHandler);
  restoreOnselectstart();
  if (cursorLeave) {
    isVisible.value = false;
  }
}

function clickTrackHandler(event: MouseEvent) {
  if (!refThumb.value || !refInstance.value || !scrollbar?.elWrapper) {
    return;
  }

  const offset = Math.abs(
    (event.target as HTMLElement).getBoundingClientRect()[bar.value.direction]
      - event[bar.value.client],
  );
  const thumbHalf = refThumb.value[bar.value.offset] / 2;
  const thumbPositionPercentage = ((offset - thumbHalf) * 100 * offsetRatio.value) / refInstance.value[bar.value.offset];

  scrollbar.elWrapper[bar.value.scroll] = (thumbPositionPercentage * scrollbar.elWrapper[bar.value.scrollSize]) / 100;
}

function mouseMoveScrollbarHandler() {
  cursorLeave = false;
  isVisible.value = !!props.size;
}

function mouseLeaveScrollbarHandler() {
  cursorLeave = true;
  isVisible.value = cursorDown;
}

function restoreOnselectstart() {
  if (document.onselectstart !== originalOnSelectStart) {
    document.onselectstart = originalOnSelectStart;
  }
}

useEventListener(
  toRef(scrollbar, 'elScrollbar'),
  'mousemove',
  mouseMoveScrollbarHandler,
);

useEventListener(
  toRef(scrollbar, 'elScrollbar'),
  'mouseleave',
  mouseLeaveScrollbarHandler,
);

onBeforeUnmount(() => {
  restoreOnselectstart();
  document.removeEventListener('mouseup', mouseUpDocumentHandler);
});
</script>

<template>
  <Transition>
    <div
      v-show="always || isVisible"
      ref="refInstance"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="refThumb"
        :style="styleThumb"
        @mousedown="clickThumbHandler"
      />
    </div>
  </Transition>
</template>
