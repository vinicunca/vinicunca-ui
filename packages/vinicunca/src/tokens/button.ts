import type { InjectionKey } from 'vue';
import type { ButtonProps } from '~/components/button';

export interface ButtonGroupContext {
  type?: ButtonProps['type'];
}

export const INJECTION_KEY_BUTTON_GROUP: InjectionKey<ButtonGroupContext> = Symbol(
  'INJECTION_KEY_BUTTON_GROUP',
);
