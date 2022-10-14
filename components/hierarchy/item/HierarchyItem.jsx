import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../utils';
import { Caret } from '../../icons';
import styles from './HierarchyItem.module.css';

const HierarchyItem = (props) => {
	const { defaultOpen, iconPlacement, title, children, onClick } = props;

	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className={classes(styles.root, open ? styles.open : '')}>
			<div
				role='button'
				className={styles.header}
				onClick={() => {
					setOpen((prevState) => {
						const newState = !prevState;
						onClick(newState);
						return newState;
					});
				}}>
				{iconPlacement === 'left' && <Caret className={styles.icon} />}
				<span className={styles.title}>{title}</span>
				{iconPlacement === 'right' && <Caret className={styles.icon} />}
			</div>
			<div className={styles.body}>
				<div className={styles.tail} />
				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

HierarchyItem.propTypes = {
	iconPlacement: PropTypes.oneOf(['left', 'right', 'none']),
	title: PropTypes.string,
	defaultOpen: PropTypes.bool,
	onClick: PropTypes.func,
};

HierarchyItem.defaultProps = {
	iconPlacement: 'left',
	title: null,
	defaultOpen: false,
	onClick: () => {},
};

export default HierarchyItem;
