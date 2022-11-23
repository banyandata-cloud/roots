import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../utils/utils';
import { BaseCell } from '../cell';
import { CaretIcon } from '../icons';
import styles from './Accordion.module.css';

const Accordion = (props) => {
	const { defaultOpen, iconPlacement, title, description, children, onClick, className } = props;

	const [open, setOpen] = useState(defaultOpen);

	return (
		<div
			className={classes(className, styles.root, open ? styles.open : '')}
			data-state-open={open}>
			<BaseCell
				flexible
				size='auto'
				rootDOM='button'
				className={styles.header}
				attrs={{
					onClick: () => {
						setOpen((prevState) => {
							const newState = !prevState;
							onClick(newState);
							return newState;
						});
					},
				}}
				component1={iconPlacement === 'left' && <CaretIcon className={styles.icon} />}
				component2={<span className={styles.title}>{title}</span>}
				component3={iconPlacement === 'right' && <CaretIcon className={styles.icon} />}
			/>
			<div data-elem='body' className={styles.body}>
				{description && <p>{description}</p>}
				{children}
			</div>
		</div>
	);
};

Accordion.propTypes = {
	iconPlacement: PropTypes.oneOf(['left', 'right', 'none']),
	title: PropTypes.node,
	description: PropTypes.string,
	defaultOpen: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

Accordion.defaultProps = {
	iconPlacement: 'left',
	title: null,
	description: null,
	defaultOpen: false,
	onClick: () => {},
	className: '',
};

export default Accordion;
