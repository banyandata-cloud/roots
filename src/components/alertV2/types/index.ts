import type { ComponentType } from 'react';

type AlertType = 'info' | 'error' | 'warning' | 'success' | 'danger';
type AlertPosition = 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center';

export interface AlertProps {
	showIcon?: boolean;
	shadow?: boolean;
	position?: AlertPosition;
	animation?: boolean;
	className?: string;
}

export interface AlertConfig {
	title: string | null | undefined;
	description: string | null | undefined;
	icon?: ComponentType<{ className?: string }> | undefined;
	type: AlertType;
	action?: ComponentType | undefined;
	position?: AlertPosition | null | undefined;
	onClose?: () => void;
	autoDismiss?: boolean;
	dismissTime?: number;
}

export interface AlertHandle {
	alert: (props: Partial<AlertConfig>) => void;
}
