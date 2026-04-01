import type { ReactElement, ReactNode, Ref } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipPointerPosition = 'start' | 'center' | 'end';

export type ReactElementWithRef<T = unknown> = ReactElement & {
  ref?: Ref<T> | null;
};

export interface TooltipProps {
  /**
   * The target element that triggers the tooltip on hover or focus.
   */
  children: ReactElement;
  /**
   * The string or interactive React node to display inside the tooltip body.
   */
  content: ReactNode;
  /**
   * Standard position directive around the target element.
   * @default "top"
   */
  position?: TooltipPosition | undefined;
  /**
   * Controls where the pointer sits along the active edge.
   * Useful for matching design variants that need pointer start/end alignment.
   * @default "center"
   */
  pointerPosition?: TooltipPointerPosition | undefined;
  /**
   * By default, tooltips let the mouse pass through them (pointer-events: none).
   * If true, enables pointer events so links or buttons inside the tooltip can be clicked.
   * @default false
   */
  interactive?: boolean | undefined;
  /**
   * Toggles the rendering of the small directional pointer arrow pointing back to the target.
   * @default true
   */
  showPointer?: boolean | undefined;
  /**
   * Standard custom class name overrides.
   */
  className?: string | undefined;
}
