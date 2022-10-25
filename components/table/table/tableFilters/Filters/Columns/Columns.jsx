import { useState } from 'react';
import { classes, inputHelper } from '../../../../../../utils';
import { Button, Chip } from '../../../../../buttons';
import { BaseCell } from '../../../../../cell';
import { AngleDoubleIcon, CrossIcon } from '../../../../../icons';
import { DropdownItem, TextField } from '../../../../../input';
import { Popover } from '../../../../../popover';
import styles from './Columns.module.css';

const Columns = (props) => {
	const { open, setOpen, anchorEl, columns, hiddenColumns, setHiddenColumns } = props;

	const [expanded, setExpanded] = useState(false);
	const [search, setSearch] = useState(null);

	return (
		<Popover
			anchorEl={anchorEl}
			open={open}
			setOpen={setOpen}
			className={styles.popover}
			onClose={() => {
				setSearch(null);
			}}>
			<div className={classes(styles.root, expanded ? styles.expanded : '')}>
				<BaseCell
					className={styles.header}
					component1='Columns'
					component2={
						<TextField
							className={styles.search}
							placeholder='Search Column name'
							value={search}
							onChange={(e) => {
								const { fieldValue } = inputHelper(e);
								setSearch(fieldValue);
							}}
						/>
					}
				/>
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
				<div className={styles.body}>
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
				<div className={styles.footer}>
					<Chip
						className={styles.expand}
						size='sm'
						radius='ellipse'
						color='default'
						title={expanded ? 'See Less' : 'See More'}
						rightComponent={() => {
							return <AngleDoubleIcon className={styles.icon} />;
						}}
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
