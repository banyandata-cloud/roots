/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { TableRow } from '../row';
import styles from './TableBody.module.css';

const TableBody = (props) => {
	const { tableData, uniqueKey, activeData, headerData, customCells, className } = props;

	return (
		<tbody data-elem='table-body' className={classes(styles.root, className)}>
			{tableData?.map((datum) => {
				let key = '';

				const selected =
					uniqueKey.length > 0 &&
					uniqueKey?.each((e) => {
						key += `${datum?.[e]}-`;
						return datum?.[e] === activeData?.[e];
					});

				return (
					<TableRow
						key={key}
						{...{
							datum,
							selected,
							headerData,
							customCells,
						}}
					/>
				);
			})}
		</tbody>
	);
};

TableBody.propTypes = {
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
	customCells: PropTypes.shape({
		header: PropTypes.object,
		body: PropTypes.object,
	}),
};

TableBody.defaultProps = {
	className: '',
	headerData: [],
	tableData: [],
	uniqueKey: [],
	activeData: {},
	customCells: {
		header: null,
		body: null,
	},
};

export default TableBody;
