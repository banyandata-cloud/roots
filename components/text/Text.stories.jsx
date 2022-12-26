import Text from './Text';

export default {
	title: 'Components/Text',
	component: Text,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Text component used everywhere',
	},
};

const Template = (args) => {
	return <Text {...args}>This is just some sample text.</Text>;
};

export const Heading = Template.bind({});

Heading.args = {
	variant: 'h1',
	style: 'semibold',
};

export const Body = Template.bind({});
