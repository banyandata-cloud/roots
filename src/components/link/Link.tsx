import { forwardRef, type RefObject } from 'react';
import { classes } from '../../utils/utils';
import Text from '../text/Text';
import styles from './Link.module.css';
import type { LinkProps } from './types';
import { Link as Linkv2 } from '../v2/link';

const Link = forwardRef<RefObject<HTMLAnchorElement>, LinkProps>((props, ref) => {
	const { v2, ...rest } = props;

	if (v2) {
		return <Linkv2 {...rest} ref={ref} />;
	}

	const {
		variant = 'b2',
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
	} = rest;

	return (
		<Text
			ref={ref}
			variant={variant}
			component='a'
			stroke={stroke}
			weight={weight}
			italic={italic}
			className={classes(styles.root, styles[`underline-${underline}`], className)}
			attrs={{
				href,
				target,
				onClick,
				...attrs,
			}}>
			{children}
		</Text>
	);
});

export default Link;
