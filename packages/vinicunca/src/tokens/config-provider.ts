import type { InjectionKey, Ref } from 'vue';
import type { ConfigProviderProps } from '~/components/config-provider';

export type ConfigProviderContext = Partial<ConfigProviderProps>;

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('ConfigProviderContext');
