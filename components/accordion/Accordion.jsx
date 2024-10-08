import { motion } from 'framer-motion';
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
		leftComponent: LeftComponent = CaretIcon,
		rightComponent: RightComponent,
		title,
		description,
		children,
		onClick = () => {},
		className = '',
		onExpand,
	} = props;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const { current: isControlled } = useRef(open !== undefined);

	const isOpen = isControlled ? open : uncontrolledOpen;

	return (
		<div
			className={classes(styles.root, isOpen ? styles.open : '', className)}
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
				component1={LeftComponent && <LeftComponent className={styles.icon} />}
				component2={<span className={styles.title}>{title}</span>}
				component3={RightComponent && <RightComponent className={styles.icon} />}
			/>

			{isOpen && (
				<motion.div
					key={title + description}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.2,
					}}
					data-elem='body'
					className={styles.body}>
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
				</motion.div>
			)}
		</div>
	);
};

Accordion.propTypes = {
	open: PropTypes.bool,
	onToggle: PropTypes.func,
	leftComponent: PropTypes.node,
	rightComponent: PropTypes.node,
	title: PropTypes.node,
	description: PropTypes.string,
	defaultOpen: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
	onExpand: PropTypes.func,
};

export default Accordion;
