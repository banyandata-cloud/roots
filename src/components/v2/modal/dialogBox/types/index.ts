import type { ButtonColors } from 'components/buttons';
import type { ComponentType } from 'react';

export type DialogSize = 'sm' | 'md';

export interface DialogBoxProps {
	className?: string;
	size?: DialogSize;
}

export interface DialogActionHandlers {
	dismiss: () => void;
	setNoDismissEnabled?: ((enabled: boolean) => void) | undefined;
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
		setNoDismissEnabled?: (enabled: boolean) => void;
	}> | null;
	hideCancel?: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
}

export interface DialogBoxHandle {
	dialog: (options: DialogOpenOptions) => void;
}

export interface FooterInnerProps {
	action: string;
	cancel: string;
	variant: ButtonColors;
	customAction?:
		| ComponentType<{
				dismiss: () => void;
				setNoDismissEnabled?: ((enabled: boolean) => void) | undefined;
		  }>
		| null
		| undefined;
	setOpen: (open: boolean) => void;
	hideCancel: boolean;
	onAction?: DialogActionCallback | undefined;
	onCancel?: (() => void) | undefined;
	setNoDismissEnabled?: ((enabled: boolean) => void) | undefined;
}
