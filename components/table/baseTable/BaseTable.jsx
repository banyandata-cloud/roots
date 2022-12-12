/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { TableColumn } from '../BaseTable.class';
import { TableBody } from '../body';
import { TableHeader } from '../header';
import styles from './BaseTable.module.css';
import { Skeleton } from './Skeleton';

// eslint-disable-next-line prefer-arrow-callback
const BaseTable = forwardRef(function BaseTable(props, ref) {
	const { headerData, customCells, tableData, className, loading } = props;

	if (loading) {
		return <Skeleton />;
	}

	const transformedHeaderData = headerData.map((header) => {
		return new TableColumn(header);
	});

	return (
		<table ref={ref} data-elem='table' className={classes(className, styles.root)}>
			<TableHeader
				{...{
					headerData: transformedHeaderData,
					customCells,
				}}
			/>
			<TableBody
				{...{
					ref,
					headerData: transformedHeaderData,
					customCells,
					tableData,
				}}
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
	customCells: PropTypes.shape({
		header: PropTypes.func,
		body: PropTypes.func,
	}),
	loading: PropTypes.bool,
};

BaseTable.defaultProps = {
	className: '',
	headerData: [],
	tableData: [],
	customCells: {
		header: null,
		body: null,
	},
	loading: null,
};

export default BaseTable;
