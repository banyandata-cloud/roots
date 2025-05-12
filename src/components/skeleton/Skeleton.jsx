import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Skeleton.module.css';

const Skeleton = (props) => {
	const { height, width, variant, className, noAnimation, theme, style } = props;

	return (
		<span
			data-elem='skeleton'
			className={classes(
				styles.root,
				styles[variant],
				styles[`${theme}-theme`],
				noAnimation ? '' : styles.animated,
				className
			)}
			style={{
				height,
				width,
				...style,
			}}
		/>
	);
};

Skeleton.propTypes = {
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.oneOf(['circle', 'text', 'rounded', 'rectangle', 'ellipse']),
	noAnimation: PropTypes.bool,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
};

Skeleton.defaultProps = {
	className: '',
	theme: 'dark',
	height: null,
	width: '100%',
	variant: 'text',
	noAnimation: false,
	style: {},
};

export default Skeleton;
