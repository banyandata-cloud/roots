import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { CaretIcon, ExpandArrowAltIcon } from '../icons';
import styles from './Accordion.module.css';
import { Skeleton } from './Skeleton';

const Accordion = (props) => {
	const {
		open,
		onToggle,
		defaultOpen,
		leftComponent: LeftComponent,
		rightComponent: RightComponent,
		title,
		description,
		children,
		onClick,
		className,
		onExpand,
		loading,
		fallback,
		theme,
	} = props;

	// uncontrolled
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const { current: isControlled } = useRef(open !== undefined);

	const isOpen = isControlled ? open : uncontrolledOpen;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

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
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={title + description}
						initial={{
							maxHeight: 0,
							opacity: 0,
						}}
						animate={{
							maxHeight: 500,
							opacity: 1,
						}}
						exit={{
							maxHeight: 0,
							opacity: 0,
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
			</AnimatePresence>
		</div>
	);
};

Accordion.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
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
	theme: PropTypes.oneOf(['light', 'dark']),
};

Accordion.defaultProps = {
	loading: false,
	fallback: false,
	open: undefined,
	onToggle: null,
	leftComponent: CaretIcon,
	rightComponent: null,
	title: null,
	description: null,
	defaultOpen: false,
	onClick: () => {},
	className: '',
	onExpand: null,
	theme: 'dark',
};

export default Accordion;
