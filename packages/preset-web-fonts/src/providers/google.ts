import type { Provider } from '../types';

export const GoogleFontsProvider: Provider = {
  name: 'google',
  getImportUrl(fonts) {
    const strings = fonts
      .filter((_font) => _font.provider === 'google')
      .map((_font) => {
        let name = _font.name.replace(/\s+/g, '+');
        if (_font.weights?.length) {
          let strWeight = _font.weights;

          if (Array.isArray(_font.weights)) {
            strWeight = _font.weights.sort().join(';');

            if (_font.italic) {
              strWeight = _font.weights.flatMap((_name) => [`0,${_name}`, `1,${_name}`]).sort().join(';');
              name += `:ital,wght@${strWeight}`;
            } else {
              name += `:wght@${strWeight}`;
            }
          } else {
            name += `:wght@${_font.weights}`;
          }
        }

        return `family=${name}`;
      }).join('&');
    return `https://fonts.googleapis.com/css2?${strings}&display=swap`;
  },
  getFontName(font) {
    return `"${font.name}"`;
  },
};
