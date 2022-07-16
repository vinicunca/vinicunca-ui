<script lang="ts" setup>
import { INJECTION_TOOLTIP_ROOT } from '@vinicunca/tokens';
import { tooltipBaseProps } from '@vinicunca/tokens/tooltip';
import { composeEventHandlers } from '@vinicunca/utils';
import { inject, onBeforeUnmount, watch } from 'vue';

import VForwardRef from './forward-ref';
import { tooltipTriggerProps } from './trigger';

const props = defineProps({
  ...tooltipBaseProps,
  ...tooltipTriggerProps,
});

defineOptions({
  name: 'VTooltipTrigger',
});

const { onClose, onOpen, onOpenDelay, refTrigger, idContent } = inject(INJECTION_TOOLTIP_ROOT)!;

let isMousedown = false;

function refSetTrigger(_el: HTMLElement | null) {
  refTrigger.value = _el;
}

function onMouseup() {
  isMousedown = false;
}

const onMouseenter = composeEventHandlers({ external: props.onMouseEnter, internal: onOpenDelay });

const onMouseleave = composeEventHandlers({ external: props.onMouseLeave, internal: onClose });

const onMousedown = composeEventHandlers({
  external: props.onMouseDown,
  internal: () => {
    onClose();
    isMousedown = true;
    document.addEventListener('mouseup', onMouseup, { once: true });
  },
});

const onFocus = composeEventHandlers({
  external: props.onFocus,
  internal: () => {
    if (!isMousedown) {
      onOpen();
    }
  },
});

const onBlur = composeEventHandlers({ external: props.onBlur, internal: onClose });

const onClick = composeEventHandlers(
  {
    external: props.onClick,
    internal: (event) => {
      if ((event as MouseEvent).detail === 0) {
        onClose();
      }
    },
  });

const events = {
  blur: onBlur,
  click: onClick,
  focus: onFocus,
  mousedown: onMousedown,
  mouseenter: onMouseenter,
  mouseleave: onMouseleave,
};

function setEvents<T extends(event: Event) => void>(
  { el, events, type }:
  { el: HTMLElement | null | undefined;
    events: Record<string, T>;
    type: 'addEventListener' | 'removeEventListener';
  },
) {
  if (el) {
    Object.entries(events).forEach(([name, handler]) => {
      el[type](name, handler);
    });
  }
}

watch(
  refTrigger,
  (_elTrigger, _prevElTrigger) => {
    setEvents({ el: _elTrigger, events, type: 'addEventListener' });
    setEvents({ el: _prevElTrigger, events, type: 'removeEventListener' });

    if (_elTrigger) {
      _elTrigger.setAttribute('aria-describedby', idContent.value);
    }
  },
);

onBeforeUnmount(() => {
  setEvents({ el: refTrigger.value, events, type: 'removeEventListener' });
  document.removeEventListener('mouseup', onMouseup);
});
</script>

<template>
  <VForwardRef v-if="nowrap" :set-ref="refSetTrigger" only-child>
    <slot />
  </VForwardRef>

  <button v-else ref="refTrigger" v-bind="$attrs">
    <slot />
  </button>
</template>
