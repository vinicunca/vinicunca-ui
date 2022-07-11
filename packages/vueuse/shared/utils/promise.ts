interface Params {
  ms: number;
  throwOnTimeout?: boolean;
  reason?: string;
}

export function promiseTimeout(options: Params): Promise<void> {
  const { ms, throwOnTimeout = false, reason = 'Timeout' } = options;

  return new Promise((resolve, reject) => {
    if (throwOnTimeout) {
      setTimeout(() => reject(reason), ms);
    } else {
      setTimeout(resolve, ms);
    }
  });
}
