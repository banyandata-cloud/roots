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
	open?: boolean | undefined;
	children: React.ReactNode;
	wrapperId?: string;
	backdrop?: boolean;
	className?: string | undefined;
	transparent?: boolean;
	lockScroll?: boolean | undefined;
	withOverlay?: boolean | undefined;
}

const Popper: React.FC<PopperProps> = ({
	open,
	children,
	wrapperId = 'default-popper',
	backdrop = true,
	className = '',
	transparent = true,
	lockScroll,
	withOverlay = true,
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

	const resolvedLock = lockScroll ?? withOverlay;

	return (
		<FloatingPortal id={portalId}>
			<AnimatePresence>
				{open &&
					(withOverlay ? (
						<FloatingOverlay
							lockScroll={resolvedLock}
							className={classes(
								styles.backdrop,
								transparent ? styles.transparent : '',
								backdrop ? '' : styles['hide-backdrop'],
								className
							)}>
							{children}
						</FloatingOverlay>
					) : (
						<div className={className}>{children}</div>
					))}
			</AnimatePresence>
		</FloatingPortal>
	);
};

export default Popper;
