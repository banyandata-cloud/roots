import PropTypes from 'prop-types';
import styles from './WidgetFallback.module.css';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import Text from '../../text/Text';

const WidgetFallback = (props) => {
	const { onReload, title, subtitle, className, theme } = props;

	return (
		<div className={classes(styles.root, className, styles[`${theme}-theme`])}>
			<div className={styles.wrapper}>
				<Text variant='h2' stroke='medium' className={styles.text}>
					{title}
				</Text>
				<Text variant='b1' className={styles.text}>
					{subtitle}
				</Text>
				<Button
					variant='outlined'
					size='auto'
					rightComponent={() => {
						return 'Reload';
					}}
					className={styles.button}
					onClick={onReload}
				/>
			</div>
		</div>
	);
};

WidgetFallback.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	onReload: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
};

WidgetFallback.defaultProps = {
	className: '',
	title: '',
	subtitle: '',
	onReload: () => {},
	theme: 'dark',
};

export default WidgetFallback;
