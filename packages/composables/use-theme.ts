import type { VinicuncaTheme } from '@vinicunca/tokens';

import { computed } from 'vue';
import { themeClasses } from '@vinicunca/tokens';

import { useGlobalConfig } from './use-global-config';

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
