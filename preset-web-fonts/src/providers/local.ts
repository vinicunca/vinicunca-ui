import type { Provider } from '../types';

export const LocalProvider: Provider = {
  name: 'local',
  getFontName(font) {
    return font.name;
  },
};
