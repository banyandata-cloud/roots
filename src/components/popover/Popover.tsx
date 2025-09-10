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
import React, { useEffect, useLayoutEffect } from 'react';
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

type VirtualElement = {
	getBoundingClientRect: () => DOMRect;
	contextElement?: Element | null;
};

type ReferenceEl = Element | VirtualElement | null;

interface MiddlewareOptions {
	offset?: Parameters<typeof offset>[0];
	shift?: Parameters<typeof shift>[0];
	flip?: Parameters<typeof flip>[0];
}

export interface PopoverProps {
	children: React.ReactNode;
	anchorEl: ReferenceEl;
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
	transparent?: boolean;
	onClose?: () => void;
	placement?: Placement;
	theme?: 'light' | 'dark';
	middlewareOptions?: MiddlewareOptions;
}

type OffsetArg = Parameters<typeof offset>[0];
const resolveOffset = (user?: OffsetArg): OffsetArg => {
	if (user == null) return { mainAxis: 5 };
	if (typeof user === 'number' || typeof user === 'function') return user;
	return { mainAxis: 5, ...user };
};

const Popover: React.FC<PopoverProps> = ({
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
}) => {
	const offsetArg = resolveOffset(middlewareOptions?.offset);
	const flipArg: Parameters<typeof flip>[0] = {
		padding: 8,
		...(middlewareOptions?.flip ?? {}),
	};

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(offsetArg),
			shift(middlewareOptions?.shift),
			flip(flipArg),
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
		if (!open) onClose();
	}, [open, onClose]);

	useLayoutEffect(() => {
		reference(anchorEl as any);
	}, [anchorEl, reference]);

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
