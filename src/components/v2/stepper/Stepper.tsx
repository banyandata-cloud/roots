import React from 'react';
import { classes } from '../../../utils';
import styles from './Stepper.module.scss';
import Step from './step/Step';
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
	legacySteps,
	orientation = 'horizontal',
	className,
	style,
}) => {
	if (legacySteps && legacySteps.length > 0) {
		return (
			<div className={classes(styles.root, styles[orientation], className)}>
				{legacySteps.map((step, index) => (
					<Step
						key={typeof step.title === 'string' ? step.title : index.toString()}
						{...step}
						index={index}
						total={legacySteps.length}
						orientation={orientation}
					/>
				))}
			</div>
		);
	}

	if (variant === 'progressBar') {
		return (
			<div
				className={[
					styles.stepper,
					styles['stepper--horizontal'],
					styles['stepper--progressBar'],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={style}>
				{steps?.map((step, index) => (
					<div key={index} className={styles.progressBarWrapper}>
						<div
							className={[
								styles.progressBarTrack,
								styles[`progressBarTrack--${size}`],
								step.status === 'completed'
									? styles['progressBarTrack--completed']
									: '',
								step.status === 'current' ? styles['progressBarTrack--active'] : '',
							]
								.filter(Boolean)
								.join(' ')}
						/>
						<div
							className={[
								styles.content,
								styles[`content--${size}`],
								styles[`content--${variant}`],
								styles['content--progressBar'],
							]
								.filter(Boolean)
								.join(' ')}>
							<span
								className={[styles.label, styles[`label--${step.status}`]].join(
									' '
								)}>
								{step.label}
							</span>
							{step.description && (
								<span
									className={[
										styles.description,
										styles[`description--${step.status}`],
									].join(' ')}>
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
				className={[styles.stepper, styles['stepper--vertical'], className]
					.filter(Boolean)
					.join(' ')}
				style={style}>
				{steps?.map((step, index) => {
					const lineStatus = step.status === 'completed' ? 'completed' : 'incomplete';

					return (
						<div key={index} className={styles.stepWrapper}>
							<div className={styles.verticalIconCol}>
								<div
									className={[
										styles.stepIcon,
										styles[`stepIcon--${size}`],
										step.status === 'current' && variant === 'icon'
											? styles['stepIcon--current']
											: '',
									]
										.filter(Boolean)
										.join(' ')}>
									{resolveIcon(
										step.status,
										size,
										variant,
										step.step ?? index + 1
									)}
								</div>
								<div
									className={[
										styles.verticalLine,
										variant === 'noIcon'
											? styles['verticalLine--dotted']
											: styles['verticalLine--solid'],
										lineStatus === 'completed'
											? styles['verticalLine--completed']
											: '',
									]
										.filter(Boolean)
										.join(' ')}
								/>
							</div>

							<div
								className={[
									styles.content,
									styles[`content--${size}`],
									styles[`content--${variant}`],
								]
									.filter(Boolean)
									.join(' ')}>
								<span
									className={[styles.label, styles[`label--${step.status}`]].join(
										' '
									)}>
									{step.label}
								</span>
								{step.description && (
									<span
										className={[
											styles.description,
											styles[`description--${step.status}`],
										].join(' ')}>
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
			className={[styles.stepper, styles['stepper--horizontal'], className]
				.filter(Boolean)
				.join(' ')}
			style={style}>
			{steps?.map((step, index) => {
				const isLast = index === (steps?.length ?? 0) - 1;
				const lineStatus = step.status === 'completed' ? 'completed' : 'incomplete';

				return (
					<div key={index} className={styles.stepWrapper}>
						<div
							className={[
								styles.iconSection,
								!isLast ? styles.hasLine : '',
								!isLast ? styles[`line--${lineStatus}`] : '',
								variant === 'noIcon' ? styles.isNumbered : styles.isIcon,
							].join(' ')}>
							<div
								className={[
									styles.stepIcon,
									styles[`stepIcon--${size}`],
									step.status === 'current' && variant === 'icon'
										? styles['stepIcon--current']
										: '',
								]
									.filter(Boolean)
									.join(' ')}>
								{resolveIcon(step.status, size, variant, step.step ?? index + 1)}
							</div>
						</div>

						<div
							className={[
								styles.content,
								styles[`content--${size}`],
								styles[`content--${variant}`],
							]
								.filter(Boolean)
								.join(' ')}>
							<span
								className={[styles.label, styles[`label--${step.status}`]].join(
									' '
								)}>
								{step.label}
							</span>
							{step.description && (
								<span
									className={[
										styles.description,
										styles[`description--${step.status}`],
									].join(' ')}>
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
