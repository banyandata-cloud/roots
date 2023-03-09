import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { CaretIcon, ExpandArrowAltIcon } from '../icons';
import styles from './Accordion.module.css';

const Accordion = (props) => {
	const {
		open,
		onToggle,
		defaultOpen,
		iconPlacement,
		title,
		description,
		children,
		onClick,
		className,
		onExpand,
	} = props;

	// uncontrolled
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const { current: isControlled } = useRef(open !== undefined);

	const isOpen = isControlled ? open : uncontrolledOpen;

	return (
		<div
			className={classes(className, styles.root, isOpen ? styles.open : '')}
			data-state-open={isOpen}>
			<BaseCell
				flexible
				size='auto'
				rootDOM='button'
				className={styles.header}
				attrs={{
					onClick: () => {
						if (isControlled) {
							onToggle(open);
						} else {
							setUncontrolledOpen((prevState) => {
								const newState = !prevState;
								onClick(newState);
								return newState;
							});
						}
					},
				}}
				component1={iconPlacement === 'left' && <CaretIcon className={styles.icon} />}
				component2={<span className={styles.title}>{title}</span>}
				component3={iconPlacement === 'right' && <CaretIcon className={styles.icon} />}
			/>
			<div data-elem='body' className={styles.body}>
				{description && <p>{description}</p>}
				{children}
				{onExpand && (
					<Button
						size='auto'
						variant='text'
						onClick={() => {
							onExpand();
						}}
						rightComponent={() => {
							return <ExpandArrowAltIcon className={styles.expand} />;
						}}
					/>
				)}
			</div>
		</div>
	);
};

Accordion.propTypes = {
	open: PropTypes.bool,
	onToggle: PropTypes.func,
	iconPlacement: PropTypes.oneOf(['left', 'right', 'none']),
	title: PropTypes.node,
	description: PropTypes.string,
	defaultOpen: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
	onExpand: PropTypes.func,
};

Accordion.defaultProps = {
	open: undefined,
	onToggle: null,
	iconPlacement: 'left',
	title: null,
	description: null,
	defaultOpen: false,
	onClick: () => {},
	className: '',
	onExpand: null,
};

export default Accordion;
