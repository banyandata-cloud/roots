import { arrow, autoUpdate, flip, offset, shift } from '@floating-ui/react-dom';
import {
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import React, { cloneElement, forwardRef, useRef, useState, type ReactElement, type RefObject } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { classes } from '../../../utils';
import { Popper } from '../../popper';
import { Text } from '../text';
import styles from './Tooltip.module.css';
import type { TooltipPosition, TooltipProps } from './types';

// V1 types usually export ReactElementWithRef, we define here just in case:
type ReactElementWithRef<T = unknown> = ReactElement & { ref?: React.Ref<T> | null };

export const Tooltip = forwardRef<RefObject<HTMLElement>, TooltipProps>((props, propRef) => {
  const {
    children,
    position = 'top',
    content,
    interactive = false,
    className = '',
    showPointer = true,
  } = props;

  const arrowEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    middlewareData,
    placement,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(showPointer ? 12 : 8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowEl }),
    ],
  });

  // Adding a slight delay on close if interactive makes bridging the arrow gap much easier for the mouse cursor natively.
  const hover = useHover(context, {
    move: true,
    delay: { open: 0, close: interactive ? 150 : 0 }
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const typedChildren = children as ReactElementWithRef;
  const childrenRef = typedChildren.ref;

  const ref = React.useMemo(() => {
    return mergeRefs([reference, childrenRef, propRef]);
  }, [reference, childrenRef, propRef]);

  const clonedChildren = cloneElement(
    children,
    getReferenceProps({
      ref,
      ...(typedChildren.props as object),
    })
  );

  const side = (placement || position).split('-')[0] as TooltipPosition;
  const staticSideMapping: Record<TooltipPosition, string> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };
  const staticSide = staticSideMapping[side];

  return (
    <>
      {clonedChildren}
      <Popper
        open={open && content != null}
        backdrop={false}
        lockScroll={false}
        wrapperId="v2-tooltip-portal"
      >
        <AnimatePresence>
          {open && content != null && (
            <motion.div
              {...getFloatingProps({
                ref: floating,
                className: classes(styles.tooltip, interactive ? styles.interactive : '', className),
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  zIndex: 1050,
                },
              })}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {showPointer && (
                <div
                  className={styles.arrow}
                  ref={arrowEl}
                  style={{
                    left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                    top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-4px', // Shift it precisely halfway out of the tooltip edge
                  }}
                />
              )}
              {typeof content === 'string' ? (
                <Text className={styles.textContent}>{content}</Text>
              ) : (
                content
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Popper>
    </>
  );
});

Tooltip.displayName = 'Tooltip';
