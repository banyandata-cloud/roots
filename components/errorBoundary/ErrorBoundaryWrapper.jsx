import { classes } from '../../utils';
import Error503 from '../../503-error.png';
import { Button } from '../buttons';
import styles from './ErrorBoundaryWrapper.module.css';

const ErrorBoundaryWrapper = (props) => {
	const { resetErrorBoundary, className, custom } = props;
	return (
		custom ?? (
			<div className={classes(styles.root, className)}>
				<img src={Error503} alt='Error 503' />
				<Button title='Retry' onClick={resetErrorBoundary} />
			</div>
		)
	);
};

ErrorBoundaryWrapper.defaultProps = {
	custom: null,
	className: '',
	resetErrorBoundary: () => {},
};

export default ErrorBoundaryWrapper;
