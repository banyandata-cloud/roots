import { FloatingPortal, FloatingOverlay } from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Popper.module.css';

const Popper = (props) => {
	const { open, children, wrapperId, backdrop, className, transparent } = props;

	return (
		<FloatingPortal id={wrapperId}>
			{open && (
				<FloatingOverlay
					lockScroll
					className={classes(
						className,
						styles.backdrop,
						transparent ? styles.transparent : '',
						backdrop ? '' : styles['hide-backdrop']
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
