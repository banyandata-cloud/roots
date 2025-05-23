import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

import { useRef, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { CaretIcon, ExpandArrowAltIcon } from '../icons';
import styles from './Accordion.module.css';

interface AccordionProps {
	open?: boolean;
	onToggle?: (open: boolean) => void;
	defaultOpen?: boolean;
	leftComponent?: React.ComponentType<{ className?: string }>;
	rightComponent?: React.ComponentType<{ className?: string }>;
	title: ReactNode;
	description?: string;
	children?: ReactNode;
	onClick?: (isOpen: boolean) => void;
	className?: string;
	onExpand?: () => void;
}

const Accordion = (props: AccordionProps): ReactElement => {
	const {
		open,
		onToggle,
		defaultOpen = false,
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

	// Create a safe key that handles null/undefined cases
	const contentKey = `${typeof title === 'string' ? title : 'accordion'}${
		description ? `-${description}` : ''
	}`;

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
							onToggle?.(!open);
						} else {
							setUncontrolledOpen((prevState) => {
								const newState = !prevState;
								onClick(newState);
								return newState;
							});
						}
					},
				}}
				component1={
					LeftComponent ? <LeftComponent className={styles.icon ?? ''} /> : undefined
				}
				component2={<span className={styles.title}>{title}</span>}
				component3={
					RightComponent ? <RightComponent className={styles.icon ?? ''} /> : undefined
				}
			/>

			{isOpen && (
				<motion.div
					key={contentKey}
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
					{...({ className: styles.body } as HTMLMotionProps<'div'>)}>
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

export default Accordion;
