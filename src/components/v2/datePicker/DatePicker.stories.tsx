import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import DatePicker from './DatePicker';
import DatePickerDoc from './Story/DatePickerDoc';

const meta: Meta<typeof DatePicker> = {
	title: 'Components/v2/DatePicker',
	component: DatePicker,
	tags: ['autodocs'],
	parameters: {
		docs: { page: DatePickerDoc },
		layout: 'padded',
		options: { showToolbar: true },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<div style={{ minHeight: 760 }}>
					<Story />
				</div>
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Range: Story = {
	args: {
		mode: 'range',
		defaultOpen: true,
	},
};

export const RangeWithTime: Story = {
	args: {
		mode: 'range',
		time: true,
		defaultOpen: true,
	},
};

export const SingleDate: Story = {
	args: {
		mode: 'single',
		defaultOpen: true,
	},
};

export const SingleDateWithTime: Story = {
	args: {
		mode: 'single',
		time: true,
		defaultOpen: true,
	},
};

export const AllowFutureDates: Story = {
	args: {
		mode: 'range',
		future: true,
		defaultOpen: true,
	},
};
