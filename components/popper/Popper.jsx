import { FloatingPortal, FloatingOverlay, useId } from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { classes } from '../../utils';
import styles from './Popper.module.css';

const Popper = (props) => {
	const { open, children, wrapperId, backdrop, className, transparent } = props;

	const id = useId();

	const portalId = `${wrapperId}${id}`;

	useEffect(() => {
		return () => {
			const portalDOM = document.getElementById(portalId);

			if (portalDOM) {
				document.body.removeChild(portalDOM);
			}
		};
	}, []);

	return (
		<FloatingPortal id={portalId}>
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
		</FloatingPortal>
	);
};

Popper.propTypes = {
	className: PropTypes.string,
	open: PropTypes.bool,
	backdrop: PropTypes.bool,
	wrapperId: PropTypes.string,
	transparent: PropTypes.bool,
};

Popper.defaultProps = {
	className: '',
	open: false,
	backdrop: true,
	wrapperId: 'default-popper',
	transparent: true,
};

export default Popper;
