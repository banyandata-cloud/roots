import PropTypes from 'prop-types';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { FilterIcon, CaretIcon, ColumnFilter } from '../../../icons';
import styles from './TableFilters.module.css';
import { Skeleton } from './Skeleton';
import { Dropdown, DropdownItem } from '../../../input';

const TableFilters = (props) => {
	const {
		className,
		style,
		onAdvancedFilterClick,
		headerData,
		hiddenColumns,
		setHiddenColumns,
		loading,
		disabledFilterOptions,
		theme,
	} = props;

	const { search: disabledSearch, columnFilter: disabledColumnFilter } = disabledFilterOptions;

	if (loading) {
		return <Skeleton theme={theme} />;
	}

	const columnFilters = headerData?.filter((datum) => {
		return datum.columnFilter;
	});

	const columns = columnFilters?.map((datum) => {
		return {
			title: datum.title,
			value: datum.id,
		};
	});

	const handleColumnChange = (_, col) => {
		const items = {};
		col.forEach((column) => {
			items[column] = true;
		});
		setHiddenColumns(items);
	};

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
			}}
			component1={
				!disabledSearch && (
					<Button
						size='auto'
						className={styles['icon-button']}
						color='default'
						title='Search and Filter'
						onClick={onAdvancedFilterClick}
						leftComponent={() => {
							return <FilterIcon className={styles.icon} />;
						}}
					/>
				)
			}
			component2={
				!disabledColumnFilter &&
				columnFilters.length > 0 && (
					<Dropdown
						theme={theme}
						className={styles['column-dropdown']}
						hideIcon
						placeholder={
							<Button
								size='auto'
								className={styles['icon-button']}
								color='default'
								leftComponent={() => {
									return <ColumnFilter className={styles.icon} />;
								}}
								rightComponent={() => {
									return <CaretIcon className={styles.icon} />;
								}}
								title='Columns'
							/>
						}
						multi
						customButtonTitle='Hide Columns'
						value={Object.keys(hiddenColumns ?? {})}
						onChange={handleColumnChange}>
						{columns?.map((col) => {
							return (
								<DropdownItem
									key={col.value}
									title={col.title}
									value={col.value}
									variant='checkbox'
								/>
							);
						})}
					</Dropdown>
				)
			}
		/>
	);
};

TableFilters.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	onAdvancedFilterClick: PropTypes.func,
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
	onAdvancedFilterClick: () => {},
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
