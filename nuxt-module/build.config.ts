import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/module',
  ],
  rollup: {
    emitCJS: true,
  },
  clean: true,
  declaration: true,
  externals: [
    '@nuxt/schema',
    '@vinicunca/unocss',
  ],
});
