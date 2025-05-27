import { classes } from '../../utils';
import { Button } from '../buttons';
import { RefreshIcon } from '../icons';
import { Text } from '../text';
import styles from './ErrorBoundaryWrapper.module.css';
import { ErrorBoundaryVector } from './assets';

interface ErrorBoundaryWrapperProps {
	resetErrorBoundary?: () => void;
	className?: string;
	custom?: React.ReactNode;
	error: Error;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = (props): React.ReactElement => {
	const { resetErrorBoundary = () => {}, className = '', custom = null, error } = props;

	return (
		<>
			{custom ?? (
				<div className={classes(styles.root, className)}>
					<ErrorBoundaryVector />
					<Text
						component='p'
						variant='h2'
						weight={600}
						className={styles.message as string}>
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
			)}
		</>
	);
};

export default ErrorBoundaryWrapper;
