import React, { useState } from 'react';
import Button from '../../v2/buttons/button/Button';
import Stepper from './Stepper';
import type { Step } from './types';

interface StepperInteractiveProps {
	steps: Step[];
	size?: 'sm' | 'md';
	variant?: 'icon' | 'noIcon' | 'progressBar';
	orientation?: 'horizontal' | 'vertical';
	className?: string;
	style?: React.CSSProperties;
}

const StepperInteractive: React.FC<StepperInteractiveProps> = ({
	steps: initialSteps,
	size = 'sm',
	variant = 'icon',
	orientation = 'horizontal',
	className,
	style,
}) => {
	const [currentIndex, setCurrentIndex] = useState<number>(
		() => initialSteps.findIndex((s) => s.status === 'current') ?? 0
	);

	const computedSteps: Step[] = initialSteps.map((step, index) => ({
		...step,
		status:
			index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'incomplete',
	}));

	const handleNext = () => {
		if (currentIndex < initialSteps.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	const stepperProps = {
		steps: computedSteps,
		size,
		variant,
		orientation,
		...(className !== undefined && { className }),
		...(style !== undefined && { style }),
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '24px',
				width: '100%',
			}}>
			<Stepper {...stepperProps} />
			<div
				style={{
					display: 'flex',
					gap: '12px',
					justifyContent: 'flex-start',
				}}>
				<Button
					title='Previous'
					variant='secondary'
					size='sm'
					disabled={currentIndex === 0}
					onClick={handlePrevious}
					type='button'
				/>
				<Button
					title={currentIndex === initialSteps.length - 1 ? 'Finish' : 'Next'}
					variant='primary'
					size='sm'
					disabled={currentIndex === initialSteps.length - 1}
					onClick={handleNext}
					type='button'
				/>
			</div>
		</div>
	);
};

export default StepperInteractive;
