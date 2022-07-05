import { NOOP } from '@vinicunca/js-utilities';

export function useSameTarget(handleClick?: (event: MouseEvent) => void) {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }

  /**
   * events fired in the order: mousedown -> mouseup -> click.
   * we need to set the mousedown handle to false after click fired.
   * @link https://javascript.info/mouse-events-basics
   */
  let mousedownTarget = false;
  let mouseupTarget = false;

  const onClick = (event: MouseEvent) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(event);
    }

    mousedownTarget = mouseupTarget = false;
  };

  const onMousedown = (event: MouseEvent) => {
    mousedownTarget = event.target === event.currentTarget;
  };

  const onMouseup = (event: MouseEvent) => {
    mouseupTarget = event.target === event.currentTarget;
  };

  return { onClick, onMousedown, onMouseup };
}
