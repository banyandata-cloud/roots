import React, { useState } from 'react';
import Toggle from './Toggle';

export default {
	title: 'Components/Toggle',
	component: Toggle,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	const [selectedToggle, setSelectedToggle] = useState('');

	return (
		<div>
			<Toggle
				{...args}
				selectedToggle={selectedToggle}
				setSelectedToggle={setSelectedToggle}
			/>
			<span
				style={{
					fontSize: '0.875rem',
				}}>
				You have selected {selectedToggle}
			</span>
		</div>
	);
};

export const Default = Template.bind({});

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

export const Disabled = Template.bind({});

Default.args = {
	options: [
		{
			id: '1',
			value: 'First',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '2',
			value: 'Second',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '3',
			value: 'Third',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '4',
			value: 'Fourth',
			rightCompoenent: '',
			leftCompoenent: '',
		},
	],
	selectedToggle: '',
	setSelectedToggle: '',
};

export const Dark = Template.bind({});

Dark.args = {
	options: [
		{
			id: '1',
			value: 'First',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '2',
			value: 'Second',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '3',
			value: 'Third',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			id: '4',
			value: 'Fourth',
			rightCompoenent: '',
			leftCompoenent: '',
		},
	],
	selectedToggle: '',
	setSelectedToggle: '',
	theme: 'dark',
};
