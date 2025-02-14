/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { classes } from '../../../utils';
import { TableColumnV2 } from '../BaseTable.class';
import { TableBody } from '../body';
import { TableHeader } from '../header';
import { NoDataPlaceHolder } from '../placeholders/noData/general';
import styles from './BaseTable.module.css';
import { Skeleton } from './Skeleton';

// eslint-disable-next-line prefer-arrow-callback
const BaseTable = forwardRef(function BaseTable(props, ref) {
	const {
		headerData,
		customCells,
		tableData,
		className,
		loading,
		onRowClick,
		expandable,
		onSort,
		rowHeight,
		theme,
		placeholder,
		defaultActiveIndex,
		toggleDrawer = () => {},
		emptyPlaceholder,
		onCheck,
		uniqueKey,
		checkAsRadio,
		disableCheck,
	} = props;

	if (loading) {
		return <Skeleton theme={theme} />;
	}

	const transformedHeaderData = headerData.map((header) => {
		return new TableColumnV2(header);
	});

	const [checkedRows, setCheckedRows] = useState([]);

	return (
		<table
			ref={ref}
			data-elem='table'
			className={classes(
				styles.root,
				tableData?.length === 0 ? styles['no-scroll'] : '',
				className
			)}>
			{tableData?.length > 0 && (
				<TableHeader
					{...{
						headerData: transformedHeaderData,
						customCells,
						expandable,
						onSort,
						onRowClick,
						onCheck,
						checkedRows,
						setCheckedRows,
						tableData,
						disableCheck,
						checkAsRadio,
					}}
				/>
			)}
			{tableData?.length === 0 ? (
				<NoDataPlaceHolder customPlaceholder={emptyPlaceholder} placeholder={placeholder} />
			) : (
				<TableBody
					{...{
						ref,
						headerData: transformedHeaderData,
						customCells,
						tableData,
						expandable,
						rowHeight,
						onRowClick,
						defaultActiveIndex,
						toggleDrawer,
						onCheck,
						checkedRows,
						setCheckedRows,
						uniqueKey,
						checkAsRadio,
						disableCheck,
					}}
				/>
			)}
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
	expandable: PropTypes.func,
	onSort: PropTypes.func,
	rowHeight: PropTypes.oneOf(['md', 'lg']),
	onRowClick: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
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
	expandable: () => {},
	onSort: () => {},
	rowHeight: 'md',
	theme: 'light',
	onRowClick: () => {},
};

export default BaseTable;
