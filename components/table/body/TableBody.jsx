/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { classes } from '../../../utils';
import { TableRow } from '../row';
import styles from './TableBody.module.css';

const TableBody = (props) => {
	const { tableData, headerData, customCells, className, expandable, rowHeight, onRowClick } =
		props;

	const listRef = useRef([]);

	return (
		<tbody data-elem='table-body' className={classes(styles.root, className)}>
			{tableData?.map((datum, _index) => {
				const key = datum?.uuid;

				const setActiveId = (reset = false) => {
					if (reset) {
						listRef.current[_index].removeAttribute('data-active');
					} else {
						listRef.current?.forEach((elem) => {
							elem.removeAttribute('data-active');
						});
						listRef.current[_index].setAttribute('data-active', true);
					}
				};

				return (
					<TableRow
						key={key}
						{...{
							ref: (node) => {
								listRef.current[_index] = node;
							},
							datum,
							headerData,
							customCells,
							_index,
							setActiveId,
							expandable,
							rowHeight,
							onRowClick,
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
	customCells: PropTypes.shape({
		header: PropTypes.object,
		body: PropTypes.object,
	}),
	expandable: PropTypes.func,
	rowHeight: PropTypes.oneOf(['md', 'lg']),
	onRowClick: PropTypes.func,
};

TableBody.defaultProps = {
	className: '',
	headerData: [],
	tableData: [],
	customCells: {
		header: null,
		body: null,
	},
	expandable: null,
	rowHeight: 'md',
	onRowClick: () => {},
};

export default TableBody;
