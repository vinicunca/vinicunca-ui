import { vinOutput } from '@vinicunca/build-utils';
import { defineBuildConfig } from 'unbuild';

const isDev = process.env.UNBUILD_ENV === 'dev';

const outputDir = `${vinOutput}/unocss`;

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },

  outDir: isDev ? 'dist' : outputDir,
});
