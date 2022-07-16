import type { FocusTrapInjectionContext } from '@vinicunca/components/focus-trap';
import type { InjectionKey, Ref } from 'vue';
import type { ConfigProviderContext } from './config-provider';
import type { DialogContext } from './dialog';
import type { IDContext } from '@vinicunca/composables';
import type { ScrollbarContext } from './scrollbar';
import type { TooltipContentContext, TooltipContext } from './tooltip';

export const INJECTION_FOCUS_TRAP: InjectionKey<FocusTrapInjectionContext>
  = Symbol('INJECTION_FOCUS_TRAP');

export const INJECTION_CONFIG_PROVIDER: InjectionKey<Ref<ConfigProviderContext>> = Symbol('INJECTION_CONFIG_PROVIDER');

export const INJECTION_DIALOG: InjectionKey<DialogContext> = Symbol('INJECTION_DIALOG');

export const INJECTION_ID: InjectionKey<IDContext> = Symbol('INJECTION_ID');

export const INJECTION_SCROLLBAR: InjectionKey<ScrollbarContext> = Symbol('INJECTION_SCROLLBAR');

export const INJECTION_TOOLTIP_ROOT: InjectionKey<TooltipContext> = Symbol('INJECTION_TOOLTIP_ROOT');

export const INJECTION_TOOLTIP_CONTENT: InjectionKey<TooltipContentContext> = Symbol('INJECTION_TOOLTIP_CONTENT');
