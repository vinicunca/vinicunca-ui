import type { ProjectManifest } from '@pnpm/types';

import findWorkspacePackages from '@pnpm/find-workspace-packages';

import { projRoot } from './paths';

export function getWorkspacePackages() {
  return findWorkspacePackages(projRoot);
}

export async function getWorkspaceNames(dir = projRoot) {
  const pkgs = await findWorkspacePackages(projRoot);

  return pkgs
    .filter((pkg) => pkg.dir.startsWith(dir))
    .map((pkg) => pkg.manifest.name)
    .filter((name): name is string => !!name);
}

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
}

export function getPackageDependencies(
  pkgPath: string,
): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
}

export function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist', 'nuxt', 'unocss', 'unplugin-vue-components', 'vinicuncax', 'vueuse'];
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude)),
  );
}
