import type { CSSProperties, ComputedRef, Ref } from 'vue';

export interface DialogContext {
  refDialog: Ref<HTMLElement | undefined>;
  refHeader: Ref<HTMLElement | undefined>;
  bodyId: Ref<string>;
  rendered: Ref<boolean>;
  style: ComputedRef<CSSProperties>;
}

