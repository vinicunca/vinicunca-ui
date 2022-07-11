import type { App, Ref } from 'vue';
import type { MaybeRef } from '@vinicunca/vueuse';
import type { ConfigProviderContext } from '@vinicunca/tokens';

import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue';
import { objectKeys } from '@vinicunca/js-utilities';
import { INJECTION_CONFIG_PROVIDER } from '@vinicunca/tokens';
import { debugWarn } from '@vinicunca/utils/error';

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K],
>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined,
) {
  const config = getCurrentInstance()
    ? inject(INJECTION_CONFIG_PROVIDER, globalConfig)
    : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}

interface ProvideParams {
  config: MaybeRef<ConfigProviderContext>;
  app?: App;
  global?: boolean;
}

export function provideGlobalConfig({ config, app, global = false }: ProvideParams) {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().',
    );
    return;
  }

  const context = computed(() => {
    const _config = unref(config);
    if (!oldConfig?.value) {
      return _config;
    }

    return mergeConfig(oldConfig.value, _config);
  });

  provideFn(INJECTION_CONFIG_PROVIDER, context);

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }

  return context;
}

function mergeConfig(src: ConfigProviderContext, target: ConfigProviderContext) {
  const keys = [...new Set([...objectKeys(src), ...objectKeys(target)])];
  const obj: Dictionary<any> = {};

  for (const key of keys) {
    obj[key] = target[key] ?? src[key];
  }
  return obj;
}
