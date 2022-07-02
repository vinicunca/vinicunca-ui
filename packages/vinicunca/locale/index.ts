export { default as en } from './lang/en';

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair;
}

export interface Language {
  name: string;
  el: TranslatePair;
}
