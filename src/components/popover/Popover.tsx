import {
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { useEffect, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { classes } from '../../utils';
import { Popper } from '../popper';
import styles from './Popover.module.css';

type Placement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end';

type Theme = 'light' | 'dark';

interface MiddlewareOptions {
	offset?: Record<string, unknown>;
	shift?: Record<string, unknown>;
	flip?: Record<string, unknown>;
}

interface PopoverProps {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
	transparent?: boolean;
	onClose?: () => void;
	placement?: Placement;
	theme?: Theme;
	middlewareOptions?: MiddlewareOptions;
}

const Popover = (props: PopoverProps) => {
	const {
		children,
		anchorEl,
		open,
		setOpen,
		className,
		transparent = true,
		onClose = () => {},
		placement = 'bottom',
		theme = 'light',
		middlewareOptions,
	} = props;

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset({
				mainAxis: 5,
				...(middlewareOptions?.offset ?? {}),
			}),
			shift({
				...(middlewareOptions?.shift ?? {}),
			}),
			flip({
				padding: 8,
				...(middlewareOptions?.flip ?? {}),
			}),
			size({
				apply({ rects, availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
						minWidth: 'fit-content',
						maxHeight: `${availableHeight}px`,
					});
				},
				padding: 8,
			}),
		],
	});

	const { getFloatingProps } = useInteractions([useDismiss(context)]);

	useEffect(() => {
		if (open === false) {
			onClose();
		}
	}, [open]);

	useLayoutEffect(() => {
		if (anchorEl) {
			reference(anchorEl);
		}
	}, [anchorEl]);

	return (
		<Popper open={open} wrapperId='popover' transparent={transparent}>
			<div
				{...getFloatingProps({
					ref: floating,
					style: {
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					},
					className: classes(styles.root, styles[`${theme}-theme`], className),
				})}>
				{children}
			</div>
		</Popper>
	);
};

export default Popover;
