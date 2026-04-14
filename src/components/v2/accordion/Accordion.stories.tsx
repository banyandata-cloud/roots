import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThemedContainer from '../../helpers/themedContainer/ThemedContainer';
import AccordionDoc from '../accordion/Story/AccordionDoc';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
	title: 'Components/v2/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: AccordionDoc,
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

const headingStyle = {
	fontSize: '14px',
	fontWeight: 600,
	color: '#6B7280',
	textTransform: 'uppercase' as const,
	letterSpacing: '0.05em',
	margin: '0 0 8px 0',
};

const sectionWrapperStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '24px',
};

const AllVariants = (args: React.ComponentProps<typeof Accordion>) => {
	return (
		<div style={sectionWrapperStyle}>
			<div>
				<p style={headingStyle}>Default</p>
				<div style={sectionStyle}>
					{[...Array(4).keys()].map((key) => (
						<Accordion key={key} {...args} />
					))}
				</div>
			</div>

			<div>
				<p style={headingStyle}>Disabled</p>
				<div style={sectionStyle}>
					{[...Array(4).keys()].map((key) => (
						<Accordion
							key={key}
							{...args}
							title='Disabled Accordion'
							description='This content is hidden by default and the accordion cannot be interacted with.'
							defaultOpen={false}
							disabled={true}
						/>
					))}
				</div>
			</div>

			<div>
				<p style={headingStyle}>Nested</p>
				<Accordion title='Parent' description='This is the parent description'>
					<Accordion
						title='Child'
						description='This is the child description'
						onExpand={() => {}}
					/>
				</Accordion>
			</div>
		</div>
	);
};

export const All: Story = {
	name: 'All Variants',
	render: (args) => <AllVariants {...args} />,
	args: {
		title: 'Click to Expand',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		defaultOpen: false,
	},
};
