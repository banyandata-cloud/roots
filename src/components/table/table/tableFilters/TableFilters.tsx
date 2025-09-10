import type { TableProps } from 'components/table/types';
import {
	useState,
	type Dispatch,
	type KeyboardEvent,
	type ReactElement,
	type ReactNode,
	type SetStateAction,
	type SyntheticEvent,
} from 'react';
import { classes, inputHelper } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ArrowIcon, ColumnFilter, CrossIcon, FilterIcon, SearchIcon } from '../../../icons';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../../../input';
import { Text } from '../../../text';
import styles from './TableFilters.module.css';

interface TableFiltersProps extends Pick<TableProps, 'headerData' | 'className'> {
	hiddenColumns?: Record<string, boolean | null> | undefined;
	setHiddenColumns: Dispatch<SetStateAction<Record<string, boolean | null> | undefined>>;
	tableTitleText: string;
	tableDescriptionText?: string | ReactNode | undefined;
	filtersCount?: number | undefined;
	searchPlaceholder?: string | undefined;
	toggleDrawer?: ((props: Record<string, unknown>) => void) | undefined;
	rightActions?: ((props: Record<string, unknown>) => ReactElement) | undefined;
	onClear?: (() => void) | undefined;
	onSearch?: ((search: string) => void) | undefined;
	disabledFilterOptions?:
		| {
				search?: boolean;
		  }
		| undefined;
}

const TableFilters = (props: TableFiltersProps) => {
	const {
		className = '',
		headerData = [],
		hiddenColumns,
		setHiddenColumns,
		disabledFilterOptions,
		tableTitleText = '',
		tableDescriptionText = '',
		onSearch,
		onClear,
		searchPlaceholder = '',
		toggleDrawer,
		filtersCount = 0,
		rightActions,
	} = props;

	const { search: disabledSearch = true } = disabledFilterOptions ?? {};

	const [search, setSearch] = useState<string>('');

	const columnFilters = headerData.filter((datum) => {
		return datum.columnFilter;
	});

	const columns = columnFilters.map((datum) => {
		return {
			title: datum.title,
			value: datum.id,
		};
	});

	const handleColumnChange = (_: SyntheticEvent, col: string | string[] | null | undefined) => {
		const items: SetStateAction<Record<string, boolean | null> | undefined> = {};
		if (Array.isArray(col)) {
			col.forEach((column: string) => {
				items[column] = true;
			});
		}
		setHiddenColumns(items);
	};

	const getAdvancedFilterTitle = () => {
		if (!filtersCount) {
			return '';
		}

		if (filtersCount > 0) {
			if (filtersCount === 1) {
				return filtersCount;
			}
			return filtersCount;
		}
		return '';
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			onSearch?.(search);
		}
	};

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
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
			{...{
				component2: (
					<div className={styles.filters}>
						{onSearch && (
							<div className={styles.searchContainer}>
								<TextFieldv2
									className={styles.search}
									placeholder={searchPlaceholder}
									value={search}
									onKeyDown={handleKeyDown}
									onChange={(e) => {
										const { fieldValue } = inputHelper(e);
										setSearch(fieldValue as string);
									}}
									LeftComponent={() => {
										return <SearchIcon className={styles.icon} />;
									}}
								/>
								<Button
									className={classes(
										styles['search-button'],
										onClear && styles.clear
									)}
									onClick={() => {
										if (onClear) {
											onClear();
											setSearch('');
											return;
										}
										onSearch?.(search);
									}}
									title={
										onClear ? (
											<CrossIcon className={styles.icon} />
										) : (
											<ArrowIcon
												className={classes(styles.icon, styles.arrow)}
											/>
										)
									}
								/>
							</div>
						)}
						{rightActions?.({
							toggleDrawer,
						})}
						{disabledSearch && (
							<Button
								size='auto'
								className={classes(
									styles['adv-filter'],
									filtersCount > 0 ? styles.filter : ''
								)}
								title={<FilterIcon className={styles.icon} v2 />}
								onClick={() => {
									toggleDrawer?.({
										data: {
											index: 0,
											standalone: true,
										},
									});
								}}
								{...(getAdvancedFilterTitle() && {
									rightComponent: () => {
										return getAdvancedFilterTitle();
									},
								})}
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
								{columns.map((col) => {
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
			}}
		/>
	);
};

export default TableFilters;
