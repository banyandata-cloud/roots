import { forwardRef, type RefObject } from 'react';
import { classes } from '../../../utils/utils';
import Text from '../../text/Text';
import { ArrowIcon } from '../icons';
import styles from './Link.module.scss';
import type { LinkProps } from './types';

const Link = forwardRef<RefObject<HTMLAnchorElement>, LinkProps>((props, ref) => {
	const {
		children,
		href,
		target = '_self',
		onClick,
		size = 'md',
		withIcon = false,
		disabled = false,
		className = '',
		attrs = {},
	} = props;

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		onClick?.();
	};

	return (
		<div
			className={classes(
				styles.wrapper,
				styles[`size-${size}`],
				disabled && styles.disabled
			)}>
			<Text
				ref={ref}
				component='a'
				variant='b2'
				className={classes(styles.link, withIcon && styles.withIcon, className)}
				attrs={{
					href: disabled ? undefined : href,
					target,
					onClick: handleClick,
					'aria-disabled': disabled,
					tabIndex: disabled ? -1 : 0,
					...attrs,
				}}>
				<span className={styles.text}>{children}</span>
				{withIcon && <ArrowIcon className={styles.icon} />}
			</Text>
		</div>
	);
});

export default Link;
