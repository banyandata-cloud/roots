import React from 'react';
import { classes } from '../utils';
import StepIcon from './stepIcon/StepIcon';
import styles from './Stepper.module.scss';
import type { StepperProps } from './types';

// Figma maps the props like this: icon + horizontal = "icon top", icon + vertical = "icon left",
// noIcon = "number top" / "number left" and progressBar = "text line" (horizontal only).
const Stepper: React.FC<StepperProps> = ({
	steps = [],
	size = 'sm',
	variant = 'icon',
	orientation = 'horizontal',
	className,
	style,
}) => {
	const isBar = variant === 'progressBar';
	const layout = isBar ? 'horizontal' : orientation;

	return (
		<ol
			className={classes(styles.stepper, className)}
			style={style}
			data-size={size}
			data-variant={variant}
			data-orientation={layout}
		>
			{steps.map((step, index) => (
				<li
					key={index}
					className={styles.step}
					data-status={step.status}
					aria-current={step.status === 'current' ? 'step' : undefined}
				>
					{!isBar && (
						<div className={styles.marker}>
							<StepIcon
								size={size}
								status={step.status}
								kind={variant === 'noIcon' ? 'number' : 'icon'}
								number={step.step ?? index + 1}
							/>
							{index < steps.length - 1 && (
								<span
									className={styles.connector}
									data-status={step.status}
									aria-hidden='true'
								/>
							)}
						</div>
					)}
					<div className={styles.content}>
						<span className={styles.label}>{step.label}</span>
						{step.description && (
							<span className={styles.description}>{step.description}</span>
						)}
					</div>
				</li>
			))}
		</ol>
	);
};

export default Stepper;
