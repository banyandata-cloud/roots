import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ColumnsIcon, FilterIcon, MagnifyingGlassIcon, NutIcon, RefreshIcon } from '../../../icons';
import { Columns } from './Filters';
import { TextField } from '../../../input';
import styles from './TableFilters.module.css';
import { Skeleton } from './Skeleton';

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
		loading,
		disabledFilterOptions,
	} = props;

	const [openColumns, setOpenColumns] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const {
		filterButton: disabledFilterButton,
		refresh: disabledRefresh,
		columnFilter: disabledColumnFilter,
		settings: disabledSettings,
	} = disabledFilterOptions;

	const hideRightOptions = disabledColumnFilter && disabledRefresh && disabledSettings;

	if (loading) {
		return <Skeleton />;
	}

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
			}}
			component1={
				!disabledFilterButton && (
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
									<div className={styles['filter-value']}>
										{filterValue?.applied}
									</div>
								);
							}
							return null;
						}}
					/>
				)
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
				!hideRightOptions && (
					<BaseCell
						flexible
						className={styles.right}
						component1={
							!disabledColumnFilter && (
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
							)
						}
						component2={
							!disabledRefresh && (
								<Button
									size='auto'
									className={styles['icon-button']}
									variant='text'
									onClick={onRefresh}
									leftComponent={() => {
										return <RefreshIcon className={styles.icon} />;
									}}
								/>
							)
						}
						component3={
							!disabledSettings && (
								<Button
									size='auto'
									className={styles['icon-button']}
									variant='text'
									leftComponent={() => {
										return <NutIcon className={styles.icon} />;
									}}
								/>
							)
						}
					/>
				)
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
	loading: PropTypes.bool,
};

TableFilters.defaultProps = {
	className: '',
	style: {},
	onRefresh: () => {},
	onSearch: () => {},
	searchValue: null,
	filterValue: {
		applied: null,
	},
	loading: null,
};

export default TableFilters;
