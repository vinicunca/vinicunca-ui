import path from 'path';
import fs from 'fs-extra';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';

function buildCss() {
  const inputPath = path.join(__dirname, 'styles', 'index.css');
  const outputPath = 'dist/index.css';
  const input = fs.readFileSync(inputPath);

  postcss([postcssImport, cssnano])
    .process(input, { from: inputPath })
    .then((res) => {
      fs.outputFileSync(outputPath, res.css);
    });
}

buildCss();
