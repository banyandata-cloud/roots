/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { CaretIcon } from '../../icons';
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
		expandable: Expandable,
		onSort,
	} = props;

	const [expanded, setExpanded] = useState(false);

	const tableCells = headerData?.map?.((item) => {
		let cellContent = null;
		if (type === 'header') {
			cellContent = item.title;
		} else if (type === 'body') {
			cellContent = datum?.[item.id];
		}

		const cellProps = {
			...props,
			...item,
			_index,
			setActiveId,
			key: item.id,
			datum,
			cellContent,
			cellTitle: cellContent,
			type,
			onSort,
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

	console.log(type);

	return (
		<>
			<tr
				ref={ref}
				tabIndex={-1}
				data-elem='table-row'
				className={classes(
					className,
					styles.root,
					styles[`${type}-row`],
					Expandable ? styles.expandable : ''
				)}>
				{Expandable && type === 'header' && (
					<TableCell
						className={classes(
							styles['expandable-cell'],
							expanded ? styles.expanded : ''
						)}
						size='auto'
						cellContent={null}
					/>
				)}
				{Expandable && type === 'body' && (
					<TableCell
						className={classes(
							styles['expandable-cell'],
							expanded ? styles.expanded : ''
						)}
						size='auto'
						cellContent={
							<Button
								className={styles.button}
								size='auto'
								variant='text'
								disabled={
									!Expandable({
										datum,
										index: _index,
									})
								}
								onClick={() => {
									setExpanded((prev) => {
										return !prev;
									});
								}}
								leftComponent={() => {
									return <CaretIcon className={styles.icon} />;
								}}
							/>
						}
					/>
				)}
				{tableCells}
			</tr>
			{Expandable && expanded && (
				<tr>
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
};

export default TableRow;
