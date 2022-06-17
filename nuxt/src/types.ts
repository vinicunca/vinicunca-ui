import type { UserConfig } from '@unocss/core';

interface UnoCssOptions extends UserConfig {
  /**
   * Injecting `uno.css` entry
   *
   * @default true
   */
  autoImport?: boolean;

  /**
   * Injecting `vinicuna/styles/reset.css` entry
   *
   * @default true
   */
  preflight?: boolean;
}

export interface VinicuncaNuxtOptions {
  unocss: UnoCssOptions;
}
