import React from 'react';
import HierarchyItem from './HierarchyItem';

export default {
	title: 'ComponentsV2/Hierarchy/Item',
	component: HierarchyItem,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: 'This component is used in the HierarchyBrowser component.',
			},
		},
	},
};

export const Default = (args) => {
	return (
		<div>
			<HierarchyItem {...args} />
		</div>
	);
};

Default.args = {
	title: 'Click to Expand',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};
