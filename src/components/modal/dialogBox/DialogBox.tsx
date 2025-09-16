import { forwardRef, useEffect, useImperativeHandle, useState, type ComponentType } from 'react';
import { classes } from '../../../utils';
import { Button, type ButtonColors } from '../../buttons';
import { Text } from '../../text';
import BaseModal from '../BaseModal';
import styles from './Dialog.module.css';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type DialogSize = 'sm' | 'md';

export interface DialogBoxProps {
	className?: string;
	size?: DialogSize;
}

export interface DialogActionHandlers {
	dismiss: () => void;
}

export type DialogActionCallback = (handlers: DialogActionHandlers) => void;

export interface DialogOpenOptions {
	title?: string | null;
	description?: string | null;
	actionText?: string;
	cancelText?: string;
	variant?: ButtonColors;
	onAction?: DialogActionCallback | null;
	onCancel?: (() => void) | null;
	size?: DialogSize;
	customAction?: ComponentType<DialogActionHandlers> | null;
	body?: ComponentType<{
		dismiss: () => void;
		setNoDismissEnabled: (enabled: boolean) => void;
	}> | null;
	hideCancel?: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
}

export interface DialogBoxHandle {
	dialog: (options: DialogOpenOptions) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Helper components                              */
/* -------------------------------------------------------------------------- */

const Header: React.FC<{ title?: string | null }> = ({ title }) => {
	return (
		<Text component='h2' variant='b1' weight={600}>
			{title}
		</Text>
	);
};

interface FooterInnerProps {
	action: string;
	cancel: string;
	variant: ButtonColors;
	customAction?: ComponentType<{ dismiss: () => void }> | null | undefined;
	setOpen: (open: boolean) => void;
	hideCancel: boolean;
	onAction?: DialogActionCallback | undefined;
	onCancel?: (() => void) | undefined;
}

const Footer: React.FC<FooterInnerProps> = ({
	action,
	cancel,
	variant,
	customAction: CustomAction,
	setOpen,
	hideCancel,
	onAction,
	onCancel,
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

/* -------------------------------------------------------------------------- */
/*                             Main Dialog component                           */
/* -------------------------------------------------------------------------- */

const DialogBox = forwardRef<DialogBoxHandle, DialogBoxProps>(
	({ className = '', size: defaultSize = 'md' }, ref) => {
		const [open, setOpen] = useState(false);
		const [dialogProps, setDialogProps] = useState<DialogOpenOptions & { size?: DialogSize }>({
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

		const size = appliedSize || defaultSize;

		const toggle = () => {
			onCancel?.();
			setOpen(false);
		};

		// function exposed through ref
		const dialog = (appliedDialogProps: DialogOpenOptions) => {
			setDialogProps((prev) => {
				return { ...prev, ...appliedDialogProps };
			});
		};

		useImperativeHandle(ref, () => ({ dialog }));

		// open modal when dialogProps are populated
		useEffect(() => {
			if (dialogProps.title && (dialogProps.description || dialogProps.body)) {
				setOpen(true);
			}
		}, [dialogProps]);

		const [dismissEnabled, setNoDismissEnabled] = useState(false);
		useEffect(() => {
			setNoDismissEnabled(noDismiss ?? false);
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
						onAction={onAction ?? undefined}
						onCancel={!hideCancel ? toggle : undefined}
					/>
				}>
				{Body && (
					<Body
						dismiss={() => setOpen(false)}
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
