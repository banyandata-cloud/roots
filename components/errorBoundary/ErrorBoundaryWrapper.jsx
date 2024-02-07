import { classes } from '../../utils';
import { Button } from '../buttons';
import { RefreshIcon } from '../icons';
import { Text } from '../text';
import styles from './ErrorBoundaryWrapper.module.css';
import { ErrorBoundaryVector } from './assets';

const ErrorBoundaryWrapper = (props) => {
	const { resetErrorBoundary, className, custom, error } = props;

	return (
		custom ?? (
			<div className={classes(styles.root, className)}>
				<ErrorBoundaryVector />
				<Text component='p' variant='h2' weight={600} className={styles.message}>
					<Text component='h1' variant='h2' weight={400}>
						Component Error:
					</Text>
					{error.message}
				</Text>
				<div className={styles.actions}>
					<Button
						leftComponent={() => {
							return <RefreshIcon className={styles.icon} />;
						}}
						title='Retry'
						className={styles.action}
						onClick={resetErrorBoundary}
					/>
				</div>
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
