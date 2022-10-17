/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../../utils';
import { BaseTable } from '../baseTable';
import { TableChips } from './tableChips';
import { TableFilters } from './tableFilters';
import { Pagination } from '../../pagination';
import styles from './Table.module.css';

const Table = (props) => {
	const {
		className,
		headerData,
		tableData,
		uniqueKey,
		activeData,
		setActiveData,
		customCells,
		chipsData,
		filtersData,
		paginationData,
	} = props;

	const ref = useRef(null);

	const [floating, setFloating] = useState(false);

	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem) {
			const lastRow = tableElem.querySelector(
				'[data-elem="table-body"] [data-elem="table-row"]:last-child'
			);
			if (lastRow) {
				const handleIntersect = (entries) => {
					entries.forEach((entry) => {
						// if the target is visibile
						if (entry.isIntersecting && entry.intersectionRatio === 1) {
							tableElem.style.padding = '0';
							setFloating(false);
						} else {
							tableElem.style.paddingBottom = '3.25rem';
							setFloating(true);
						}
					});
				};

				const options = {
					threshold: 1.0,
				};

				const observer = new IntersectionObserver(handleIntersect, options);
				observer.observe(lastRow);
			}
		}
	});

	return (
		<div className={classes(styles.root, className)}>
			{chipsData != null && <TableChips {...chipsData} />}
			{filtersData != null && <TableFilters {...filtersData} />}
			<BaseTable
				{...{
					ref,
					headerData,
					tableData,
					uniqueKey,
					activeData,
					setActiveData,
					customCells,
				}}
			/>
			{paginationData != null && <Pagination {...paginationData} floating={floating} />}
		</div>
	);
};

Table.propTypes = {
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
	setActiveData: PropTypes.func,
	customCells: PropTypes.shape({
		header: PropTypes.object,
		body: PropTypes.object,
	}),
	chipsData: PropTypes.shape({
		...TableChips.propTypes,
	}),
	filtersData: PropTypes.shape({
		...TableFilters.propTypes,
	}),
	paginationData: PropTypes.shape({
		...Pagination.propTypes,
	}),
};

Table.defaultProps = {
	className: '',
	headerData: [],
	tableData: [],
	uniqueKey: [],
	activeData: {},
	setActiveData: () => {},
	customCells: {
		header: null,
		body: null,
	},
	chipsData: {
		...TableChips.defaultProps,
	},
	filtersData: {
		...TableFilters.defaultProps,
	},
	paginationData: {
		...Pagination.defaultProps,
	},
};

export default Table;
