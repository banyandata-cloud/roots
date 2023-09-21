import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { SortIcon } from '../../icons';
import { TableCellV2 } from '../../tableV2/cell';
import styles from './TableCell.module.css';

const SORT_ICONS = {
	asc: <SortIcon className={styles['sort-icon']} position='az' />,
	desc: <SortIcon className={styles['sort-icon']} position='za' />,
	default: <SortIcon className={styles['sort-icon']} position='az' />,
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
		theme,
		v2,
	} = props;

	console.log({
		v2,
	});

	if (v2) {
		return <TableCellV2 {...props} />;
	}

	return (
		<BaseCell
			{...{
				ref,
				className: classes(
					styles.root,
					className,
					styles[`${type}-cell`],
					styles[`sticky-${sticky}`],
					styles[`sort-${sort}`],
					sort != null ? styles.sortable : ''
				),
				attrs: {
					style,
					...attrs,
				},
				size,
				flexible,
				rounded,
				component1,
				component2: (
					<span
						{...{
							...(cellTitle != null
								? {
										title: cellTitle,
								  }
								: {}),
							className: classes(
								styles['cell-text'],
								multiLine ? styles['multi-line'] : ''
							),
							style,
							'data-elem': 'text',
						}}>
						{[null, false, true].includes(cellContent)
							? JSON.stringify(cellContent)
							: cellContent}
					</span>
				),
				component3:
					type === 'header' && sort ? (
						<Button
							className={styles.sort}
							size='auto'
							onClick={() => {
								onSort(id, getNextSortState(sort));
							}}
							leftComponent={() => {
								return SORT_ICONS[sort];
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
	title: PropTypes.string,
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
	theme: PropTypes.oneOf(['light', 'dark']),
	v2: PropTypes.bool,
	onSort: PropTypes.func,
};

TableCell.defaultProps = {
	...BaseCell.defaultProps,
	cellContent: null,
	cellTitle: null,
	RootDOM: 'td',
	theme: 'light',
	v2: false,
	onSort: () => {},
};

export default TableCell;
