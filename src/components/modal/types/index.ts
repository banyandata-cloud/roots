import type { MotionProps } from 'framer-motion';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { DEFAULT_ANIMATION_PROPS } from '../constants';

/**
 * Footer props available for the default `ModalFooter` component.
 */
export interface ModalFooterProps {
	actionTitle?: string;
	disabled?: {
		action?: boolean;
		cancel?: boolean;
	};
	cancelTitle?: string;
	onAction?: () => void;
	onDismiss?: () => void;
	toggle?: () => void;
	loading?: boolean;
}

/**
 * BaseModal component prop types.
 */
export interface BaseModalProps {
	className?: string | undefined;
	title?: string | undefined;
	description?: string | undefined;
	popperClassName?: string | undefined;
	renderHeader?: (ReactNode | ((bodyProps?: unknown) => ReactNode)) | undefined;
	children?: ReactNode;
	renderFooter?: (ReactNode | ((bodyProps?: unknown) => ReactNode)) | undefined;
	toggle?: ((open?: boolean) => void) | undefined;
	open: boolean;
	noDismiss?: boolean | undefined;
	hideCrossDismiss?: boolean | undefined;
	footerProps?: ModalFooterProps | undefined;
	animation?: boolean | undefined;
	animationProperties?: typeof DEFAULT_ANIMATION_PROPS;
}

export type FooterProps = ComponentPropsWithoutRef<'footer'> & MotionProps;
