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
				component:
					'Code Block or Code Snippet to syntax highligh the code and prettify it inside the block.',
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
	code: JSON.stringify(
		{
			id: 1,
			title: 'iPhone 9',
			description: 'An apple mobile which is nothing like apple',
			price: 549,
			discountPercentage: 12.96,
			rating: 4.69,
			stock: 94,
			brand: 'Apple',
			category: 'smartphones',
		},
		null,
		4
	),
	language: 'json',
	copy: true,
	theme: 'dark',
	showLineNumbers: false,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};
