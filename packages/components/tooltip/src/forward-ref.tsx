import type { VNodeArrayChildren } from 'vue';

import { Fragment, defineComponent, ref } from 'vue';
import { buildProps, composeRefs, definePropType, ensureOnlyChild } from '@vinicunca/utils';

type RefSetter = (el: HTMLElement | null) => void;

export const forwardRefProps = buildProps({
  setRef: { type: definePropType<RefSetter>(Function), required: true },
  onlyChild: Boolean,
} as const);

export default defineComponent({
  props: forwardRefProps,

  setup(props, { slots }) {
    const refFragment = ref();
    const refSet = composeRefs(refFragment, (_el) => {
      /**
       * vue fragments is represented as a text element.
       * The first element sibling should be the first element children of fragment.
       */
      if (_el) {
        props.setRef((_el as HTMLElement).nextElementSibling as HTMLElement | null);
      } else {
        props.setRef(null);
      }
    });

    return () => {
      const [firstChild] = slots.default?.() || [];
      const child = props.onlyChild ? ensureOnlyChild(firstChild.children as VNodeArrayChildren) : firstChild.children;

      return (
        <Fragment ref={ refSet }>
          { child }
        </Fragment>
      );
    };
  },
});
