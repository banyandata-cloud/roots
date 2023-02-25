import PropTypes from 'prop-types';
import styles from './ErrorStateChart.module.css';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import Text from '../../text/Text';

const ErrorStateChart = (props) => {
	const { onClick, title, errorClassName } = props;
	return (
		<div className={classes(styles.root, errorClassName)}>
			<Text
				variant='h2'
				stroke='semibold'
                className={styles.text}
				attrs={{
					'data-elem': 'error-msg',
				}}>
				{title}
			</Text>
			<Button
				variant='contained'
				size='auto'
				rightComponent={() => {
					return 'Reload';
				}}
				className={styles.button}
				data-elem='refresh-button'
				onClick={onClick}
			/>
		</div>
	);
};

ErrorStateChart.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string,
	errorClassName: PropTypes.string,
};

ErrorStateChart.defaultProps = {
	onClick: () => {},
	title: '',
	errorClassName: '',
};

export default ErrorStateChart;
