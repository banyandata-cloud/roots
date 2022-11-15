import React from 'react';
import Accordion from './Accordion';

export default {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: `The accordion component delivers large amounts of content in a small space through progressive disclosure. 
                The header title gives the user a high-level overview of the content allowing the user to decide which sections to read. 
                Accordions can make information processing and discovering more effective. 
                However, it does hide content from users and it's important to account for a user not noticing or reading all of the included content. 
                If a user is likely to read all of the content, then don't use an accordion as it adds the burden of an extra click; instead use a full scrolling page with normal headers.`,
			},
		},
	},
};

export const Default = (args) => {
	return (
		<div>
			<Accordion {...args} />
		</div>
	);
};

Default.args = {
	title: 'Click to Expand',
	description: null,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};
