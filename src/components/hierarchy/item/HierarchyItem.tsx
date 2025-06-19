import React, { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { SearchButton, ExpandCollapseIcon } from '../../icons';
import styles from './HierarchyItem.module.css';
import { TextFieldv2 as TextField } from '../../input/textFieldv2';

type IconPlacement = 'left' | 'right' | 'none';

interface HierarchyItemProps {
	defaultOpen?: boolean;
	iconPlacement?: IconPlacement;
	title: ReactNode;
	count: string;
	children: ReactNode;
	onClick?: (state: boolean) => void;
	onDoubleClick?: (state: boolean) => void;
	active?: boolean;
	isLastItem?: boolean;
	isSingleItem?: boolean;
	leftComponent: ReactNode;
	name: string;
	onSearchSubmit?: (text: string, path: string) => void;
	pathString: string;
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
		isLastItem,
		isSingleItem,
		count,
		leftComponent,
		name,
		onSearchSubmit,
		pathString,
	} = props;

	const [open, setOpen] = useState(defaultOpen);
	const [isSearching, setIsSearching] = useState(false);
	const [searchText, setSearchText] = useState('');

	const icon = (
		<div className={styles['expand-container']}>
			<Button
				className={styles.expand}
				size='auto'
				variant='text'
				color='default'
				onClick={() => {
					setIsSearching(false);

					setOpen((prevState) => {
						const newState = !prevState;
						onClick?.(newState);
						onDoubleClick?.(newState);
						return newState;
					});
				}}
				leftComponent={() => {
					return (
						<ExpandCollapseIcon
							className={classes(
								styles.icon,
								open ? styles.iconClosed : styles.iconOpen
							)}
							open={open}
						/>
					);
				}}
			/>
			{!open && !isLastItem && <span className={styles['collapsed-tail']} />}
			{open && (
				<div
					className={classes(
						styles['dashed-connector']
						// isLastItem && styles['hidden-connector']
					)}
				/>
			)}
		</div>
	);

	const handleSearchSubmit = () => {
		setIsSearching(false);
		onSearchSubmit?.(searchText, pathString);
	};

	console.log('isLastItem', isLastItem, 'name', name);

	return (
		<div
			className={classes(
				styles.root,
				open && styles.open,
				active && styles.active,
				isSearching && styles.searching
				// isLastItem && styles.isLastItem
			)}>
			<BaseCell
				flexible
				size='auto'
				className={styles.header}
				component1={iconPlacement === 'left' ? icon : undefined}
				component2={
					isSearching && open ? (
						<div className={styles.searchFieldWrapper}>
							<TextField
								label={null}
								className={styles.searchInput}
								placeholder={`Search ${name}`}
								size='md'
								type='text'
								value={searchText}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setSearchText(e.target.value);
								}}
								LeftComponent={() => {
									return leftComponent;
								}}
								RightComponent={() => {
									return (
										<Button
											title={<SearchButton />}
											onClick={handleSearchSubmit}
											variant='text'
											size='auto'
											color='default'
										/>
									);
								}}
							/>
						</div>
					) : (
						<Button
							className={styles.title}
							flexible
							size='auto'
							variant='text'
							color='default'
							onClick={(event: React.MouseEvent) => {
								const { detail } = event;
								if (detail === 1) onClick?.(open);
								else if (detail === 2 && count) {
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
					)
				}
				component3={
					!isSearching && count && open ? (
						<Button
							size='auto'
							variant='text'
							color='default'
							className={styles.searchWrapper}
							onClick={() => {
								setIsSearching(true);
							}}
							title={<SearchButton />}
						/>
					) : undefined
				}
			/>
			{!open && !isLastItem && <div className={styles['collapsed-tail-spacer']} />}
			<BaseCell
				size='auto'
				className={styles.body}
				component1={
					<div
						style={{
							display: isLastItem ? 'none' : 'flex',
						}}
						className={styles.tail}
					/>
				}
				component2={<div className={styles.children}>{children}</div>}
			/>
		</div>
	);
};

export default HierarchyItem;
