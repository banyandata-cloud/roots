import { forwardRef, useEffect, useImperativeHandle, useState, type FC } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';
import type {
	DialogBoxHandle,
	DialogBoxProps,
	DialogOpenOptions,
	DialogSize,
	FooterInnerProps,
} from './types';

const DIALOG_DEFAULTS: DialogOpenOptions = {
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
};

const Header: FC<{ title?: string | null }> = ({ title }) => {
	return (
		<Text component='h2' variant='b1' weight={600}>
			{title}
		</Text>
	);
};

const Footer: FC<FooterInnerProps> = ({
	action,
	cancel,
	variant,
	customAction: CustomAction,
	setOpen,
	hideCancel,
	onAction,
	onCancel,
	setNoDismissEnabled,
}) => {
	return (
		<div className={styles.footer}>
			{!hideCancel && (
				<Button
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
					setNoDismissEnabled={setNoDismissEnabled}
				/>
			)}

			{onAction && (
				<Button
					onClick={() => {
						onAction({
							dismiss: () => {
								setOpen(false);
							},
						});
					}}
					className={styles.save}
					title={action}
					color={variant}
				/>
			)}
		</div>
	);
};

const DialogBox = forwardRef<DialogBoxHandle, DialogBoxProps>(
	({ className = '', size: defaultSize = 'md' }, ref) => {
		const [open, setOpen] = useState(false);
		const [dialogProps, setDialogProps] = useState<DialogOpenOptions & { size?: DialogSize }>(
			DIALOG_DEFAULTS
		);

		const {
			description,
			actionText = 'Done',
			cancelText = 'Dismiss',
			variant = 'primary',
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

		const size = appliedSize ?? defaultSize;

		const toggle = () => {
			onCancel?.();
			setOpen(false);
			setDialogProps(DIALOG_DEFAULTS);
		};

		// function exposed through ref
		const dialog = (appliedDialogProps: DialogOpenOptions) => {
			setDialogProps((prev) => {
				return {
					...prev,
					...appliedDialogProps,
				};
			});
		};

		useImperativeHandle(ref, () => {
			return {
				dialog,
			};
		});

		useEffect(() => {
			if (dialogProps.title && (dialogProps.description || dialogProps.body)) {
				setOpen(true);
			}
		}, [dialogProps]);

		const [dismissEnabled, setNoDismissEnabled] = useState<boolean>(false);
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
				renderHeader={title ? <Header title={title} /> : undefined}
				renderFooter={
					<Footer
						action={actionText}
						cancel={cancelText}
						variant={variant}
						setOpen={setOpen}
						hideCancel={hideCancel}
						customAction={customAction}
						setNoDismissEnabled={setNoDismissEnabled}
						onAction={onAction ?? undefined}
						onCancel={!hideCancel ? toggle : undefined}
					/>
				}>
				{Body && (
					<Body
						dismiss={() => {
							setOpen(false);
						}}
						setNoDismissEnabled={setNoDismissEnabled}
					/>
				)}
				{description && <div className={styles.description}>{description}</div>}
			</BaseModal>
		);
	}
);

DialogBox.displayName = 'DialogBox';

export default DialogBox;
