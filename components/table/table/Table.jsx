/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { isValidElement, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { classes } from '../../../utils';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import { Pagination } from '../../pagination';
import { Pagination as Paginationv2 } from '../../paginationv2';
import { TableColumn } from '../BaseTable.class';
import { BaseTable } from '../baseTable';
import styles from './Table.module.css';
import { TableChips } from './tableChips';
import { TableFilters } from './tableFilters';
import BaseSidePanel from '../../sidePanel/BaseSidePanel';

const INTERSECTION = 1;
const STEP = 0.05;
const THRESHOLD = [];

for (let i = 0; i < INTERSECTION; i += STEP) {
	THRESHOLD.push(i);
}

const Table = (props) => {
	const {
		className = '',
		headerData = [],
		tableData = [],
		uniqueKey = [],
		activeData = {},
		setActiveData = () => {},
		customCells = {
			header: null,
			body: null,
		},
		filtersData = null,
		customPagination,
		paginationData = null,
		loading = false,
		onIntersection = () => {},
		isFloating = false,
		disabledFilterOptions = {
			search: false,
			columnFilter: false,
		},
		onSort = () => {},
		rowHeight = 'md',
		theme = 'light',
		onRowClick = () => {},
		onAdvancedFilterClick = () => {},
		defaultActiveIndex,
		placeholder,
		custom = null,
		tableInfo = {},
		dataLabel = null,
		customLabel,
		jumpLabel,
		customPageList,
		customPageCallback,
		hideDisabledPages,
		onFilterClear = () => {},
		v2 = false,
		tableDrawerProps = {},
		searchProps = {
			onSearch: () => {},
			icon: null,
		},
	} = props;

	const ref = useRef(null);
	const paginationRef = useRef(null);

	const { onSearch = () => {}, icon: customSearchIcon = null } = searchProps;
	const {
		tableTitleIcon = null,
		title: tableTitleText = '',
		description: tableDescriptionText = '',
	} = tableInfo;

	const [floating, setFloating] = useState(false);
	const [hiddenColumns, setHiddenColumns] = useState({});
	const [toggleTableDrawer, setToggleTableDrawer] = useState({
		open: false,
		data: {
			index: 0,
		},
	});

	const toggleDrawer = ({ data }) => {
		setToggleTableDrawer((prevState) => {
			return {
				open: !prevState.open,
				data,
			};
		});
	};

	const visibileColumns = headerData.filter((header) => {
		return [null, false, undefined].includes(hiddenColumns?.[header?.id]);
	});

	const Body = tableDrawerProps?.renderBody?.[toggleDrawer?.data?.index];

	// for pagination docking using intersection observer
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			const lastRow = tableElem.querySelector(
				'[data-elem="table-body"] [data-elem="table-row"]:last-child'
			);
			if (lastRow) {
				const lastRowHeight = parseInt(getComputedStyle(lastRow).height.slice(0, -2), 10);
				const handleIntersect = (entries) => {
					entries.forEach((entry) => {
						// if the target is visibile
						if (
							(entry.isIntersecting && entry.intersectionRatio >= INTERSECTION) ||
							entry?.intersectionRect?.height >= lastRowHeight
						) {
							setFloating(false);
							onIntersection(true);
						} else {
							setFloating(isFloating);
						}
					});
				};

				const options = {
					threshold: THRESHOLD,
				};

				const observer = new IntersectionObserver(handleIntersect, options);
				observer.observe(lastRow);
			}
		}
	}, [tableData, loading]);

	// for dynamically resizing table vertically acc to provided addons
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			tableElem.style.height = 'calc(100% -  3rem)';
		}
	}, [filtersData, loading]);

	// setting body and header min-width to allow horizontal sticky column beyond viewport width
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem && !loading) {
			const tableHeaderElem = tableElem.querySelector('[data-elem="table-header"]');
			const tableBodyElem = tableElem.querySelector('[data-elem="table-body"]');

			if (tableHeaderElem && tableBodyElem) {
				let minWidth = 0;
				visibileColumns.forEach((header) => {
					minWidth += new TableColumn(header).sizeInRem;
				});
				tableHeaderElem.style.minWidth = `${minWidth}rem`;
				tableBodyElem.style.minWidth = `${minWidth}rem`;
			}
		}
	}, [hiddenColumns, headerData, loading]);

	// set the hidden columns state
	useEffect(() => {
		setHiddenColumns({});
	}, [headerData]);

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<div className={classes(styles.root, className)}>
				{!Object.keys(disabledFilterOptions).every((key) => {
					return disabledFilterOptions[key] === true;
				}) && (
					<TableFilters
						className={styles.filters}
						{...{
							disabledFilterOptions,
							headerData,
							hiddenColumns,
							setHiddenColumns,
						}}
						onAdvancedFilterClick={onAdvancedFilterClick}
						loading={loading}
						theme={theme}
						tableTitleIcon={tableTitleIcon}
						tableTitleText={tableTitleText}
						tableDescriptionText={tableDescriptionText}
						onClear={onFilterClear}
						v2={v2}
						customSearchIcon={customSearchIcon}
						onSearch={onSearch}
					/>
				)}

				<BaseTable
					{...{
						ref,
						headerData: visibileColumns,
						tableData,
						uniqueKey,
						activeData,
						setActiveData,
						customCells,
						className: styles.table,
						onSort,
						rowHeight,
						onRowClick,
						defaultActiveIndex,
						placeholder,
						toggleDrawer,
					}}
					loading={loading}
				/>
				{paginationData != null &&
					(v2 ? (
						<Paginationv2
							className={classes(styles.pagination, floating ? styles.floating : '')}
							ref={paginationRef}
							customPagination={customPagination}
							{...paginationData}
							floating={floating}
							loading={loading}
							dataLabel={dataLabel}
							customLabel={customLabel}
							jumpLabel={jumpLabel}
							customPageList={customPageList}
							customPageCallback={customPageCallback}
							hideDisabledPages={hideDisabledPages}
						/>
					) : (
						<Pagination
							className={classes(styles.pagination, floating ? styles.floating : '')}
							ref={paginationRef}
							customPagination={customPagination}
							{...paginationData}
							floating={floating}
							loading={loading}
							dataLabel={dataLabel}
							customLabel={customLabel}
							jumpLabel={jumpLabel}
							customPageList={customPageList}
							customPageCallback={customPageCallback}
							hideDisabledPages={hideDisabledPages}
						/>
					))}
				{v2 && tableDrawerProps && (
					<BaseSidePanel
						toggle={toggleDrawer}
						open={toggleTableDrawer.open}
						renderHeader={() => {
							const DrawerHeader = tableDrawerProps.drawerHeader;
							return (
								<DrawerHeader
									datum={toggleTableDrawer.data}
									toggle={toggleDrawer}
								/>
							);
						}}
						{...tableDrawerProps}>
						{Body && isValidElement(<Body datum={toggleTableDrawer.data} />) && (
							<Body datum={toggleTableDrawer.data} toggle={toggleDrawer} />
						)}
					</BaseSidePanel>
				)}
			</div>
		</ErrorBoundary>
	);
};

Table.propTypes = {
	className: PropTypes.string,
	headerData: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			id: PropTypes.string,
			size: PropTypes.oneOf(['sm', 'md', 'lg']),
			flexible: PropTypes.bool,
			sort: PropTypes.bool,
			style: PropTypes.object,
			multiLine: PropTypes.bool,
		})
	),
	tableData: PropTypes.arrayOf(PropTypes.object),
	uniqueKey: PropTypes.arrayOf(PropTypes.string),
	activeData: PropTypes.object,
	setActiveData: PropTypes.func,
	customCells: PropTypes.shape({
		header: PropTypes.func,
		body: PropTypes.func,
	}),
	chipsData: PropTypes.shape({
		...TableChips.propTypes,
	}),
	filtersData: PropTypes.shape({
		...TableFilters.propTypes,
	}),
	onIntersection: PropTypes.func,
	isFloating: PropTypes.bool,
	paginationData: PropTypes.shape({
		...Pagination.propTypes,
	}),
	loading: PropTypes.bool,
	v2: PropTypes.bool,
	disabledFilterOptions: PropTypes.shape({
		filterButton: PropTypes.bool,
		refresh: PropTypes.bool,
		columnFilter: PropTypes.bool,
		settings: PropTypes.bool,
	}),
	onSort: PropTypes.func,
	rowHeight: PropTypes.oneOf(['md', 'lg']),
	onRowClick: PropTypes.func,
	onSearch: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
	custom: PropTypes.node,
	onAdvancedFilterClick: PropTypes.func,
	dataLabel: PropTypes.string,
};

export default Table;
