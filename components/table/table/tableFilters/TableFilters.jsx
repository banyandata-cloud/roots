import PropTypes from 'prop-types';
import { useState } from 'react';
import { classes, inputHelper } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import {
	AlertIcon,
	CaretIcon,
	ColumnFilter,
	CrossIcon,
	FilterIcon,
	SearchIcon,
} from '../../../icons';
import { Dropdownv2, DropdownItemv2, TextFieldv2 } from '../../../input';
import { Text } from '../../../text';
import { Skeleton } from './Skeleton';
import styles from './TableFilters.module.css';

const TableFilters = (props) => {
	const {
		className = '',
		style = {},
		onAdvancedFilterClick = () => {},
		headerData,
		hiddenColumns,
		setHiddenColumns,
		loading = null,
		disabledFilterOptions = {
			filterButton: false,
			refresh: false,
			columnFilter: false,
			settings: false,
		},
		theme = 'light',
		tableTitleIcon: TableTitleCustomIcon,
		tableTitleText,
		tableDescriptionText,
		onClear,
		v2,
		customSearchIcon: CustomSearchIcon,
		onSearch,
	} = props;

	const { search: disabledSearch, columnFilter: disabledColumnFilter } = disabledFilterOptions;

	const [search, setSearch] = useState();

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

	return v2 ? (
		<BaseCell
			flexible
			className={classes(styles.v2, className)}
			attrs={{
				style,
			}}
			component1={
				<div className={styles.details}>
					<Text variant='b1' weight={600}>
						{tableTitleText}
					</Text>
					<Text variant='b2' weight={400}>
						{tableDescriptionText}
					</Text>
				</div>
			}
			component2={
				<TextFieldv2
					className={styles.search}
					placeholder='Search'
					value={search}
					onChange={(e) => {
						const { fieldValue } = inputHelper(e);
						setSearch(fieldValue);
					}}
					LeftComponent={() => {
						return (
							CustomSearchIcon && (
								<CustomSearchIcon className={styles['custom-search-icon']} />
							)
						);
					}}
					RightComponent={() => {
						return (
							<div className={styles['search-icon']}>
								<SearchIcon
									className={styles['search-icon']}
									onClick={() => {
										onSearch(search);
									}}
								/>
							</div>
						);
					}}
				/>
			}
			component3={
				<div className={styles.filters}>
					{!disabledSearch && (
						<Button
							size='auto'
							className={styles['icon-button']}
							color='default'
							title='Advanced Filter'
							onClick={onAdvancedFilterClick}
							leftComponent={() => {
								return <FilterIcon className={styles.icon} v2 />;
							}}
						/>
					)}
					{/* {!disabledColumnFilter && columnFilters.length > 0 && ( */}
					<Dropdownv2
						theme={theme}
						className={styles['column-dropdown']}
						hideIcon
						placeholder={
							<Button
								size='auto'
								className={styles['icon-button']}
								color='default'
								leftComponent={() => {
									return <ColumnFilter className={styles.icon} v2 />;
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
								<DropdownItemv2
									key={col.value}
									title={col.title}
									value={col.value}
									variant='checkbox'
								/>
							);
						})}
					</Dropdownv2>
					{/* )} */}
				</div>
			}
		/>
	) : (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
			}}
			component1={
				tableTitleText && (
					<div>
						{TableTitleCustomIcon ?? <AlertIcon.Info />}
						<Text variant='b1' weight={500}>
							{tableTitleText}
						</Text>
					</div>
				)
			}
			component2={
				!disabledSearch && (
					<>
						{onClear && (
							<Button
								size='auto'
								className={styles['clear-button']}
								color='default'
								onClick={onClear}
								title='Clear Filters'
								leftComponent={() => {
									return <CrossIcon className={styles.cross} />;
								}}
							/>
						)}
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
					</>
				)
			}
			component3={
				!disabledColumnFilter &&
				columnFilters.length > 0 && (
					<Dropdownv2
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
								<DropdownItemv2
									key={col.value}
									title={col.title}
									value={col.value}
									variant='checkbox'
								/>
							);
						})}
					</Dropdownv2>
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
	loading: PropTypes.bool,
	disabledFilterOptions: PropTypes.shape({
		filterButton: PropTypes.bool,
		refresh: PropTypes.bool,
		columnFilter: PropTypes.bool,
		settings: PropTypes.bool,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
	tableTitleText: PropTypes.string,
	tableTitleIcon: PropTypes.node,
};

export default TableFilters;
