/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../../utils';
import { BaseTable } from '../baseTable';
import { TableChips } from './tableChips';
import { TableFilters } from './tableFilters';
import { Pagination } from '../../pagination';
import styles from './Table.module.css';

const INTERSECTION = 1;

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
	const paginationRef = useRef(null);

	const [floating, setFloating] = useState(false);

	useEffect(() => {
		const tableElem = ref.current;
		const paginationElem = paginationRef.current;
		if (tableElem) {
			const tableRect = tableElem.getBoundingClientRect();
			const { width: tableWidth, left: tableLeft } = tableRect;
			if (paginationElem) {
				paginationElem.style.left = `${tableLeft + tableWidth / 2}px`;
			}
			const lastRow = tableElem.querySelector(
				'[data-elem="table-body"] [data-elem="table-row"]:last-child'
			);
			if (lastRow) {
				const handleIntersect = (entries) => {
					entries.forEach((entry) => {
						// if the target is visibile
						if (entry.isIntersecting && entry.intersectionRatio >= INTERSECTION) {
							tableElem.style.height = 'calc(100% - 9.5rem)';
							tableElem.style.paddingBottom = '0';
							if (paginationElem) {
								paginationElem.style.maxWidth = '100%';
							}
							setFloating(false);
						} else {
							tableElem.style.paddingBottom = '3.5rem';
							tableElem.style.height = 'calc(100% - 6rem)';
							if (paginationElem) {
								paginationElem.style.maxWidth = `calc(${tableWidth}px - 2rem)`;
							}
							setFloating(true);
						}
					});
				};

				const options = {
					threshold: INTERSECTION,
				};

				const observer = new IntersectionObserver(handleIntersect, options);
				observer.observe(lastRow);
			}
		}
	}, []);

	return (
		<div className={classes(styles.root, className)}>
			{chipsData != null && <TableChips className={styles.chips} {...chipsData} />}
			{filtersData != null && <TableFilters className={styles.filters} {...filtersData} />}
			<BaseTable
				{...{
					ref,
					headerData,
					tableData,
					uniqueKey,
					activeData,
					setActiveData,
					customCells,
					className: styles.table,
				}}
			/>

			{paginationData != null && (
				<Pagination
					className={styles.pagination}
					ref={paginationRef}
					{...paginationData}
					floating={floating}
				/>
			)}
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
	chipsData: null,
	filtersData: null,
	paginationData: null,
};

export default Table;
