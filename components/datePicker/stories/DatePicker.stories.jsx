import React from 'react';

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
		<div
			style={{
				width: '50%',
			}}>
			<DatePicker {...args} />
		</div>
	);
};

SingleDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
	theme: 'light',
};

SingleDatePicker.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1182%3A34495',
	},
};

export const RangeDatePicker = (args) => {
	return (
		<div>
			<DatePicker {...args} />
		</div>
	);
};

RangeDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Range Date Picker',
	range: true,
	maxRange: {
		value: 6,
		type: 'months',
	},
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
		<div
			style={{
				width: '50%',
				padding: 20,
				background: '#333',
			}}>
			<DatePicker {...args} />
		</div>
	);
};

ThemedDatePicker.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
};

export const SingleDatePickerWithTime = (args) => {
	return (
		<div
			style={{
				width: '50%',
				padding: 20,
			}}>
			<DatePicker {...args} />
		</div>
	);
};

SingleDatePickerWithTime.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
	theme: 'light',
	showTimePicker: true,
};
