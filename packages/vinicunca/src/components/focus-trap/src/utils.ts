export interface FocusLayer {
  paused: boolean;
  pause: () => void;
  resume: () => void;
}

export type FocusStack = FocusLayer[];

export function obtainAllFocusableElements(element: HTMLElement): HTMLElement[] {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (
      node: Element & {
        disabled: boolean;
        hidden: boolean;
        type: string;
        tabIndex: number;
      },
    ) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0 || node === document.activeElement
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as HTMLElement);
  }

  return nodes;
}

export function getVisibleElement(
  { elements, container }: { elements: HTMLElement[]; container: HTMLElement }) {
  for (const element of elements) {
    if (!isHidden({ element, container })) {
      return element;
    }
  }
}

export function isHidden({ element, container }: { element: HTMLElement; container: HTMLElement }) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  if (getComputedStyle(element).visibility === 'hidden') {
    return true;
  }

  while (element) {
    if (container && element === container) {
      return false;
    }
    if (getComputedStyle(element).display === 'none') {
      return true;
    }
    element = element.parentElement as HTMLElement;
  }

  return false;
}

export function getEdges(container: HTMLElement) {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement({ elements: focusable, container });
  const last = getVisibleElement({ elements: focusable.reverse(), container });

  return [first, last];
}

export function isSelectable(element: any): element is HTMLInputElement & { select: () => void } {
  return element instanceof HTMLInputElement && 'select' in element;
}

export function tryFocus({ element, shouldSelect }: { element: HTMLElement | { focus: () => void } | null; shouldSelect?: boolean }) {
  if (element && element.focus) {
    const prevFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });

    if (
      element !== prevFocusedElement
      && isSelectable(element)
      && shouldSelect
    ) {
      element.select();
    }
  }
}

function removeFromStack<T>({ list, item }: { list: T[]; item: T }) {
  const copy = [...list];

  const idx = list.indexOf(item);

  if (idx !== -1) {
    copy.splice(idx, 1);
  }

  return copy;
}

export function createFocusableStack() {
  let stack = [] as FocusStack;

  function push(layer: FocusLayer) {
    const [currentLayer] = stack;

    if (currentLayer && layer !== currentLayer) {
      currentLayer.pause();
    }

    stack = removeFromStack({ list: stack, item: layer });
    stack.unshift(layer);
  }

  function remove(layer: FocusLayer) {
    stack = removeFromStack({ list: stack, item: layer });
    stack[0]?.resume?.();
  }

  return {
    push,
    remove,
  };
}

export function focusFirstDescendant({ elements, shouldSelect = false }: { elements: HTMLElement[]; shouldSelect?: boolean }) {
  const prevFocusedElement = document.activeElement;
  for (const element of elements) {
    tryFocus({ element, shouldSelect });
    if (document.activeElement !== prevFocusedElement) {
      return;
    }
  }
}

export const focusableStack = createFocusableStack();
