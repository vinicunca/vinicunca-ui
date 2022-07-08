import type { UserConfig } from 'unocss';
import type { WebFontsOptions } from '@vinicunca/preset-web-fonts';

interface UnoCssOptions extends UserConfig {
  /**
   * Injecting `uno.css` entry
   *
   * @default true
   */
  autoImport?: boolean;

  // TODO: haven't been implemented yet
  /**
   * Injecting `vinicuna/styles/reset.css` entry
   *
   * @default true
   */
  preflight?: boolean;
}

export interface VinicuncaNuxtOptions {
  unocss?: UnoCssOptions;
  presetWebFonts?: WebFontsOptions;
}
