import React from 'react';
import styles from './Stepper.module.css';
import { Step } from './step';
import type { StepProps } from './step';
import { classes } from '../../utils';

export type StepperOrientation = 'horizontal' | 'vertical';

interface StepperProps {
	steps: StepProps[];
	orientation?: StepperOrientation;
	className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps = [], orientation = 'horizontal', className }) => {
	return (
		<div className={classes(styles.root, styles[orientation], className)}>
			{steps.map((step, index) => {
				return (
					<Step
						{...step}
						key={`${step.title}-${step.description}`}
						index={index}
						total={steps.length}
						orientation={orientation}
					/>
				);
			})}
		</div>
	);
};

export default Stepper;
