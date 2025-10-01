import { forwardRef, type RefObject } from 'react';
import { classes } from '../../utils/utils';
import Text from '../text/Text';
// import styles from './Link.module.css';
import type { LinkProps } from './types';

const Link = forwardRef<RefObject<HTMLAnchorElement>, LinkProps>((props, ref) => {
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
	} = props;

	return (
		<Text
			ref={ref}
			variant={variant}
			component='a'
			stroke={stroke}
			weight={weight}
			italic={italic}
			className={classes(
				'bn-text-blue-600 no-underline ',
				underline === 'none' && 'no-underline',
				underline === 'hover' && 'hover:underline',
				underline === 'always' && 'underline',
				className
			)}
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
