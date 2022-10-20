import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../utils/utils';
import { CaretIcon } from '../icons';
import styles from './Accordion.module.css';

const Accordion = (props) => {
	const { defaultOpen, iconPlacement, title, description, children } = props;

	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className={classes(styles.root, open ? styles.open : '')}>
			<div
				role='button'
				className={styles.header}
				onClick={() => {
					setOpen((prevState) => {
						return !prevState;
					});
				}}>
				{iconPlacement === 'left' && <CaretIcon className={styles.icon} />}
				<span className={styles.title}>{title}</span>
				{iconPlacement === 'right' && <CaretIcon className={styles.icon} />}
			</div>
			<div className={styles.body}>
				{description && <p>{description}</p>}
				{children}
			</div>
		</div>
	);
};

Accordion.propTypes = {
	iconPlacement: PropTypes.oneOf(['left', 'right', 'none']),
	title: PropTypes.string,
	description: PropTypes.string,
	defaultOpen: PropTypes.bool,
};

Accordion.defaultProps = {
	iconPlacement: 'left',
	title: null,
	description: null,
	defaultOpen: false,
};

export default Accordion;
