import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Skeleton.module.css';

const Skeleton = (props) => {
	const { height, width, variant, className } = props;

	return (
		<span
			data-elem='skeleton'
			className={classes(className, styles.root, styles[variant])}
			style={{
				height,
				width,
			}}
		/>
	);
};

Skeleton.propTypes = {
	className: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.oneOf(['circle', 'text', 'rounded', 'rectangle']),
};

Skeleton.defaultProps = {
	className: '',
	height: null,
	width: '100%',
	variant: 'text',
};

export default Skeleton;
