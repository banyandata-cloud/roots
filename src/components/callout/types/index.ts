import type { ComponentType, ReactNode } from 'react';

type CalloutType = 'info' | 'error' | 'warning' | 'success' | 'danger';

export interface CalloutProps {
	showIcon?: boolean;
	shadow?: boolean;
	className?: string;
	title?: ReactNode;
	description?: ReactNode;
	icon?: ComponentType<{ className?: string }>;
	action?: ComponentType;
	type: CalloutType;
};
