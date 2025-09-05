import React, { forwardRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { ExpandCollapseIcon, MagnifyingGlassIcon } from '../../icons';
import { TextFieldv2 as TextField } from '../../input/textFieldv2';
import styles from './HierarchyItem.module.css';

type IconPlacement = 'left' | 'right' | 'none';

interface Item {
	id?: string;
	title?: string;
	count?: number;
}

interface HierarchyItemProps {
	defaultOpen?: boolean;
	iconPlacement?: IconPlacement;
	title: ReactNode;
	count?: string | number;
	children: ReactNode;
	onClick?: (state: boolean) => void;
	onDoubleClick?: (state: boolean) => void;
	active?: boolean;
	isLastItem?: boolean;
	leftComponent: ReactNode;
	name: string;
	onSearchSubmit?: (text: string | undefined, path: string) => void;
	pathString: string;
	lastActive?: boolean;
	isSearching: boolean;
	onSearchStart?: () => void;
	list?: Item[] | boolean;
}

const HierarchyItem = forwardRef<HTMLDivElement, HierarchyItemProps>((props, ref): ReactElement => {
	const {
		defaultOpen = false,
		iconPlacement = 'left',
		title,
		children,
		onClick,
		onDoubleClick,
		active = false,
		isLastItem,
		count,
		leftComponent,
		name,
		onSearchSubmit,
		pathString,
		lastActive,
		isSearching,
		onSearchStart,
		list,
	} = props;

	const [open, setOpen] = useState(defaultOpen);
	const [searchText, setSearchText] = useState('');

	const handleSearchSubmit = () => {
		onSearchSubmit?.(searchText, pathString);
	};

	const icon = (
		<div className={styles['expand-container']}>
			<Button
				className={styles.expand}
				title=''
				size='auto'
				variant='text'
				onClick={() => {
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
			{open && <div className={classes(styles['dashed-connector-for-button'])} />}
		</div>
	);

	return (
		<div
			ref={ref}
			className={classes(
				styles.root,
				open && styles.open,
				active && !isSearching && open && styles.active,
				isSearching && styles.searching
			)}>
			<BaseCell
				flexible
				size='auto'
				className={classes(styles.header, count === undefined && styles.headerNoCount)}
				component1={list ? icon : undefined}
				component2={
					isSearching && open ? (
						<div className={styles.searchFieldWrapper}>
							<TextField
								className={styles.searchInput}
								placeholder={`Search ${name}`}
								size='md'
								type='text'
								value={searchText}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setSearchText(e.target.value);
								}}
								onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
									if (e.key === 'Enter') handleSearchSubmit();
								}}
								LeftComponent={() => {
									return leftComponent;
								}}
								RightComponent={() => {
									return (
										<Button
											title={
												<MagnifyingGlassIcon
													className={styles.searchButton}
												/>
											}
											onClick={handleSearchSubmit}
											variant='text'
											size='auto'
										/>
									);
								}}
							/>
						</div>
					) : (
						<Button
							className={classes(styles.title, list === false && styles.titleNoList)}
							flexible
							size='auto'
							variant='text'
							title=''
							onClick={(event: React.MouseEvent) => {
								const { detail } = event;
								if (detail === 1) onClick?.(open);
								else if (detail === 2) {
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
					!isSearching && open ? (
						<Button
							size='auto'
							variant='text'
							className={styles.searchWrapper}
							onClick={() => {
								return onSearchStart?.();
							}}
							title={<MagnifyingGlassIcon className={styles.searchButton} />}
						/>
					) : undefined
				}
			/>

			{!open && !isLastItem && <div className={styles['collapsed-tail-spacer']} />}
			{!isLastItem && (count === undefined || iconPlacement !== 'left') && (
				<div data-elem='connector-dot' className={classes(styles['dashed-connector'])} />
			)}

			{open && (
				<BaseCell
					size='auto'
					className={styles.body}
					component1={
						<div
							style={{
								display: isLastItem ? 'none' : 'flex',
							}}
							className={classes(lastActive ? styles['highlight-tail'] : styles.tail)}
						/>
					}
					component2={<div className={styles.children}>{children}</div>}
				/>
			)}
		</div>
	);
});

export default HierarchyItem;
