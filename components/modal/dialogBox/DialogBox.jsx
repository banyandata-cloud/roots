/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { Button } from '../../buttons';
import BaseModal from '../BaseModal';
import { classes } from '../../../utils';
import styles from './Dialog.module.css';

const DialogBox = (props) => {
	const { open, heading, description, action, variant, onCancel, onAction, size, className } =
		props;

	return (
		<BaseModal
			open={open}
			toggle={onCancel}
			className={classes(className, styles.root, styles[size])}
			renderHeader={
				<div className={styles.header}>
					<p>{heading}</p>
				</div>
			}
			renderFooter={
				<div className={styles.footer}>
					<Button
						color='default'
						variant='outlined'
						className={styles.cancel}
						onClick={onCancel}
						title='Cancel'
					/>
					<Button onClick={onAction} title={action} color={variant} />
				</div>
			}>
			<div className={styles.description}>{description}</div>
		</BaseModal>
	);
};

DialogBox.propTypes = {
	className: PropTypes.string,
	heading: PropTypes.string,
	action: PropTypes.string,
	description: PropTypes.string,
	onCancel: PropTypes.func,
	onAction: PropTypes.func,
	variant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning']),
	size: PropTypes.oneOf(['sm', 'md']),
};

DialogBox.defaultProps = {
	className: '',
	heading: 'selected row',
	action: '',
	description: 'description selected page',
	variant: 'danger',
	onCancel: () => {},
	onAction: () => {},
	size: 'sm',
};

export default DialogBox;
