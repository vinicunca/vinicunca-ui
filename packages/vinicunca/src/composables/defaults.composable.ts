import { inject, ref } from 'vue';

// Type
import type { InjectionKey, Ref } from 'vue';

export interface DefaultsInstance {
  [key: string]: undefined | Record<string, unknown>;
  global?: Record<string, unknown>;
}

export type DefaultsOptions = Partial<DefaultsInstance>;

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vinicunca:defaults');

export function createDefaults(options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options ?? {});
}

export function useDefaults() {
  const defaults = inject(DefaultsSymbol);

  if (!defaults) {
    throw new Error('[Vinicunca] Could not find defaults instance');
  }

  return defaults;
}
