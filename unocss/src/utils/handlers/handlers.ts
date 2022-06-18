import { escapeSelector } from '@unocss/core';

function round(n: number) {
  return n.toFixed(10).replace(/\.0+$/, '').replace(/(\.\d+?)0+$/, '$1');
}

export function percent(str: string) {
  if (str.endsWith('%')) {
    str = str.slice(0, -1);
  }
  const num = parseFloat(str);
  if (!Number.isNaN(num)) {
    return `${round(num / 100)}`;
  }
}

const RE_BRACKET_TYPE = /^\[(color|length|position):/i;
function bracketWithType(str: string, type?: string) {
  if (str && str.startsWith('[') && str.endsWith(']')) {
    let base: string | undefined;

    const match = str.match(RE_BRACKET_TYPE);
    if (!match) {
      base = str.slice(1, -1);
    } else if (type && match[1] === type) {
      base = str.slice(match[0].length, -1);
    }

    if (base !== undefined) {
      return base
        .replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, '\\_'))
        .replace(/([^\\])_/g, '$1 ')
        .replace(/calc\((.*)/g, (v) => {
          return v.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, '$1 $2 ');
        });
    }
  }
}

export function bracket(str: string) {
  return bracketWithType(str);
}

export function bracketOfColor(str: string) {
  return bracketWithType(str, 'color');
}

export function cssvar(str: string) {
  if (str.match(/^\$\S/)) {
    return `var(--${escapeSelector(str.slice(1))})`;
  }
}
