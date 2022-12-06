/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { TableCell } from '../cell';
import styles from './TableRow.module.css';

const TableRow = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { type, headerData, datum, _index, selected, customCells, className, setActiveData } =
		props;

	return (
		<tr
			data-elem='table-row'
			className={classes(
				className,
				styles.root,
				selected ? styles.selected : '',
				styles[`${type}-row`]
			)}>
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
					setActiveData,
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
};

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
	setActiveData: PropTypes.func,
	selected: PropTypes.bool,
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
	setActiveData: () => {},
	selected: false,
};

export default TableRow;
