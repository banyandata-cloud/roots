import React from 'react';

import CodeSnippet from './CodeSnippet';

export default {
	title: 'ComponentsV2/CodeSnippet',
	component: CodeSnippet,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: 'A drop-down menu is a menu that offers a list of options.',
			},
		},
	},
};

export const Default = (args) => {
	return (
		<div>
			<CodeSnippet {...args} />
		</div>
	);
};

Default.args = {
	src: {
		company: {
			name: 'Banyan Cloud',
			address:
				'Brigade Irv Center, Unit 803, 8th Floor, Nallurahalli Main Rd, Bengaluru, Karnataka 560066',
			sector: 'IT',
		},
	},
	showIcon: true,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};
