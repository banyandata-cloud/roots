/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { Button } from '../../buttons';
import BaseModal from '../BaseModal';
import { classes } from '../../../utils';
import styles from './Dialog.module.css';

const Header = ({ heading }) => {
	return (
		<div className={styles.header}>
			<p>{heading}</p>
		</div>
	);
};

const Footer = ({ action, onAction, onCancel, variant }) => {
	return (
		<div className={styles.footer}>
			<Button
				color='default'
				variant='outlined'
				className={styles.cancel}
				onClick={onCancel}
				title='Cancel'
			/>
			<Button onClick={onAction} title={action} color={variant} variant={'outlined'} />
		</div>
	);
};

const DialogBox = (props) => {
	const { open, heading, description, action, variant, onCancel, onAction, size, className } =
		props;

	const headerProps = {
		heading,
	};

	const footerProps = {
		action,
		variant,
		onAction,
		onCancel,
	};

	return (
		<BaseModal
			open={open}
			toggle={onCancel}
			className={classes(className, styles.root, styles[size])}
			renderHeader={<Header {...headerProps} />}
			renderFooter={<Footer {...footerProps} />}>
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
	size: 'md',
};

export default DialogBox;
