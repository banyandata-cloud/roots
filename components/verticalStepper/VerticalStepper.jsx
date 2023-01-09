import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { CrossIcon, TickIcon } from '../icons';
import styles from './VerticalStepper.module.css';
import { COLORS } from '../../styles';

const VerticalStepper = (props) => {
	const { title, description, active, completion, error, index } = props;

	let display = <span className={styles.text}>{index + 1}</span>;

	if (error === true) {
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

	return (
		<div
			className={classes(
				styles.step,
				active ? styles.active : '',
				completion === 1 ? styles.completed : '',
				error ? styles.error : ''
			)}>
			<div className={styles.left}>
				{display}
				{active === true && completion > 0 && completion <= 1 && (
					<div
						className={styles.progress}
						style={{
							backgroundImage: `conic-gradient(${COLORS.highlight}, ${
								completion * 100
							}%, transparent 0%)`,
						}}
					/>
				)}
			</div>
			<div className={styles.right}>
				<span className={styles.title}>{title}</span>
				{description != null && <span className={styles.description}>{description}</span>}
			</div>
		</div>
	);
};

const Stepper = (props) => {
	const { steps } = props;

	return (
		<div className={styles.root}>
			{steps.map((step, index) => {
				return (
					<VerticalStepper
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

export default VerticalStepper;
