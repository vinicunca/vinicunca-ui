import path from 'path';

// import { projRoot } from '@vinicunca/build-utils';
// import DefineOptions from 'unplugin-vue-define-options/vite';
import { defineNuxtConfig } from 'nuxt';
import VinicuncaModule from '@vinicunca/nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    path.resolve('../packages/unocss/styles/reset.css'),
  ],

  modules: [
    VinicuncaModule,
    '@nuxt/content',
  ],

  vinicunca: {
    unocss: {
      theme: {
        maxWidth: {
          '8xl': '90rem',
        },
      },
    },

    presetConfig: {
      brands: {
        primary: '#1976d2',
        secondary: '#9c27b0',
        success: '#2e7d32',
        info: '#0288d1',
        warning: '#ed6c02',
        danger: '#d32f2f',
      },
    },

    presetWebFonts: {
      provider: 'google',
      fonts: {
        'sans': [
          {
            name: 'Inter',
            weights: '100..900',
            preflightHtml: true,
          },
        ],
        'mono': [
          {
            name: 'Fira Code',
            weights: '300..700',
          },
        ],
        'source': [
          {
            name: 'Source Sans Pro',
            weights: [400],
          },
        ],
        'ubuntu-mono': [
          {
            name: 'Ubuntu Mono',
            weights: [700],
          },
        ],
      },
    },
  },

  // vite: {
  //   resolve: {
  //     alias: [
  //       {
  //         find: /^vinicunca(\/(es|lib))?$/,
  //         replacement: path.resolve(projRoot, 'packages/vinicunca/index.ts'),
  //       },
  //       {
  //         find: /^vinicunca\/(es|lib)\/(.*)$/,
  //         replacement: `${path.resolve(projRoot, 'packages')}/$2`,
  //       },
  //     ],
  //   },

  //   plugins: [
  //     DefineOptions(),
  //   ],
  // },
});
