import type { PropType } from 'vue';
import type {
  IfNativePropType,
  IfVinProp,
  NativePropType,
  VinProp,
  VinPropConvert,
  VinPropFinalized,
  VinPropInput,
  VinPropMergeType,
} from './types';

import { warn } from 'vue';
import { hasOwn, isObject } from '@vinicunca/js-utilities';

export const vinPropKey = '__vinPropKey';

export const definePropType = <T>(val: any): PropType<T> => val;

export function isVinProp(val: unknown): val is VinProp<any, any, any> {
  return isObject(val) && !!(val as any)[vinPropKey];
}

/**
 * @description Build prop. It can better optimize prop types
 * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
 */
export function buildProp<
  Type = never,
  Value = never,
  Validator = never,
  Default extends VinPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false,
>(
  prop: VinPropInput<Type, Value, Validator, Default, Required>,
  key?: string,
): VinPropFinalized<Type, Value, Validator, Default, Required> {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isVinProp(prop)) {
    return prop as any;
  }

  const { values, required, default: defaultValue, type, validator } = prop;

  const _validator
    = values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowedValues: unknown[] = [];

          if (values) {
            allowedValues = Array.from(values);
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue);
            }
            valid ||= allowedValues.includes(val);
          }
          if (validator) {
            valid ||= validator(val);
          }

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ');

            const msgKey = key ? ` for prop "${key}"` : '';

            warn(
              `
                Invalid prop: validation failed${msgKey}.
                Expected one of [${allowValuesText}],
                got value ${JSON.stringify(val)}.
              `,
            );
          }

          return valid;
        }
      : undefined;

  const vinProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [vinPropKey]: true,
  };

  if (hasOwn(prop, 'default')) {
    vinProp.default = defaultValue;
  }

  return vinProp;
}

export function buildProps<
  Props extends Dictionary<
    | { [vinPropKey]: true }
    | NativePropType
    | VinPropInput<any, any, any, any, any>
  >,
>(props: Props): {
  [K in keyof Props]: IfVinProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], VinPropConvert<Props[K]>>
  >
} {
  return Object.fromEntries(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ]),
  ) as any;
}
