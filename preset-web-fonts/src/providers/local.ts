import type { Provider } from '../types';

export const LocalProvider: Provider = {
  name: 'local',
  getPreflight() {
    return '';
  },
  getFontName(font) {
    return font.name;
  },
};
