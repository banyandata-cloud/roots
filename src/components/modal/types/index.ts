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
	className?: string;
	title?: string | undefined;
	description?: string | undefined;
	popperClassName?: string;
	renderHeader?: ReactNode | ((bodyProps?: unknown) => ReactNode);
	children?: ReactNode;
	renderFooter?: ReactNode | ((bodyProps?: unknown) => ReactNode);
	toggle?: (open?: boolean) => void;
	open: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
	footerProps?: ModalFooterProps;
	animation?: boolean;
	animationProperties?: typeof DEFAULT_ANIMATION_PROPS;
}

export type FooterProps = ComponentPropsWithoutRef<'footer'> & MotionProps;
