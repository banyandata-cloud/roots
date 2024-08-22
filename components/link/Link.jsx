/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../utils/utils';
import Text from '../text/Text';
import styles from './Link.module.css';

const Link = forwardRef((props, ref) => {
	const {
		variant = 'b2',
		component = 'a',
		stroke = 'regular',
		weight,
		italic,
		children,
		href,
		target = '_self',
		attrs = {},
		className = '',
		underline = 'none',
		onClick,
	} = props;

	return (
		<Text
			ref={ref}
			variant={variant}
			component={component}
			stroke={stroke}
			weight={weight}
			italic={italic}
			className={classes(styles.root, styles[`underline-${underline}`], className)}
			attrs={{
				to: href,
				href,
				target,
				onClick,
				...attrs,
			}}>
			{children}
		</Text>
	);
});

Link.propTypes = {
	...Text.propTypes,
	href: PropTypes.string,
	target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string,
	attrs: PropTypes.object,
	underline: PropTypes.oneOf(['always', 'hover', 'none']),
};

export default Link;
