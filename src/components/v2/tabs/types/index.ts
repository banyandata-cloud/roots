import type { ComponentType, ReactNode } from 'react';

interface TabProps {
	id: string;
	title: string;
	disabled?: boolean;
	leftIcon?:
		| ComponentType
		| {
				Active?: ComponentType;
				InActive?: ComponentType;
		  };
	rightIcon?: ComponentType<{ className?: string | undefined }>;
	dropdown?: boolean;
	dropdownItems?: {
		title: string;
		id: string;
	}[];
}

type TabDirection = 'horizontal' | 'vertical';

export interface TabsProps {
	tabs: TabProps[];
	className?: string;
	selectedTab: string;
	setSelectedTab: (id: string) => void;

	/** OPTIONAL because component provides a default */
	direction?: TabDirection;

	/** allow <div>, text, fragments, etc */
	children?: ReactNode;
}
