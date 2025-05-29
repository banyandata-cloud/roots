import { useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { CaretIcon } from '../../icons';
import styles from './HierarchyItem.module.css';
import type { ReactElement, ReactNode } from 'react';

type IconPlacement = 'left' | 'right' | 'none';

interface HierarchyItemProps {
	defaultOpen?: boolean;
	iconPlacement?: IconPlacement;
	title: ReactNode;
	children: ReactNode;
	onClick?: (state: boolean) => void;
	onDoubleClick?: (state: boolean) => void;
	active?: boolean;
}

const HierarchyItem = (props: HierarchyItemProps): ReactElement => {
	const {
		defaultOpen = false,
		iconPlacement = 'left',
		title,
		children,
		onClick,
		onDoubleClick,
		active = false,
	} = props;

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
		<div className={classes(styles.root, open ? styles.open : '', active ? styles.active : '')}>
			<BaseCell
				flexible
				size='auto'
				className={styles.header}
				component1={iconPlacement === 'left' ? icon : undefined}
				component2={
					<Button
						className={styles.title}
						flexible
						size='auto'
						variant='text'
						color='default'
						onClick={(event: React.MouseEvent) => {
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
				component3={iconPlacement === 'right' ? icon : undefined}
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

export default HierarchyItem;
