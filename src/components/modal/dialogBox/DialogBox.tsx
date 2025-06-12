import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { ReactElement } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';

interface DialogProps {
	className?: string;
	size?: 'sm' | 'md';
}

interface DialogHeaderProps {
	title: string;
}

interface DialogFooterProps {
	action?: string;
	cancel?: string;
	onAction?: (props: { dismiss: () => void }) => void;
	onCancel?: () => void;
	hideCancel?: boolean;
	variant?: string;
	setOpen: (open: boolean) => void;
	customAction?: React.ComponentType<{ dismiss: () => void }>;
}
interface DialogOptions {
	title?: string | null;
	description?: string | null;
	actionText?: string;
	cancelText?: string;
	variant?: string;
	onAction?: ((props: { dismiss: () => void }) => void) | null | undefined;
	onCancel?: (() => void) | null | undefined;
	size?: 'sm' | 'md';
	customAction?:
		| React.ComponentType<{
				setNoDismissEnabled?: (enabled: boolean) => void;
				dismiss: () => void;
		  }>
		| undefined; // Explicitly allow undefined
	body?: React.ComponentType<{ setNoDismissEnabled: (enabled: boolean) => void }> | undefined;
	hideCancel?: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
}

interface DialogBoxHandle {
	dialog: (props: DialogOptions) => void;
}

const Header = ({ title }: DialogHeaderProps): ReactElement => {
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
}: DialogFooterProps): ReactElement => {
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

const DialogBox = forwardRef<DialogBoxHandle, DialogProps>((props, ref) => {
	const { size: defaultSize = 'md', className = '' } = props;

	const [open, setOpen] = useState(false);
	const [dialogProps, setDialogProps] = useState<DialogOptions>({
		title: null,
		description: null,
		actionText: 'Done',
		cancelText: 'Dismiss',
		variant: 'primary',
		onAction: null,
		onCancel: undefined,
		size: 'md',
		customAction: undefined,
		body: undefined,
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

	const size = appliedSize ?? defaultSize;

	const toggle = () => {
		onCancel?.();
		setOpen(false);
	};

	const footerProps = (ftProps: {
		setNoDismissEnabled: (enabled: boolean) => void;
	}): DialogFooterProps => {
		const { setNoDismissEnabled } = ftProps;
		return {
			action: actionText ?? 'Done',
			cancel: cancelText ?? 'Dismiss',
			hideCancel,
			variant: variant ?? 'primary',
			setOpen,
			...(customAction && {
				customAction: () => {
					const CustomActionComponent = customAction;
					return (
						<CustomActionComponent
							setNoDismissEnabled={setNoDismissEnabled}
							dismiss={() => {
								setOpen(false);
							}}
						/>
					);
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

	const dialog = (appliedDialogProps: DialogOptions) => {
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
			hideCrossDismiss={hideCrossDismiss ?? false}
			noDismiss={dismissEnabled}
			className={classes(styles.root, styles[size], className)}
			renderHeader={title ? <Header title={title} /> : undefined}
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

export default DialogBox;
