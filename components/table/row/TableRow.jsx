/* eslint-disable react/jsx-key */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { TableCell } from '../cell';
import styles from './TableRow.module.css';

const TableRow = (props) => {
	const { type, headerData, datum, selected, customCells, className, setActiveData } = props;

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
				const cellProps = {
					...props,
					...item,
					setActiveData,
					key: item.id,
				};
				const CustomCell = customCells?.[type]?.[item.id];
				if (CustomCell != null) {
					// eslint-disable-next-line react/jsx-key
					return <CustomCell {...cellProps} />;
				}

				let component1 = null;

				if (type === 'header') {
					component1 = (
						<span
							title={item.title}
							className={classes(styles['cell-text'])}
							style={item.style}>
							{item.title}
						</span>
					);
				} else if (type === 'body') {
					component1 = (
						<span
							title={datum?.[item?.id]}
							className={classes(
								styles['cell-text'],
								item.multiLine ? styles['multi-line'] : ''
							)}
							style={item.style}>
							{datum?.[item?.id]}
						</span>
					);
				}

				return (
					// eslint-disable-next-line react/jsx-key
					<TableCell
						{...cellProps}
						component1={component1}
						className={classes(styles[`${type}-cell`], styles.cell)}
					/>
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
		header: PropTypes.object,
		body: PropTypes.object,
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
