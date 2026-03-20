import React from 'react';
import { classes } from '../../../utils';
import styles from './Stepper.module.scss';
import type { StepperProps, StepperSize, StepperVariant, StepStatus } from './types';

import CompletedIconMd from './assets/Icons-md/CompletedIconMd';
import CurrentIconMd from './assets/Icons-md/CurrentIconMd';
import IncompleteIconMd from './assets/Icons-md/IncompleteIconMd';
import CompletedIconSm from './assets/Icons-sm/CompletedIconSm';
import CurrentIconSm from './assets/Icons-sm/CurrentIconSm';
import IncompleteIconSm from './assets/Icons-sm/IncompleteIconSm';
import CompletedNoIconMd from './assets/NumberIcon-md/CompletedNoIconMd';
import CurrentNoIconMd from './assets/NumberIcon-md/CurrentNoIconMd';
import IncompleteNoIconMd from './assets/NumberIcon-md/IncompleteNoIconMd';
import CompletedNoIconSm from './assets/NumberIcon-sm/CompletedNoIconSm';
import CurrentNoIconSm from './assets/NumberIcon-sm/CurrentNoIconSm';
import IncompleteNoIconSm from './assets/NumberIcon-sm/IncompleteNoIconSm';

const resolveIcon = (
	status: StepStatus,
	size: StepperSize,
	variant: StepperVariant,
	step?: number
) => {
	const isSm = size === 'sm';
	if (variant === 'icon') {
		if (status === 'incomplete') return isSm ? <IncompleteIconSm /> : <IncompleteIconMd />;
		if (status === 'current') return isSm ? <CurrentIconSm /> : <CurrentIconMd />;
		return isSm ? <CompletedIconSm /> : <CompletedIconMd />;
	}
	if (status === 'incomplete')
		return isSm ? <IncompleteNoIconSm step={step} /> : <IncompleteNoIconMd step={step} />;
	if (status === 'current')
		return isSm ? <CurrentNoIconSm step={step} /> : <CurrentNoIconMd step={step} />;
	return isSm ? <CompletedNoIconSm /> : <CompletedNoIconMd />;
};

const Stepper: React.FC<StepperProps> = ({
	steps,
	size = 'sm',
	variant = 'icon',
	orientation = 'horizontal',
	className,
	style,
}) => {
	if (variant === 'progressBar') {
		return (
			<div
				className={classes(
					styles.stepper,
					styles['stepper--horizontal'],
					styles['stepper--progressBar'],
					className
				)}
				style={style}>
				{steps?.map((step, index) => (
					<div key={index} className={styles.progressBarWrapper}>
						<div
							className={classes(
								styles.progressBarTrack,
								styles[`progressBarTrack--${size}`],
								step.status === 'completed' &&
									styles['progressBarTrack--completed'],
								step.status === 'current' && styles['progressBarTrack--active']
							)}
						/>
						<div
							className={classes(
								styles.content,
								styles[`content--${size}`],
								styles[`content--${variant}`],
								styles['content--progressBar']
							)}>
							<span
								className={classes(styles.label, styles[`label--${step.status}`])}>
								{step.label}
							</span>
							{step.description && (
								<span
									className={classes(
										styles.description,
										styles[`description--${step.status}`]
									)}>
									{step.description}
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		);
	}

	if (orientation === 'vertical') {
		return (
			<div
				className={classes(styles.stepper, styles['stepper--vertical'], className)}
				style={style}>
				{steps?.map((step, index) => {
					const lineStatus = step.status === 'completed' ? 'completed' : 'incomplete';

					return (
						<div key={index} className={styles.stepWrapper}>
							<div className={styles.verticalIconCol}>
								<div
									className={classes(
										styles.stepIcon,
										styles[`stepIcon--${size}`],
										step.status === 'current' &&
											variant === 'icon' &&
											styles['stepIcon--current']
									)}>
									{resolveIcon(
										step.status,
										size,
										variant,
										step.step ?? index + 1
									)}
								</div>
								<div
									className={classes(
										styles.verticalLine,
										variant === 'noIcon'
											? styles['verticalLine--dotted']
											: styles['verticalLine--solid'],
										lineStatus === 'completed' &&
											styles['verticalLine--completed']
									)}
								/>
							</div>

							<div
								className={classes(
									styles.content,
									styles[`content--${size}`],
									styles[`content--${variant}`]
								)}>
								<span
									className={classes(
										styles.label,
										styles[`label--${step.status}`]
									)}>
									{step.label}
								</span>
								{step.description && (
									<span
										className={classes(
											styles.description,
											styles[`description--${step.status}`]
										)}>
										{step.description}
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<div
			className={classes(styles.stepper, styles['stepper--horizontal'], className)}
			style={style}>
			{steps?.map((step, index) => {
				const isLast = index === (steps?.length ?? 0) - 1;
				const lineStatus = step.status === 'completed' ? 'completed' : 'incomplete';

				return (
					<div key={index} className={styles.stepWrapper}>
						<div
							className={classes(
								styles.iconSection,
								!isLast && styles.hasLine,
								!isLast && styles[`line--${lineStatus}`],
								variant === 'noIcon' ? styles.isNumbered : styles.isIcon
							)}>
							<div
								className={classes(
									styles.stepIcon,
									styles[`stepIcon--${size}`],
									step.status === 'current' &&
										variant === 'icon' &&
										styles['stepIcon--current']
								)}>
								{resolveIcon(step.status, size, variant, step.step ?? index + 1)}
							</div>
						</div>

						<div
							className={classes(
								styles.content,
								styles[`content--${size}`],
								styles[`content--${variant}`]
							)}>
							<span
								className={classes(styles.label, styles[`label--${step.status}`])}>
								{step.label}
							</span>
							{step.description && (
								<span
									className={classes(
										styles.description,
										styles[`description--${step.status}`]
									)}>
									{step.description}
								</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Stepper;
