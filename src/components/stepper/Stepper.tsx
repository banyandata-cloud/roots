import React from 'react';
import { classes } from '../../utils';
import styles from './Stepper.module.css';
import Step from './step/Step';
import type { Orientation, StepProps } from './step/types';

export interface StepperProps {
	steps: Omit<StepProps, 'index' | 'total' | 'orientation'>[];
	orientation: Orientation;
	className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, orientation = 'horizontal', className }) => {
	return (
		<div className={classes(styles.root, styles[orientation], className)}>
			{steps.map((step, index) => {
				return (
					<Step
						key={typeof step.title === 'string' ? step.title : index.toString()}
						{...step}
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
