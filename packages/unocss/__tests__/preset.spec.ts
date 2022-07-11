import { createGenerator, escapeSelector } from 'unocss';
import { describe, expect, test } from 'vitest';

import { presetVinicunca } from '../src/presets/core';
import { presetVinicuncaNonTargets, presetVinicuncaTargets } from './assets/preset-vinicunca-targets';

const uno = createGenerator({
  presets: [
    presetVinicunca({
      brands: {
        primary: '#1976d2',
        secondary: '#9c27b0',
        success: '#2e7d32',
        info: '#0288d1',
        warning: '#ed6c02',
        danger: '#d32f2f',
      },
    }),
  ],
  theme: {
    colors: {
      custom: {
        a: 'var(--custom)',
        b: 'rgba(var(--custom), %alpha)',
      },
      a: {
        b: {
          c: '#514543',
        },
        camelCase: '#234',
      },
    },
  },
});

describe('preset-core', () => {
  test('preflight', async () => {
    const { css } = await uno.generate('');
    expect(css).toMatchSnapshot();
  });

  test('targets', async () => {
    const code = presetVinicuncaTargets.join(' ');
    const { css } = await uno.generate(code);
    const { css: css2 } = await uno.generate(code);

    const unmatched = [];
    for (const i of presetVinicuncaTargets) {
      if (!css.includes(escapeSelector(i))) {
        unmatched.push(i);
      }
    }
    expect(unmatched).toEqual([]);
    expect(css).toMatchSnapshot();
    expect(css).toEqual(css2);
  });

  test('custom var prefix', async () => {
    const uno = createGenerator({
      presets: [
        presetVinicunca({
          variablePrefix: 'hi-',
        }),
      ],
    });

    const { css } = await uno.generate([
      'text-opacity-50',
      'text-red',
      'scale-100',
    ].join(' '), { preflights: false });

    expect(css).toMatchSnapshot();
  });

  test.skip('nested theme colors', async () => {
    const { css, matched } = await uno.generate([
      'text-a-b-c',
      'text-a-camel-case',
      'bg-a-b-c',
    ], { preflights: false });

    expect(css).toMatchSnapshot('');
    expect(matched.size).toBe(3);
  });

  test.skip('none targets', async () => {
    const { css, matched } = await uno.generate(new Set(presetVinicuncaNonTargets), { minify: true, preflights: false });

    expect(css).toMatchInlineSnapshot('".border-danger{border-color:var(--vin-brand-danger);}.border-info{border-color:var(--vin-brand-info);}.border-primary{border-color:var(--vin-brand-primary);}.border-secondary{border-color:var(--vin-brand-secondary);}.border-success{border-color:var(--vin-brand-success);}.border-warning{border-color:var(--vin-brand-warning);}.bg-danger,.hover\\\\:bg-danger:hover{background-color:var(--vin-brand-danger);}.bg-info,.hover\\\\:bg-info:hover{background-color:var(--vin-brand-info);}.bg-primary,.hover\\\\:bg-primary:hover{background-color:var(--vin-brand-primary);}.bg-secondary,.hover\\\\:bg-secondary:hover{background-color:var(--vin-brand-secondary);}.bg-success,.hover\\\\:bg-success:hover{background-color:var(--vin-brand-success);}.bg-warning,.hover\\\\:bg-warning:hover{background-color:var(--vin-brand-warning);}.text-danger{color:var(--vin-brand-danger);}.text-info{color:var(--vin-brand-info);}.text-primary{color:var(--vin-brand-primary);}.text-secondary{color:var(--vin-brand-secondary);}.text-success{color:var(--vin-brand-success);}.text-warning{color:var(--vin-brand-warning);}.shadow-danger{--vin-shadow-color:var(--vin-brand-danger);}.shadow-info{--vin-shadow-color:var(--vin-brand-info);}.shadow-primary{--vin-shadow-color:var(--vin-brand-primary);}.shadow-secondary{--vin-shadow-color:var(--vin-brand-secondary);}.shadow-success{--vin-shadow-color:var(--vin-brand-success);}.shadow-warning{--vin-shadow-color:var(--vin-brand-warning);}"');
    expect([...matched]).toEqual([]);
  });
});
