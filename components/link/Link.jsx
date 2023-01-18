/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../utils/utils';
import Text from '../text/Text';
import styles from './Link.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Link = forwardRef(function Link(props, ref) {
	const {
		variant,
		component,
		stroke,
		weight,
		italic,
		children,
		href,
		target,
		attrs,
		className,
		underline,
	} = props;

	return (
		<Text
			ref={ref}
			variant={variant}
			component={component}
			stroke={stroke}
			weight={weight}
			italic={italic}
			className={classes(className, styles.root, styles[`underline-${underline}`])}
			attrs={{
				to: href,
				href,
				target,
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

Link.defaultProps = {
	...Text.defaultProps,
	href: null,
	target: '_self',
	component: 'a',
	className: '',
	attrs: {},
	underline: 'always',
};

export default Link;
