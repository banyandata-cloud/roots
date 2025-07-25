import type { ComponentType, ReactNode } from 'react';

type CalloutType = 'info' | 'error' | 'warning' | 'success' | 'danger';

export interface CalloutProps {
	title: ReactNode;
	className?: string;
	showIcon?: boolean;
	shadow?: boolean;
	description?: ReactNode;
	icon?: ComponentType<{ className: string | undefined }>;
	action?: ComponentType;
	type: CalloutType;
};
