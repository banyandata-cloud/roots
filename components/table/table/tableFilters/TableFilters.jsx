import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ColumnsIcon, FilterIcon, MagnifyingGlassIcon, NutIcon, RefreshIcon } from '../../../icons';
import { Columns } from './Filters';
import { TextField } from '../../../input';
import styles from './TableFilters.module.css';

const TableFilters = (props) => {
	const {
		className,
		style,
		onRefresh,
		onSearch,
		searchValue,
		filterValue,
		headerData,
		hiddenColumns,
		setHiddenColumns,
	} = props;

	const [openColumns, setOpenColumns] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
			}}
			component1={
				<Button
					className={styles.left}
					title='Filter'
					variant='outlined'
					leftComponent={() => {
						return <FilterIcon className={styles.icon} />;
					}}
					rightComponent={() => {
						if (filterValue?.applied) {
							return (
								<div className={styles['filter-value']}>{filterValue?.applied}</div>
							);
						}
						return null;
					}}
				/>
			}
			component2={
				<TextField
					className={styles.center}
					value={searchValue}
					onChange={onSearch}
					LeftComponent={() => {
						return <MagnifyingGlassIcon className={styles.icon} />;
					}}
					placeholder='Search'
				/>
			}
			component3={
				<BaseCell
					flexible
					className={styles.right}
					component1={
						<>
							<Button
								ref={(el) => {
									setAnchorEl(el);
								}}
								size='auto'
								className={styles['icon-button']}
								variant='text'
								leftComponent={() => {
									return <ColumnsIcon className={styles.icon} />;
								}}
								onClick={() => {
									setOpenColumns((prev) => {
										return !prev;
									});
								}}
							/>
							<Columns
								anchorEl={anchorEl}
								open={openColumns}
								setOpen={setOpenColumns}
								columns={headerData}
								hiddenColumns={hiddenColumns}
								setHiddenColumns={setHiddenColumns}
							/>
						</>
					}
					component2={
						<Button
							size='auto'
							className={styles['icon-button']}
							variant='text'
							onClick={onRefresh}
							leftComponent={() => {
								return <RefreshIcon className={styles.icon} />;
							}}
						/>
					}
					component3={
						<Button
							size='auto'
							className={styles['icon-button']}
							variant='text'
							leftComponent={() => {
								return <NutIcon className={styles.icon} />;
							}}
						/>
					}
				/>
			}
		/>
	);
};

TableFilters.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	onRefresh: PropTypes.func,
	onSearch: PropTypes.func,
	searchValue: PropTypes.string,
	filterValue: PropTypes.shape({
		applied: PropTypes.number,
	}),
};

TableFilters.defaultProps = {
	className: '',
	style: {},
	onRefresh: () => {},
	onSearch: () => {},
	searchValue: null,
	filterValue: {
		applied: 4,
	},
};

export default TableFilters;
