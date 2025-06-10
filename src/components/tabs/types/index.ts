import type { ComponentType, ReactElement } from 'react';

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
	direction: TabDirection;
	children?: ReactElement;
}
