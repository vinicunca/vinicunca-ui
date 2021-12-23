import {
  defineComponent as _defineComponent,
  getCurrentInstance,
  shallowReactive,
  toRaw,
  watchEffect,
} from 'vue';
import { toKebabCase } from '@praburangki/web-utilities';

import { useDefaults } from '../composables/defaults.composable';
import { consoleWarn } from './console.util';

// Types
import type { ComponentOptions, VNode } from 'vue';

function propIsDefined({ vnode, prop }: { vnode: VNode; prop: string }) {
  return vnode.props?.hasOwnProperty(prop) || vnode.props?.hasOwnProperty(toKebabCase(prop));
}

export const defineComponent = function defineComponent(options: ComponentOptions) {
  options._setup = options._setup ?? options.setup;

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');

    return options;
  }

  if (options._setup) {
    options.setup = function setup(props: Dictionary<any>, ctx) {
      const vm = getCurrentInstance()!;
      const defaults = useDefaults();

      const _props = shallowReactive({ ...toRaw(props) });
      watchEffect(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[options.name!];

        for (const prop of Object.keys(props)) {
          let newVal;

          if (propIsDefined({ vnode: vm.vnode, prop })) {
            newVal = props[prop];
          } else {
            newVal = componentDefaults?.[prop] ?? globalDefaults?.[prop] ?? props[prop];
          }
          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });

      return options._setup(_props, ctx);
    };
  }

  return options;
} as unknown as typeof _defineComponent;
