import PropTypes from 'prop-types';
import { classes } from '../../utils/utils';
import styles from './Alert.module.css';
import { Cross, AlertIcon } from '../icons';
import Button from '../buttons/Button';

const Alert = (props) => {
	const {
		action,
		icon: AlertTypeIcon,
		showIcon,
		close,
		title,
		description,
		border,
		color,
		shadow,
		open,
		toggle,
	} = props;

	let Icon = null;
	if (AlertTypeIcon != null) {
		Icon = <AlertTypeIcon className={styles.icon} />;
	} else {
		switch (color) {
			case 'info':
				Icon = <AlertIcon.Info className={styles.icon} />;
				break;
			case 'warning':
				Icon = <AlertIcon.Warning className={styles.icon} />;
				break;
			case 'success':
				Icon = <AlertIcon.Success className={styles.icon} />;
				break;
			case 'danger':
				Icon = <AlertIcon.Danger className={styles.icon} />;
				break;
			default:
				Icon = <AlertTypeIcon />;
				break;
		}
	}

	if (open) {
		return (
			<div className={styles.root}>
				<div
					className={classes(
						styles.container,
						styles[color],
						styles[`border-${border}`],
						shadow ? styles.shadow : ''
					)}>
					<div className={styles.left}>
						<div className={styles.icons}>{showIcon && Icon}</div>
						<div className={styles.content}>
							<span className={styles.title}>{title}</span>
							<span className={styles.description}>{description}</span>
						</div>
					</div>
					{(action || close) && (
						<div className={styles.actions}>
							{action && (
								<Button
									title={action}
									size='small'
									variant='text'
									color='primary'
									className={styles.button}
								/>
							)}
							{close && (
								<span onClick={toggle} className={styles.close}>
									<Cross className={styles.icon} />
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
	return null;
};

Alert.propTypes = {
	action: PropTypes.string,
	showIcon: PropTypes.bool,
	icon: PropTypes.node,
	title: PropTypes.string,
	close: PropTypes.bool,
	description: PropTypes.string,
	border: PropTypes.oneOf(['default', 'thick-left', 'none']),
	color: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
	shadow: PropTypes.bool,
	toggle: PropTypes.func,
	open: PropTypes.bool,
};

Alert.defaultProps = {
	action: 'Action',
	showIcon: true,
	icon: null,
	title: 'Alert Title',
	close: true,
	description: 'This is a alter Description in single line',
	border: 'default',
	color: 'info',
	shadow: false,
	toggle: () => {},
	open: true,
};

export default Alert;
