import { arrow, autoUpdate, flip, offset, shift } from '@floating-ui/react-dom';
import {
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
} from '@floating-ui/react-dom-interactions';
import { motion } from 'framer-motion';
import React, {
	cloneElement,
	forwardRef,
	useRef,
	useState,
	type ReactElement,
	type RefObject,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { classes } from '../../utils';
import { Popper } from '../popper';
import styles from './Tooltip.module.css';
import type { ReactElementWithRef, TooltipPosition, TooltipProps } from './types';

/**
 * Tooltip - A tooltip component to be used as a wrapper to show the customised tooltip for the component
 *
 * @returns A React component
 *
 * @example
 * ```tsx
 * <Tooltip
 *   position='top'
 *   showPointer={false}
 *   content="Hello"
 * >
 *   <div>Some Element</div>
 * </Tooltip>
 * ```
 */
const Tooltip = forwardRef<RefObject<HTMLElement>, TooltipProps>((props, propRef): ReactElement => {
	const {
		children,
		position = 'top',
		content,
		variant = 'light',
		className = '',
		showPointer = true,
	} = props;

	const arrowEl = useRef(null);

	const [open, setOpen] = useState(false);

	const {
		x,
		y,
		reference,
		floating,
		strategy,
		context,
		middlewareData,
		placement = 'top',
	} = useFloating({
		open,
		onOpenChange: setOpen,
		placement: position,
		whileElementsMounted: autoUpdate, // Make sure the tooltip stays on the screen
		middleware: [
			offset(12),
			flip(),
			shift(),
			arrow({
				element: arrowEl,
			}),
		],
	});

	// Event listeners to change the open state
	const hover = useHover(context, {
		move: true,
	});

	const focus = useFocus(context);
	const dismiss = useDismiss(context);

	// Role props for screen readers
	const role = useRole(context, {
		role: 'tooltip',
	});

	// Merge all the interactions into prop getters
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

	const typedChildren = children as ReactElementWithRef;

	const { ref: childrenRef } = typedChildren;

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

	const side = placement.split('-')[0] as TooltipPosition;

	const { [side]: staticSide }: Record<TooltipPosition, TooltipPosition> = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
	};

	return (
		<>
			{/* Wrapping */}
			{clonedChildren}
			<Popper open={open && content != null} backdrop={false} wrapperId='tooltip'>
				<motion.div
					{...getFloatingProps({
						ref: floating,
						className: classes(styles.tooltip, styles[variant], className),
						style: {
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
							zIndex: 100,
						},
					})}
					initial={{
						opacity: 0,
						scale: 0,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}>
					{showPointer && (
						<div
							className={styles.arrow}
							ref={arrowEl}
							style={{
								left: middlewareData.arrow?.x ?? '',
								top: middlewareData.arrow?.y ?? '',
								right: '',
								bottom: '',
								[staticSide]: '-0.3rem',
							}}
						/>
					)}
					{content}
				</motion.div>
			</Popper>
		</>
	);
});

export default Tooltip;
