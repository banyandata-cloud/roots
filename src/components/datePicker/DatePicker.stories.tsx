import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ThemedContainer } from '../helpers';
import DatePicker from './DatePicker';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker',
	component: DatePicker,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/* -------------------------------------------------------------------------- */
/*                                 Base Wrapper                                */
/* -------------------------------------------------------------------------- */

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemedContainer style={{ width: '40rem' }}>{children}</ThemedContainer>
);

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const DefaultSingleDate: Story = {
	name: 'Default Single Date Picker',
	args: {
		placeholder: 'Select Date',
		theme: 'light',
		value: [1743489604, 1744699204],
		disableDatesBefore: [1743489604],
		disableDatesAfter: [1744699204],
		range: true,
	},
	render: (args) => (
		<Wrapper>
			<DatePicker
				{...args}
				onApply={(v) => {
					console.log(new Date(v[0] * 1000), new Date(v[1] * 1000), v);
				}}
				onClear={() => {
					console.log('On Clear');
				}}
			/>
		</Wrapper>
	),
};

export const DefaultSingleDateV2: Story = {
	name: 'Default Single Date Picker V2 New Modal',
	args: {
		placeholder: 'Select Date',
		theme: 'light',
		value: 1743489604,
		disableDatesBefore: [1743489604],
		disableDatesAfter: [1744699204],
		v2: true,
	},
	render: (args) => (
		<Wrapper>
			<DatePicker
				{...args}
				onApply={(v) => {
					console.log(v);
				}}
				onClear={() => {
					console.log('On Clear');
				}}
			/>
		</Wrapper>
	),
};

export const RangeDatePicker: Story = {
	name: 'Range Date Picker',
	render: () => {
		const [value, setValue] = useState<number[] | null>(null);

		return (
			<Wrapper>
				<DatePicker
					placeholder='Select Date Range'
					label='Range Date Picker'
					range
					value={value}
					onApply={(v) => setValue(v)}
					onClear={() => setValue(null)}
				/>
			</Wrapper>
		);
	},
};

export const CustomRangeDatePicker: Story = {
	name: 'Custom Range Date Picker',
	render: () => {
		const [value, setValue] = useState<number[] | null>(null);

		return (
			<Wrapper>
				<DatePicker
					placeholder='Select Date Range'
					label='Range Date Picker'
					theme='light'
					range
					value={value}
					onApply={(v) => setValue(v)}
					onClear={() => setValue(null)}
					showCustomRanges
					customRanges={[
						{ title: 'Last 12 hours', type: 'hours', value: 12 },
						{ title: 'Last 24 hours', type: 'hours', value: 24 },
						{ title: 'Last 1 Week', type: 'days', value: 7 },
						{ title: 'Last 15 Days', type: 'days', value: 15 },
						{ title: 'Last 1 Month', type: 'days', value: 30 },
						{ title: 'Last 2 Months', type: 'months', value: 2 },
						{ title: 'Last 3 Months', type: 'months', value: 3 },
						{ title: 'Last 6 Months', type: 'months', value: 6 },
						{ title: 'Last 1 Year', type: 'months', value: 12 },
					]}
				/>
			</Wrapper>
		);
	},
};

export const DisabledPicker: Story = {
	name: 'Disabled Picker',
	args: {
		placeholder: 'Disabled Date',
		label: 'Disabled Date Picker',
		disabled: true,
	},
	render: (args) => (
		<Wrapper>
			<DatePicker {...args} />
		</Wrapper>
	),
};

export const WithDisabledDate: Story = {
	name: 'With Disabled Date',
	args: {
		placeholder: 'Select Date',
		label: 'Date Picker With Disabled Date',
		disableDatesBefore: '1666062682',
	},
	render: (args) => (
		<Wrapper>
			<DatePicker {...args} />
		</Wrapper>
	),
};
