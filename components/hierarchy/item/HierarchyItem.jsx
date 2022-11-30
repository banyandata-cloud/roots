import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import { CaretIcon } from '../../icons';
import styles from './HierarchyItem.module.css';

const HierarchyItem = (props) => {
	const { defaultOpen, iconPlacement, title, children, onClick } = props;

	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className={classes(styles.root, open ? styles.open : '')}>
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
			<BaseCell
				size='auto'
				className={styles.body}
				component1={<div className={styles.tail} />}
				component2={<div className={styles.children}>{children}</div>}
			/>
		</div>
	);
};

HierarchyItem.propTypes = {
	iconPlacement: PropTypes.oneOf(['left', 'right', 'none']),
	title: PropTypes.node,
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
