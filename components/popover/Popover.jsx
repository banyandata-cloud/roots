import PropTypes from 'prop-types';
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
import { Popper } from '../popper';
import { classes } from '../../utils';
import styles from './Popover.module.css';

const Popover = (props) => {
	const { children, anchorEl, open, setOpen, className, transparent, onClose } = props;

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			shift(),
			flip({
				padding: 8,
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
		reference(anchorEl);
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
					className: classes(styles.root, className),
				})}>
				{children}
			</div>
		</Popper>
	);
};

Popover.propTypes = {
	anchorEl: PropTypes.element,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	transparent: PropTypes.bool,
	onClose: PropTypes.func,
};

Popover.defaultProps = {
	anchorEl: null,
	transparent: true,
	onClose: () => {},
};

export default Popover;
