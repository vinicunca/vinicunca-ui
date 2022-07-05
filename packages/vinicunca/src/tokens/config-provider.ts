import type { InjectionKey, Ref } from 'vue';
import type { ConfigProviderProps } from '~/components/config-provider';

export type ConfigProviderContext = Partial<ConfigProviderProps>;

export const INJECTION_KEY_CONFIG_PROVIDER: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('INJECTION_KEY_CONFIG_PROVIDER');
