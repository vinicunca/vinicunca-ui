import type { Ref, ToRefs } from 'vue';
import type {
  ComputePositionReturn,
  Middleware,
  Placement,
  SideObject,
  Strategy,

  VirtualElement,
} from '@floating-ui/dom';

import { isRef, onMounted, ref, unref, watchEffect } from 'vue';
import {
  arrow as arrowFloating,
  computePosition,
} from '@floating-ui/dom';
import { unrefElement } from '@vinicunca/vueuse';
import { isBrowser, objectKeys } from '@vinicunca/js-utilities';

type RefElement = Parameters<typeof unrefElement>['0'];

function unrefReference(refEl: RefElement | Ref<VirtualElement | undefined>) {
  if (!isBrowser) {
    return;
  }

  if (!refEl) {
    return;
  }

  const unrefEl = unrefElement(refEl as RefElement);

  if (unrefEl) {
    return unrefEl;
  }

  return isRef(refEl) ? unrefEl : (refEl as VirtualElement);
}

type UseFloatingParams = ToRefs<{
  middleware: Array<Middleware>;
  placement: Placement;
  strategy: Strategy;
}>;

export function useFloating({
  middleware,
  placement,
  strategy,
}: UseFloatingParams) {
  const refReference = ref<HTMLElement | VirtualElement>();
  const refContent = ref<HTMLElement>();
  const x = ref<number>();
  const y = ref<number>();
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({});

  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const;

  async function update() {
    if (!isBrowser) {
      return;
    }

    const elReference = unrefReference(refReference);
    const elContent = unrefElement(refContent);

    if (!elReference || !elContent) {
      return;
    }

    const data = await computePosition(elReference, elContent, {
      placement: unref(placement),
      strategy: unref(strategy),
      middleware: unref(middleware),
    });

    objectKeys(states).forEach((key) => {
      states[key].value = data[key];
    });
  }

  onMounted(() => {
    watchEffect(() => {
      update();
    });
  });

  return {
    ...states,
    update,
    refReference,
    refContent,
  };
}

interface UseFloatingArrowParams {
  refArrow: Ref<HTMLElement | null | undefined>;
  padding?: number | SideObject;
}

export function useFloatingArrowMiddleware({ refArrow, padding }: UseFloatingArrowParams): Middleware {
  return {
    name: 'arrow',
    options: {
      element: refArrow,
      padding,
    },

    fn(args) {
      const elArrow = unref(refArrow);
      if (!elArrow) {
        return {};
      }

      return arrowFloating({
        element: elArrow,
        padding,
      }).fn(args);
    },
  };
}
