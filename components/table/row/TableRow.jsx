/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { classes } from '../../../utils';
import { TableCell } from '../cell';
import styles from './TableRow.module.css';

// eslint-disable-next-line prefer-arrow-callback
const TableRow = forwardRef(function BaseTable(props, ref) {
	const {
		type,
		headerData,
		datum,
		_index,
		customCells,
		className,
		setActiveId,
		onRowClick,
		expandable: Expandable,
		onSort,
		theme,
		rowHeight,
		toggleDrawer,
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
			cellContent = datum?.[item.id] ?? item?.fallbackValue;
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
			theme,
			rowHeight,
			toggleDrawer: (index) => {
				toggleDrawer({
					data: {
						datum,
						index,
						setActiveId,
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
			<TableCell {...cellProps} />
		);
	});

	return (
		<>
			<tr
				ref={ref}
				tabIndex={-1}
				data-elem='table-row'
				onClick={() => {
					return onRowClick(props);
				}}
				className={classes(
					styles.root,
					styles[`${type}-row`],
					styles[`row-height-${rowHeight}`],
					className
				)}>
				{tableCells}
			</tr>
			{Expandable && expanded && (
				<tr
					onClick={() => {
						return onRowClick(datum, setActiveId);
					}}>
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

TableRow.defaultProps = {
	className: '',
	type: 'body',
	datum: {},
	customCells: {
		header: null,
		body: null,
	},
	headerData: [],
	setActiveId: () => {},
	expandable: null,
	onSort: () => {},
	rowHeight: 'md',
	onRowClick: () => {},
};

export default TableRow;
