import PropTypes from 'prop-types';
import {
	//  createRef,
	useCallback,
	useRef,
	useState,
} from 'react';
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
import TableChipItem from '../tableChips/tableChipItem/TableChipItem';

const TableFilters = (props) => {
	const {
		className,
		style,
		onRefresh,
		searchOptions,
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
	// const filterRefs = useRef([]);

	const hideRightOptions = disabledColumnFilter && disabledRefresh && disabledSettings;
	const ref = useRef(null);

	const {
		onSearch,
		onRemove,
		onLock,
		selectedFilters,
		renderChipAutocomplete,
		searchbarOptions,
	} = searchOptions;

	const totalFilters = selectedFilters?.length ?? 0;

	const renderFilters = useCallback(() => {
		const filtersDOM = selectedFilters?.map((selectedFilter, index) => {
			// if (index === 0) {
			// filterRefs.current = [];
			// }
			// const filterRef = createRef();
			// filterRefs.current.push(filterRef);
			return (
				<TableChipItem
					// ref={filterRef}
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					{...selectedFilter}
					onRemove={() => {
						onRemove(selectedFilter, index);
					}}
					autocompleteOptions={{
						...selectedFilter.autocompleteOptions,
						render: renderChipAutocomplete,
					}}
					onSearch={onSearch}
					onKeyDown={(event) => {
						onLock(event, index);
					}}
				/>
			);
		});
		return (
			<>
				<MagnifyingGlassIcon className={styles.icon} />
				{filtersDOM}
			</>
		);
	}, [totalFilters]);

	if (loading) {
		return <Skeleton theme={theme} />;
	}

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
				// onBlur,
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
					{...searchbarOptions}
					ref={ref}
					className={styles.center}
					// {...searchOptions}
					onFocus={() => {
						searchOptions?.onFocus?.();
						// if (filterRefs?.current?.length > 0) {
						// const lastFilter = filterRefs?.current?.slice(-1);
						// lastFilter?.current?.focusLabel();
						// }
					}}
					onKeyDown={(event) => {
						if (event.keyCode === 8) {
							onRemove(null, (selectedFilters?.length ?? 0) - 1);
						}
					}}
					LeftComponent={renderFilters}
					placeholder={selectedFilters?.length > 0 ? '' : 'Search'}
					// disabled={selectedFilters?.length > 0}
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
	// eslint-disable-next-line react/forbid-prop-types
	searchOptions: PropTypes.object,
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
	searchOptions: {},
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
