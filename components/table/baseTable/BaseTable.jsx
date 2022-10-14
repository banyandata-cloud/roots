/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { TableBody } from '../body';
import { TableHeader } from '../header';
import styles from './BaseTable.module.css';

// eslint-disable-next-line prefer-arrow-callback
const BaseTable = forwardRef(function BaseTable(props, ref) {
	const { headerData, customCells, tableData, uniqueKey, activeData, className } = props;

	console.log(ref.current);

	return (
		<table ref={ref} data-elem='table' className={classes(className, styles.root)}>
			<TableHeader headerData={headerData} customCells={customCells} />
			<TableBody
				ref={ref}
				headerData={headerData}
				customCells={customCells}
				tableData={tableData}
				uniqueKey={uniqueKey}
				activeData={activeData}
			/>
		</table>
	);
});

BaseTable.propTypes = {
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

BaseTable.defaultProps = {
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

export default BaseTable;
