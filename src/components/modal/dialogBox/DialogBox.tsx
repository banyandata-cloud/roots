import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';
import type { ReactElement } from 'react';


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

interface DialogBoxHandle {
	dialog: (props: DialogOptions) => void;
}

interface DialogOptions {
	title?: string | null;
	description?: string | null;
	actionText?: string;
	cancelText?: string;
	variant?: string;
	onAction?: ((props: { dismiss: () => void }) => void) | null;
	onCancel?: () => void;
	size?: 'sm' | 'md';
	customAction?: React.ComponentType<{
		setNoDismissEnabled?: (enabled: boolean) => void;
		dismiss: () => void;
	}>;
	body?: React.ComponentType<{ setNoDismissEnabled: (enabled: boolean) => void }>;
	hideCancel?: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
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
					onClick={() => onAction({ dismiss: () => setOpen(false) })}
					className={styles.save}
					title={action}
					color={variant}
				/>
			)}
		</div>
	);
};

const DialogBox = forwardRef<DialogBoxHandle, DialogProps>((props, ref): ReactElement => {
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

	const size = appliedSize || defaultSize;

	const toggle = () => {
		onCancel?.();
		setOpen(false);
	};

	const headerProps = {
		title,
	};

	const footerProps = ({
		setNoDismissEnabled,
	}: {
		setNoDismissEnabled: (enabled: boolean) => void;
	}) => {
		return {
			action: actionText,
			cancel: cancelText,
			hideCancel,
			variant,
			setOpen,
			...(customAction && {
				customAction: () => {
					// Render the component instead of calling it
					const CustomActionComponent = customAction;
					return (
						<CustomActionComponent
							setNoDismissEnabled={setNoDismissEnabled}
							dismiss={() => setOpen(false)}
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
			hideCrossDismiss={hideCrossDismiss}
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
