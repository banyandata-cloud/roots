import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { SortIcon } from '../../icons';
import styles from './TableCell.module.css';

const SORT_ICONS_ORDER = {
	asc: 'az',
	desc: 'za',
	default: 'az',
};

const getNextSortState = (currentSort) => {
	return {
		asc: 'desc',
		desc: 'default',
		default: 'asc',
	}?.[currentSort];
};

// eslint-disable-next-line prefer-arrow-callback
const TableCell = forwardRef(function TableCell(props, ref) {
	const {
		id,
		className,
		size,
		flexible,
		rounded,
		component1,
		component3,
		RootDOM,
		attrs,
		radius,
		style,
		multiLine,
		type,
		cellContent,
		cellTitle,
		sticky,
		sort,
		onSort,
		sortValue,
		html,
		json,
	} = props;

	const [sortState, setSortState] = useState('asc');

	useEffect(() => {
		setSortState(sortValue?.[id] || 'default');
	}, [sortValue]);

	let spanElement = (
		<span
			{...{
				...(cellTitle != null
					? {
							title: cellTitle,
					  }
					: {}),
				className: classes(styles['cell-text'], multiLine ? styles['multi-line'] : ''),
				style,
				'data-elem': 'text',
			}}>
			{[null, false, true].includes(cellContent) || json
				? JSON.stringify(cellContent)
				: cellContent}
		</span>
	);

	if (html) {
		spanElement = (
			<span
				{...{
					className: classes(styles['cell-text'], multiLine ? styles['multi-line'] : ''),
					style,
					'data-elem': 'text',

					dangerouslySetInnerHTML: {
						__html: cellContent,
					},
				}}
			/>
		);
	}

	return (
		<BaseCell
			{...{
				ref,
				className: classes(
					styles.root,
					styles[`${type}-cell`],
					styles[`sticky-${sticky}`],
					styles[`sort-${sortState}`],
					sortState != null ? styles.sortable : '',
					className
				),
				attrs: {
					style,
					...attrs,
				},
				size,

				flexible,
				rounded,
				component1,
				component2: spanElement,
				component3:
					type === 'header' && sort ? (
						<Button
							className={styles.sort}
							size='auto'
							value='Text'
							onClick={() => {
								onSort(id, getNextSortState(sortState));
								setSortState(getNextSortState(sortState));
							}}
							rightComponent={() => {
								return (
									<SortIcon
										className={styles['sort-icon']}
										position={SORT_ICONS_ORDER[sortState]}
									/>
								);
							}}
						/>
					) : (
						component3
					),
				RootDOM,
				radius,
			}}
		/>
	);
});

TableCell.propTypes = {
	...BaseCell.propTypes,
	id: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	flexible: PropTypes.bool,
	sort: PropTypes.oneOf(['default', 'asc', 'desc']),
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	multiLine: PropTypes.bool,
	sticky: PropTypes.oneOf(['left', 'right', 'none']),
	cellContent: PropTypes.node,
	cellTitle: PropTypes.string,
	onSort: PropTypes.func,
};

TableCell.defaultProps = {
	...BaseCell.defaultProps,
	cellContent: null,
	cellTitle: null,
	RootDOM: 'td',
	onSort: () => {},
};

export default TableCell;
