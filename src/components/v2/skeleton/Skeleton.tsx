import { classes } from '../../../utils';
import type { SkeletonProps } from '../skeleton/types/index';
import styles from './Skeleton.module.css';

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
