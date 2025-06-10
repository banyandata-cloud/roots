import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes, inputHelper } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ArrowIcon, ColumnFilter, CrossIcon, FilterIcon, SearchIcon } from '../../../icons';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../../../input';
import { Text } from '../../../text';
import styles from './TableFilters.module.css';

const TableFilters = (props) => {
	const {
		className = '',
		style = {},
		headerData = [],
		hiddenColumns,
		setHiddenColumns,
		disabledFilterOptions = {},
		tableTitleText = '',
		tableDescriptionText = '',
		onSearch = () => {},
		onClear,
		searchPlaceholder = '',
		toggleDrawer = () => {},
		filtersCount,
		searchDisabled,
		rightActions = () => {},
	} = props;

	const { search: disabledSearch = true } = disabledFilterOptions;

	const [search, setSearch] = useState('');

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

	const getAdvancedFilterTitle = () => {
		if (!filtersCount) {
			return;
		}

		if (filtersCount > 0) {
			if (filtersCount === 1) {
				return `${filtersCount}`;
			}
			return `${filtersCount}`;
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onSearch(search);
		}
	};

	const hideActions = columnFilters.length === 0 && disabledSearch && !rightActions;

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
			}}
			component1={
				<div className={styles.details}>
					<Text variant='b1' weight={600}>
						{tableTitleText}
					</Text>
					<Text className={styles.description} variant='b2' weight={400}>
						{tableDescriptionText}
					</Text>
				</div>
			}
			component2={
				!searchDisabled && (
					<>
						<TextFieldv2
							className={styles.search}
							placeholder={searchPlaceholder}
							value={search}
							onKeyDown={handleKeyDown}
							onChange={(e) => {
								const { fieldValue } = inputHelper(e);
								setSearch(fieldValue);
							}}
							LeftComponent={() => {
								return <SearchIcon className={styles.icon} />;
							}}
						/>
						<Button
							className={classes(styles['search-button'], onClear && styles.clear)}
							onClick={() => {
								if (onClear) {
									onClear();
									setSearch('');
									return;
								}
								onSearch(search);
							}}
							leftComponent={() => {
								if (onClear) {
									return <CrossIcon className={styles.icon} />;
								}

								return <ArrowIcon className={classes(styles.icon, styles.arrow)} />;
							}}
						/>
					</>
				)
			}
			{...(!hideActions && {
				component3: (
					<div className={styles.filters}>
						{rightActions?.({
							toggleDrawer,
						})}
						{!disabledSearch && (
							<Button
								size='auto'
								className={classes(
									styles['adv-filter'],
									filtersCount > 0 ? styles.filter : ''
								)}
								title={getAdvancedFilterTitle()}
								onClick={() => {
									toggleDrawer({
										data: {
											index: 0,
											standalone: true,
										},
									});
								}}
								leftComponent={() => {
									return <FilterIcon className={styles.icon} v2 />;
								}}
							/>
						)}
						{columnFilters.length > 0 && (
							<Dropdownv2
								className={styles['column-dropdown']}
								popperClassName={styles['column-dropdown-popper']}
								leftComponent={{
									Active: () => {
										return <ColumnFilter className={styles.icon} v2 active />;
									},
									InActive: () => {
										return <ColumnFilter className={styles.icon} v2 />;
									},
								}}
								placeholder=''
								multi
								multiSelectActionTitle='Hide'
								valueAsCount
								formatter={(totalSelected) => {
									return (
										<Text
											weight={500}
											className={classes(
												styles.value,
												!totalSelected ? styles.hide : ''
											)}>
											{totalSelected}
										</Text>
									);
								}}
								value={Object.keys(hiddenColumns ?? {})}
								onChange={handleColumnChange}>
								{columns?.map((col) => {
									return (
										<DropdownItemv2
											key={col.value}
											title={col.title}
											value={col.value}
											variant='checkbox'
										/>
									);
								})}
							</Dropdownv2>
						)}
					</div>
				),
			})}
		/>
	);
};

TableFilters.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	onAdvancedFilterClick: PropTypes.func,
	disabledFilterOptions: PropTypes.shape({
		filterButton: PropTypes.bool,
		refresh: PropTypes.bool,
		columnFilter: PropTypes.bool,
		settings: PropTypes.bool,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
	tableTitleText: PropTypes.string,
};

export default TableFilters;
