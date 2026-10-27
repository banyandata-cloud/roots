import { forwardRef } from 'react';
import { classes } from '../utils';
import Text from '../text/Text';
import { ArrowIcon } from '../icons';
import styles from './Link.module.scss';
import type { TextVariant } from '../text/types';
import type { LinkProps } from './types';

// Figma Link text styles: body-small / body, and for large body-large with an icon, heading-small without.
const TEXT_VARIANT: Record<'sm' | 'md' | 'lg', TextVariant> = {
	sm: 'body-small',
	md: 'body',
	lg: 'body-large',
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const {
		children,
		href,
		target = '_self',
		onClick,
		variant = 'styled',
		size = 'md',
		withIcon = false,
		disabled = false,
		className = '',
		attrs = {},
	} = props;

	const textVariant: TextVariant =
		size === 'lg' && !withIcon ? 'heading-small' : TEXT_VARIANT[size];

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		onClick?.(e);
	};

	if (variant === 'unstyled') {
		return (
			<a
				ref={ref}
				className={classes(styles.unstyled, className)}
				href={disabled ? undefined : href}
				target={target}
				onClick={handleClick}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				{...attrs}
			>
				{children}
			</a>
		);
	}

	return (
		<div
			className={classes(styles.wrapper, styles[`size-${size}`], disabled && styles.disabled)}
		>
			<Text
				ref={ref as React.Ref<never>}
				component='a'
				variant={textVariant}
				stroke={size === 'sm' && withIcon ? 'medium' : undefined}
				className={classes(styles.link, withIcon && styles.withIcon, className)}
				attrs={{
					href: disabled ? undefined : href,
					target,
					onClick: handleClick,
					'aria-disabled': disabled,
					tabIndex: disabled ? -1 : 0,
					...attrs,
				}}
			>
				<span className={styles.text}>{children}</span>
				{withIcon && <ArrowIcon className={styles.icon} />}
			</Text>
		</div>
	);
});

export default Link;
