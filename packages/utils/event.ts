export function composeEventHandlers<Event>(
  { external, internal }:
  {
    external?: (event: Event) => boolean | void;
    internal?: (event: Event) => void;
  },
) {
  return (event: Event) => {
    const shouldPrevent = external?.(event);

    if (!shouldPrevent) {
      return internal?.(event);
    }
  };
}
