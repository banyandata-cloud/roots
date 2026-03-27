import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThemedContainer from '../../helpers/themedContainer/ThemedContainer';
import AccordionDoc from '../accordion/Story/AccordionDoc'; // Import the doc component you created
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
	title: 'Components/v2/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: AccordionDoc, // This links the Doc component to the Docs tab
		},
		layout: 'padded',
		options: { showToolbar: true },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '8px',
};

const TemplateStory = (args: React.ComponentProps<typeof Accordion>) => {
	return (
		<div style={sectionStyle}>
			{[...Array(4).keys()].map((key) => {
				return <Accordion key={key} {...args} />;
			})}
		</div>
	);
};

export const Default: Story = {
	name: 'Default',
	render: (args) => <TemplateStory {...args} />,
	args: {
		title: 'Click to Expand',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		defaultOpen: false,
	},
};

export const Disabled: Story = {
	name: 'Disabled',
	render: (args) => <TemplateStory {...args} />,
	args: {
		title: 'Disabled Accordion',
		description:
			'This content is hidden by default and the accordion cannot be interacted with.',
		defaultOpen: false,
		disabled: true,
	},
};

export const Nested: Story = {
	name: 'Nested',
	render: () => (
		<Accordion title='Parent' description='This is the parent description'>
			<Accordion
				title='Child'
				description='This is the child description'
				onExpand={() => {}}
			/>
		</Accordion>
	),
};
