/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';

const Header = ({ title }) => {
	return (
		<Text component='h2' variant='b1' weight={600}>
			{title}
		</Text>
	);
};

const Footer = ({
	action,
	cancel,
	onAction,
	onCancel,
	hideCancel,
	variant,
	setOpen,
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

			{CustomAction && (
				<CustomAction
					dismiss={() => {
						setOpen(false);
					}}
				/>
			)}

			{onAction && (
				<Button onClick={onAction} className={styles.save} title={action} color={variant} />
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
		body: null,
	});

	const {
		description,
		actionText,
		cancelText,
		variant,
		title,
		onAction,
		onCancel,
		customAction,
		hideCancel = false,
		noDismiss = false,
		body: Body,
		size: appliedSize,
		hideCrossDismiss,
	} = dialogProps;

	const size = appliedSize || defaultSize;

	const toggle = () => {
		onCancel?.();
		setOpen(false);
	};

	const headerProps = {
		title,
	};

	const footerProps = ({ setNoDismissEnabled }) => {
		return {
			action: actionText,
			cancel: cancelText,
			hideCancel,
			variant,
			setOpen,
			...(customAction && {
				customAction: () => {
					return customAction({
						setNoDismissEnabled,
					});
				},
			}),
			...(onAction && {
				onAction: () => {
					onAction({
						dismiss: () => {
							setOpen(false);
						},
					});
				},
			}),
			...(!hideCancel && {
				onCancel: toggle,
			}),
		};
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
		if (dialogProps.title && (dialogProps.description || dialogProps.body)) {
			setOpen((prev) => {
				return !prev;
			});
		}
	}, [dialogProps]);

	const [dismissEnabled, setNoDismissEnabled] = useState(false);

	useEffect(() => {
		setNoDismissEnabled(noDismiss);
	}, [noDismiss]);

	return (
		<BaseModal
			open={open}
			toggle={toggle}
			hideCrossDismiss={hideCrossDismiss}
			noDismiss={dismissEnabled}
			className={classes(styles.root, styles[size], className)}
			renderHeader={title && <Header {...headerProps} />}
			renderFooter={
				<Footer
					{...footerProps({
						setNoDismissEnabled,
					})}
				/>
			}>
			{Body && <Body setNoDismissEnabled={setNoDismissEnabled} />}
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
