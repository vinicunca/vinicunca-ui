import type { ParsedColorValue, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { toArray } from '@vinicunca/js-utilities';

import { handler } from './handlers';
import { colorOpacityToString, colorToString, getComponents, parseCssColor } from './colors';

/**
 * Obtain color from theme by camel-casing colors.
 */
function getThemeColor(theme: Theme, colors: string[]) {
  return theme.colors?.[
    colors.join('-').replace(/(-[a-z])/g, (n) => n.slice(1).toUpperCase())
  ];
}

/**
 * Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
 * See also color.tests.ts for more examples.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * '[rgb(100,2,3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
 *
 * @param {string} body - Color string to be parsed.
 * @param {Theme} theme - {@link Theme} object.
 * @return {ParsedColorValue|undefined}  {@link ParsedColorValue} object if string is parseable.
 */
export const parseColor = (body: string, theme: Theme): ParsedColorValue | undefined => {
  const split = body.split(/(?:\/|:)/);
  let main, opacity;
  if (split[0] === '[color') {
    main = split.slice(0, 2).join(':');
    opacity = split[2];
  } else {
    [main, opacity] = split;
  }

  const colors = main
    .replace(/([a-z])([0-9])/g, '$1-$2')
    .split(/-/g);
  const [name] = colors;

  if (!name) {
    return;
  }

  let color: string | undefined;
  const bracket = handler.bracketOfColor(main);
  const bracketOrMain = bracket || main;

  if (bracketOrMain.startsWith('#')) {
    color = bracketOrMain;
  } else if (bracketOrMain.startsWith('hex-')) {
    color = `#${bracketOrMain.slice(4)}`;
  } else if (main.startsWith('$')) {
    color = handler.cssvar(main);
  }

  color = color || bracket;

  let no = 'DEFAULT';
  if (!color) {
    let colorData;
    const [scale] = colors.slice(-1);
    if (scale.match(/^\d+$/)) {
      no = scale;
      colorData = getThemeColor(theme, colors.slice(0, -1));
    } else {
      colorData = getThemeColor(theme, colors);
      if (!colorData && colors.length <= 2) {
        [, no = no] = colors;
        colorData = getThemeColor(theme, [name]);
      }
    }

    if (typeof colorData === 'string') {
      color = colorData;
    } else if (no && colorData) {
      color = colorData[no];
    }
  }

  return {
    opacity,
    name,
    no,
    color,
    cssColor: parseCssColor(color),
    alpha: handler.bracket.cssvar.percent(opacity ?? ''),
  };
};

/**
 * Provide {@link DynamicMatcher} function to produce color value matched from rule.
 *
 * @see {@link parseColor}
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @example Resolving 'red-100' from theme:
 * colorResolver('background-color', 'background')('', 'red-100')
 * return { '--vin-background-opacity': '1', 'background-color': 'rgba(254,226,226,var(--vin-background-opacity))' }
 *
 * @example Resolving 'red-100/20' from theme:
 * colorResolver('background-color', 'background')('', 'red-100/20')
 * return { 'background-color': 'rgba(204,251,241,0.22)' }
 *
 * @example Resolving 'hex-124':
 * colorResolver('color', 'text')('', 'hex-124')
 * return { '--vin-text-opacity': '1', 'color': 'rgba(17,34,68,var(--vin-text-opacity))' }
 *
 * @param {string} property - Property for the css value to be created.
 * @param {string} varName - Base name for the opacity variable.
 * @return {@link DynamicMatcher} object.
 */
export function colorResolver(property: string, varName: string) {
  return ([_, body]: string[], { theme }: RuleContext<Theme>) => {
    const data = parseColor(body, theme);

    if (!data) {
      return;
    }

    const { alpha, color, cssColor } = data;

    if (cssColor) {
      if (alpha != null) {
        return {
          [property]: colorToString(cssColor, alpha),
        };
      } else {
        return {
          [`--vin-${varName}-opacity`]: colorOpacityToString(cssColor),
          [property]: colorToString(cssColor, `var(--vin-${varName}-opacity)`),
        };
      }
    } else if (color) {
      return {
        [property]: colorToString(color, alpha),
      };
    }
  };
}

export function colorableShadows(shadows: string | string[], colorVar: string) {
  const colored = [];
  shadows = toArray(shadows);
  for (let i = 0; i < shadows.length; i++) {
    // shadow values are between 3 to 6 terms including color
    const components = getComponents(shadows[i], ' ', 6);
    if (!components || components.length < 3) {
      return shadows;
    }
    const color = parseCssColor(components.pop());
    if (color == null) {
      return shadows;
    }
    colored.push(`${components.join(' ')} var(${colorVar}, ${colorToString(color)})`);
  }
  return colored;
}