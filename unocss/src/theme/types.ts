export interface ThemeAnimation {
  keyframes?: Dictionary<string>;
  durations?: Dictionary<string>;
  timingFns?: Dictionary<string>;
  properties?: Dictionary<object>;
  counts?: Dictionary<string | number>;
}

export interface Theme {
  width?: Dictionary<string>;
  height?: Dictionary<string>;
  maxWidth?: Dictionary<string>;
  maxHeight?: Dictionary<string>;
  minWidth?: Dictionary<string>;
  minHeight?: Dictionary<string>;
  inlineSize?: Dictionary<string>;
  blockSize?: Dictionary<string>;
  maxInlineSize?: Dictionary<string>;
  maxBlockSize?: Dictionary<string>;
  minInlineSize?: Dictionary<string>;
  minBlockSize?: Dictionary<string>;
  borderRadius?: Dictionary<string>;
  breakpoints?: Dictionary<string>;
  verticalBreakpoints?: Dictionary<string>;
  colors?: Dictionary<string | Dictionary<string>>;
  fontFamily?: Dictionary<string>;
  fontSize?: Dictionary<[string, string]>;
  lineHeight?: Dictionary<string>;
  letterSpacing?: Dictionary<string>;
  wordSpacing?: Dictionary<string>;
  boxShadow?: Dictionary<string | string[]>;
  textIndent?: Dictionary<string>;
  textShadow?: Dictionary<string | string[]>;
  textStrokeWidth?: Dictionary<string>;
  ringWidth?: Dictionary<string>;
  lineWidth?: Dictionary<string>;
  spacing?: Dictionary<string>;
  duration?: Dictionary<string>;
  // filters
  blur?: Dictionary<string>;
  dropShadow?: Dictionary<string | string[]>;
  // transitions
  easing?: Dictionary<string>;
  // media queries
  media?: Dictionary<string>;
  // animation
  animation?: ThemeAnimation;
  // grids
  gridAutoColumn?: Dictionary<string>;
  gridAutoRow?: Dictionary<string>;
  gridColumn?: Dictionary<string>;
  gridRow?: Dictionary<string>;
  gridTemplateColumn?: Dictionary<string>;
  gridTemplateRow?: Dictionary<string>;
  // container
  container?: {
    center?: boolean;
  };
  // vars
  /** Used to generate CSS variables placeholder in preflight */
  preflightBase?: Dictionary<string | number>;
}
