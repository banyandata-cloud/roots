import React, { cloneElement, useRef, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { arrow, autoUpdate, flip, offset, shift } from '@floating-ui/react-dom';
import {
	useFloating,
	useDismiss,
	useFocus,
	useHover,
	useInteractions,
	useRole,
} from '@floating-ui/react';
import { mergeRefs } from 'react-merge-refs';
import { Popper } from '../popper';
import { classes } from '../../utils';
import styles from './Tooltip.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Tooltip = forwardRef(function Tooltip(props, propRef) {
	const { children, position, content, variant, className } = props;

	const arrowEl = useRef(null);

	const [open, setOpen] = useState(false);

	// eslint-disable-next-line object-curly-newline
	const { x, y, reference, floating, strategy, context, middlewareData, placement } = useFloating(
		{
			open,
			onOpenChange: setOpen,
			// strategy: 'fixed',
			placement: position,
			// Make sure the tooltip stays on the screen
			whileElementsMounted: autoUpdate,
			middleware: [
				offset(12),
				flip(),
				shift(),
				arrow({
					element: arrowEl,
				}),
			],
		}
	);

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

	const childrenRef = children.ref;

	const ref = React.useMemo(() => {
		return mergeRefs([reference, childrenRef, propRef]);
	}, [reference, childrenRef]);

	const clonedChildren = cloneElement(
		children,
		getReferenceProps({
			ref,
			...children.props,
		})
	);

	const side = placement.split('-')[0];

	const staticSide = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
	}[side];

	return (
		<>
			{/* Wrapping */}
			{clonedChildren}
			<Popper open={open && content != null} backdrop={false} wrapperId='tooltip'>
				<div
					{...getFloatingProps({
						ref: floating,
						className: classes(styles.tooltip, styles[variant], className),
						style: {
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
							zIndex: 100,
						},
					})}>
					<div
						className={styles.arrow}
						ref={arrowEl}
						style={{
							left: middlewareData?.arrow?.x ?? '',
							top: middlewareData?.arrow?.y ?? '',
							right: '',
							bottom: '',
							[staticSide]: '-0.5rem',
						}}
					/>
					{content}
				</div>
			</Popper>
		</>
	);
});

Tooltip.propTypes = {
	variant: PropTypes.oneOf(['light', 'dark']),
	content: PropTypes.node,
	position: PropTypes.oneOf(['right', 'top', 'bottom', 'left']),
	className: PropTypes.string,
};

Tooltip.defaultProps = {
	variant: 'light',
	content: null,
	position: 'top',
	className: '',
};

export default Tooltip;
