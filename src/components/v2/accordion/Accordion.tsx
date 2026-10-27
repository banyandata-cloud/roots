import { motion } from 'framer-motion';
import { useId, useRef, useState } from 'react';
import { classes } from '../utils';
import { Button } from '../buttons';
import { CaretIcon, ExpandArrowAltIcon } from '../icons';
import styles from './Accordion.module.scss';
import type { AccordionProps } from './types';

/**
 * Accordion – A simple disclosure component with an optional left and right icon.
 *
 * This component works in both **controlled** and **uncontrolled** modes.
 * - In controlled mode supply the `open` prop and handle the state change in `onToggle`.
 * - In uncontrolled mode omit the `open` prop and optionally set `defaultOpen`.
 */
export function Accordion(props: AccordionProps) {
	const {
		open,
		onToggle,
		defaultOpen,
		leftComponent: LeftComponent = CaretIcon,
		// rightComponent: RightComponent,
		title,
		description,
		children,
		onClick,
		className = '',
		onExpand,
		disabled = false,
	} = props;

	// Internal state only used when the component is uncontrolled.
	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean | undefined>(defaultOpen);

	// Capture whether the component is controlled only once in the first render.
	const { current: isControlled } = useRef<boolean>(open !== undefined);

	const isOpen = isControlled ? open : uncontrolledOpen;

	const baseId = useId();
	const headerId = `${baseId}-header`;
	const bodyId = `${baseId}-body`;

	return (
		<div
			className={classes(
				styles.root,
				isOpen ? styles.open : '',
				className,
				disabled ? styles.disabled : ''
			)}
			data-state-open={isOpen}
		>
			<button
				id={headerId}
				data-elem='base-cell'
				className={styles.header}
				onClick={() => {
					if (isControlled) {
						onToggle?.(open);
					} else {
						setUncontrolledOpen((prevState) => {
							const newState = !prevState;
							onClick?.(newState);
							return newState;
						});
					}
				}}
				disabled={disabled}
				aria-disabled={disabled}
				aria-expanded={Boolean(isOpen)}
				aria-controls={isOpen ? bodyId : undefined}
			>
				<span data-elem='component2'>
					<span className={styles.title}>{title}</span>
				</span>
				{LeftComponent && (
					<span data-elem='component3'>
						<LeftComponent />
					</span>
				)}
			</button>

			{isOpen && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.2,
					}}
					id={bodyId}
					role='region'
					aria-labelledby={headerId}
					data-elem='body'
					className={styles.body}
				>
					{description && <p>{description}</p>}
					{children}
					{onExpand && (
						<Button
							size='auto'
							variant='ghost'
							onClick={() => {
								onExpand();
							}}
							title={<ExpandArrowAltIcon className={styles.expand} />}
						/>
					)}
				</motion.div>
			)}
		</div>
	);
}

export default Accordion;
