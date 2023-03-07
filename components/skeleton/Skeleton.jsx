import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Skeleton.module.css';

const Skeleton = (props) => {
	const { height, width, variant, className, noAnimation, theme } = props;

	return (
		<span
			data-elem='skeleton'
			className={classes(
				className,
				styles.root,
				styles[variant],
				styles[`${theme}-theme`],
				noAnimation ? '' : styles.animated
			)}
			style={{
				height,
				width,
			}}
		/>
	);
};

Skeleton.propTypes = {
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.oneOf(['circle', 'text', 'rounded', 'rectangle']),
	noAnimation: PropTypes.bool,
};

Skeleton.defaultProps = {
	className: '',
	theme: 'dark',
	height: null,
	width: '100%',
	variant: 'text',
	noAnimation: false,
};

export default Skeleton;
