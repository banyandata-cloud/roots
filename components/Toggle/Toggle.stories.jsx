import React, { useState } from 'react';
import ThemedContainer from '../helpers/themedContainer/ThemedContainer';
import { TrashIcon } from '../icons';
import Toggle from './Toggle';

export default {
	title: 'Components/Toggle',
	component: Toggle,
	parameters: {
		options: {
			showToolbar: false,
		},
		// componentSubtitle: '',
	},
};

const Template = (args) => {
	// eslint-disable-next-line react/destructuring-assignment
	const [selectedToggle, setSelectedToggle] = useState(args.selectedToggle);

	return (
		<ThemedContainer {...args}>
			<Toggle
				{...args}
				selectedToggle={selectedToggle}
				setSelectedToggle={setSelectedToggle}
			/>
		</ThemedContainer>
	);
};

export const Uncontrolled = Template.bind({});

Uncontrolled.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

Uncontrolled.args = {
	options: [
		{
			value: 'First',
			title: 'First',
			rightComponent: null,
			leftComponent: null,
		},
		{
			value: 'Second',
			title: 'Second',
			rightComponent: null,
			leftComponent: null,
		},
		{
			value: 'Third',
			title: 'Third',
			rightComponent: null,
			leftComponent: null,
		},
		{
			value: 'Fourth',
			title: 'Fourth',
			rightComponent: null,
			leftComponent: null,
		},
	],
	theme: 'light',
};

export const Dark = Template.bind({});

Dark.args = {
	...Uncontrolled.args,
	theme: 'dark',
};

export const WithIcon = Template.bind({});

WithIcon.args = {
	options: [
		{
			value: 'pgsql',
			title: '',
			rightComponent: () => {
				return <TrashIcon />;
			},
			leftComponent: null,
		},
		{
			value: 'mysql',
			title: '',
			rightComponent: () => {
				return <TrashIcon />;
			},
			leftComponent: null,
		},
		{
			value: 'oracle',
			title: '',
			rightComponent: () => {
				return <TrashIcon />;
			},
			leftComponent: null,
		},
		{
			value: 'mongodb',
			title: '',
			rightComponent: () => {
				return <TrashIcon />;
			},
			leftComponent: null,
		},
		{
			value: 'mssql',
			title: '',
			rightComponent: () => {
				return <TrashIcon />;
			},
			leftComponent: null,
		},
	],
	defaultValue: 'oracle',
	theme: 'light',
};

const ControlledTemplate = (args) => {
	// eslint-disable-next-line react/destructuring-assignment
	const [selectedToggle, setSelectedToggle] = useState(args.defaultValue);

	return (
		<ThemedContainer {...args}>
			<Toggle
				{...args}
				// eslint-disable-next-line react/destructuring-assignment
				value={selectedToggle}
				onChange={setSelectedToggle}
			/>
		</ThemedContainer>
	);
};

export const Controlled = ControlledTemplate.bind({});

Controlled.args = {
	...WithIcon.args,
};

export const Multi = ControlledTemplate.bind({});

Multi.args = {
	...Controlled.args,
	defaultValue: ['oracle', 'mysql', 'pgsql'],
	multi: true,
};
