import type { CSSProperties } from 'react';
import { classes } from '../../utils';
import styles from './Skeleton.module.css';

interface SkeletonProps {
	height?: number | string;
	width?: number | string;
	variant: 'text' | 'circle' | 'rounded' | 'ellipse';
	theme: 'light' | 'dark';
	className?: string;
	style?: CSSProperties;
	noAnimation?: boolean;
}

const Skeleton = (props: SkeletonProps) => {
	const {
		height,
		width = '100%',
		variant = 'text',
		className = '',
		noAnimation = false,
		theme = 'dark',
		style = {},
	} = props;

	// Base classes
	const baseClasses = 'bn-inline-block bn-w-full bn-h-full bn-bg-cover bn-bg-no-repeat';

	// Theme classes
	const themeClasses = theme === 'light' ? 'bn-bg-[#e0e1e9]' : 'bn-bg-[#a6a6a6] bn-opacity-20';

	// Variant classes
	// let variantClasses = '';
	// switch (variant) {
	// 	case 'text':
	// 		variantClasses = 'bn-h-6';
	// 		break;
	// 	case 'circle':
	// 		variantClasses = 'bn-rounded-full';
	// 		break;
	// 	case 'rounded':
	// 		variantClasses = 'bn-rounded';
	// 		break;
	// 	case 'ellipse':
	// 		variantClasses = 'bn-rounded-full bn-h-6';
	// 		break;
	// 	default:
	// 		variantClasses = 'bn-h-6'; // fallback
	// 		break;
	// }

	// Animation classes
	// const animationClasses = !noAnimation
	// 	? `bn-animate-shimmer bn-bg-gradient-to-r ${
	// 			theme === 'light'
	// 				? 'from-[#f3f3f3] via-[#d1d5db] to-[#f3f3f3]'
	// 				: 'from-[#e0e0e0] via-[#c4c4c4] to-[#e0e0e0]'
	// 		}`
	// 	: '';

	return (
		<span
			data-elem='skeleton'
			className={classes(
				baseClasses,
				themeClasses,
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
