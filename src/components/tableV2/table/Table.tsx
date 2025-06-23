import { isValidElement, useEffect, useRef, useState, type ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { classes } from '../../../utils';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import { Pagination as PaginationV2 } from '../../paginationv2';
import BaseSidePanel from '../../sidePanel/BaseSidePanel';
import { TableColumnV2 } from '../BaseTable.class';
import { BaseTableV2 } from '../baseTable';
import type { TableDrawerToggle, TableProps } from '../types';
import styles from './Table.module.css';
import { TableFilters } from './tableFilters';

const INTERSECTION = 1;
const STEP = 0.05;
const THRESHOLD: number[] = [];

for (let i = 0; i < INTERSECTION; i += STEP) {
	THRESHOLD.push(i);
}

const Table = <TDatum extends Record<string, unknown>>({
	className = '',
	headerData = [],
	tableData = [],
	uniqueKey = '',
	customCells = {},
	paginationData = null,
	loading = false,
	onIntersection,
	isFloating = false,
	disabledFilterOptions = {
		search: true,
	},
	rightActions = null,
	onSort,
	sortValue,
	rowHeight = 'md',
	onRowClick,
	defaultActiveIndex,
	tableInfo,
	dataLabel,
	jumpLabel,
	tableDrawerProps,
	searchProps,
	filtersCount = 0,
	emptyPlaceholder = null,
	onCheck,
	checkAsRadio,
	disableCheck,
}: TableProps<TDatum>): ReactElement => {
	const ref = useRef<HTMLDivElement | null>(null);
	const paginationRef = useRef<HTMLDivElement | null>(null);

	const {
		onSearch,
		placeholder: searchPlaceholder = 'Search',
		disabled: searchDisabled = false,
		onClear,
	} = searchProps ?? {};

	const { title: tableTitle = '', description: tableDescription = '' } = tableInfo ?? {};

	const [floating, setFloating] = useState<boolean>(false);
	const [hiddenColumns, setHiddenColumns] = useState<Record<string, boolean | null>>({});
	const [toggleTableDrawer, setToggleTableDrawer] = useState<TableDrawerToggle<TDatum>>({
		open: false,
		data: {},
	});

	useEffect(() => {
		setToggleTableDrawer({
			open: false,
			data: {},
		});
	}, [tableData, loading]);

	const toggleDrawer = ({ data = {} }: { data?: Record<string, unknown> } = {}) => {
		setToggleTableDrawer((prevState) => {
			return {
				open: !prevState.open,
				data,
			};
		});
	};

	const visibleColumns = headerData.filter((header) => {
		return [null, false, undefined].includes(hiddenColumns[header.id]);
	});

	const drawerProps =
		typeof tableDrawerProps === 'function'
			? tableDrawerProps(toggleTableDrawer.data)
			: tableDrawerProps;

	const hasSingleBody =
		toggleTableDrawer.data.standalone ?? drawerProps?.renderBody?.length === 1;

	let Body = drawerProps?.standalone?.[toggleTableDrawer.data.index ?? 0] ?? null;

	if (toggleTableDrawer.data.standalone) {
		Body = drawerProps?.renderBody?.[toggleTableDrawer.data.index ?? 0] ?? null;
	}

	useEffect(() => {
		let observer: IntersectionObserver;
		const tableElem = ref.current;
		if (tableElem && !loading) {
			const lastRow = tableElem.querySelector(
				'[data-elem="table-body"] [data-elem="table-row"]:last-child'
			);

			if (lastRow) {
				const lastRowHeight = parseInt(getComputedStyle(lastRow).height.slice(0, -2), 10);

				const handleIntersect: IntersectionObserverCallback = (entries) => {
					entries.forEach((entry) => {
						if (
							(entry.isIntersecting && entry.intersectionRatio >= INTERSECTION) ||
							entry.intersectionRect.height >= lastRowHeight
						) {
							setFloating(false);
							onIntersection?.(true);
						} else {
							setFloating(isFloating);
						}
					});
				};

				observer = new IntersectionObserver(handleIntersect, {
					threshold: THRESHOLD,
				});
				observer.observe(lastRow);

				// Cleanup
				return () => {
					observer.disconnect();
				};
			}
		}
		return () => {
			observer.disconnect();
		};
	}, [tableData, loading, onIntersection, isFloating]);

	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			tableElem.style.height = 'calc(100% - 3rem)';
		}
	}, [loading]);

	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			const tableHeaderElem = tableElem.querySelector('[data-elem="table-header"]');
			const tableBodyElem = tableElem.querySelector('[data-elem="table-body"]');

			if (tableHeaderElem && tableBodyElem) {
				let minWidth = 0;
				visibleColumns.forEach((header) => {
					minWidth += new TableColumnV2(header).sizeInRem;
				});
				tableHeaderElem.style.minWidth = `${minWidth}rem`;
				tableBodyElem.style.minWidth = `${minWidth}rem`;
			}
		}
	}, [hiddenColumns, headerData, loading]);

	useEffect(() => {
		if (headerData.length > 0) {
			setHiddenColumns({});
		}
	}, [headerData]);

	const tabularData = Array.isArray(tableData) ? tableData : [];

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return <ErrorBoundaryWrapper {...args} className={styles['error-boundary']} />;
			}}>
			<div className={classes(styles.root, className)}>
				<TableFilters
					className={styles.filters}
					{...{
						disabledFilterOptions,
						headerData,
						hiddenColumns,
						setHiddenColumns,
					}}
					tableTitleText={tableTitle}
					tableDescriptionText={tableDescription}
					onSearch={onSearch}
					onClear={onClear}
					searchDisabled={searchDisabled}
					searchPlaceholder={searchPlaceholder}
					toggleDrawer={toggleDrawer}
					filtersCount={filtersCount}
					rightActions={rightActions}
				/>

				<BaseTableV2
					{...{
						ref,
						headerData: visibleColumns,
						tableData: tabularData,
						uniqueKey,
						customCells,
						className: styles.table,
						onSort,
						sortValue,
						rowHeight,
						onRowClick,
						defaultActiveIndex,
						toggleDrawer,
						emptyPlaceholder,
						onCheck,
						checkAsRadio,
						disableCheck,
					}}
					loading={loading}
				/>

				{paginationData != null && (
					<PaginationV2
						className={classes(styles.pagination, floating ? styles.floating : '')}
						ref={paginationRef}
						{...paginationData}
						floating={floating}
						dataLabel={dataLabel}
						jumpLabel={jumpLabel}
						loading={loading}
					/>
				)}

				{drawerProps && (
					<BaseSidePanel
						toggle={toggleDrawer}
						animation
						{...drawerProps}
						{...(hasSingleBody && {
							tabsConfig: null,
						})}
						activeTab={toggleTableDrawer.data.index}
						open={toggleTableDrawer.open}
						toggleTableDrawer={toggleTableDrawer}
						setToggleTableDrawer={setToggleTableDrawer}
						className={classes(
							styles.drawer,
							hasSingleBody && styles.standalone,
							drawerProps.className
						)}>
						{Body && isValidElement(<Body datum={toggleTableDrawer.data} />) && (
							<Body
								datum={toggleTableDrawer.data}
								toggle={toggleDrawer}
								toggleTableDrawer={toggleTableDrawer}
								setToggleTableDrawer={setToggleTableDrawer}
							/>
						)}
					</BaseSidePanel>
				)}

				{toggleTableDrawer.open && (
					<div
						className={styles.overlay}
						onClick={() => {
							toggleDrawer();
						}}
					/>
				)}
			</div>
		</ErrorBoundary>
	);
};

export default Table;
