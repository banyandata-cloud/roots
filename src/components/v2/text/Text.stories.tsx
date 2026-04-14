import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import TextDoc from './Story/TextDoc';
import Text from './Text';

const meta: Meta<typeof Text> = {
	title: 'Components/v2/Text',
	component: Text,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: TextDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
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

type Story = StoryObj<typeof Text>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Header</p>
				<Text variant='h1' stroke='semibold'>
					This is just some sample text.
				</Text>
			</div>
			<div>
				<p style={headingStyle}>Body</p>
				<Text>This is just some sample text.</Text>
			</div>
		</div>
	),
};
