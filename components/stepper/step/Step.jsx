/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { CrossIcon, TickIcon } from '../../icons';
import styles from './Step.module.css';

const Step = (props) => {
	const { title, description, active, completion, error, index, noTail, orientation } = props;

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
				styles.root,
				active ? styles.active : '',
				completion === 1 ? styles.completed : '',
				error ? styles.error : '',
				noTail ? styles['no-tail'] : '',
				styles[orientation]
			)}>
			<div className={styles.left}>
				<div className={styles['icon-container']}>
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
			</div>
			<div className={styles.right}>
				<span className={classes(styles.title)}>{title}</span>
				{description != null && <span className={styles.description}>{description}</span>}
			</div>
		</div>
	);
};

Step.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	active: PropTypes.bool,
	completion: PropTypes.number,
	error: PropTypes.bool,
	index: PropTypes.number,
	noTail: PropTypes.bool,
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

Step.defaultProps = {
	description: '',
	active: false,
	completion: 0,
	error: false,
	index: 0,
	noTail: false,
	orientation: 'horizontal',
};

export default Step;
