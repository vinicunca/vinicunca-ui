import { vinOutput } from '@vinicunca/build-utils';
import { defineBuildConfig } from 'unbuild';

const isDev = process.env.UNBUILD_ENV === 'dev';

const outputDir = `${vinOutput}/unplugin-vue-components`;

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    emitCJS: true,
  },

  outDir: isDev ? 'dist' : outputDir,

  externals: ['unplugin-vue-components'],
});
