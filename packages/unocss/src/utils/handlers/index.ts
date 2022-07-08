/// <reference types="@unocss/core" />

import { createValueHandler } from 'unocss';

import * as valueHandlers from './handlers';

export const handler = createValueHandler(valueHandlers);

export { valueHandlers };
