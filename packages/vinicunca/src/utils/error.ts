import { isString } from '@vinicunca/js-utilities';

class VinicuncaError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'VinicuncaError';
  }
}

export function throwError(scope: string, m: string): never {
  throw new VinicuncaError(`[${scope}] ${m}`);
}

export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new VinicuncaError(`[${scope}] ${message}`)
      : scope;

    console.warn(error);
  }
}
