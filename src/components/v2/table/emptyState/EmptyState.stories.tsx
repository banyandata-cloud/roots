import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { EmptyState } from './index';
import EmptyStateDoc from './Story/EmptyStateDoc';

const meta: Meta<typeof EmptyState> = {
	title: 'Components/v2/Table/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: EmptyStateDoc,
		},
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<div style={{ width: 520, height: 320 }}>
					<Story />
				</div>
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const WithRetry: Story = {
	args: {
		title: 'No Data',
		description: "The issues service didn't respond.",
		actionLabel: 'Retry',
		onAction: () => {},
	},
};

