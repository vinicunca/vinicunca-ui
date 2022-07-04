import type { vinPropKey } from './runtime';
import type { ExtractPropTypes, PropType } from 'vue';
import type { IfNever, UnknownToNever, WritableArray } from './util';

type Value<T> = T[keyof T];

/**
 * Extract the type of a single prop
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 */
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T;
  }>
>;

/**
 * Extracts types via `ExtractPropTypes`, accepting `PropType<T>`, `XXXConstructor`, `never`...
 *
 *
 * @example
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 **/
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>;
    required: true;
  }>
>;

/**
 * Merge Type, Value, Validator types
 *
 * @example
 * VinPropMergeType<StringConstructor, '1', 1> =>  1 | "1" // ignores StringConstructor
 * VinPropMergeType<StringConstructor, never, number> =>  string | number
 */
export type VinPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>;

/**
 * Handling default values for input (constraints)
 */
export type VinPropInputDefault<
  Required extends boolean,
  Default,
> = Required extends true
  ? never
  : Default extends Dictionary | Array<any>
    ? () => Default
    : (() => Default) | Default;

/**
 * Native prop types, e.g: `BooleanConstructor`, `StringConstructor`, `null`, `undefined`, etc.
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null;
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N;

/**
 * input prop `buildProp` or `buildProps` (constraints)
 *
 * @example
 * VinPropInput<StringConstructor, 'a', never, never, true>
 * ⬇️
 * {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
 */
export interface VinPropInput<
  Type,
  Value,
  Validator,
  Default extends VinPropMergeType<Type, Value, Validator>,
  Required extends boolean,
> {
  type?: Type;
  required?: Required;
  values?: readonly Value[];
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean);
  default?: VinPropInputDefault<Required, Default>;
}

/**
 * output prop `buildProp` or `buildProps`.
 *
 * @example
 * VinProp<'a', 'b', true>
 * ⬇️
 * {
    readonly type: PropType<"a">;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly default: "b";
    __epPropKey: true;
  }
 */
export type VinProp<Type, Default, Required> = {
  readonly type: PropType<Type>;
  readonly required: [Required] extends [true] ? true : false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  [vinPropKey]: true;
} & IfNever<Default, unknown, { readonly default: Default }>;

/**
 * Determine if it is `VinProp`
 */
export type IfVinProp<T, Y, N> = T extends { [vinPropKey]: true } ? Y : N;

/**
 * Converting input to output.
 */
export type VinPropConvert<Input> = Input extends VinPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? VinPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never;

/**
 * Finalized conversion output
 */
export type VinPropFinalized<Type, Value, Validator, Default, Required> = VinProp<
  VinPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>;

export {};
