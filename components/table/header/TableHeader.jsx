/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { TableRow } from '../row';
import styles from './TableHeader.module.css';

const TableHeader = (props) => {
	const { headerData, customCells, expandable, onSort, rowHeight, theme, onRowClick } = props;

	return (
		<thead data-elem='table-header' className={styles.root}>
			<TableRow
				type='header'
				headerData={headerData}
				customCells={customCells}
				expandable={expandable}
				onSort={onSort}
				rowHeight={rowHeight}
				onRowClick={onRowClick}
				theme={theme}
			/>
		</thead>
	);
};

TableHeader.propTypes = {
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
	customCells: PropTypes.shape({
		header: PropTypes.func,
		body: PropTypes.func,
	}),
	expandable: PropTypes.func,
	onSort: PropTypes.func,
	rowHeight: PropTypes.oneOf(['md', 'lg']),
	onRowClick: PropTypes.func,
};

TableHeader.defaultProps = {
	headerData: [],
	customCells: {
		header: null,
		body: null,
	},
	expandable: null,
	onSort: () => {},
	rowHeight: 'md',
	onRowClick: () => {},
};

export default TableHeader;
