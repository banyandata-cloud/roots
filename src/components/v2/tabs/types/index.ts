import type { ComponentType, ReactNode } from 'react';
import type { TabButtonBaseSize } from '../tabButtonBase/types';

interface TabProps {
	id: string;
	title: string;
	disabled?: boolean;
	leftIcon?:
		| ComponentType<{ className?: string | undefined }>
		| {
				Active?: ComponentType<{ className?: string | undefined }>;
				InActive?: ComponentType<{ className?: string | undefined }>;
		  };
	rightIcon?: ComponentType<{ className?: string | undefined }>;
	/** Count/label shown in the tab badge (variant tabs only) */
	badge?: ReactNode;
	dropdown?: boolean;
	dropdownItems?: {
		title: string;
		id: string;
	}[];
}

export type TabDirection = 'horizontal' | 'vertical';

export type TabsType = 'brand' | 'gray' | 'border' | 'minimal' | 'underline';

export interface TabsProps {
	tabs: TabProps[];
	className?: string;
	selectedTab: string;
	setSelectedTab: (id: string) => void;

	/** OPTIONAL because component provides a default */
	direction?: TabDirection;

	/** Design-system look; when omitted the legacy tabs are rendered */
	type?: TabsType;
	size?: TabButtonBaseSize;
	/** Tabs stretch to fill the available width */
	fullWidth?: boolean;

	/** allow <div>, text, fragments, etc */
	children?: ReactNode;
}
