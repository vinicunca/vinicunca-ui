import { resolve } from 'path';

const PACKAGE_JSON = 'package.json';

export const projRoot = resolve(__dirname, '..', '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const localeRoot = resolve(pkgRoot, 'locale');
export const directiveRoot = resolve(pkgRoot, 'directives');
export const vinRoot = resolve(pkgRoot, 'vinicunca');
export const utilRoot = resolve(pkgRoot, 'utils');
export const buildRoot = resolve(projRoot, 'internal', 'build');

// Docs
export const docsDirName = 'docs';
export const docRoot = resolve(projRoot, docsDirName);
export const vpRoot = resolve(docRoot, '.vitepress');

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist');
/** `/dist/vinicunca` */
export const vinOutput = resolve(buildOutput, 'vinicunca');

export const projPackage = resolve(projRoot, PACKAGE_JSON);
export const compPackage = resolve(compRoot, PACKAGE_JSON);
export const hookPackage = resolve(hookRoot, PACKAGE_JSON);
export const localePackage = resolve(localeRoot, PACKAGE_JSON);
export const directivePackage = resolve(directiveRoot, PACKAGE_JSON);
export const vinPackage = resolve(vinRoot, PACKAGE_JSON);
export const utilPackage = resolve(utilRoot, PACKAGE_JSON);
export const docPackage = resolve(docRoot, PACKAGE_JSON);
