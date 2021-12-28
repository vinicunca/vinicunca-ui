// Types
import { isObject, KEY_CODES } from '@praburangki/web-utilities';
import type { DirectiveBinding, ObjectDirective } from 'vue';

const RIPPLE_STOP = Symbol('RIPPLE_STOP');
const DELAY_RIPPLE = 80;

type RippleEvent = (MouseEvent | TouchEvent | KeyboardEvent) & { [RIPPLE_STOP]?: boolean };

interface RippleOptions {
  class?: string;
  center?: boolean;
  circle?: boolean;
}

interface RippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: boolean | { class: string };
  modifiers: {
    center?: boolean;
    circle?: boolean;
  };
}

function isRippleEnabled(value: any): value is true {
  return typeof value === 'undefined' || !!value;
}

function doTransform({ el, value }: { el: HTMLElement; value: string }) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}

function setOpacity({ el, value }: { el: HTMLElement; value: number }) {
  el.style.opacity = `calc(${value} * var(--v-theme-overlay-multiplier))`;
}

function calculate({
  event,
  el,
  value = {},
}: {
  event: RippleEvent;
  el: HTMLElement;
  value?: RippleOptions;
}) {
  let localX = 0;
  let localY = 0;

  if (!isKeyboardEvent(event)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(event) ? event.touches[event.touches.length - 1] : event;

    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }

  let radius = 0;
  let scale = 0.3;

  if (el._ripple?.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center
      ? radius
      : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }

  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;

  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;

  return { radius, scale, x, y, centerX, centerY };
}

function isTouchEvent(event: RippleEvent): event is TouchEvent {
  return event.constructor.name === 'TouchEvent';
}

function isKeyboardEvent(event: RippleEvent): event is KeyboardEvent {
  return event.constructor.name === 'KeyboardEvent';
}

const RIPPLES = {
  show({ event, el, value = {} }: { event: RippleEvent; el: HTMLElement; value?: RippleOptions }) {
    if (!el?._ripple?.enabled) {
      return;
    }

    const container = document.createElement('span');
    const animation = document.createElement('span');

    container.appendChild(animation);
    // TODO: change class to unocss friendly
    container.className = 'v-ripple__container';

    if (value.class) {
      container.className += ` ${value.class}`;
    }

    const { radius, scale, x, y, centerX, centerY } = calculate({ event, el, value });

    const size = `${radius * 2}px`;
    animation.className = 'v-ripple__animation';
    animation.style.width = size;
    animation.style.height = size;

    el.appendChild(container);

    const computed = window.getComputedStyle(el);
    if (computed && computed.position === 'static') {
      el.style.position = 'relative';
      el.dataset.previousPosition = 'static';
    }

    animation.classList.add('v-ripple__animation--enter');
    animation.classList.add('v-ripple__animation--visible');
    doTransform({
      el: animation,
      value: `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`,
    });
    setOpacity({ el: animation, value: 0 });
    animation.dataset.activated = String(performance.now());

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--in');
      doTransform({ el: animation, value: `translate(${centerX}, ${centerY}) scale3d(1,1,1)` });
      setOpacity({ el: animation, value: 0.08 });
    }, 0);
  },

  hide(el: HTMLElement | null) {
    if (!el?._ripple?.enabled) {
      return;
    }

    // TODO: change class to unocss friendly
    const _ripples = el.getElementsByClassName('v-ripple__animation');

    if (_ripples.length === 0) {
      return;
    }

    const animation = _ripples[_ripples.length - 1];

    if (animation.dataset.isHiding) {
      return;
    } else {
      animation.dataset.isHiding = 'true';
    }

    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);

    setTimeout(() => {
      // TODO: change class to unocss friendly
      animation.classList.remove('v-ripple__animation--in');
      animation.classList.add('v-ripple__animation--out');
      setOpacity({ el: animation, value: 0 });

      setTimeout(() => {
        // TODO: change class to unocss friendly
        const ripples = el.getElementsByClassName('v-ripple__animation');

        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }

        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  },
};

function rippleShow(event: RippleEvent) {
  const value: RippleOptions = {};
  const element = event.currentTarget as HTMLElement | undefined;

  if (!element?._ripple || element._ripple.touched || event[RIPPLE_STOP]) {
    return;
  }

  // Don't allow the event to trigger ripples on any other elements
  event[RIPPLE_STOP] = true;

  if (isTouchEvent(event)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    /**
     * It's possible for touch events to fire
     * as mouse events on Android/iOS, this
     * will skip the event call if it has
     * already been registered as touch
     */
    if (element._ripple.isTouch) {
      return;
    }
  }

  value.center = element._ripple.centered || isKeyboardEvent(event);

  if (element._ripple.class) {
    value.class = element._ripple.class;
  }

  if (isTouchEvent(event)) {
    // already queued that shows or hides the ripple
    if (element._ripple.showTimerCommit) {
      return;
    }

    element._ripple.showTimerCommit = () => {
      RIPPLES.show({ event, el: element, value });
    };

    element._ripple.showTimer = window.setTimeout(() => {
      if (element?._ripple?.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    RIPPLES.show({ event, el: element, value });
  }
}

function rippleHide(event: Event) {
  const element = event.currentTarget as HTMLElement | null;
  if (!element || !element._ripple) {
    return;
  }

  window.clearTimeout(element._ripple.showTimer);

  /**
   * The touch interaction occurs before the show timer is triggered.
   * We still want to show ripple effect.
   */

  if (event.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;

    // re-queue ripple hiding
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(event);
    });

    return;
  }

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });

  RIPPLES.hide(element);
}

function rippleCancelShow(event: MouseEvent | TouchEvent) {
  const element = event.currentTarget as HTMLElement | undefined;

  if (!element || !element._ripple) {
    return;
  }

  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }

  window.clearTimeout(element._ripple.showTimer);
}

let keyboardRipple = false;

function keyboardRippleShow(event: KeyboardEvent) {
  if (!keyboardRipple && (event.key === KEY_CODES.ENTER || event.key === KEY_CODES.SPACE)) {
    keyboardRipple = true;
    rippleShow(event);
  }
}

function keyboardRippleHide(event: KeyboardEvent) {
  keyboardRipple = false;
  rippleHide(event);
}

function focusRippleHide(event: FocusEvent) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(event);
  }
}

function updateRipple({
  el,
  binding,
  wasEnabled,
}: {
  el: HTMLElement;
  binding: RippleDirectiveBinding;
  wasEnabled: boolean;
}) {
  const { value, modifiers } = binding;
  const enabled = isRippleEnabled(value);

  if (!enabled) {
    RIPPLES.hide(el);
  }

  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;

  if (isObject(value) && value.class) {
    el._ripple.class = value.class;
  }

  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, { passive: true });
    el.addEventListener('touchend', rippleHide, { passive: true });
    el.addEventListener('touchmove', rippleCancelShow, { passive: true });
    el.addEventListener('touchcancel', rippleHide);

    el.addEventListener('mousedown', rippleShow);
    el.addEventListener('mouseup', rippleHide);
    el.addEventListener('mouseleave', rippleHide);

    el.addEventListener('keydown', keyboardRippleShow);
    el.addEventListener('keyup', keyboardRippleHide);

    el.addEventListener('blur', focusRippleHide);

    // Anchor tags can be dragged, causes other hides to fail
    el.addEventListener('dragstart', rippleHide, { passive: true });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}

function removeListeners(el: HTMLElement) {
  el.removeEventListener('mousedown', rippleShow);
  el.removeEventListener('touchstart', rippleShow);
  el.removeEventListener('touchend', rippleHide);
  el.removeEventListener('touchmove', rippleCancelShow);
  el.removeEventListener('touchcancel', rippleHide);
  el.removeEventListener('mouseup', rippleHide);
  el.removeEventListener('mouseleave', rippleHide);
  el.removeEventListener('keydown', keyboardRippleShow);
  el.removeEventListener('keyup', keyboardRippleHide);
  el.removeEventListener('dragstart', rippleHide);
  el.removeEventListener('blur', focusRippleHide);
}

function mounted(el: HTMLElement, binding: DirectiveBinding) {
  updateRipple({ el, binding, wasEnabled: false });
}

function unmounted(el: HTMLElement) {
  delete el._ripple;
  removeListeners(el);
}

function updated(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);

  updateRipple({ el, binding, wasEnabled });
}

export const Ripple: ObjectDirective = {
  mounted,
  unmounted,
  updated,
};
