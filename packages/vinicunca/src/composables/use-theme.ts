import type { VinicuncaTheme } from '~/theme';

import { computed } from 'vue';

import { useGlobalConfig } from './use-global-config';

import { themeClasses } from '~/theme';

export function useTheme(themeKey: keyof VinicuncaTheme) {
  const globalConfig = useGlobalConfig('theme');

  const classes = computed(() => globalConfig.value?.[themeKey] || themeClasses[themeKey]);

  function getThemeClasses() {
    return classes.value.join(' ');
  }

  return {
    getThemeClasses,
  };
}
