import type { CSSProperties } from 'react';
import { classes } from '../../utils';
import styles from './Skeleton.module.css';

interface SkeletonProps {
	height?: number | string | undefined;
	width?: number | string | undefined;
	variant: 'text' | 'circle' | 'rounded' | 'ellipse';
	theme: 'light' | 'dark';
	className?: string | undefined;
	style: CSSProperties;
	noAnimation: boolean;
}

const Skeleton = (props: SkeletonProps) => {
	const {
		height,
		width = '100%',
		variant = 'text',
		className,
		noAnimation = false,
		theme = 'dark',
		style,
	} = props;

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

export default Skeleton;
