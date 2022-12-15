/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { TableCell } from '../cell';
import styles from './TableRow.module.css';

// eslint-disable-next-line prefer-arrow-callback
const TableRow = forwardRef(function BaseTable(props, ref) {
	const { type, headerData, datum, _index, customCells, className, setActiveId } = props;

	return (
		<tr
			ref={ref}
			tabIndex={-1}
			data-elem='table-row'
			className={classes(className, styles.root, styles[`${type}-row`])}>
			{headerData?.map?.((item) => {
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
				};

				const getCustomCell = customCells?.[type];
				const CustomCell =
					typeof getCustomCell === 'function' ? getCustomCell()?.[item.id] : null;
				if (CustomCell != null) {
					// eslint-disable-next-line react/jsx-key
					return <CustomCell {...cellProps} />;
				}

				return (
					// eslint-disable-next-line react/jsx-key
					<TableCell {...cellProps} />
				);
			})}
		</tr>
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
};

export default TableRow;
