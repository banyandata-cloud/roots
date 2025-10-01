import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { CaretIcon, ExpandArrowAltIcon } from '../icons';
// import styles from './Accordion.module.css';
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
		rightComponent: RightComponent,
		title,
		description,
		children,
		onClick,
		className = '',
		onExpand,
	} = props;

	// Internal state only used when the component is uncontrolled.
	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean | undefined>(defaultOpen);

	// Capture whether the component is controlled only once in the first render.
	const { current: isControlled } = useRef<boolean>(open !== undefined);

	const isOpen = isControlled ? open : uncontrolledOpen;

	const baseCellClasses = classes(
		'bn-flex bn-flex-row bn-items-start bn-gap-2 bn-px-4 bn-py-4 bn-cursor-pointer bn-border-none bn-bg-white',
		'hover:bn-bg-background-color4',
		'[&>[data-elem="component3"]]:bn-ml-auto',
		'[&:hover>[data-elem="component1"]>svg]:bn-fill-secondary-color1',
		'[&:hover>[data-elem="component3"]>svg]:bn-fill-secondary-color1',
		'[&:hover>[data-elem="component2"]>span]:bn-text-secondary-color1'
	);

	return (
		<div
			className={classes(
				'bn-flex bn-flex-col bn-justify-start bn-items-stretch bn-w-full',
				className
			)}
			data-state-open={isOpen}>
			<BaseCell
				flexible
				size='auto'
				RootDOM='button'
				className={baseCellClasses}
				attrs={{
					onClick: () => {
						if (isControlled) {
							onToggle?.(open);
						} else {
							setUncontrolledOpen((prevState) => {
								const newState = !prevState;
								onClick?.(newState);
								return newState;
							});
						}
					},
				}}
				component1={
					LeftComponent && (
						<LeftComponent
							className={classes(
								' bn-w-6 bn-h-6 bn-fill-text-color bn-transition-transform bn-duration-300 bn-ease-in-out',
								isOpen ? 'bn-rotate-0' : 'bn-rotate-90'
							)}
						/>
					)
				}
				component2={
					<span className='bn-flex-1 bn-select-none bn-text-text-color '>{title}</span>
				}
				component3={
					RightComponent && (
						<RightComponent className='bn-w-6 bn-h-6 bn-fill-text-color ' />
					)
				}
			/>

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
					data-elem='body'
					className='bn-flex bn-flex-col bn-items-start bn-px-10 bn-py-2 bn-w-full'>
					{description && <p>{description}</p>}
					{children}
					{onExpand && (
						<Button
							size='auto'
							variant='text'
							onClick={() => {
								onExpand();
							}}
							title={<ExpandArrowAltIcon className='bn-w-6 bn-h-6' />}
						/>
					)}
				</motion.div>
			)}
		</div>
	);
}

export default Accordion;
