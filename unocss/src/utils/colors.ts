import type { CSSColorValue, RGBAColorValue } from '@unocss/core';

import { escapeRegExp } from '@unocss/core';

/* eslint-disable no-case-declarations */

const CSS_COLOR_FUNCTIONS = ['hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'rgb', 'rgba'];
const ALPHA_PLACEHOLDERS = ['%alpha', '<alpha-value>'];
const RE_ALPHA_PLACEHOLDERS = new RegExp(ALPHA_PLACEHOLDERS.map((v) => escapeRegExp(v)).join('|'));

export function hex2rgba(hex = ''): RGBAColorValue | undefined {
  const color = parseHexColor(hex);
  if (color != null) {
    const { components, alpha } = color;
    if (alpha == null) {
      return components as [number, number, number];
    }
    return [...components, alpha] as [number, number, number, number];
  }
}

function parseHexColor(str: string): CSSColorValue | undefined {
  const [_, body] = str.match(/^#([\da-f]+)$/i) || [];
  if (!body) {
    return;
  }

  switch (body.length) {
    case 3:
    case 4:
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n) => (n << 4) | n);
      return {
        type: 'rgb',
        components: digits.slice(0, 3),
        alpha: body.length === 3
          ? undefined
          : Math.round(digits[3] / 255 * 100) / 100,
      };

    case 6:
    case 8:
      const value = Number.parseInt(body, 16);
      return {
        type: 'rgb',
        components: body.length === 6
          ? [(value >> 16) & 0xFF, (value >> 8) & 0xFF, value & 0xFF]
          : [(value >> 24) & 0xFF, (value >> 16) & 0xFF, (value >> 8) & 0xFF],
        alpha: body.length === 6
          ? undefined
          : Math.round((value & 0xFF) / 255 * 100) / 100,
      };
  }
}

export function colorToString(color: CSSColorValue | string, alphaOverride?: string | number) {
  if (typeof color === 'string') {
    return color.replace(RE_ALPHA_PLACEHOLDERS, `${alphaOverride ?? 1}`);
  }

  const { components } = color;
  let { alpha, type } = color;
  alpha = alphaOverride ?? alpha;
  type = type.toLowerCase();

  // Comma separated functions
  if (['hsla', 'hsl', 'rgba', 'rgb'].includes(type)) {
    const commaAlpha = `,${alpha}`;
    return `${type.replace('a', '')}a(${components.join(',')}${alpha == null ? '' : commaAlpha})`;
  }

  alpha = alpha == null ? '' : ` / ${alpha}`;
  if (CSS_COLOR_FUNCTIONS.includes(type)) {
    return `${type}(${components.join(' ')}${alpha})`;
  }
  return `color(${type} ${components.join(' ')}${alpha})`;
}

export function parseCssColor(str = ''): CSSColorValue | undefined {
  const color = parseColor(str);
  if (color == null || color === false) {
    return;
  }

  const { type: casedType, components, alpha } = color;
  const type = casedType.toLowerCase();

  if (components.length === 0) {
    return;
  }

  if (['rgba', 'hsla'].includes(type) && alpha == null) {
    return;
  }

  if (CSS_COLOR_FUNCTIONS.includes(type) && ![1, 3].includes(components.length)) {
    return;
  }

  return { type, components, alpha };
}

function parseColor(str: string) {
  if (!str) {
    return;
  }

  let color: CSSColorValue | false | undefined = parseHexColor(str);
  if (color != null) {
    return color;
  }

  color = cssColorKeyword(str);
  if (color != null) {
    return color;
  }

  color = parseCssCommaColorFunction(str);
  if (color != null) {
    return color;
  }

  color = parseCssSpaceColorFunction(str);
  if (color != null) {
    return color;
  }

  color = parseCssColorFunction(str);
  if (color != null) {
    return color;
  }
}

export function colorOpacityToString(color: CSSColorValue) {
  const alpha = color.alpha ?? 1;
  return typeof alpha === 'string' && ALPHA_PLACEHOLDERS.includes(alpha) ? 1 : alpha;
}

function cssColorKeyword(str: string): CSSColorValue | undefined {
  const color = {
    rebeccapurple: [102, 51, 153, 1],
  }[str];

  if (color != null) {
    return {
      type: 'rgb',
      components: color.slice(0, 3),
      alpha: color[3],
    };
  }
}

function parseCssCommaColorFunction(color: string): CSSColorValue | false | undefined {
  const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
  if (!match) {
    return;
  }

  const [, type, componentString] = match;
  // With min 3 (rgb) and max 4 (rgba), try to get 5 components
  const components = getComponents(componentString, ',', 5);
  if (components) {
    if ([3, 4].includes(components.length)) {
      return {
        type,
        components: components.slice(0, 3),
        alpha: components[3],
      };
    } else if (components.length !== 1) {
      return false;
    }
  }
}

const reCssColorFunctions = new RegExp(`^(${CSS_COLOR_FUNCTIONS.join('|')})\\((.+)\\)$`, 'i');
function parseCssSpaceColorFunction(color: string): CSSColorValue | undefined {
  const match = color.match(reCssColorFunctions);
  if (!match) {
    return;
  }

  const [, fn, componentString] = match;
  const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha,
    };
  }
}

function parseCssSpaceColorValues(componentString: string) {
  const components = getComponents(componentString);
  if (!components) {
    return;
  }

  let totalComponents = components.length;

  // (fn 1 2 3 / 4)
  if (components[totalComponents - 2] === '/') {
    return {
      components: components.slice(0, totalComponents - 2),
      alpha: components[totalComponents - 1],
    };
  }

  // (fn 1 2 3/ 4) or (fn 1 2 3 /4)
  if (components[totalComponents - 2] != null && (components[totalComponents - 2].endsWith('/') || components[totalComponents - 1].startsWith('/'))) {
    const removed = components.splice(totalComponents - 2);
    components.push(removed.join(' '));
    --totalComponents;
  }

  // maybe (fn 1 2 3/4)
  const withAlpha = getComponents(components[totalComponents - 1], '/', 3);
  if (!withAlpha) {
    return;
  }

  // without alpha
  if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === '') {
    return { components };
  }

  const alpha = withAlpha.pop();
  components[totalComponents - 1] = withAlpha.join('/');
  return {
    components,
    alpha,
  };
}

function parseCssColorFunction(color: string): CSSColorValue | undefined {
  const match = color.match(/^color\((.+)\)$/);
  if (!match) {
    return;
  }

  const parsed = parseCssSpaceColorValues(match[1]);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha,
    };
  }
}

function getComponent(str: string, separator: string) {
  str = str.trim();
  if (str === '') {
    return;
  }

  const l = str.length;
  let parenthesis = 0;
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case '(':
        parenthesis++;
        break;

      case ')':
        if (--parenthesis < 0) {
          return;
        }
        break;

      case separator:
        if (parenthesis === 0) {
          const component = str.slice(0, i).trim();
          if (component === '') {
            return;
          }

          return [
            component,
            str.slice(i + 1).trim(),
          ];
        }
    }
  }

  return [
    str,
    '',
  ];
}

export function getComponents(str: string, separator?: string, limit?: number) {
  separator = separator ?? ' ';
  if (separator.length !== 1) {
    return;
  }
  limit = limit ?? 10;
  const components = [];
  let i = 0;
  while (str !== '') {
    if (++i > limit) {
      return;
    }
    const componentPair = getComponent(str, separator);
    if (!componentPair) {
      return;
    }
    const [component, rest] = componentPair;
    components.push(component);
    str = rest;
  }
  if (components.length > 0) {
    return components;
  }
}
