import React from 'react';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { CrossIcon, TickIcon } from '../../icons';
import styles from './Step.module.css';
import type { StepProps } from './types';

export const Step: React.FC<StepProps> = (props) => {
	const {
		title,
		description,
		active = false,
		completion = 0,
		error = false,
		index,
		noTail,
		orientation,
		renderIcon: RenderIcon,
		renderTitle: RenderTitle,
		renderDescription: RenderDescription,
	} = props;

	let display: React.ReactNode = <span className={styles.text}>{index + 1}</span>;

	if (error) {
		display = <CrossIcon className={classes(styles.icon, styles['error-icon'])} />;
	} else if (completion === 1) {
		display = (
			<TickIcon
				className={classes(
					styles.icon,
					styles['completion-icon'],
					active ? styles.active : ''
				)}
			/>
		);
	}

	let IconContainer: React.ReactNode = (
		<div className={styles['icon-container']}>
			{display}
			{active && completion > 0 && completion <= 1 && (
				<div
					className={styles.progress}
					style={{
						backgroundImage: `conic-gradient(${COLORS.highlight?.toString() ?? ''}, ${(
							completion * 100
						).toString()}%, transparent 0%)`,
					}}
				/>
			)}
		</div>
	);

	if (RenderIcon) {
		IconContainer = <RenderIcon {...props} />;
	}

	let Title: React.ReactNode = <span className={classes(styles.title)}>{title}</span>;
	if (RenderTitle) Title = <RenderTitle {...props} />;

	let Description: React.ReactNode =
		description != null ? <span className={styles.description}>{description}</span> : null;
	if (RenderDescription) Description = <RenderDescription {...props} />;

	return (
		<div
			className={classes(
				styles.root,
				active ? styles.active : '',
				completion === 1 ? styles.completed : '',
				error ? styles.error : '',
				noTail ? styles['no-tail'] : '',
				styles[orientation]
			)}
			data-elem='step'>
			<div className={styles.left}>{IconContainer}</div>
			<div className={styles.right}>
				{Title}
				{Description}
			</div>
		</div>
	);
};

export default Step;
