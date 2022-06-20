export type WebFontsProviders = 'google' | 'local';

export interface WebFontMeta {
  name: string;
  weights?: string | (string | number)[];
  italic?: boolean;
  /**
   * Override the provider
   * @default <matches root config>
   */
  provider?: WebFontsProviders;
  /**
   * Set the base html font-family on preflight
   */
  preflightHtml?: boolean;
  themeKey?: string;
}

export interface WebFontsOptions {
  /**
   * Provider service of the web fonts
   * @default 'local'
   */
  provider?: WebFontsProviders;

  /**
   * The fonts
   */
  fonts?: Record<string, WebFontMeta | string | (WebFontMeta | string)[]>;

  /**
   * Extend the theme object
   * @default true
   */
  extendTheme?: boolean;

  /**
    * Key for the theme object
    *
    * @default 'fontFamily'
    */
  themeKey?: string;

  /**
    * Inline CSS @import()
    *
    * @default true
    */
  inlineImports?: boolean;
}

export interface Provider {
  name: WebFontsProviders;
  getImportUrl?(fonts: WebFontMeta[]): string | undefined;
  getFontName(font: WebFontMeta): string;
}
