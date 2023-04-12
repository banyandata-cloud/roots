import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import {
	ColumnsIcon,
	FilterIcon,
	MagnifyingGlassIcon,
	SettingsIcon,
	RefreshIcon,
} from '../../../icons';
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
		theme,
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
		return <Skeleton theme={theme} />;
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
										color='default'
										leftComponent={() => {
											return <ColumnsIcon className={styles.icon} />;
										}}
										title='Columns'
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
										theme={theme}
									/>
								</>
							)
						}
						component2={
							!disabledRefresh && (
								<Button
									size='auto'
									className={styles['icon-button']}
									color='default'
									title='Refresh'
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
									color='default'
									title='Settings'
									leftComponent={() => {
										return <SettingsIcon className={styles.icon} />;
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
	disabledFilterOptions: PropTypes.shape({
		filterButton: PropTypes.bool,
		refresh: PropTypes.bool,
		columnFilter: PropTypes.bool,
		settings: PropTypes.bool,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
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
	disabledFilterOptions: {
		filterButton: false,
		refresh: false,
		columnFilter: false,
		settings: false,
	},
	theme: 'light',
};

export default TableFilters;
