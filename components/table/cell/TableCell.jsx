import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './TableCell.module.css';

const TableCell = (props) => {
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
		sticky,
	} = props;

	return (
		<BaseCell
			{...{
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
						title={cellContent}
						className={classes(
							styles['cell-text'],
							multiLine ? styles['multi-line'] : ''
						)}
						style={style}>
						{cellContent}
					</span>
				),
				component3,
				RootDOM,
				radius,
			}}
		/>
	);
};

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
};

TableCell.defaultProps = {
	...BaseCell.defaultProps,
};

export default TableCell;
