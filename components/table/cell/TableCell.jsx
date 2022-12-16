import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './TableCell.module.css';

// eslint-disable-next-line prefer-arrow-callback
const TableCell = forwardRef(function TableCell(props, ref) {
	const {
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
	} = props;

	return (
		<BaseCell
			{...{
				ref,
				className: classes(
					styles.root,
					className,
					styles[`${type}-cell`],
					styles[`sticky-${sticky}`]
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
				component3,
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
	sort: PropTypes.bool,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	multiLine: PropTypes.bool,
	sticky: PropTypes.oneOf(['left', 'right', 'none']),
	cellContent: PropTypes.node,
	cellTitle: PropTypes.string,
};

TableCell.defaultProps = {
	...BaseCell.defaultProps,
	cellContent: null,
	cellTitle: null,
};

export default TableCell;
