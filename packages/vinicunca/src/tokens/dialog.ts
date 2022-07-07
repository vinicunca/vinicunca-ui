import type { CSSProperties, ComputedRef, InjectionKey, Ref } from 'vue';

export interface DialogContext {
  refDialog: Ref<HTMLElement | undefined>;
  refHeader: Ref<HTMLElement | undefined>;
  bodyId: Ref<string>;
  rendered: Ref<boolean>;
  style: ComputedRef<CSSProperties>;
}

export const INJECTION_KEY_DIALOG: InjectionKey<DialogContext> = Symbol('INJECTION_KEY_DIALOG');
