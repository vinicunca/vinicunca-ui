import type { PresetVinicuncaOptions, VinicuncaUnoConfig, WebFontsOptions } from '@vinicunca/unocss';

interface UnoCssOptions extends VinicuncaUnoConfig {
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
  unocss: UnoCssOptions;
  presetConfig: PresetVinicuncaOptions;
  presetWebFonts?: WebFontsOptions;
}
