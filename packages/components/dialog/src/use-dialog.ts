import type { DialogEmits, DialogProps } from './dialog';
import type { CSSProperties, Ref, SetupContext } from 'vue';

import { computed, getCurrentInstance, ref } from 'vue';
import { useId, useZIndex } from '@vinicunca/composables';
import { convertToUnit } from '@vinicunca/js-utilities';
import { EVENT_UPDATE_MODEL } from '@vinicunca/constants';

export function useDialog({ props, refTarget }: { props: DialogProps; refTarget: Ref<HTMLElement | undefined> }) {
  const instance = getCurrentInstance()!;
  const emit = instance.emit as SetupContext<DialogEmits>['emit'];
  const { nextZIndex } = useZIndex();

  // let lastPosition = ''
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false); // when desctroyOnClose is true, we initialize it as false vise versa
  const zIndex = ref(props.zIndex || nextZIndex());

  // let openTimer: (() => void) | undefined = undefined
  // let closeTimer: (() => void) | undefined = undefined

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
      rendered.value = false;
    }
  }

  function beforeLeave() {
    emit('close');
  }
}
