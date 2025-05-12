import { useState } from 'react';
import { classes, inputHelper } from '../../../../../../utils';
import { Button } from '../../../../../buttons';
import { BaseCell } from '../../../../../cell';
import { AngleDoubleIcon, CrossIcon } from '../../../../../icons';
import { DropdownItem, TextField } from '../../../../../input';
import { Popover } from '../../../../../popover';
import styles from './Columns.module.css';

const Columns = (props) => {
	const { open, setOpen, anchorEl, columns, hiddenColumns, setHiddenColumns, theme } = props;

	const [expanded, setExpanded] = useState(false);
	const [search, setSearch] = useState(null);

	return (
		<Popover
			theme={theme}
			anchorEl={anchorEl}
			open={open}
			setOpen={setOpen}
			className={styles.popover}
			onClose={() => {
				setSearch(null);
			}}>
			<div className={classes(styles.root, expanded ? styles.expanded : '')}>
				<BaseCell
					size='auto'
					className={styles.header}
					component1='Columns'
					component2={
						<Button
							className={styles.close}
							size='auto'
							radius='round'
							variant='text'
							leftComponent={() => {
								return <CrossIcon className={styles.icon} />;
							}}
							onClick={() => {
								setOpen(false);
							}}
						/>
					}
				/>
				<div className={styles.body}>
					<TextField
						className={styles.search}
						placeholder='Search'
						value={search}
						onChange={(e) => {
							const { fieldValue } = inputHelper(e);
							setSearch(fieldValue);
						}}
					/>
					<div className={styles.columns}>
						{columns
							?.filter((col) => {
								return (
									(col?.id?.toLowerCase().indexOf(search?.toLowerCase()) !== -1 &&
										search != null &&
										search !== '') ||
									search == null ||
									search === ''
								);
							})
							.map((col) => {
								const selected = [null, false, undefined].includes(
									hiddenColumns?.[col?.id]
								);
								return (
									<DropdownItem
										className={styles.item}
										key={col.id}
										selected={selected}
										title={col.title}
										variant='checkbox'
										onClick={() => {
											if (selected) {
												setHiddenColumns({
													...hiddenColumns,
													[col.id]: true,
												});
											} else {
												setHiddenColumns({
													...hiddenColumns,
													[col.id]: false,
												});
											}
										}}
									/>
								);
							})}
					</div>
				</div>
				<div className={styles.footer}>
					<Button
						className={styles.expand}
						color='default'
						title={expanded ? 'See Less' : 'See More'}
						rightComponent={
							!expanded &&
							(() => {
								return <AngleDoubleIcon className={styles.icon} />;
							})
						}
						leftComponent={
							expanded &&
							(() => {
								return <AngleDoubleIcon className={styles.icon} />;
							})
						}
						onClick={() => {
							setExpanded((prev) => {
								return !prev;
							});
						}}
					/>
				</div>
			</div>
		</Popover>
	);
};

export default Columns;
