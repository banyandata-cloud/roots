/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { classes } from '../../../utils';
import { Checkbox, Radio } from '../../input';
import { TableCellV2 } from '../cell';
import styles from './TableRow.module.css';

// eslint-disable-next-line prefer-arrow-callback
const TableRow = forwardRef(function BaseTable(props, ref) {
	const {
		type = 'body',
		headerData = [],
		tableData = [],
		datum = {},
		_index,
		customCells = {
			header: null,
			body: null,
		},
		className = '',
		setActiveId = () => {},
		onRowClick,
		expandable: Expandable,
		onSort = () => {},
		sortValue,
		rowHeight = 'md',
		toggleDrawer,
		onCheck,
		checkedRows = [],
		setCheckedRows = () => {},
		uniqueKey = '',
		checkAsRadio,
		disableCheck = () => {},
	} = props;

	const [expanded, setExpanded] = useState(false);

	const expandableProps = Expandable
		? {
				_expanded: expanded,
				_setExpanded: setExpanded,
				disabled: !Expandable({
					datum,
					index: _index,
				}),
				onClick: () => {
					setExpanded((prev) => {
						return !prev;
					});
				},
		  }
		: {};

	const tableCells = headerData?.map?.((item) => {
		let cellContent = null;
		if (type === 'header') {
			cellContent = item.title;
		} else if (type === 'body') {
			cellContent = datum?.[item.id] || item?.fallbackValue;
		}

		const cellProps = {
			...props,
			...item,
			_index,
			expandableProps,
			setActiveId,
			key: item.id,
			datum,
			cellContent,
			cellTitle: cellContent,
			type,
			onSort,
			sortValue,
			rowHeight,
			toggleDrawer: (index, standalone) => {
				toggleDrawer({
					data: {
						datum,
						index,
						setActiveId,
						standalone,
					},
				});
			},
		};

		const getCustomCell = customCells?.[type];
		const CustomCell = typeof getCustomCell === 'function' ? getCustomCell()?.[item.id] : null;

		if (CustomCell != null) {
			// eslint-disable-next-line react/jsx-key
			return <CustomCell {...cellProps} />;
		}

		return (
			// eslint-disable-next-line react/jsx-key
			<TableCellV2 {...cellProps} />
		);
	});

	let tableCellsToRender = tableCells;

	const existingInChecked = checkedRows?.find((checkedItem) => {
		return checkedItem[uniqueKey] === datum[uniqueKey];
	});

	let checkStatus = !!existingInChecked;
	let intermediate = false;

	if (onCheck && type === 'header') {
		checkStatus =
			tableData?.length === checkedRows?.length ||
			(tableData?.length > checkedRows?.length && checkedRows?.length > 0);
		intermediate = tableData?.length > checkedRows?.length && checkedRows?.length > 0;
	}

	let cellContent = '';

	const disabledChecking = disableCheck(datum);

	if (type !== 'header' && checkAsRadio) {
		cellContent = (
			<Radio
				onChange={() => {
					if (type === 'header') {
						return;
					}

					if (existingInChecked) {
						setCheckedRows([]);
						onCheck([]);
						return;
					}

					setCheckedRows([datum]);
					onCheck([datum]);
				}}
				disabled={disabledChecking}
				checked={checkStatus}
				className={disabledChecking && styles.disabled}
			/>
		);
	} else if (!checkAsRadio) {
		cellContent = (
			<Checkbox
				intermediate={intermediate}
				onChange={() => {
					if (type === 'header') {
						const filteredTableData = tableData?.filter((rowDatum) => {
							return !disableCheck(rowDatum);
						});

						if (checkedRows?.length === filteredTableData?.length) {
							setCheckedRows([]);
							onCheck([]);
							return;
						}

						if (disableCheck) {
							setCheckedRows(filteredTableData);
							onCheck(filteredTableData);
							return;
						}

						setCheckedRows(tableData);
						onCheck(tableData);
						return;
					}

					if (existingInChecked) {
						const checkedSansSelection = checkedRows?.filter((checkedItem) => {
							return checkedItem[uniqueKey] !== datum[uniqueKey];
						});
						setCheckedRows(checkedSansSelection);
						onCheck(checkedSansSelection);
						return;
					}

					setCheckedRows([...checkedRows, datum]);
					onCheck([...checkedRows, datum]);
				}}
				disabled={disabledChecking}
				checked={checkStatus}
				className={disabledChecking && styles.disabled}
			/>
		);
	}

	if (onCheck) {
		const checkboxCellProps = {
			...props,
			_index,
			expandableProps,
			setActiveId,
			datum,
			cellContent,
			cellTitle: null,
			type,
			onSort,
			rowHeight,
			style: {
				width: '3rem',
			},
		};
		tableCellsToRender = [
			<TableCellV2 key='default-checkbox' {...checkboxCellProps} />,
			...tableCells,
		];
	}

	return (
		<>
			<tr
				ref={ref}
				tabIndex={-1}
				data-elem='table-row'
				{...(!onCheck &&
					onRowClick && {
						onClick: () => {
							return onRowClick(props);
						},
					})}
				className={classes(
					styles.root,
					styles[`${type}-row`],
					styles[`row-height-${rowHeight}`],
					className
				)}>
				{tableCellsToRender}
			</tr>
			{Expandable && expanded && (
				<tr
					{...(!onCheck && {
						onClick: () => {
							return onRowClick(datum, setActiveId);
						},
					})}>
					<Expandable datum={datum} index={_index} />
				</tr>
			)}
		</>
	);
});

TableRow.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(['header', 'body']),
	datum: PropTypes.object,
	customCells: PropTypes.shape({
		header: PropTypes.func,
		body: PropTypes.func,
	}),
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
	setActiveId: PropTypes.func,
	expandable: PropTypes.func,
	onSort: PropTypes.func,
	rowHeight: PropTypes.oneOf(['md', 'lg']),
	onRowClick: PropTypes.func,
};

export default TableRow;
