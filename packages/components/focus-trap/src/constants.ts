import type { Ref } from 'vue';

export const FOCUS_AFTER_TRAPPED = 'focus-trap.focus-after-trapped';
export const FOCUS_AFTER_RELEASED = 'focus-trap.focus-after-released';
export const FOCUS_AFTER_TRAPPED_OPTS: EventInit = {
  cancelable: true,
  bubbles: false,
};

export const EVENT_ON_TRAP_FOCUS = 'focusAfterTrapped';
export const EVENT_ON_RELEASE_FOCUS = 'focusAfterReleased';

export interface FocusTrapInjectionContext {
  focusTrapRef: Ref<HTMLElement | undefined>;
  onKeydown: (e: KeyboardEvent) => void;
}

