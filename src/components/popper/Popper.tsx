import { FloatingOverlay, FloatingPortal, useId } from '@floating-ui/react-dom-interactions';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { classes } from '../../utils';
import styles from './Popper.module.css';

interface PopperProps {
	open: boolean;
	children: ReactNode;
	wrapperId?: string;
	backdrop?: boolean;
	className?: string;
	transparent?: boolean;
}

const Popper = (props: PopperProps): React.ReactElement => {
	const {
		open,
		children,
		wrapperId = 'default-popper',
		backdrop = true,
		className = '',
		transparent = true,
	} = props;

	const id = useId();
	const portalId = `${wrapperId}${id}`;

	useEffect(() => {
		return () => {
			const portalDOM = document.getElementById(portalId);

			if (portalDOM) {
				document.body.removeChild(portalDOM);
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
						)}
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}>
						{children}
					</FloatingOverlay>
				)}
			</AnimatePresence>
		</FloatingPortal>
	);
};

export default Popper;
