import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { CaretIcon } from '../../icons';
import styles from './HierarchyItem.module.css';

const HierarchyItem = (props) => {
	const { defaultOpen, iconPlacement, title, children, onClick, onDoubleClick } = props;

	const [open, setOpen] = useState(defaultOpen);

	const icon = (
		<Button
			className={styles.expand}
			size='auto'
			variant='text'
			color='default'
			onClick={() => {
				setOpen((prevState) => {
					const newState = !prevState;
					onClick?.(newState);
					onDoubleClick?.(newState);
					return newState;
				});
			}}
			leftComponent={() => {
				return <CaretIcon className={styles.icon} />;
			}}
		/>
	);

	return (
		<div className={classes(styles.root, open ? styles.open : '')}>
			<BaseCell
				flexible
				size='auto'
				className={styles.header}
				component1={iconPlacement === 'left' && icon}
				component2={
					<Button
						className={styles.title}
						flexible
						size='auto'
						variant='text'
						color='default'
						onClick={(event) => {
							const { detail } = event;

							// single click
							if (detail === 1) {
								onClick?.(open);
								// double click
							} else if (detail === 2) {
								setOpen((prevState) => {
									const newState = !prevState;
									onDoubleClick?.(newState);
									return newState;
								});
							}
						}}
						leftComponent={() => {
							return title;
						}}
					/>
				}
				component3={iconPlacement === 'right' && icon}
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
