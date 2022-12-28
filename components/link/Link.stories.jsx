import Link from './Link';

export default {
	title: 'Components/Link',
	component: Link,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'For creating hyperlinks',
	},
};

const Template = (args) => {
	return <Link {...args}>This is just some sample text.</Link>;
};

export const Heading = Template.bind({});

Heading.args = {};
