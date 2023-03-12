import PropTypes from 'prop-types';
import styles from './Stepper.module.css';
import { Step } from './step';

const Stepper = (props) => {
	const { steps } = props;

	return (
		<div className={styles.root}>
			{steps.map((step, index) => {
				return (
					<Step
						key={`${step.title}-${step.description}`}
						{...step}
						index={index}
						total={steps.length}
					/>
				);
			})}
		</div>
	);
};

Stepper.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			active: PropTypes.bool,
			completion: PropTypes.number,
			error: PropTypes.bool,
		})
	),
};

Stepper.defaultProps = {
	steps: [],
};

export default Stepper;
