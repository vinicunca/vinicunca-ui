import type { CSSProperties, ExtractPropTypes } from 'vue';
import type { ZIndexProperty } from 'csstype';

import { createVNode, defineComponent, h, renderSlot } from 'vue';

import { useSameTarget } from '~/composables';
import { PATCH_FLAGS, buildProps, definePropType } from '~/utils';
import { useTheme } from '~/composables/use-theme';

export const overlayProps = buildProps({
  mask: { type: Boolean, default: true },
  customMaskEvent: { type: Boolean, default: false },
  classOverlay: {
    type: definePropType<string | string[] | Dictionary<boolean>>([
      String,
      Array,
      Object,
    ]),
  },
  zIndex: {
    type: definePropType<ZIndexProperty>([String, Number]),
  },
} as const);

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export default defineComponent({
  name: 'VOverlay',

  props: overlayProps,

  setup(props, { slots, emit }) {
    const { getThemeClasses } = useTheme('overlayMask');

    function onMaskClick(event: MouseEvent) {
      emit('click', event);
    }

    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? undefined : onMaskClick,
    );

    return () => {
      /**
       * When the vnode meets the same structure but with different change trigger,
       * it will not automatically update, thus we simply use h function to manage updating
       */
      if (props.mask) {
        return createVNode(
          'div',
          {
            class: [
              props.classOverlay,
              getThemeClasses(),
            ],
            style: {
              zIndex: props.zIndex,
            },
            onClick,
            onMousedown,
            onMouseup,
          },
          [renderSlot(slots, 'default')],
          PATCH_FLAGS.STYLE | PATCH_FLAGS.CLASS | PATCH_FLAGS.PROPS,
          ['onClick', 'onMouseup', 'onMousedown'],
        );
      } else {
        return h(
          'div',
          {
            class: props.classOverlay,
            style: {
              zIndex: props.zIndex,
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            } as CSSProperties,
          },
          [renderSlot(slots, 'default')]);
      }
    };
  },
});
