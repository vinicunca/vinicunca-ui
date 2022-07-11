import type { DialogEmits, DialogProps } from './dialog';
import type { CSSProperties, Ref, SetupContext } from 'vue';

import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import { useId, useZIndex } from '@vinicunca/composables';
import { convertToUnit, isBrowser } from '@vinicunca/js-utilities';
import { EVENT_UPDATE_MODEL } from '@vinicunca/constants';
import { useTimeoutFn } from '@vinicunca/vueuse';
import { useLockScreen } from '@vinicunca/composables/use-lock-screen';

export function useDialog({ props, refTarget }: { props: DialogProps; refTarget: Ref<HTMLElement | undefined> }) {
  const instance = getCurrentInstance()!;
  const emit = instance.emit as SetupContext<DialogEmits>['emit'];
  const { nextZIndex } = useZIndex();

  let lastPosition = '';
  const titleId = useId();
  const bodyId = useId();
  const isVisible = ref(false);
  const isClosed = ref(false);
  const isRendered = ref(false); // when desctroyOnClose is true, we initialize it as false vise versa
  const zIndex = ref(props.zIndex || nextZIndex());

  let openTimer: (() => void) | undefined;
  let closeTimer: (() => void) | undefined;

  const style = computed<CSSProperties>(() => {
    const style: CSSProperties = {};
    const varPrefix = '--vin-dialog';

    if (!props.fullscreen && props.width) {
      style[`${varPrefix}-width`] = convertToUnit(props.width);
    }

    return style;
  });

  function afterEnter() {
    emit('opened');
  }

  function afterLeave() {
    emit('closed');
    emit(EVENT_UPDATE_MODEL, false);
    if (props.destroyOnClose) {
      isRendered.value = false;
    }
  }

  function beforeLeave() {
    emit('close');
  }

  function open() {
    closeTimer?.();
    openTimer?.();

    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn({ cb: () => doOpen(), interval: props.openDelay }));
    } else {
      doOpen();
    }
  }

  function close() {
    openTimer?.();
    closeTimer?.();

    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn({ cb: () => doClose(), interval: props.closeDelay }));
    } else {
      doClose();
    }
  }

  function handleClose() {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) {
        return;
      }
      isClosed.value = true;
      isVisible.value = false;
    }

    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }

  function onClickModal() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  function doOpen() {
    if (!isBrowser) {
      return;
    }
    isVisible.value = true;
  }

  function doClose() {
    isVisible.value = false;
  }

  function onOpenAutoFocus() {
    emit('openAutoFocus');
  }

  function onCloseAutoFocus() {
    emit('closeAutoFocus');
  }

  if (props.lockScroll) {
    useLockScreen(isVisible);
  }

  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }

  watch(
    () => props.modelValue,
    (_modelValue) => {
      if (_modelValue) {
        isClosed.value = false;
        open();
        isRendered.value = true; // enables lazy rendering
        emit('open');
        zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex();

        nextTick(() => {
          if (refTarget.value) {
            refTarget.value.scrollTop = 0;
          }
        });
      } else {
        if (isVisible.value) {
          close();
        }
      }
    },
  );

  watch(
    () => props.fullscreen,
    (_fullscreen) => {
      if (!refTarget.value) {
        return;
      }
      if (_fullscreen) {
        lastPosition = refTarget.value.style.transform;
        refTarget.value.style.transform = '';
      } else {
        refTarget.value.style.transform = lastPosition;
      }
    },
  );

  onMounted(() => {
    if (props.modelValue) {
      isVisible.value = true;
      isRendered.value = true; // enables lazy rendering
      open();
    }
  });

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onClickModal,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    titleId,
    bodyId,
    isClosed,
    style,
    isRendered,
    isVisible,
    zIndex,
  };
}
