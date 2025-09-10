import { FloatingPortal, FloatingOverlay as FUOverlay } from '@floating-ui/react-dom-interactions';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useId } from 'react';
import { classes } from '../../utils';
import styles from './Popper.module.css';

/**
 * Typing fix: the defs in react-dom-interactions pull in an overly broad
 * HTML props pick that can imply an `open` prop. We re-cast to the minimal
 * surface we actually use (`div` props + optional lockScroll).
 */
type OverlayProps = React.HTMLProps<HTMLDivElement> & { lockScroll?: boolean };
const FloatingOverlay = FUOverlay as unknown as React.ForwardRefExoticComponent<
	OverlayProps & React.RefAttributes<HTMLDivElement>
>;

export interface PopperProps {
	open: boolean;
	children: React.ReactNode;
	wrapperId?: string;
	backdrop?: boolean;
	className?: string;
	transparent?: boolean;
}

const Popper: React.FC<PopperProps> = ({
	open,
	children,
	wrapperId = 'default-popper',
	backdrop = true,
	className = '',
	transparent = true,
}) => {
	const id = useId();
	const portalId = `${wrapperId}${id}`;

	useEffect(() => {
		return () => {
			const portalEl = document.getElementById(portalId);
			if (portalEl?.parentNode) {
				portalEl.parentNode.removeChild(portalEl);
			}
		};
	}, [portalId]);

	return (
		<FloatingPortal id={portalId}>
			<AnimatePresence>
				{open && (
					<FloatingOverlay
						lockScroll
						className={classes(
							styles.backdrop,
							transparent ? styles.transparent : '',
							backdrop ? '' : styles['hide-backdrop'],
							className
						)}>
						{children}
					</FloatingOverlay>
				)}
			</AnimatePresence>
		</FloatingPortal>
	);
};

export default Popper;
