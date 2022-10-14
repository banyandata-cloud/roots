import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './TableCell.module.css';

const TableCell = (props) => {
	const { className } = props;

	return <BaseCell {...props} className={classes(styles.root, className)} />;
};

TableCell.propTypes = {
	...BaseCell.propTypes,
};

TableCell.defaultProps = {
	...BaseCell.defaultProps,
};

export default TableCell;
