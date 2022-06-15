import type { ComponentInfo, ComponentResolver } from 'unplugin-vue-components/index';

function resolveComponent(name: string): ComponentInfo | undefined {
  if (!name.match(/^V[A-Z]/)) {
    return;
  }

  return {
    name,
    from: 'vinicunca/es',
  };
}

export function VinicuncaResolver(): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: (name: string) => {
        return resolveComponent(name);
      },
    },
  ];
}
