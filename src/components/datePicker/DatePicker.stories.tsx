import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePickerDoc from '../datePicker/Story/DatePickerDoc';
import { ThemedContainer } from '../helpers';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker',
	component: DatePicker,
	tags: ['autodocs'], // Enables the Docs tab
	parameters: {
		layout: 'padded',
		options: { showToolbar: true },
		docs: {
			page: DatePickerDoc, // Links the documentation
		},
	},
	decorators: [
		(Story) => (
			<ThemedContainer style={{ width: '40rem' }}>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/* --- Single Date with Time Selection --- */
const SingleDatePickerWithTimeSelectionStory = () => {
	const [value, setValue] = useState<number | null>(1767649320);
	return (
		<DatePicker
			placeholder='Select Date Range'
			label='Range Date Picker'
			value={value}
			limitHours={1}
			valueAsRange={true}
			showTime={true}
			timeRange={true}
			onApply={(v) => {
				console.log(v);
				setValue((v as number[])?.[1]);
			}}
			onClear={() => setValue(null)}
		/>
	);
};

export const SingleDatePickerWithTimeSelection: Story = {
	name: 'Default Single Date Picker With Time Selection',
	render: () => <SingleDatePickerWithTimeSelectionStory />,
};

/* --- Default Single Date Picker --- */
const SingleDatePickerStory = () => {
	const [value, setValue] = useState<number | null>(null);
	return (
		<DatePicker
			placeholder='Select Date Range'
			label='Range Date Picker'
			value={value}
			onApply={(v) => {
				console.log(v);
				setValue(v as number);
			}}
			onClear={() => setValue(null)}
		/>
	);
};

export const DefaultSingleDatePicker: Story = {
	name: 'Default Single Date Picker',
	render: () => <SingleDatePickerStory />,
};

/* --- Range Date Picker --- */
const RangeDatePickerStory = () => {
	const [value, setValue] = useState<[number, number] | null>(null);
	return (
		<DatePicker
			placeholder='Select Date Range'
			label='Range Date Picker'
			range={true}
			value={value}
			onApply={(v) => setValue(v as [number, number])}
			onClear={() => setValue(null)}
		/>
	);
};

export const RangeDatePicker: Story = {
	name: 'Range Date Picker',
	render: () => <RangeDatePickerStory />,
};

/* --- Custom Range Date Picker --- */
const CustomRangeDatePickerStory = () => {
	const [value, setValue] = useState<[number, number] | null>(null);
	return (
		<DatePicker
			placeholder='Select Date Range'
			label='Range Date Picker'
			range={true}
			value={value}
			onApply={(v) => setValue(v as [number, number])}
			onClear={() => setValue(null)}
			showCustomRanges={true}
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
	);
};

export const CustomRangeDatePicker: Story = {
	name: 'Custom Range Date Picker',
	render: () => <CustomRangeDatePickerStory />,
};

export const DisabledPicker: Story = {
	name: 'Disabled Picker',
	args: {
		placeholder: 'Disabled Date',
		label: 'Disabled Date Picker',
		disabled: true,
	},
};

export const WithDisabledDate: Story = {
	name: 'With Disabled Date',
	args: {
		placeholder: 'Select Date',
		label: 'Date Picker With Disabled Date',
		disableDatesBefore: [1666062682],
	},
};
