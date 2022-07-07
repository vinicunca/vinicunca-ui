<script lang="ts" setup>
import type { PropType } from 'vue';
import type { FocusLayer } from './utils';

import { nextTick, onBeforeUnmount, onMounted, provide, ref, unref, watch } from 'vue';
import { KEY_CODES, isSet, isString } from '@vinicunca/js-utilities';

import { focusFirstDescendant, focusableStack, getEdges, obtainAllFocusableElements, tryFocus } from './utils';
import { EVENT_ON_RELEASE_FOCUS, EVENT_ON_TRAP_FOCUS, FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS, INJECTION_KEY_FOCUS_TRAP } from './constants';

import { useEscapeKeydown } from '~/composables';

const props = defineProps({
  loop: Boolean,
  trapped: Boolean,
  elFocusTrap: Object as PropType<HTMLElement>,
  elFocusStart: {
    type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
    default: 'first',
  },
});

const emit = defineEmits([
  EVENT_ON_TRAP_FOCUS,
  EVENT_ON_RELEASE_FOCUS,
  'focusin',
  'focusout',
  'focusoutPrevented',
  'releaseRequested',
]);

defineOptions({
  name: 'VFocusTrap',
  inheritAttrs: false,
});

const forwardRef = ref<HTMLElement | undefined>();
let lastFocusBeforeTrapped: HTMLElement | null;
let lastFocusAfterTrapped: HTMLElement | null;

const focusLayer: FocusLayer = {
  paused: false,
  pause() {
    this.paused = true;
  },
  resume() {
    this.paused = false;
  },
};

useEscapeKeydown((event) => {
  if (props.trapped && !focusLayer.paused) {
    emit('releaseRequested', event);
  }
});

function onKeydown(event: KeyboardEvent) {
  if (!props.loop && !props.trapped) {
    return;
  }
  if (focusLayer.paused) {
    return;
  }

  const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = event;
  const { loop } = props;
  const isTabbing = key === KEY_CODES.TAB && !altKey && !ctrlKey && !metaKey;

  const currentFocusingEl = document.activeElement;
  if (isTabbing && currentFocusingEl) {
    const container = currentTarget as HTMLElement;
    const [first, last] = getEdges(container);
    const isTabbable = first && last;

    if (!isTabbable) {
      if (currentFocusingEl === container) {
        event.preventDefault();
        emit('focusoutPrevented');
      }
    } else {
      if (!shiftKey && currentFocusingEl === last) {
        event.preventDefault();
        if (loop) {
          tryFocus({ element: first, shouldSelect: true });
        }

        emit('focusoutPrevented');
      } else if (shiftKey && [first, container].includes(currentFocusingEl as HTMLElement)) {
        event.preventDefault();
        if (loop) {
          tryFocus({ element: last, shouldSelect: true });
        }
        emit('focusoutPrevented');
      }
    }
  }
}

provide(INJECTION_KEY_FOCUS_TRAP, {
  focusTrapRef: forwardRef,
  onKeydown,
});

watch(
  () => props.elFocusTrap,
  (_elFocusTrap) => {
    if (_elFocusTrap) {
      forwardRef.value = _elFocusTrap;
    }
  },
  { immediate: true },
);

watch([forwardRef], ([_forwardRef], [_oldForwardRef]) => {
  if (_forwardRef) {
    _forwardRef.addEventListener('keydown', onKeydown);
    _forwardRef.addEventListener('focusin', onFocusIn);
    _forwardRef.addEventListener('focusout', onFocusOut);
  }

  if (_oldForwardRef) {
    _oldForwardRef.removeEventListener('keydown', onKeydown);
    _oldForwardRef.removeEventListener('focusin', onFocusIn);
    _oldForwardRef.removeEventListener('focusout', onFocusOut);
  }
});

function trapOnFocus(event: Event) {
  emit(EVENT_ON_TRAP_FOCUS, event);
}

function releaseOnFocus(event: Event) {
  emit(EVENT_ON_RELEASE_FOCUS, event);
}

function onFocusIn(event: Event) {
  const trapContainer = unref(forwardRef);
  if (!trapContainer) {
    return;
  }

  const target = event.target as HTMLElement | null;
  const isFocusedInTrap = target && trapContainer.contains(target);
  if (isFocusedInTrap) {
    emit('focusin', event);
  }

  if (focusLayer.paused) {
    return;
  }

  if (props.trapped) {
    if (isFocusedInTrap) {
      lastFocusAfterTrapped = target;
    } else {
      tryFocus({ element: lastFocusAfterTrapped, shouldSelect: true });
    }
  }
}

function onFocusOut(event: Event) {
  const trapContainer = unref(forwardRef);
  if (focusLayer.paused || !trapContainer) {
    return;
  }

  if (props.trapped) {
    const relatedTarget = (event as FocusEvent).relatedTarget as HTMLElement | null;
    if (isSet(relatedTarget) && !trapContainer.contains(relatedTarget)) {
      /**
           * Give embedded focus layer time to pause this layer before reclaiming focus.
           * And only reclaim focus if it should currently be trapping
           */
      setTimeout(() => {
        if (!focusLayer.paused && props.trapped) {
          tryFocus({ element: lastFocusAfterTrapped, shouldSelect: true });
        }
      }, 0);
    }
  } else {
    const target = event.target as HTMLElement | null;
    const isFocusedInTrap = target && trapContainer.contains(target);
    if (!isFocusedInTrap) {
      emit('focusout', event);
    }
  }
}

async function startTrap() {
  // Wait for forwardRef to resolve
  await nextTick();
  const trapContainer = unref(forwardRef);

  if (trapContainer) {
    focusableStack.push(focusLayer);
    const prevFocusedElement = document.activeElement;
    lastFocusBeforeTrapped = prevFocusedElement as HTMLElement | null;
    const isPrevFocusContained = trapContainer.contains(prevFocusedElement);

    if (!isPrevFocusContained) {
      const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
      trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
      trapContainer.dispatchEvent(focusEvent);

      if (!focusEvent.defaultPrevented) {
        nextTick(() => {
          let { elFocusStart } = props;
          if (!isString(elFocusStart)) {
            tryFocus({ element: elFocusStart });
            if (document.activeElement !== elFocusStart) {
              elFocusStart = 'first';
            }
          }

          if (elFocusStart === 'first') {
            focusFirstDescendant(
              {
                elements: obtainAllFocusableElements(trapContainer),
                shouldSelect: true,
              },
            );
          }

          if (
            document.activeElement === prevFocusedElement || elFocusStart === 'container'
          ) {
            tryFocus({ element: trapContainer });
          }
        });
      }
    }
  }
}

function stopTrap() {
  const trapContainer = unref(forwardRef);

  if (trapContainer) {
    trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);

    const releasedEvent = new Event(
      FOCUS_AFTER_RELEASED,
      FOCUS_AFTER_TRAPPED_OPTS,
    );
    trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
    trapContainer.dispatchEvent(releasedEvent);

    if (!releasedEvent.defaultPrevented) {
      tryFocus({ element: lastFocusBeforeTrapped ?? document.body, shouldSelect: true });
    }

    trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, trapOnFocus);
    focusableStack.remove(focusLayer);
  }
}

onMounted(() => {
  if (props.trapped) {
    startTrap();
  }

  watch(
    () => props.trapped,
    (trapped) => {
      if (trapped) {
        startTrap();
      } else {
        stopTrap();
      }
    },
  );
});

onBeforeUnmount(() => {
  if (props.trapped) {
    stopTrap();
  }
});
</script>

<template>
  <slot :handle-keydown="onKeydown" />
</template>
