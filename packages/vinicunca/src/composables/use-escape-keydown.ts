import { onBeforeUnmount, onMounted } from 'vue';
import { KEY_CODES, isBrowser } from '@vinicunca/js-utilities';

let registeredEscapeHandlers: ((event: KeyboardEvent) => void)[] = [];

export function useEscapeKeydown(handler: (event: KeyboardEvent) => void) {
  function cachedHandler(_event: KeyboardEvent) {
    if (_event.key === KEY_CODES.ESC) {
      registeredEscapeHandlers.forEach((registeredHandler) =>
        registeredHandler(_event),
      );
    }
  }

  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler);
    }
    if (isBrowser) {
      registeredEscapeHandlers.push(handler);
    }
  });

  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler,
    );

    if (registeredEscapeHandlers.length === 0 && isBrowser) {
      document.removeEventListener('keydown', cachedHandler);
    }
  });
}
