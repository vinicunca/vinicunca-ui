import type { Ref } from 'vue';

/**
 * Any function
 */
export type Fn = () => void;

/**
 * Maybe it's a ref, or not.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>;
