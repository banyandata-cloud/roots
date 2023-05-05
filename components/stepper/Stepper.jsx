import React from 'react';
import PropTypes from 'prop-types';
import styles from './Stepper.module.css';
import { Step } from './step';
import { classes } from '../../utils';

const Stepper = (props) => {
	const { steps, orientation } = props;

	return (
		<div className={classes(styles.root, styles[orientation])}>
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

Stepper.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			...Step.propTypes,
		})
	),
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

Stepper.defaultProps = {
	steps: [],
	orientation: 'horizontal',
};

export default Stepper;
