import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';
import { Popper } from '../popper';
import { classes } from '../../utils';

const getPositionStyles = ({ position, anchor, content }) => {
	const style = {
		width: `calc(${content.length / 2}rem + 0.75rem)`,
	};
	switch (position) {
		case 'top':
			return {
				...style,
				top: `calc(${anchor?.current?.getBoundingClientRect?.()?.top ?? 0}px - 0.375rem)`,
				left: `calc(${
					(anchor?.current?.getBoundingClientRect?.()?.left ?? 0) +
					(anchor?.current?.getBoundingClientRect?.()?.width ?? 0) / 2
				}px`,
				transform: 'translate(-50%, -100%)',
			};
		case 'bottom':
			return {
				...style,
				top: `calc(${
					anchor?.current?.getBoundingClientRect?.()?.bottom ?? 0
				}px + 0.375rem)`,
				left: `calc(${
					(anchor?.current?.getBoundingClientRect?.()?.left ?? 0) +
					(anchor?.current?.getBoundingClientRect?.()?.width ?? 0) / 2
				}px`,
				transform: 'translate(-50%, 0%)',
			};
		case 'left':
			return {
				...style,
				top: `calc(${
					(anchor?.current?.getBoundingClientRect?.()?.top ?? 0) +
					(anchor?.current?.getBoundingClientRect?.()?.height ?? 0) / 2
				}px)`,
				left: `calc(${anchor?.current?.getBoundingClientRect?.()?.left ?? 0}px - 0.375rem`,
				transform: 'translate(-100%, -50%)',
			};
		case 'right':
			return {
				...style,
				top: `calc(${
					(anchor?.current?.getBoundingClientRect?.()?.top ?? 0) +
					(anchor?.current?.getBoundingClientRect?.()?.height ?? 0) / 2
				}px)`,
				left: `calc(${anchor?.current?.getBoundingClientRect?.()?.right ?? 0}px + 0.375rem`,
				transform: 'translate(0%, -50%)',
			};
		default:
			return {};
	}
};

const Tooltip = (props) => {
	const { children, position, content, variant } = props;

	const timeoutRef = useRef(null);
	const tooltipRef = useRef(null);

	const [open, setOpen] = useState(false);

	const showTip = () => {
		timeoutRef.current = setTimeout(() => {
			setOpen(true);
		}, 0);
	};

	const hideTip = () => {
		clearTimeout(timeoutRef.current);
		setOpen(false);
	};

	return (
		<div
			ref={tooltipRef}
			className={classes(styles.root, styles[variant])}
			// When to show the tooltip
			onMouseEnter={showTip}
			onMouseLeave={hideTip}>
			{/* Wrapping */}
			{children}
			<Popper open={open} backdrop={false} anchorEl={tooltipRef} wrapperId='tooltip-popper'>
				<div
					className={classes(styles.tooltip, styles[position], styles[variant])}
					style={{
						...getPositionStyles({
							position,
							anchor: tooltipRef,
							content,
						}),
					}}>
					{content}
				</div>
			</Popper>
		</div>
	);
};

Tooltip.propTypes = {
	variant: PropTypes.oneOf(['light', 'dark']),
	content: PropTypes.string,
	position: PropTypes.oneOf(['right', 'top', 'bottom', 'left']),
};

Tooltip.defaultProps = {
	variant: 'light',
	content: 'Tooltip Info',
	position: 'top',
};

export default Tooltip;
