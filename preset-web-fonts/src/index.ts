import type { Preset } from '@unocss/core';
import type { WebFontMeta, WebFontsOptions, WebFontsProviders } from './types';

import { toArray } from '@vinicunca/js-utilities';

import { GoogleFontsProvider } from './providers/google';
import { LocalProvider } from './providers/local';

export * from './types';

const layerName = '__webfonts__';

export function normalizedFontMeta(
  { meta, defaultProvider, themeKey }:
  { meta: WebFontMeta | string; defaultProvider: WebFontsProviders; themeKey: string }): WebFontMeta {
  if (typeof meta !== 'string') {
    meta.provider = meta.provider ?? defaultProvider;
    meta.themeKey = themeKey;

    return meta;
  }

  const [name, weights = ''] = meta.split(':');
  return {
    name,
    weights: weights.split(/[,;]\s*/).filter(Boolean),
    provider: defaultProvider,
    themeKey,
  };
}

function getPreflightHtml({ fonts, themeKey, theme }: { fonts: WebFontMeta[]; themeKey: string; theme: any }) {
  const fontPreflightHtml = fonts.find((_font) => _font.preflightHtml);

  if (fontPreflightHtml) {
    const fontTheme = theme[themeKey][fontPreflightHtml.themeKey!];

    return `html {
      font-family: ${fontTheme};
    }`;
  }

  return '';
}

const providers = {
  google: GoogleFontsProvider,
  local: LocalProvider,
};

export function presetWebFonts(options: WebFontsOptions = {}): Preset<any> {
  const {
    provider: defaultProvider = 'local',
    extendTheme = true,
    inlineImports = true,
    themeKey = 'fontFamily',
  } = options;

  const fontObject = Object.fromEntries(
    Object.entries(options.fonts || {})
      .map(([name, meta]) => [name, toArray(meta).map((_meta) => normalizedFontMeta({ meta: _meta, defaultProvider, themeKey: name }))]),
  );

  const fonts = Object.values(fontObject).flatMap((_font) => _font);

  const importCache: Dictionary<string> = {};

  async function importUrl(url: string) {
    if (inlineImports) {
      if (!importCache[url]) {
        try {
          const { $fetch } = await import('ohmyfetch');
          importCache[url] = await $fetch(url, { headers: {} });
        } catch (e) {
          console.error('Failed to fetch web fonts');
          console.error(e);
          if (typeof process !== 'undefined' && process.env.CI) {
            throw e;
          }
        }
      }
      return importCache[url];
    } else {
      return `@import url('${url}')`;
    }
  }

  const preset: Preset<any> = {
    name: '@vinicunca/preset-web-fonts',
    layers: { [layerName]: -40 },
    preflights: [
      {
        async getCSS({ theme }) {
          const names = new Set(fonts.map((_font) => _font.provider || defaultProvider));
          const preflights: (string | undefined)[] = [];

          for (const name of names) {
            const fontsForProvider = fonts.filter((_font) => _font.provider === name);
            const provider = providers[name];

            if (provider.getImportUrl) {
              const url = provider.getImportUrl(fontsForProvider);
              if (url) {
                preflights.push(await importUrl(url));
              }
            }

            if (extendTheme) {
              preflights.push(getPreflightHtml({ fonts: fontsForProvider, themeKey, theme }));
            }
          }

          return preflights.filter(Boolean).join('\n');
        },
        layer: layerName,
      },
    ],
  };

  if (extendTheme) {
    preset.extendTheme = (theme) => {
      if (!theme[themeKey]) {
        theme[themeKey] = {};
      }
      const obj = Object.fromEntries(
        Object.entries(fontObject)
          .map(([name, fonts]) => [name, fonts.map((f) => providers[f.provider || defaultProvider].getFontName(f))]),
      );
      for (const key of Object.keys(obj)) {
        if (typeof theme[themeKey][key] === 'string') {
          theme[themeKey][key] = obj[key].map((i) => `${i},`).join('') + theme[themeKey][key];
        } else {
          theme[themeKey][key] = obj[key].join(',');
        }
      }
    };
  }

  return preset;
}
