import { FloatingPortal, FloatingOverlay } from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Popper.module.css';

const Popper = (props) => {
	const { open, children, wrapperId, backdrop } = props;

	return (
		<FloatingPortal id={wrapperId}>
			{open && (
				<FloatingOverlay
					lockScroll
					className={classes(styles.backdrop, backdrop ? '' : styles['hide-backdrop'])}>
					{children}
				</FloatingOverlay>
			)}
		</FloatingPortal>
	);
};

Popper.propTypes = {
	open: PropTypes.bool,
	backdrop: PropTypes.bool,
	wrapperId: PropTypes.string,
};

Popper.defaultProps = {
	open: false,
	backdrop: true,
	wrapperId: 'default-popper',
};

export default Popper;
