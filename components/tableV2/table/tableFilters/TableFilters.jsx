import PropTypes from 'prop-types';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { FilterIcon } from '../../../icons';
import styles from './TableFilters.module.css';
import { Skeleton } from './Skeleton';
import { Dropdown, DropdownItem } from '../../../input';

const TableFilters = (props) => {
	const {
		className,
		style,
		onSearch,
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

	const columns = headerData.map((datum) => {
		return {
			title: datum.title,
			value: datum.id,
		};
	});

	const handleColumnChange = (_, col) => {
		let items = {};
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
						title='Search Filter'
						onClick={onSearch}
						leftComponent={() => {
							return <FilterIcon className={styles.icon} />;
						}}
					/>
				)
			}
			component2={
				!disabledColumnFilter && (
					<Dropdown
						theme={theme}
						className={styles['column-dropdown']}
						placeholder='Columns'
						multi
						value={Object.keys(hiddenColumns)}
						onChange={handleColumnChange}>
						{columns.map((col) => {
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
