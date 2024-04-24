/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';

const Header = ({ title }) => {
	return (
		<div className={styles.header}>
			<p>{title}</p>
		</div>
	);
};

const Footer = ({
	action,
	cancel,
	onAction,
	onCancel,
	hideCancel,
	variant,
	customAction: CustomAction,
}) => {
	return (
		<div className={styles.footer}>
			{!hideCancel && (
				<Button
					color='default'
					variant='outlined'
					className={styles.cancel}
					onClick={onCancel}
					title={cancel}
				/>
			)}

			{CustomAction && <CustomAction />}

			{onAction && (
				<Button onClick={onAction} title={action} color={variant} variant='outlined' />
			)}
		</div>
	);
};

const DialogBox = forwardRef((props, ref) => {
	const { size: defaultSize, className } = props;

	const [open, setOpen] = useState(false);
	const [dialogProps, setDialogProps] = useState({
		title: null,
		description: null,
		actionText: 'Done',
		cancelText: 'Dismiss',
		variant: 'primary',
		onAction: null,
		onCancel: null,
		size: 'md',
		customAction: null,
	});

	const {
		title,
		description,
		actionText,
		cancelText,
		variant,
		onAction,
		onCancel,
		customAction,
		hideCancel = false,
		noDismiss,
		size: appliedSize,
	} = dialogProps;

	const size = appliedSize || defaultSize;

	const toggle = () => {
		onCancel?.();
		setOpen(false);
	};

	const headerProps = {
		title,
	};

	const footerProps = {
		action: actionText,
		cancel: cancelText,
		hideCancel,
		variant,
		...(customAction && {
			customAction,
		}),
		...(onAction && {
			onAction: () => {
				onAction();
				setOpen(false);
			},
		}),
		...(!hideCancel && {
			onCancel: toggle,
		}),
	};

	const dialog = (appliedDialogProps) => {
		setDialogProps({
			...dialogProps,
			...appliedDialogProps,
		});
	};

	useImperativeHandle(ref, () => {
		return {
			dialog,
		};
	});

	useEffect(() => {
		if (dialogProps.title && dialogProps.description) {
			setOpen((prev) => {
				return !prev;
			});
		}
	}, [dialogProps]);

	return (
		<BaseModal
			open={open}
			toggle={toggle}
			hideCrossDismiss
			noDismiss={noDismiss}
			className={classes(styles.root, styles[size], className)}
			renderHeader={title && <Header {...headerProps} />}
			renderFooter={<Footer {...footerProps} />}>
			<div className={styles.description}>{description}</div>
		</BaseModal>
	);
});

DialogBox.propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md']),
};

DialogBox.defaultProps = {
	className: '',
	size: 'md',
};

export default DialogBox;
