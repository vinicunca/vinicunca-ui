import { program } from 'commander';
import { errorAndExit } from '@vinicunca/node-utils';
import { build } from '@vinicunca/build';

import { version } from '../package.json';

program.name('Vinicunca CLI').version(version);

program
  .command('build [packageName]')
  .description('build package')
  .action((name: string) => build(name).catch((err) => errorAndExit(err)));

program.parse(process.argv);

export * from '@vinicunca/build';
