import type { Ref } from 'vue';

import { onScopeDispose, watch } from 'vue';
import { convertToUnit, isBrowser } from '@vinicunca/js-utilities';
import { addClass, getScrollBarWidth, getStyle, hasClass, removeClass } from '@vinicunca/utils';
import { CLASS_OVERFLOW_HIDDEN } from '@vinicunca/tokens';

const bodyProps = { el: document?.body, cls: CLASS_OVERFLOW_HIDDEN };

export function useLockScreen(trigger: Ref<boolean>) {
  if (!isBrowser || hasClass(bodyProps)) {
    return;
  }

  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = '0';
  let computedBodyPaddingRight = 0;

  function cleanup() {
    removeClass(bodyProps);
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  }

  watch(trigger, (_trigger) => {
    if (!trigger) {
      cleanup();
      return;
    }

    withoutHiddenClass = !hasClass(bodyProps);
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight;
      computedBodyPaddingRight = Number.parseInt(
        getStyle({ el: document.body, styleName: 'paddingRight' }),
        10,
      );
    }

    scrollBarWidth = getScrollBarWidth();
    const bodyHasOverflow
      = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle({ el: document.body, styleName: 'overflowY' });
    if (
      scrollBarWidth > 0
      && (bodyHasOverflow || bodyOverflowY === 'scroll')
      && withoutHiddenClass
    ) {
      document.body.style.paddingRight = convertToUnit(computedBodyPaddingRight + scrollBarWidth)!;
    }
    addClass(bodyProps);
  });

  onScopeDispose(() => cleanup());
}
