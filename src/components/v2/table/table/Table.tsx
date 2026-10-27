import { useEffect, useRef, useState, type ReactElement } from 'react';
import { classes } from '../../utils';
import { Pagination, usePagination } from '../../pagination';
import { BaseTableV2 } from '../baseTable';
import type { TableProps } from '../types';
import styles from './Table.module.scss';

const SIZE_MAP = {
	sm: 9.063,
	md: 15.625,
	lg: 21.875,
};

const INTERSECTION = 1;
const STEP = 0.05;
const THRESHOLD: number[] = [];

for (let i = 0; i < INTERSECTION; i += STEP) {
	THRESHOLD.push(i);
}

const Table = ({
	className = '',
	headerData = [],
	tableData = [],
	uniqueKey = '',
	customCells = {},
	paginationData = null,
	loading = false,
	onIntersection,
	isFloating = false,
	onSort,
	sortValue,
	rowHeight = 'md',
	onRowClick,
	defaultActiveIndex,
	dataLabel,
	emptyPlaceholder,
	emptyTitle,
	emptyDescription,
	onRetry,
	retryLabel,
	onCheck,
	checkAsRadio,
	tableHeader,
	tableSection,
	hideColumnLines = false,
	disableCheck,
	defaultCheckedRows,
}: TableProps): ReactElement => {
	const ref = useRef<HTMLTableElement | null>(null);
	const paginationRef = useRef<HTMLDivElement | null>(null);
	const totalPages = paginationData
		? Math.max(1, Math.ceil(paginationData.totalItems / paginationData.pageSize))
		: null;
	const [paginationState, paginationDispatch] = usePagination({
		totalPages,
		currentPage: paginationData?.page ?? null,
		step: paginationData?.pageSize ?? 30,
		totalData: paginationData?.totalItems ?? null,
	});

	const [floating, setFloating] = useState<boolean>(false);
	const [hiddenColumns, setHiddenColumns] = useState<Record<string, boolean | null>>();

	useEffect(() => {
		if (paginationData) {
			paginationDispatch({ type: 'SET_STEP', payload: paginationData.pageSize });
			paginationDispatch({ type: 'SET_PAGE', payload: paginationData.page });
		}
	}, [paginationData?.page, paginationData?.pageSize]);

	const visibleColumns = headerData.filter((header) => {
		return [null, false, undefined].includes(hiddenColumns?.[header.id]);
	});

	useEffect(() => {
		let observer: IntersectionObserver | undefined;
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

				return () => {
					observer?.disconnect();
				};
			}
		}
		return () => {
			observer?.disconnect();
		};
	}, [tableData, loading, onIntersection, isFloating]);

	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			const tableHeaderElem = tableElem.querySelector<HTMLElement>(
				'[data-elem="table-header"]'
			);
			const tableBodyElem = tableElem.querySelector<HTMLElement>('[data-elem="table-body"]');

			if (tableHeaderElem && tableBodyElem) {
				let minWidth = 0;
				visibleColumns.forEach((header) => {
					minWidth += SIZE_MAP[header.size ?? 'md'];
				});
				tableHeaderElem.style.minWidth = `${minWidth.toString()}rem`;
				tableBodyElem.style.minWidth = `${minWidth.toString()}rem`;
			}
		}
	}, [hiddenColumns, headerData, loading, visibleColumns]);

	useEffect(() => {
		if (headerData.length > 0) {
			setHiddenColumns({});
		}
	}, [headerData]);

	const tabularData = Array.isArray(tableData) ? tableData : [];
	const isEmpty = !loading && tabularData.length === 0;
	const headerContent = tableHeader?.();
	const handlePaginationChange = ({
		currentPage,
		step,
	}: {
		currentPage: number;
		step: number;
	}) => {
		if (paginationData?.page !== currentPage) {
			paginationData?.onPageChange(currentPage);
		}
		if (paginationData?.pageSize !== step) {
			paginationData?.onPageSizeChange?.(step);
		}
	};

	return (
		<div className={classes(styles.root, isEmpty && styles.empty, className)}>
			{headerContent != null && <div className={styles.header}>{headerContent}</div>}
			{tableSection != null && <div className={styles.section}>{tableSection}</div>}
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
					emptyPlaceholder,
					emptyTitle,
					emptyDescription,
					onRetry,
					retryLabel,
					onCheck,
					checkAsRadio,
					disableCheck,
					hideColumnLines,
					...(defaultCheckedRows !== undefined && { defaultCheckedRows }),
				}}
				loading={loading}
			/>

			{paginationData != null && (
				<Pagination
					className={classes(styles.pagination, floating ? styles.floating : '')}
					ref={paginationRef}
					paginationState={paginationState}
					paginationDispatch={paginationDispatch}
					onChange={handlePaginationChange}
					floating={floating}
					dataLabel={dataLabel}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default Table;
