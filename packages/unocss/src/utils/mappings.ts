export const GLOBAL_KEYWORDS = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
];

export const DIRECTION_MAP: Dictionary<string[]> = {
  'l': ['-left'],
  'r': ['-right'],
  't': ['-top'],
  'b': ['-bottom'],
  's': ['-inline-start'],
  'e': ['-inline-end'],
  'x': ['-left', '-right'],
  'y': ['-top', '-bottom'],
  '': [''],
  'bs': ['-block-start'],
  'be': ['-block-end'],
  'is': ['-inline-start'],
  'ie': ['-inline-end'],
  'block': ['-block-start', '-block-end'],
  'inline': ['-inline-start', '-inline-end'],
};

export const INSET_MAP: Dictionary<string[]> = {
  ...DIRECTION_MAP,
  s: ['-inset-inline-start'],
  e: ['-inset-inline-end'],
  bs: ['-inset-block-start'],
  be: ['-inset-block-end'],
  is: ['-inset-inline-start'],
  ie: ['-inset-inline-end'],
  block: ['-inset-block-start', '-inset-block-end'],
  inline: ['-inset-inline-start', '-inset-inline-end'],
};

export const CORNER_MAP: Dictionary<string[]> = {
  'l': ['-top-left', '-bottom-left'],
  'r': ['-top-right', '-bottom-right'],
  't': ['-top-left', '-top-right'],
  'b': ['-bottom-left', '-bottom-right'],
  'tl': ['-top-left'],
  'lt': ['-top-left'],
  'tr': ['-top-right'],
  'rt': ['-top-right'],
  'bl': ['-bottom-left'],
  'lb': ['-bottom-left'],
  'br': ['-bottom-right'],
  'rb': ['-bottom-right'],
  '': [''],
  'bs': ['-start-start', '-start-end'],
  'be': ['-end-start', '-end-end'],
  'is': ['-end-start', '-start-start'],
  'ie': ['-start-end', '-end-end'],
  'bs-is': ['-start-start'],
  'is-bs': ['-start-start'],
  'bs-ie': ['-start-end'],
  'ie-bs': ['-start-end'],
  'be-is': ['-end-start'],
  'is-be': ['-end-start'],
  'be-ie': ['-end-end'],
  'ie-be': ['-end-end'],
};

const BASE_POSITION_MAP = [
  'top',
  'top center',
  'top left',
  'top right',
  'bottom',
  'bottom center',
  'bottom left',
  'bottom right',
  'left',
  'left center',
  'left top',
  'left bottom',
  'right',
  'right center',
  'right top',
  'right bottom',
  'center',
  'center top',
  'center bottom',
  'center left',
  'center right',
  'center center',
];

export const POSITION_MAP: Dictionary<string> = Object.assign(
  {},

  // [{ top: 'top' }, { 'top-center': 'top center' }, ...]
  ...BASE_POSITION_MAP.map((p) => ({ [p.replace(/ /, '-')]: p })),

  // [{ t: 'top' }, { tc: 'top center' }, ...]
  ...BASE_POSITION_MAP.map((p) => ({ [p.replace(/\b(\w)\w+/g, '$1').replace(/ /, '')]: p })),
);

export const XYZ_MAP: Dictionary<string[]> = {
  'x': ['-x'],
  'y': ['-y'],
  'z': ['-z'],
  '': ['-x', '-y'],
};
