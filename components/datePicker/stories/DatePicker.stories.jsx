import React from 'react';
import { ThemedContainer } from '../../helpers';

import DatePicker from '../DatePicker';

export default {
	title: 'Components/DatePicker',
	component: DatePicker,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: 'Date Picker to pick dates and time as single value or in range',
			},
		},
	},
};

export const SingleDatePicker = (args) => {
	return (
		<ThemedContainer {...args}>
			<div
				style={{
					width: '40%',
				}}>
				<DatePicker {...args} />
			</div>
		</ThemedContainer>
	);
};

SingleDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
	theme: 'dark',
};

SingleDatePicker.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1182%3A34495',
	},
};

export const RangeDatePicker = (args) => {
	return (
		<div
			style={{
				width: '50%',
			}}>
			<DatePicker {...args} />
		</div>
	);
};

RangeDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Range Date Picker',
	value: [1678732200, 1678905000],
	range: true,
	theme: 'light',
};

export const CustomRangeDatePicker = (args) => {
	return (
		<ThemedContainer {...args}>
			<div
				style={{
					width: '70%',
				}}>
				<DatePicker {...args} />
			</div>
		</ThemedContainer>
	);
};

CustomRangeDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Range Date Picker',
	value: [1674412200, 1675708200],
	range: true,
	theme: 'dark',
	customRanges: [
		{
			title: 'Last 12 hours',
			type: 'hours',
			value: 12,
		},
	],
};

export const DatePickerWithDisabledDate = (args) => {
	return (
		<div>
			<DatePicker {...args} />
		</div>
	);
};

DatePickerWithDisabledDate.args = {
	placeholder: 'Select Date',
	label: 'Date Picker With Disabled Date',
	disableDatesBefore: '1666062682',
};

export const DisabledDatePicker = (args) => {
	return <DatePicker {...args} />;
};

DisabledDatePicker.args = {
	placeholder: 'Disabled Date',
	label: 'Disabled Date Picker',
	disabled: true,
};

DisabledDatePicker.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1182%3A34495',
	},
};

export const ThemedDatePicker = (args) => {
	return (
		<ThemedContainer {...args}>
			<DatePicker {...args} />
		</ThemedContainer>
	);
};

ThemedDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
};
